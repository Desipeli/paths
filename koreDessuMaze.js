import NodeValues from "resources.js"
import { map, fillMapWith, randomElementFromArray, randomInt, delay, animDelay} from "resources.js"
import { drawCell, drawGrid } from "canvas.js"


const initKDMaze = () => {
    if (map.length % 2 == 0) return null
    const spawns = []
    fillMapWith(NodeValues.BLOCKED)
    map[1][1] = NodeValues.EMPTY
    drawGrid()
    spawns.push({x: 1, y: 1})
    start(spawns)
}

const start = async (spawns,) => {
    let i = 0
    while (spawns.length > 0) {
        if (i == 100000) break
        const node = spawns.pop()
        const directions = checkDirections(node)
        if (directions.length == 0) continue
        const direction = randomElementFromArray(directions)
        if (directions.length > 1) spawns.push(node)
        await drill(node, direction, spawns)
        i++
    }
}

const drill = async (node, direction, spawns) => {
    let i = 1
    const size = map.length
    while (i < 6) {
        let newX = node.x + direction.x * 2 * i
        let newY = node.y + direction.y * 2 * i

        if (newY > size -2 || newY < 1 || newX > size - 2 || newX < 1) break
        if (map[newY][newX] != NodeValues.BLOCKED) break

        i++
    }
    const distance = randomInt(1, i-1)
    

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