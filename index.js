import { map, setAnimationDelay} from "./resources.js"
import { initGrid, cursorCanvas,  } from "./canvas.js"
import initKDMaze from "./KoreDessuMaze.js"



const initProgram = () => {
    initGrid(10)
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

    const btnNewKoDeMaze = document.getElementById('btn-new-kode')
    btnNewKoDeMaze.addEventListener('click', () => {
        if (map.length % 2 == 0) {
            alert("Grid size must be uneven")
            return
        }
        let answer = confirm(`Do you want to create new ${map.length} x ${map.length} maze? Current map will be deleted`)
        if (answer) {
            initKDMaze()
        }
    })

    const animationDelayInput = document.getElementById('animation-delay')
    setAnimationDelay(animationDelayInput.value)
    animationDelayInput.addEventListener('change', () => {
        setAnimationDelay(animationDelayInput.value)
    })
}


export default initProgram