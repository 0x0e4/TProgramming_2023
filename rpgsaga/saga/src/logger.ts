import { Player } from "./player";

export class Logger {

    static start(players: Player[]) {
        console.log("В игре участвуют:")
        for (let i = 0; i < players.length; i++)
            console.log((players[i].lizard ? "Ящер" : "Рус") + ` (${players[i].getTypeName()}) ${players[i].name} [${players[i].maxHealth}/${players[i].damage}]`)
        console.log()
    }

    static fight(player1: Player, player2: Player) {
        console.log(`(${player1.getTypeName()}) ${player1.name} vs (${player2.getTypeName()}) ${player2.name}`)
    }

    static attack(player1: Player, player2: Player, damage: number) {
        console.log(`(${player1.getTypeName()}) ${player1.name} наносит урон ${damage} противнику (${player2.getTypeName()}) ${player2.name}`)
    }

    static cast(player1: Player, player2: Player, damage: number) {
        console.log(`(${player1.getTypeName()}) ${player1.name} использует (${player1.getAbilityName()}) и наносит урон ${damage} противнику (${player2.getTypeName()}) ${player2.name}`)
    }

    static skipRound(player: Player) {
        console.log(`(${player.getTypeName()}) ${player.name} пропускает ход`)
    }

    static death(player: Player) {
        console.log(`(${player.getTypeName()}) ${player.name} погибает`)
    }

    static ticked(player: Player) {
        console.log(`(${player.getTypeName()}) ${player.name} получает ${player.damageTick} урона от горения`)
    }

    static end(player: Player) {
        if (player.lizard)
            console.log(`Подлые ящеры одержали победу... Ящер (${player.getTypeName()}) ${player.name} выжил на поле боя.`)
        else
            console.log(`Русы победили! Гойда, братья и сёстры! В этой битве устоял (${player.getTypeName()}) ${player.name}`)
    }
}