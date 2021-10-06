class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.location = [0,0];
  }

  attack() {
    return Math.floor(Math.random() * 20)
  }

  move(direction) {
    if (direction == 'right') {this.location[0] += 1 };
    if (direction == 'left') {this.location[0] -= 1};
    if (direction == 'up') {this.location[1] += 1};
    if (direction == 'down') {{this.location[1] -= 1}};
  }
}
