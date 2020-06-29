import '../styles/index.scss';
import TodoView from './Todo/TodoView';
import TodoModel from './Todo/TodoModel';
import TodoControler from './Todo/TodoControler';

const model = new TodoModel();
const view = new TodoView(
    model,
    document.querySelector('.app-todo')
);
const controler = new TodoControler(model, view);

console.log(controler);
