import NodeValues from "./resources.js"
import { map, replaceCellsWith, delay, animDelay} from "./resources.js"
import { drawCell, drawMap } from "./canvas.js"
import HeapQ from "./heapq.js"


const initBreadth = async (startPos, endPos, showEveryStep = false) => {
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

    const startTime = performance.now()
    await breadth(queue, visited, adjList, distances, previous)
    console.log(`Pathfinding took ${performance.now() - startTime} ms`)
    const path = getShortestPath(previous, startPos, endPos, showEveryStep)
    showShortestPath(path)
}

const breadth = async (queue, visited, adjList, distances, previous, showEveryStep) => {
    let safety = 0
    let endFound = false
    let previousDistance = 1
    
    while (!queue.isEmpty()) {
        const node = queue.pop()

        // Animation
        if (animDelay > 0) {
            if (showEveryStep) await delay(animDelay)
            else {
                if (previousDistance < distances[node.y][node.x]) {
                    await delay(animDelay)
                    previousDistance = distances[node.y][node.x]
                }
            }
        } // animation end

        if ([node.y, node.x] in visited) continue
        visited[[node.y, node.x]] = true

        if (map[node.y][node.x] == NodeValues.EMPTY) {
            map[node.y][node.x] = NodeValues.VISITED
        }
        
        drawCell({x: node.x, y: node.y})
        adjList[[node.y, node.x]].forEach(edge => {
            const newDist = distances[node.y][node.x] + 1
            if (newDist < distances[edge.y][edge.x]) {
                previous[[edge.y, edge.x]] = node
                distances[edge.y][edge.x] = newDist
                if (map[edge.y][edge.x] == NodeValues.END) {
                    endFound = true
                }
                queue.push({dist: newDist, x: edge.x, y: edge.y})
            }
        })
        

        
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
    drawMap()
    for (let i = 0; i < path.length; i++) {
        map[path[i].y][path[i].x] = NodeValues.ROUTE
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