import { map, setAnimationDelay} from "./resources.js"
import { initGrid, cursorCanvas,  } from "./canvas.js"
import initKDMaze from "./koreDessuMaze.js" // Does this update??


const initProgram = () => {
    initGrid(21)
    cursorCanvas()

    listeners()
    
}

const listeners = () => {
    const btnNewGrid = document.getElementById('btn-new-grid')
    const input = document.getElementById('grid-size')
    btnNewGrid.addEventListener('click', () => {
        const value = Math.max(Math.min(300, input.value), 1)
        let answer = confirm(`Do you want to create new ${value} x ${value} grid? Current will be deleted`)
        if (answer) {
            initGrid(value)
        }
    })


    const isCycles = document.getElementById('cycles')
    const probability = document.getElementById('cycles-p')
    const btnNewKoDeMaze = document.getElementById('btn-new-kode')
    btnNewKoDeMaze.addEventListener('click', () => {
        let value = map.length
        if (map.length % 2 == 0) {
            value += 1
        }
        let answer = confirm(`Do you want to create new ${value} x ${value} maze? Current map will be deleted`)
        if (answer) {
            console.log(isCycles.checked)
            initGrid(value)
            initKDMaze(isCycles.checked, Math.max(Math.min(100, probability.value), 0))
        }
    })

    const animationDelayInput = document.getElementById('animation-delay')
    setAnimationDelay(animationDelayInput.value)
    animationDelayInput.addEventListener('change', () => {
        setAnimationDelay(animationDelayInput.value)
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