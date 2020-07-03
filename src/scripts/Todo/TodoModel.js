export default class TodoModel {
    constructor () {
        this.state = [];
        this.subcribers = [];
    }

    addTodo(item) {
        this.state.push(item);
    }

    deleteTodoById(id) {
        this.state = this.state.filter(item => item.id !== id);
    }

    updateTodo (id, name) {
        const todo = this.state.find(item => item.id === id);
        
        if(todo){
            todo.name = name;
        }
    }

    toggleComplete (id) {
        const todo = this.state.find(item => item.id === id);
        
        if(todo){
            todo.toggle();
        }
    }

    getState() {
        return this.state
    }
}