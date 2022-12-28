
export default class HeapQ {
    constructor(condition) {
        this.queue = []
        this.condition = condition
    }

    pop = () => {
        const last = this.queue.pop()
        if (this.queue.length == 0) return last
        const first = this.queue[0]
        this.queue[0] = last
        this.pushDown(0)
        return first
    }

    push = (value) => {
        this.queue.push(value)
        this.pushUp(this.queue.length - 1)
    }
    
    pushUp = (index) => {
        if (index == 0) return
        let parentIndex = Math.floor(((index + 1) / 2) -1)
        if (this.check(this.queue[parentIndex], this.queue[index])) {
            this.swap(index, parentIndex)
            return this.pushUp(parentIndex)
        }
    }
    
    pushDown = (index) => {
        let leftChild = null
        let rightChild = null
        let rightChildIndex = (index + 1) * 2
        let leftChildIndex = (index + 1) * 2 -1
    
        if (this.queue.length <= leftChildIndex) return
    
        if (this.queue.length <= rightChildIndex) {
            leftChild = this.queue[leftChildIndex]
            if (this.check(this.queue[index], leftChild)) {
                this.swap(leftChildIndex, index)
                return this.pushDown(leftChildIndex)
            }
        }
        if (this.queue.length > rightChildIndex) {
            rightChild = this.queue[rightChildIndex]
            leftChild = this.queue[leftChildIndex]
            let swapping = leftChildIndex
            if (this.check(leftChild, rightChild)) swapping = rightChildIndex
            if (this.check(this.queue[index], this.queue[swapping])) {
                this.swap(index, swapping)
                return this.pushDown(swapping)
            }
        }
        return
    }

    swap = (a, b) => {
        let valueA = this.queue[a]
        this.queue[a] = this.queue[b]
        this.queue[b] = valueA
    }

    check = (first, second) => {
        return this.condition(first, second)
    }

    isEmpty = () => {
        if (this.queue.length == 0) return true
        return false
    }
}

// const pop = (queue) => {
//     const last = queue.pop()
//     if (isEmpty) return last
//     const first = queue[0]
//     queue[0] = last
//     pushDown(0)
//     return first
// }

// const pushUp = (index) => {
//     if (index == 0) return
//     let parentIndex = Math.floor(((index + 1) / 2) -1)
//     if (queue[index] < queue[parentIndex]) {
//         swap(index, parentIndex)
//         return pushUp(parentIndex)
//     }
// }

// const pushDown = (index) => {
//     let leftChild = null
//     let rightChild = null
//     let rightChildIndex = (index + 1) * 2
//     let leftChildIndex = (index + 1) * 2 -1

//     if (queue.length < leftChildIndex) return

//     if (queue.length < rightChildIndex) {
//         leftChild = queue[leftChildIndex]
//         if (leftChild < queue[index]) {
//             swap(leftChildIndex, index)
//             return pushDown(leftChildIndex)
//         }
//     }
//     if (queue.length >= rightChildIndex) {
//         rightChild = queue[rightChildIndex]
//         leftChild = queue[leftChildIndex]
//         let swapping = leftChildIndex
//         if (rightChild < leftChild) swapping = rightChildIndex
//         if (queue[swapping] < queue[index]) {
//             swap(index, swapping)
//             return pushDown(swapping)
//         }
//     }
//     return
// }

// const swap = (a, b) => {
//     let valueA = queue[a]
//     queue[a] = queue[b]
//     queue[b] = valueA
// }

// const isEmpty = () => {
//     return queue.length == 0
// }
