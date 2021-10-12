class Turn {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.p1Attack = new Object;
    this.p2Attack = new Object;
    this._judge();
  }

  outcome() {
    let p1CritString = this.p1Attack.crit ? "CRITICAL HIT! " : ""
    let p2CritString = this.p2Attack.crit ? "CRITICAL HIT! " : ""

    let p1AttackString;
    let p2AttackString;

    if (!this.p1Attack.dodged) {
      p1AttackString = `${p1CritString}${this.player1.name} dealt ${this.p1Attack.totalDamage} damage to ${this.player2.name}!`
    } else {
      p1AttackString = `${this.player2.name} dodged ${this.player1.name}'s attack!`
    }

    if (!this.p2Attack.dodged) {
      p2AttackString = `${p2CritString}${this.player2.name} dealt ${this.p2Attack.totalDamage} damage to ${this.player1.name}!`
    } else {
      p2AttackString = `${this.player1.name} dodged ${this.player2.name}'s attack!`
    }

    return `${p1AttackString}\n${p2AttackString}`
  }

  _judge() {
    this.p1Attack.baseDamage = this._attack(Config.baseMinAttack, Config.baseMaxAttack);
    this.p2Attack.baseDamage = this._attack(Config.baseMinAttack, Config.baseMaxAttack);

    // Judge player 1 move

    if (Math.random() > Config.dodgeChance) {
      this.p1Attack.dodged = false;

      if (Math.random() < Config.critChance) {
        this.p1Attack.crit = true;
        this.p1Attack.totalDamage = this.p1Attack.baseDamage * Config.critAttackMultiplier;
        this.player2.takeHit(this.p1Attack.totalDamage);
      }
      else {
        this.p1Attack.crit = false;
        this.p1Attack.totalDamage = this.p1Attack.baseDamage;
        this.player2.takeHit(this.p1Attack.baseDamage);
      }
    } else {
      this.p1Attack.dodged = true;
      this.p1Attack.totalDamage = this.p1Attack.baseDamage;
    }

    // Judge player 2 move

    if (Math.random() > Config.dodgeChance) {
      this.p2Attack.dodged = false;

      if (Math.random() < Config.critChance) {
        this.p2Attack.totalDamage = this.p2Attack.baseDamage * Config.critAttackMultiplier;
        this.p2Attack.crit = true
        this.player1.takeHit(this.p2Attack.baseDamage * Config.critAttackMultiplier)
      } else {
        this.p2Attack.crit = false
        this.p2Attack.totalDamage = this.p2Attack.baseDamage;
        this.player1.takeHit(this.p2Attack.baseDamage);
      }
    } else {
      this.p2Attack.dodged = true;
      this.p2Attack.totalDamage = this.p2Attack.baseDamage;
    }
  }

  _attack(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  } 
}
