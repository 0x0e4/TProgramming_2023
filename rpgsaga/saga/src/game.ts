import { Player } from './player';
import { random } from './other';
import { Knight, Archer, Wizard } from './characters';
import { Logger } from './logger';

class PlayerNameGenerator {
    protected static readonly playerNames: string[] = ['Святослав', 'Ярослав', 'Всеслав', 'Гуслинг', 'Счетохвост', 'Зелёный Змий', 'Филосоящер', 'Геннадий Кислютый']

    static getName(lizard: boolean) {
        return lizard ? this.playerNames[random(this.playerNames.length / 2, this.playerNames.length - 1)] : this.playerNames[random(0, this.playerNames.length / 2 - 1)];
    }
}

export class Game {
    protected players: Player[] = []

    constructor(playersCount: number) {
        for (let i = 0; i < playersCount; i++) {
            let player: Player
            let type = random(0, 2)
            let lizard = !random(0, 1)
            switch (type) {
                case 0:
                    player = new Knight(PlayerNameGenerator.getName(lizard))
                    break
                case 1:
                    player = new Wizard(PlayerNameGenerator.getName(lizard))
                    break
                case 2:
                    player = new Archer(PlayerNameGenerator.getName(lizard))
                    break
            }
            player.lizard = lizard
            this.players.push(player)
        }

        Logger.start(this.players)
    }

    start() {
        let alivePlayers = this.players
        let count = 1
        let enemy: Player
        while (alivePlayers.length > 1) {
            let alive: Player[] = []
            console.log(`Кон ${count}.`)
            for (let i = 0; i < Math.floor(alivePlayers.length / 2); i++) {
                enemy = alivePlayers[Math.floor(alivePlayers.length / 2) + i]
                alivePlayers[i].refresh()
                enemy.refresh()

                let alivedPlayer = this.fight(alivePlayers[i], enemy);
                alive.push(alivedPlayer)
                console.log()
            }
            if (alivePlayers.length % 2 == 1) alive.push(alivePlayers[alivePlayers.length - 1])
            alivePlayers = alive
            count += 1
        }

        Logger.end(alivePlayers[0])
    }

    fight(player1: Player, player2: Player) {
        Logger.fight(player1, player2)
        player1.enemy = player2
        player2.enemy = player1
        let attackingPlayer = player1
        while (player1.health > 0 && player2.health > 0) {
            if (attackingPlayer.skipRound) {
                Logger.skipRound(attackingPlayer)
                attackingPlayer.skipRound = false
            } else {
                if (attackingPlayer.isAbilityReady()) {
                    let damage = attackingPlayer.ability()
                    Logger.cast(attackingPlayer, attackingPlayer.enemy, damage)
                    if (attackingPlayer.enemy.health <= 0) {
                        Logger.death(attackingPlayer.enemy)
                        return attackingPlayer
                    }
                } else {
                    let damage = attackingPlayer.attack()
                    Logger.attack(attackingPlayer, attackingPlayer.enemy, damage)
                    if (attackingPlayer.enemy.health <= 0) {
                        Logger.death(attackingPlayer.enemy)
                        return attackingPlayer
                    }
                }
            }
            if (attackingPlayer.damageTick > 0 && attackingPlayer.ticksOfDamage > 0) {
                attackingPlayer.health -= attackingPlayer.damageTick
                attackingPlayer.ticksOfDamage--
                Logger.ticked(attackingPlayer)
                if (attackingPlayer.health <= 0) {
                    Logger.death(attackingPlayer)
                    return attackingPlayer.enemy
                }
            }

            attackingPlayer = attackingPlayer.enemy
        }
    }
}