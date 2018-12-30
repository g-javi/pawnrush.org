import math

initialRating = 1000
K = 50
champion = ''

history = open("pawnrush.history", "r")

playerlist = {}

# Function to calculate the Probability
def Probability(rating1, rating2):
     return 1.0 * 1.0 / (1 + 1.0 * math.pow(10, 1.0 * (rating1 - rating2) / 400))
 
# Function to calculate Elo rating
# K is a constant.
def EloRating(winner, loser, K):

    Rwinner = playerlist[winner]
    Rloser = playerlist[loser]

    # To calculate the winning probability of Rloser
    Pl = Probability(Rwinner, Rloser)
 
    # To calculate the winning probability of Rwinner
    Pw = Probability(Rloser, Rwinner)
 
    Rwinner = Rwinner + K * (1 - Pw)
    Rloser = Rloser + K * (0 - Pl)

    # Update
    playerlist[winner] = Rwinner
    playerlist[loser] = Rloser

def LinealChampion(winner, loser):
    global champion
    if champion == '' or champion == loser:
        champion = winner

for match in history: 
    matchPlayers = match.split(',')
    winner = matchPlayers[0]
    loser = matchPlayers[1].strip()
    if not winner in playerlist:
        playerlist[winner]=initialRating
    if not loser in playerlist:
        playerlist[loser]=initialRating

    EloRating(winner, loser, K)
    LinealChampion(winner, loser)

print '----------------------------------------'
print 'Pawn Rush World Championship Elo Ratings'
print '----------------------------------------\n'

print 'World Champion: ' + champion + '\n'

for player in sorted(playerlist, key=playerlist.get, reverse=True):
    print player + '\t\t' + str(int(round(playerlist[player])))

