const fs = require('fs');
initialRating = 1000
K = 50
champion = ''

history = fs.readFileSync('pawnrush.history', 'utf8').split('\r\n');

playerlist = {}

function Probability(rating1, rating2) {
    return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (rating1 - rating2) / 400))
}

function EloRating(winner, loser, K) {
    Rwinner = playerlist[winner]
    Rloser = playerlist[loser]

    Pl = Probability(Rwinner, Rloser)
 
    Pw = Probability(Rloser, Rwinner)
 
    Rwinner = Rwinner + K * (1 - Pw)
    Rloser = Rloser + K * (0 - Pl)

    playerlist[winner] = Rwinner
    playerlist[loser] = Rloser
}

function LinealChampion(winner, loser) {
    if (champion === '' || champion === loser) {
        champion = winner
    }
}

history.forEach(match => {
    matchPlayers = match.split(',')
    winner = matchPlayers[0]
    loser = matchPlayers[1].trim()
    if (!playerlist.hasOwnProperty(winner)) {
        playerlist[winner]=initialRating;
    }
    if (!playerlist.hasOwnProperty(loser)) {
        playerlist[loser]=initialRating;
    }
    EloRating(winner, loser, K)
    LinealChampion(winner, loser)
});

console.log('----------------------------------------');
console.log('Pawn Rush World Championship Elo Ratings');
console.log('----------------------------------------\n');

console.log('World Champion: ' + champion + '\n');

var sortable = [];
for (var player in playerlist) {
    sortable.push([player, playerlist[player]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});

sortable.forEach(player => {
    console.log(player[0] + '\t\t' + Math.round(player[1]));
});
