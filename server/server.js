const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url === '/api/history') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(fs.readFileSync('pawnrush.history', 'utf8').split('\r\n')));
    } else {
        res.statusCode = 404;
        res.end();
    }
  
}).listen(8080, 'localhost');


const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const PawnRush = require('./pawn-rush.class');
const Rooms = new Map();

wss.on('connection', (client) => {

    client.on('message', (message) => {
        processMessage(message, client);
    });

    client.send('something');

    client.on('close', function () {
        console.log('connection closed');
    })
});

function processMessage(message, client) {
    try {
        /**
         * data = {
         *  room: string,
         *  userId: string,
         *  action: {
         *              type: move | registration,
         *              data: any    
         *          }
         * }
         * 
         * 
         * move: {from: "e2", to: "e4", promotion: "q"}
         * registration: { colour: 'w' | 'b' }
         */
        const data = JSON.parse(message);

        if (!data.room) {
            // invalid connection
            return;
        }

        let room;
        if (!Rooms.has(data.room)) {
            const preRoom = new Map();
            // start a game instance
            preRoom.set('game', new PawnRush());
            preRoom.set('history', []);

            // set spectators array
            preRoom.set('spectators', []);
            // set competitors array
            preRoom.set('competitors', new Map());
            // set map for lookup player colour
            preRoom.set('competitorColors', new Map());

            Rooms.set(data.room, preRoom);
        }

        room = Rooms.get(data.room);

        if (!data.userId) {
            // connection is a spectator
            const spectatorList = room.get('spectators');
            spectatorList.push(client);
        } else {
            // user is a player
            const competitorMap = room.get('competitors');
            
            if (competitorMap.size === 2) {
                // room is full, reject player
                return;
            }

            if (!competitorMap.has(data.userId)) {
                // register player to the room
                competitorMap.set(data.userId, client);

                if (competitorMap.size === 2) {
                    // update the front end to start the game
                    // let player decide the their colour side

                    return;
                }
            }

            if (!data.action || !data.action.type || !data.action.data) {
                return;
            }

            // move or registration is received

            switch (data.action.type) {
                case 'move':
                    if (competitorMap.size !== 2) {
                        // not enough players to make a move
                        return;
                    }
                    const colorMap = room.get('competitorColors');
                    const game = room.get('game');
                    const turn = game.turn();
                    const userTurnId = colorMap.get(turn);

                    if (userTurnId !== data.userId) {
                        // user is not allowed to perform a move yet
                        // reject the move
                        return; 
                    }

                    // perform pawn rush logic
                    // then broadcast board status to all room clients


                    break;
                case 'registration':
                    const colorMap = room.get('competitorColors');

                    // check colour validity
                    if (data.action.data.colour !== 'w' || data.action.data.colour !== 'b') {
                        return;
                    }

                    // register colour selection
                    if (data.action.data.colour && !colorMap.has(data.action.data.colour)) {
                        colorMap.set(data.action.data.colour, data.userId);
                    }
                    break;
                default:
                    
                    break;
            }
            return;
        }
    } catch (error) {
        // invalid message from client
        console.log(error);
    }
    return;
}
