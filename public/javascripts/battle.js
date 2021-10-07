class Battle {
  constructor(player1 = "Captain Planet", player2 = "Skeletor") {
    this.player1 = player1;
    this.player2 = player2;
  }

  winner(player1Roll, player2Roll) {
    if (player1Roll > player2Roll) {
      console.log('PLAYER1 WINS');
      return 'Player1 Wins!';
    } 
    else if (player1Roll < player2Roll){
      console.log('PLAYER2 WINS');
      return 'Player 2 Wins!'
    } else 
    return 'Boo!! Draw Try Harder!'
  }
}
