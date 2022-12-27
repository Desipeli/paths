import NodeValues from "./resources.js"
import { map, fillMapWith, randomElementFromArray, randomInt, delay, animDelay} from "./resources.js"
import { drawCell, drawGrid } from "./canvas.js"

let cycles = false
let cycleProbability = 0 // 0-1

const initKDMaze = (isCycles = false, probability = 0) => {
    cycles = isCycles
    cycleProbability = probability / 100

    if (map.length % 2 == 0) return null
    const spawns = []
    fillMapWith(NodeValues.BLOCKED)
    const startPos = randomStart()
    map[startPos.y][startPos.x] = NodeValues.EMPTY
    drawGrid()
    spawns.push(startPos)
    start(spawns)
}

const randomStart = () => {
    let startY = randomInt(0, map.length - 3)
    let startX = randomInt(0, map.length - 3)
    if (startX % 2 == 0) startX += 1
    if (startY % 2 == 0) startY += 1
    return {x: startX, y: startY}
}

const start = async (spawns) => {
    let i = 0
    while (spawns.length > 0) {
        if (i == 100000) break
        const node = spawns.pop()
        const directions = checkDirections(node)
        if (directions.length == 0) continue
        const direction = randomElementFromArray(directions)
        if (directions.length > 1) spawns.push(node)
        await drill(node, direction, spawns, cycles)
        i++
    }
}

const drill = async (node, direction, spawns) => {
    let i = 1
    const size = map.length
    let nextEmpty = false
    while (i < 6) {
        let newX = node.x + direction.x * 2 * i
        let newY = node.y + direction.y * 2 * i

        if (newY > size -2 || newY < 1 || newX > size - 2 || newX < 1) break
        if (map[newY][newX] != NodeValues.BLOCKED) {
            nextEmpty = true
            break
        }

        i++
    }


    let distance = randomInt(1, i-1)
    if (cycles && nextEmpty && Math.random() < cycleProbability) distance = i
    

    for (let j = 1; j <= distance * 2; j++) {
        let newX = node.x + direction.x * j
        let newY = node.y + direction.y * j
        
        if (animDelay > 0) await delay(animDelay)

        if (map[newY][newX] == NodeValues.BLOCKED) {
            map[newY][newX] = NodeValues.EMPTY
            drawCell({x: newX, y: newY})
        }
        if (j % 2 == 0) spawns.push({x: newX, y: newY})
    }
}

const checkDirections = (node) => {
    // Palautetaan mahdolliset suunnat
    const possibleDirections = []
    const size = map.length
    if (node.x < size - 2 && map[node.y][node.x + 2] == NodeValues.BLOCKED) {
        possibleDirections.push({x: 1, y: 0})
    }
    if (node.x > 2 && map[node.y][node.x - 2] == NodeValues.BLOCKED) {
        possibleDirections.push({x: -1, y: 0})
    }
    if (node.y < size - 2 && map[node.y + 2][node.x] == NodeValues.BLOCKED) {
        possibleDirections.push({x: 0, y: 1})
    }
    if (node.y > 2 && map[node.y - 2][node.x] == NodeValues.BLOCKED) {
        possibleDirections.push({x: 0, y: -1})
    }

    return possibleDirections
}

export default initKDMaze