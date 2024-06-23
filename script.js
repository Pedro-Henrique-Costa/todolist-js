let todoForm = document.querySelector('#add-todo')
let todoInput = document.querySelector('#input-todo')
let edit = document.getElementById('content-edit-todo')
let add_todo = document.getElementById('content-add-todo')
let cancel_edit = document.querySelector('#cancel-edit-button')
let search = document.getElementById('search')
let filter_h3 = document.getElementById('filter-h3')
let option_all = document.getElementById('option-all')
let option_done = document.getElementById('option-done')
let option_todo = document.getElementById('option-todo')
let text_todo = document.getElementsByClassName('text-todo')
let todos = document.querySelector('#todos')
let deleteall = document.getElementById('deleteall')
let input_edit = document.querySelector('#input-edit-todo')
let edit_done_button = document.querySelector("#edit-done-button")
let oldInputValue;
let search_button = document.getElementById('search-button')
let search_input = document.getElementById('search-input')
let filter_select = document.getElementById('filter-select')


function onSelectOption(elemento){
    const todosListGlobal = document.querySelectorAll('.todo')
    todosListGlobal.forEach(todo => {
        if(todo.classList.contains('hide')){
            todo.classList.remove('hide')
        }
    })

    if(elemento.value == 'done'){
        todosListGlobal.forEach(todo => {
            if(!todo.classList.contains('done')){
                todo.classList.add('hide')
            }
        })
    }

    if(elemento.value == 'todo'){
        todosListGlobal.forEach(todo => {
            if(todo.classList.contains('done')){
                todo.classList.add('hide')
            }
        })
    }
}

const updateInput = (text) => {
    const todosList = document.querySelectorAll('.todo')
    const tarefasLocal = localStorage.getItem('tarefas')
    const tarefasLocalObj = JSON.parse(tarefasLocal)
    todosList.forEach(todo => {
        let todoTittle = todo.querySelector('.text-todo')
        if(todoTittle.innerText === oldInputValue){
            for (let x in tarefasLocalObj){
                if(todoTittle.innerText == tarefasLocalObj[x].name){
                    tarefasLocalObj[x].name =  text
                }
            }
            localStorage.setItem('tarefas', JSON.stringify(tarefasLocalObj))
            todoTittle.innerText = text;
        }
    });
}

const reloadDoneTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")
    todo.classList.add("done")

    const text_todo = document.createElement("p")
    text_todo.classList.add("text-todo")
    text_todo.classList.add("checked")
    text_todo.innerText = text
    todo.appendChild(text_todo)

    const tools_todo = document.createElement("div")
    tools_todo.classList.add("tools-todo")
    todo.appendChild(tools_todo)

    const done_button = document.createElement("button")
    done_button.classList.add("done-button")
    done_button.classList.add("margin-button")
    done_button.innerText = "Feito"
    tools_todo.appendChild(done_button)

    const edit_button = document.createElement("button")
    edit_button.classList.add("edit-button")
    edit_button.classList.add("margin-button")
    edit_button.innerText = "Editar"
    tools_todo.appendChild(edit_button)

    const delete_button = document.createElement("button")
    delete_button.classList.add("delete-button")
    delete_button.classList.add("margin-button")
    delete_button.innerText = "Deletar"
    tools_todo.appendChild(delete_button)

    todos.appendChild(todo)

    todoInput.value = ''
    todoInput.focus();
}


const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const text_todo = document.createElement("p")
    text_todo.classList.add("text-todo")
    text_todo.innerText = text
    todo.appendChild(text_todo)

    const tools_todo = document.createElement("div")
    tools_todo.classList.add("tools-todo")
    todo.appendChild(tools_todo)

    const done_button = document.createElement("button")
    done_button.classList.add("done-button")
    done_button.classList.add("margin-button")
    done_button.innerText = "Feito"
    tools_todo.appendChild(done_button)

    const edit_button = document.createElement("button")
    edit_button.classList.add("edit-button")
    edit_button.classList.add("margin-button")
    edit_button.innerText = "Editar"
    tools_todo.appendChild(edit_button)

    const delete_button = document.createElement("button")
    delete_button.classList.add("delete-button")
    delete_button.classList.add("margin-button")
    delete_button.innerText = "Deletar"
    tools_todo.appendChild(delete_button)

    todos.appendChild(todo)

    todoInput.value = ''
    todoInput.focus();
}

const toggleForm = () => {
    search.classList.toggle('hide')
    filter_h3.classList.toggle('hide')
    filter_select.classList.toggle('hide')
    edit.classList.toggle('hide')
    add_todo.classList.toggle('hide')
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = todoInput.value
    if (inputValue) {
        saveTodo(inputValue);
        let tarefa = {
            name: inputValue,
            done: false
        }
        const tarefasLocal = localStorage.getItem('tarefas')
        const tarefasLocalObj = JSON.parse(tarefasLocal)
        tarefasLocalObj.push(tarefa)

        let tarefasJSON = JSON.stringify(tarefasLocalObj)
        localStorage.setItem('tarefas', tarefasJSON)
    }
})

document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest(".todo")
    let todoTittle;

    if (targetEl.classList.contains('done-button')) {
        parentEl.classList.toggle('done')
        const texto = parentEl.querySelector('.text-todo')
        texto.classList.toggle('checked')
        const nomeTarefa = texto.innerText
        const tarefasLocal = localStorage.getItem('tarefas')
        const tarefasLocalObj = JSON.parse(tarefasLocal)
        for (let x in tarefasLocalObj){
            if(nomeTarefa == tarefasLocalObj[x].name){
                tarefasLocalObj[x].done === false ? tarefasLocalObj[x].done = true : tarefasLocalObj[x].done = false
            }
        }
        localStorage.setItem('tarefas', JSON.stringify(tarefasLocalObj))
    }

    if (targetEl.classList.contains('delete-button')) {
        parentEl.remove('.todo')
        const nomeTarefa = parentEl.querySelector('.text-todo').innerText
        const tarefasLocal = localStorage.getItem('tarefas')
        const tarefasLocalObj = JSON.parse(tarefasLocal)
        for (let x in tarefasLocalObj){
            if(nomeTarefa == tarefasLocalObj[x].name){
                const index = tarefasLocalObj.indexOf(tarefasLocalObj[x].name)
                console.log(index)
                console.log(tarefasLocalObj[x].name)
                tarefasLocalObj.splice(index, 1)
                localStorage.setItem('tarefas', JSON.stringify(tarefasLocalObj))
            }
        }
    }

    if (targetEl.classList.contains('edit-button')) {
        toggleForm();
        todoTittle = parentEl.querySelector('.text-todo').innerText;
        input_edit.value = todoTittle
        oldInputValue = todoTittle
    }

})

edit_done_button.addEventListener('click', (e) => {
    e.preventDefault()
    const inputNew = input_edit.value
    if(inputNew){
        updateInput(inputNew);
    }
    toggleForm();
})


search_button.addEventListener('click', () => {
    const texto_pesquisa = search_input.value
    const todosList = document.querySelectorAll('.todo')
    todosList.forEach((e) => {
        let texto_todo = e.querySelector('.text-todo')
        if(texto_todo.innerText !== texto_pesquisa){
            e.classList.add('hide')
        }else{
            e.classList.remove('hide')
        }
    })
}) 

search_input.addEventListener('input', ()=> {
    const todosList = document.querySelectorAll('.todo')
    todosList.forEach((e) => {
        let texto_pesquisa = search_input.value.toLowerCase()
        let texto_todo = e.querySelector('.text-todo')
        texto_todo = texto_todo.textContent.toLowerCase()
        if(!texto_todo.includes(texto_pesquisa)){
            e.classList.add('hide')
        }else{
            e.classList.remove('hide')
        }
    })
})

cancel_edit.addEventListener('click', (e) => {
    e.preventDefault()
    toggleForm();
})  

window.addEventListener('load', () => {
     if(!localStorage.getItem('tarefas')){
         const tarefas = [{name: 'Bem vindo!', done: false}]
         localStorage.setItem('tarefas', JSON.stringify(tarefas))
     }
    const tarefaSalvaTypeString = localStorage.getItem('tarefas');
    const tarefaSalvaTypeObj = JSON.parse(tarefaSalvaTypeString);
    for (let i in tarefaSalvaTypeObj){
        tarefaSalvaTypeObj[i].done === true ? reloadDoneTodo(tarefaSalvaTypeObj[i].name) : saveTodo(tarefaSalvaTypeObj[i].name)
    }
})

deleteall.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})