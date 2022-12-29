const NodeValues = {
    EMPTY: "0",
    BLOCKED: "1",
    VISITED: "2",
    START: "3",
    END: "4",
    ROUTE: "5"
}

export const cellColorsLight = {
    EMPTY: 'rgb(220, 220, 220)',
    BLOCKED: 'rgb(77, 77, 77)',
    VISITED: 'rgb(0,153,153)',
    START: 'blue',
    END: 'red',
    ROUTE: 'yellow',
    GRID: 'rgb(32, 32, 32)',
}

export const cellColorsDark = {
    EMPTY: 'rgb(150, 150, 150)',
    BLOCKED: 'rgb(0, 0, 0)',
    VISITED: 'rgb(0,220,220)',
    START: 'blue',
    END: 'red',
    ROUTE: 'yellow',
    GRID: 'rgb(32, 32, 32)',
}

export const findNode = (what) => {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map.length; col++) {
            if (map[row][col] == what) {
                return {x: col, y: row, value: what}
            }
        }
    }
    return null
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
            if (map[row][col] == NodeValues.START || map[row][col] == NodeValues.END) continue
            map[row][col] = value
        }
    }
}

export const replaceCellsWith = (replace, value) => {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map.length; col++) {
            if (map[row][col] == replace) map[row][col] = value
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

export let isGrid = true

export const setGrid = () => {
    isGrid = !isGrid
}

export let isLight = true
export const changeLightMode = () => {
    isLight = !isLight
}

export const map = []
export const canvas = document.getElementById("canvas")
export const ctx = canvas.getContext("2d")

export default NodeValues