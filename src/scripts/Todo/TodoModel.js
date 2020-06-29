export default class TodoModel {
    constructor () {
        this.state = [];
        this.subcribers = [];
    }

    subscribe(subscriber) {
        this.subcribers.push(subscriber);
    }

    notify() {
        this.subcribers.forEach(cb => cb(this.getState()));
    }

    addTodo(item) {
        this.state.push(item);
        this.notify()
    }

    deleteTodoById(id) {
        this.state = this.state.filter(item => item.id !== id);
        this.notify()
    }

    updateTodo (id, name) {
        const todo = this.state.find(item => item.id === id);
        
        if(todo){
            todo.name = name;
            this.notify()
        }
    }

    toggleComplete (id) {
        const todo = this.state.find(item => item.id === id);
        
        if(todo){
            todo.toggle();
            this.notify()
        }
    }

    getState() {
        return this.state
    }
}