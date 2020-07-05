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

             if(type === 'checked') {
                 this.model.toggleComplete(id);
             }
             
             if(type === 'update') {
                //  debugger
                 this.model.updateTodo(id, name)
                //  this.model.addTodo(new TodoItem(name))
                //  this.model.deleteTodoById(id);
             }

             this.view.render()
        })
        this.view.render()
    }

}