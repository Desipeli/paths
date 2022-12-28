import NodeValues from "./resources.js"
import { map, fillMapWith, randomElementFromArray, randomInt, delay, animDelay} from "./resources.js"
import { drawCell, drawGrid, drawMap } from "./canvas.js"
import HeapQ from "./heapq.js"


const initBreadth = () => {
    const condition = (bigger, smaller) => (bigger.dist > smaller.dist)
    const queue = new HeapQ(condition)
    const visited = {}
    const startPos = {dist: 0, x: 1, y: 1}
    const endPos = {dist: Infinity, x: map.length -2, y: map.length -2}
    const adjList = createAdjList()
    queue.push(startPos)
    const distances = setDistances()
    distances[startPos.y][startPos.x] = 0
    breadth(queue, visited, adjList, distances)
}

const breadth = async (queue, visited, adjList, distances) => {
    let safety = 0
    
    while (!queue.isEmpty()) {
        const newNode = queue.pop()
        if ([newNode.y, newNode.x] in visited) continue
        visited[[newNode.y, newNode.x]] = true

        if (map[newNode.y][newNode.x] == NodeValues.EMPTY) {
            map[newNode.y][newNode.x] = NodeValues.VISITED
        }
        await delay(animDelay)
        drawCell({x: newNode.x, y: newNode.y})
        adjList[[newNode.y, newNode.x]].forEach(edge => {
            const newDist = newNode.dist + 1
            if (newDist < distances[edge.y][edge.x]) {
                distances[edge.y][edge.x] = newDist
                queue.push({dist: newDist, x: edge.x, y: edge.y})
            }
        })
        if (safety >= 10000) return
        safety++
    }
}

const setDistances = () => {
    const dists = []
    for (let i = 0; i < map.length; i++) {
        dists.push([])
        for (let j = 0; j < map.length; j++) {
            dists[i][j] = Infinity
        }
    }
    return dists
}

const createAdjList = () => {
    const adjList = {}
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            adjList[[i, j]] = getAdjCells({x: j, y: i})
        }
    }
    return adjList
}

const getAdjCells = (cell) => {
    const connections = []
    // Right left Up Down
    if (cell.x < map.length - 1 && map[cell.y][cell.x + 1] != NodeValues.BLOCKED) connections.push({dist: Infinity, x: cell.x + 1, y: cell.y})
    if (cell.x > 0 && map[cell.y][cell.x - 1] != NodeValues.BLOCKED) connections.push({dist: Infinity, x: cell.x - 1, y: cell.y})
    if (cell.y > 0 && map[cell.y - 1][cell.x] != NodeValues.BLOCKED) connections.push({dist: Infinity, x: cell.x, y: cell.y - 1})
    if (cell.y < map.length - 1 && map[cell.y + 1][cell.x] != NodeValues.BLOCKED) connections.push({dist: Infinity, x: cell.x, y: cell.y + 1})
    return connections
}

export default initBreadth