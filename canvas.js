import NodeValues from "./resources.js"
import { canvas, ctx, map } from "./resources.js"

let cellSize = 0
let cellsPerRow = 0
let lineWidth = 1.5

let mouseDown = 0
let previousMousePosGrid = {x: null, y: null}
let painting = null

export const initGrid = (size = 50) => {
    // Alustetaan kartta ja arvot pojan piirtämistä varten
    map.length = 0
    cellsPerRow = size
        for (let i = 0; i < cellsPerRow ; i += 1) {
            const row = []
            for (let j = 0; j < cellsPerRow; j += 1) {
                    row.push(NodeValues.EMPTY)
            }
            map.push(row)
        }
    drawGrid()
}

export const drawGrid = () => {
    // Piirretään pohjas
    ctx.canvas.height = Math.min(window.innerWidth - 15, window.innerHeight - 15)
    ctx.canvas.width = canvas.height
    ctx.lineWidth = lineWidth
    cellSize = (canvas.height / cellsPerRow) - ctx.lineWidth / cellsPerRow

    // sarakkeet
    for (let i = 0; i <= cellsPerRow; i += 1) {
        ctx.moveTo(ctx.lineWidth/2 + i * cellSize , 0);
        ctx.lineTo(ctx.lineWidth/2 + i * cellSize , canvas.height) 
    }
        // rivit
    for (let i = 0; i <= cellsPerRow; i += 1) {
        ctx.moveTo(0,ctx.lineWidth/2 + i * cellSize) // rivi vase
        ctx.lineTo(canvas.height, ctx.lineWidth/2 + i * cellSize ) // rivi oikea
    }
    ctx.strokeStyle = "grey"
    ctx.stroke()
    drawMap()
}

export const drawMap = () => {
    // Maalataan kartta
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map.length; column++) {
            drawCell({x: column, y: row})
        }
    }
    ctx.stroke()
}

export const drawCell = (pos) => {
    // Piirrä yksittäinen solu
    if (map[pos.y][pos.x] == NodeValues.EMPTY) {
        ctx.fillStyle = 'green'
    } else if (map[pos.y][pos.x] == NodeValues.BLOCKED) {
        ctx.fillStyle = 'black'
    } else if (map[pos.y][pos.x] == NodeValues.START) {
        ctx.fillStyle = 'blue'
    } else if (map[pos.y][pos.x] == NodeValues.END) {
        ctx.fillStyle = 'pink'
    }
    ctx.fillRect(pos.x * cellSize + lineWidth, pos.y * cellSize + lineWidth, cellSize - lineWidth, cellSize- lineWidth)
}

export const getMousePosCanvas = ( event) => {
    // Haetaan kursorin koordinaatit canvaksessa
    var box = canvas.getBoundingClientRect()
    return {
        x: event.clientX - box.left,
        y: event.clientY - box.top
    }
}

export const getMousePosGrid = (event) => {
    // Haetaan tieto, minkä solun kohdalla kursori on
    var rect = canvas.getBoundingClientRect()
    return {
        // Jostain syystä menee välillä yhdellä yli reunasta, siksi min
        x: Math.min(Math.floor((event.clientX - rect.left) / cellSize), cellsPerRow - 1),
        y: Math.min(Math.floor((event.clientY - rect.top) / cellSize), cellsPerRow - 1)
    }
}

export const cursorCanvas = () => {
    // kursori ja canvas
    canvas.addEventListener('mousedown', (event) => {
        mouseDown++
        let pos = getMousePosCanvas(event)
        pos = getMousePosGrid(event)
        drawGrid(localStorage.getItem('rectPerRow'))
        paintGrid(event, pos)
    })

    canvas.addEventListener('mouseup', (event) => {
        mouseDown = 0
        previousMousePosGrid = {x: null, y: null}
        painting = null
    })

    canvas.addEventListener('mousemove', (event) => {
        let pos = getMousePosGrid(event)
        paintGrid(event, pos)
    })
}


const paintGrid = (event, location) => {
    // Maalataan karttaa
    if (mouseDown <= 0 ) return
    if (previousMousePosGrid.x == location.x & previousMousePosGrid.y == location.y) return
    previousMousePosGrid = location
    
    const value = map[location.y][location.x]
    if (painting == null) { // Valitaan mitä maalataan
        if (value == NodeValues.BLOCKED) {
            painting = NodeValues.EMPTY
        } else if (value == NodeValues.EMPTY) {
            painting = NodeValues.BLOCKED
        }
    }
    // Maalataan
    
    if (map[location.y][location.x] == painting) return
    map[location.y][location.x] = painting
    
    drawCell(location)
}

window.onresize = () => {
    // Piirretään uudestaan aina kun ikkunan koko muuttuu
    drawGrid()
}