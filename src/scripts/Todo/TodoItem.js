export default class TodoItem {
    constructor(name, complete = false) {
        this.name = name
        this.complete = complete
        this.id = Math.random()
    }

    toggle() {
        this.complete = !this.complete
    }
}