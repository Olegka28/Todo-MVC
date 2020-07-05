export default class TodoView {
  constructor(model, container) {
    this.model = model;
    this.container = container;
    this.subcribers = [];

    this.initialRender();
    // this.input.addEventListener('input', )
  }

  subscribe(subscriber) {
    this.subcribers.push(subscriber);
  }

  notify(data) {
    this.subcribers.forEach((cb) => cb(data));
  }

  handleTodoAdd = () => {
    if (this.input.value === "") return;
    this.notify({
      name: this.input.value,
      type: "add",
    });
    this.todoList.append(this.li);
    this.input.value = "";
  };

  handleTodoRemove = (e) => {
    const removeBtn = e.target.closest(".button_remove_item");
    if (removeBtn) {
      this.notify({
        id: Number(removeBtn.closest(".todo_container_items").dataset.id),
        type: "remove",
      });
      removeBtn
        .closest(".todo_container_items")
        .parentElement.removeChild(removeBtn.closest(".todo_container_items"));
    }
  };

  handleTodoChecked = (e) => {
    const checked = e.target.closest(".input_checked");

    if (checked) {
      this.notify({
        id: Number(checked.closest(".todo_container_items").dataset.id),
        type: "checked",
      });

      checked.parentElement.classList.toggle("remove_item");
    }
  };

  handleTodoUpdateName = (e) => {
    const text = e.target.closest(".text_todo");
    this.updateInput = document.createElement("input");
    this.updateBtn = document.createElement("button");
    this.updateState = this.updateState.bind(this);
    if (text) {
      this.updateInput.className = "update_input";
      this.updateInput.setAttribute("type", "text");
      this.updateInput.setAttribute("value", text.textContent);
      this.updateBtn.textContent = "Update";
      this.updateBtn.className = "update_btn";
      text.after(this.updateBtn);
      text.after(this.updateInput);

      this.updateBtn.addEventListener("click", this.updateState);
    }
  };

  updateState = (e) => {
    const updateBtn = e.target.closest(".update_btn");
    if (updateBtn) {
      const inputUpdateOnTodoList = document.querySelector(".update_input");
      const updateBtnOnTodoList = document.querySelector(".update_btn");
      const todoLists = document.querySelectorAll(".todo_container_items");

      todoLists.forEach((todo) => {
        if (
          Number(todo.dataset.id) ===
          Number(updateBtn.closest(".todo_container_items").dataset.id)
        ) {
          todo.children[1].textContent = inputUpdateOnTodoList.value;
          inputUpdateOnTodoList.value = "";
        }
      });

      this.notify({
        id: Number(updateBtn.closest(".todo_container_items").dataset.id),
        name: inputUpdateOnTodoList.value,
        type: "update",
      });
      inputUpdateOnTodoList.remove();
      updateBtnOnTodoList.remove();
    }
  };

  initialRender() {
    this.input = document.createElement("input");
    this.buttonAddItem = document.createElement("button");

    const containerTodoHeader = document.createElement("div");
    const listItem = document.createElement("ul");
    // add atribute and class

    this.input.setAttribute("placeholder", "What need to be done?");
    this.input.className = "container_input";
    this.buttonAddItem.textContent = "Add Item";
    this.buttonAddItem.className = "conteiner_button_add";
    containerTodoHeader.className = "container_header";
    listItem.className = "todo-list";

    // add in divHeader
    containerTodoHeader.append(this.input);
    containerTodoHeader.append(this.buttonAddItem);

    // add in document
    this.container.append(containerTodoHeader);
    this.container.append(listItem);

    this.buttonAddItem.addEventListener("click", this.handleTodoAdd);
    listItem.addEventListener("click", this.handleTodoRemove);
    listItem.addEventListener("click", this.handleTodoChecked);
    listItem.addEventListener("click", this.handleTodoUpdateName);
  }

  render() {
    this.model.getState().forEach((todo) => {
      this.todoList = this.container.querySelector(".todo-list");
      this.li = document.createElement("li");
      this.buttonRemoveItem = document.createElement("button");
      this.textContentInput = document.createElement("p");
      this.checked = document.createElement("input");

      this.li.className = "todo_container_items";
      this.li.setAttribute("data-id", todo.id);

      this.checked.setAttribute("type", "checkbox");
      this.checked.className = "input_checked";
      this.buttonRemoveItem.innerHTML = "&times";
      this.buttonRemoveItem.className = "button_remove_item";
      this.textContentInput.className = "text_todo";
      this.textContentInput.textContent = todo.name;

      this.li.append(this.checked);
      this.li.append(this.textContentInput);
      this.li.append(this.buttonRemoveItem);
      // this.todoList.append(this.li);
    });
  }
}
