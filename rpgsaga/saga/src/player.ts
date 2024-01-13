import { random } from './other';

export abstract class Player {
    maxHealth: number
    health: number
    damage: number
    lizard: boolean
    skipRound: boolean
    damageTick: number = 0
    ticksOfDamage: number = 0
    name: string
    type: number
    enemy: Player
    usedAbility: boolean

    constructor(name: string, t: number) {
        this.maxHealth = random(10, 30);
        this.health = this.maxHealth;
        this.damage = random(3, 7);
        this.name = name;
        this.type = t;
    }

    attack(): number {
        this.enemy.health -= this.damage;
        return this.damage;
    }

    refresh() {
        this.damageTick = 0;
        this.ticksOfDamage = 0;
        this.skipRound = false;
        this.usedAbility = false;
        this.health = this.maxHealth;
    }

    isAbilityReady(): boolean {
        return (this.type != 2 || !this.usedAbility) && !random(0, 1);
    }

    abstract ability(): number;
    abstract getAbilityName(): string;
    abstract getTypeName(): string;
}