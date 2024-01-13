import { Player } from './player';

export class Knight extends Player {
    constructor(name: string, t: number = 0) {
        super(name, t);
    }

    ability(): number {
        this.enemy.health -= this.damage * 1.3;
        return this.damage * 1.3;
    }

    getAbilityName(): string {
        return this.lizard ? "Удар ящера" : "Гойда!";
    }

    getTypeName(): string {
        return 'Рыцарь';
    }
}

export class Wizard extends Player {
    constructor(name: string, t: number = 1) {
        super(name, t);
    }

    ability(): number {
        this.enemy.skipRound = true;
        this.enemy.health -= this.damage;
        return this.damage;
    }

    getAbilityName(): string {
        return this.lizard ? "Ящерская уловка" : "Военная хитрость";
    }

    getTypeName(): string {
        return 'Маг';
    }
}

export class Archer extends Player {
    constructor(name: string, t: number = 2) {
        super(name, t);
    }

    ability(): number {
        this.usedAbility = true;
        this.enemy.damageTick = 2;
        this.enemy.ticksOfDamage = 5;
        let damage = Math.floor(this.damage / 2)
        this.enemy.health -= damage;
        return damage;
    }

    getAbilityName(): string {
        return this.lizard ? "Подлый выстрел" : "Славянский прострел сундука";
    }

    getTypeName(): string {
        return 'Лучник';
    }
}