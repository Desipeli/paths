import NodeValues from "./resources.js"
import { map, replaceCellsWith, delay, animDelay} from "./resources.js"
import { drawCell, drawGrid, drawMap } from "./canvas.js"
import HeapQ from "./heapq.js"


const initBreadth = async (startPos, endPos) => {
    const condition = (bigger, smaller) => (bigger.dist > smaller.dist)
    const queue = new HeapQ(condition)
    const visited = {}
    startPos = {dist: 0, x: startPos.x, y: startPos.y}
    endPos = {dist: Infinity, x: endPos.x, y: endPos.y}
    const adjList = createAdjList()
    queue.push(startPos)
    const distances = setDistances()
    distances[startPos.y][startPos.x] = 0
    const previous = {}
    await breadth(queue, visited, adjList, distances, previous)
    const path = getShortestPath(previous, startPos, endPos)
    showShortestPath(path)
}

const breadth = async (queue, visited, adjList, distances, previous) => {
    let safety = 0
    let endFound = false
    
    while (!queue.isEmpty()) {
        const newNode = queue.pop()
        if ([newNode.y, newNode.x] in visited) continue
        visited[[newNode.y, newNode.x]] = true

        if (map[newNode.y][newNode.x] == NodeValues.EMPTY) {
            map[newNode.y][newNode.x] = NodeValues.VISITED
        }
        
        drawCell({x: newNode.x, y: newNode.y})
        adjList[[newNode.y, newNode.x]].forEach(edge => {
            const newDist = distances[newNode.y][newNode.x] + 1
            if (newDist < distances[edge.y][edge.x]) {
                previous[[edge.y, edge.x]] = newNode
                distances[edge.y][edge.x] = newDist
                if (map[edge.y][edge.x] == NodeValues.END) {
                    endFound = true
                }
                queue.push({dist: newDist, x: edge.x, y: edge.y})
            }
        })
        if (animDelay > 0) await delay(animDelay)
        if (endFound) break
        if (safety >= 100000) return
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

const showShortestPath = (path) => {
    replaceCellsWith(NodeValues.VISITED, NodeValues.EMPTY)
    drawGrid()
    drawMap()
    for (let i = 0; i < path.length; i++) {
        map[path[i].y][path[i].x] = NodeValues.ROUTE
        console.log(path[i].x, path[i].y)
        drawCell({x: path[i].x, y: path[i].y})
    }
}

const getShortestPath = (previous, startPos, endPos) => {
    const path = []
    let prev = endPos
    let safety = 100000
    while (true) {
        prev = previous[[prev.y, prev.x]]
        if (!prev) break
        path.push({y: prev.y, x: prev.x})
        safety --
        if (safety == 0) break
    }
    path.pop() // pop start
    return path.reverse()
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