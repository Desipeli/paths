import NodeValues, { canvas, map, setAnimationDelay, findNode} from "./resources.js"
import { initGrid, cursorCanvas, drawGrid, drawMap, drawCell,  } from "./canvas.js"
import initKDMaze from "./koreDessuMaze.js" // Does this update??
import initBreadth from "./breadth.js"


const initProgram = () => {
    disableContextMenu()
    initGrid(21)
    cursorCanvas()

    listeners()
    //
}

const listeners = () => {
    const btnNewGrid = document.getElementById('btn-new-grid')
    const input = document.getElementById('grid-size')
    btnNewGrid.addEventListener('click', () => {
        const value = Math.max(Math.min(300, input.value), 1)
        // let answer = confirm(`Do you want to create new ${value} x ${value} grid? Current will be deleted`)
        // if (answer) {
            initGrid(value)
        // }
    })

    const btnBreadth = document.getElementById('btn-breadth')
    btnBreadth.addEventListener('click', () => {
        let startPos = findNode(NodeValues.START)
        if (!startPos) {
            // Find first empty node
            for (let row = 0; row < map.length; row++) {
                for (let col = 0; col < map.length; col++) {
                    if (map[row][col] == NodeValues.EMPTY) {
                        map[row][col] = NodeValues.START
                        startPos = {y: row, x: col}
                        break
                    }
                }
                if (startPos) break
            }
        }
        let endPos = findNode(NodeValues.END)
        if (!endPos) {
            for (let row = map.length -1; row >= 0; row--) {
                for (let col = map.length -1; col >= 0; col--) {
                    if (map[row][col] == NodeValues.EMPTY) {
                        map[row][col] = NodeValues.END
                        endPos = {y: row, x: col}
                        break
                    }
                } 
                if (endPos) break
            }
        }
        drawCell(startPos)
        drawCell(endPos)
        initBreadth(startPos, endPos)
    })

    const isCycles = document.getElementById('cycles')
    const probability = document.getElementById('cycles-p')
    const btnNewKoDeMaze = document.getElementById('btn-new-kode')
    btnNewKoDeMaze.addEventListener('click', () => {
        let startPos = findNode(NodeValues.START)
        let value = map.length
        if (map.length % 2 == 0) {
            value += 1
        }
        // let answer = confirm(`Do you want to create new ${value} x ${value} maze? Current map will be deleted`)
        // if (answer) {
            console.log(isCycles.checked)
            
            initGrid(value)
            initKDMaze(isCycles.checked, Math.max(Math.min(100, probability.value), 0) / 100, startPos)
        // }
    })

    const animationDelayInput = document.getElementById('animation-delay')
    setAnimationDelay(animationDelayInput.value)
    animationDelayInput.addEventListener('change', () => {
        setAnimationDelay(animationDelayInput.value)
    })
}

const disableContextMenu = () => {
    canvas.addEventListener('contextmenu', (event) => {
        if (event.button == 2) {
            event.preventDefault()
        }
    })
}

export default initProgram


// Ehkä joskus 
// let opened = window.open("")
// opened.document.write('[')
// for (let i= 0; i < map.length; i++) {
//     opened.document.write(`[${map[i]}],`)
//     }
// opened.document.write(']')