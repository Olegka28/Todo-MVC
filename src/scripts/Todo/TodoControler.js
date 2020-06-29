import TodoItem from './TodoItem';

export default class TodoControler {
    constructor (model, view) {
        this.model = model
        this.view = view

        this.view.subscribe(({name, type, id}) => {
            if(type === 'add') {
                // debugger
                this.model.addTodo(new TodoItem(name))
            }

            if(type === 'remove') {
                // debugger
                this.model.deleteTodoById(id);
             }
             this.view.render()
        }) 

        this.view.render()
    }

}