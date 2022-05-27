let todos_ls = localStorage.getItem('todos_ls') ? JSON.parse(localStorage.getItem('todos_ls')) : [];
const todos = document.querySelectorAll('.todo');
const allStatus = document.querySelectorAll('.status');
let draggableTodo = null;

todos.forEach((todo) => {

    todo.addEventListener('dragstart', dragStart);
    todo.addEventListener('dragend', dragEnd);

});

function dragStart() {
    
    draggableTodo = this;

};

function dragEnd() {

    draggableTodo = null;

};

allStatus.forEach((status) => {

    status.addEventListener('dragover', dragOver);
    status.addEventListener('drop', dragDrop);

});

function dragOver(e) {

    e.preventDefault();

};

function dragDrop() {

    this.appendChild(draggableTodo);
    let tempText = JSON.stringify(draggableTodo.innerText);
    tempText = tempText.substring(1, tempText.length - 4);

    let tempTodo = todos_ls.filter(todo => todo.text == tempText);
    todos_ls = todos_ls.filter(todo => todo.text !== tempText);

    tempTodo[0].status = this.classList[1];
    
    todos_ls.push({
        id: tempTodo[0].id,
        text: tempTodo[0].text,
        status: `.${tempTodo[0].status}`
    });

    localStorage.setItem('todos_ls', JSON.stringify(todos_ls));

}

const btns = document.querySelectorAll('[data-target]');
const close_modals = document.querySelectorAll('.modal__close');

btns.forEach((btn) => {

    btn.addEventListener('click', () => {

        document.querySelector(btn.dataset.target).classList.add("active");

    });

});

close_modals.forEach((btn) => {

    btn.addEventListener('click', () => {

        const modal = btn.closest('.modal');
        modal.classList.remove('active');

    });

});

const submit = document.querySelector('.modal__submit');
const no_status = document.querySelector('.todoContainer__status--noStatus');

submit.addEventListener('click', () => {
    createTodo();
    document.querySelector('.modal__input').value = '';
});

function loadTodos() {

    for (let i = 0; i < todos_ls.length; i++) {

        const todo_div = document.createElement('div');
        const input_value = todos_ls[i].text;
        const text = document.createTextNode(input_value);

        todo_div.appendChild(text);
        todo_div.classList.add('status__todo');
        todo_div.classList.add('todo');
        todo_div.setAttribute('draggable', 'true');

        const span = document.createElement('span');
        const span_text = document.createTextNode('\u00D7');
        span.classList.add('todo__close');
        span.appendChild(span_text);

        todo_div.appendChild(span);

        const appendStatus = document.querySelector(`${todos_ls[i].status}`);
        appendStatus.appendChild(todo_div);

        todo_form.classList.remove('active');

        todo_div.addEventListener('dragstart', dragStart);
        todo_div.addEventListener('dragend', dragEnd);
    
    }

    const close_btns = document.querySelectorAll('.todo__close');

    close_btns.forEach((btn) => {

        btn.addEventListener('click', () => {

            const todo_div = btn.parentElement;

            let tempText = JSON.stringify(todo_div.innerText);
            tempText = tempText.substring(1, tempText.length - 4);
            
            todos_ls = todos_ls.filter((todo) => todo.text !== tempText);

            localStorage.setItem('todos_ls', JSON.stringify(todos_ls));

            window.location.reload();

        });
        
    });

};

function createTodo() {

    const todo_div = document.createElement('div');
    const input_value = document.querySelector('.modal__input').value;
    const text = document.createTextNode(input_value);
    
    todo_div.appendChild(text);
    todo_div.classList.add('status__todo');
    todo_div.classList.add('todo');
    todo_div.setAttribute('draggable', 'true');

    const span = document.createElement('span');
    const span_text = document.createTextNode('\u00D7');
    span.classList.add('todo__close');
    span.appendChild(span_text);

    todo_div.appendChild(span);

    no_status.appendChild(todo_div);

    todo_form.classList.remove('active');

    todo_div.addEventListener('dragstart', dragStart);
    todo_div.addEventListener('dragend', dragEnd);
    
    if (input_value) {

        let idNewTodo = 0;

        if (todos_ls.length == 0) {
            idNewTodo = 0;
        } else {
            for (let i = 0; i < todos_ls.length; i++) {
                if (idNewTodo <= parseInt(todos_ls[i].id)) {
                    idNewTodo = parseInt(todos_ls[i].id) + 1;
                }
            };
        }

        todos_ls.push({
            id: idNewTodo,
            text: input_value,
            status: '.todoContainer__status--noStatus'
        });
    
        localStorage.setItem('todos_ls', JSON.stringify(todos_ls));
    
    };

    window.location.reload();

};

loadTodos();