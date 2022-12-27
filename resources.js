const NodeValues = {
    EMPTY: "0",
    BLOCKED: "X",
    VISITED: "V",
    START: "S",
    END: "E"
}

export const cellColors = {
    EMPTY: 'rgb(69,146,64)',
    BLOCKED: 'rgb(11, 11, 11)',
    VISITED: 'white',
    START: 'blue',
    END: 'pink',
    GRID: 'rgb(32, 32, 32)'
}

export const findNode = (what) => {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map.length; col++) {
            if (map[row][col] == what) {
                return {x: col, y: row, value: what}
            }
        }
    }
}

export const randomElementFromArray = (array) => {
    return array[Math.floor(Math.random()*array.length)]
}

export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export const fillMapWith = (value) => {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map.length; col++) {
            map[row][col] = value
        }
    }
}

export const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

export let animDelay = 0

export const setAnimationDelay = (time) => {
    animDelay = time
}

export const map = []
export const canvas = document.getElementById("canvas")
export const ctx = canvas.getContext("2d")

export default NodeValues