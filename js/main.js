//Constants
const TODO = "todo";
const DONE_TODO = "completed";
const SLICE_STEP = 1;

//Global functions
const domSel = (ele) => {
    return document.querySelector(ele);
}

import {Todo} from '../models/Todo.js';
import {TodoList} from '../models/TodoList.js';

let todoList = new TodoList();
todoList.renderList("#todo");
let doneList = new TodoList();
doneList.renderList("#completed");

//Render todo list
const getTodoList = () => {
    let content = domSel("#newTask").value;
    if (content.trim() === '') {
        return alert('The input content is empty! Please input the content first!');
    }
    for (let item of todoList.list) {
        if (item.content === content.trim()) {
            return alert('The input content is already exited!');
        }
    }
    for (let item of doneList.list) {
        if (item.content === content.trim()) {
            return alert('The input content is already exited!');
        }
    }
    let status = TODO;
    let td = new Todo(content, status);
    todoList.addAnItem(td);
}

domSel("#addItem").onclick = () => {
    getTodoList();
    todoList.renderList("#todo");
    domSel("#newTask").value = '';
}

//Delete an item
const deleteItem = (e) => {
    let getIndex = e.currentTarget.getAttribute("data-index");
    let getStatus = e.currentTarget.getAttribute("data-status");
    if (getStatus === TODO) {
        todoList.removeAnItem(getIndex);
        todoList.renderList("#todo");
    } else if (getStatus === DONE_TODO) {
        doneList.removeAnItem(getIndex);
        doneList.renderList("#completed");
    } else {
        return alert('Check data-status content!');
    }
    
}

window.deleteItem = deleteItem;

//Change status of an item
const changeItemStatus = (e) => {
    let getIndex = e.currentTarget.getAttribute("data-index");
    let getStatus = e.currentTarget.getAttribute("data-status");

    if (getStatus === TODO) {
        let slicedArr = todoList.list.slice(getIndex, getIndex + SLICE_STEP);
        let itemNew = new Todo(slicedArr[0].content, DONE_TODO);
        todoList.removeAnItem(getIndex);
        doneList.addAnItem(itemNew);
        todoList.renderList("#todo");
        doneList.renderList("#completed");
    } else if (getStatus === DONE_TODO) {
        let slicedArr = doneList.list.slice(getIndex, getIndex + SLICE_STEP);
        let itemNew = new Todo(slicedArr[0].content, TODO);
        doneList.removeAnItem(getIndex);
        todoList.addAnItem(itemNew);
        todoList.renderList("#todo");
        doneList.renderList("#completed");
    } else {
        return alert('Check data-status content!');
    }
}

window.changeItemStatus = changeItemStatus;

//Sort todo list
const sortASC = () => {
    todoList.sortList(true);
    todoList.renderList("#todo");
}

window.sortASC = sortASC;

const sortDES = () => {
    todoList.sortList(false);
    todoList.renderList("#todo");
}

window.sortDES = sortDES;