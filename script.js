const todos = JSON.parse(localStorage.getItem('todos')) || []


const input = document.querySelector('.input')
const container = document.querySelector('.container')
const addButton = document.querySelector('.add')


function salvarTarefas() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function addTarefa(nome) {
    const itemBox = document.createElement('div')
    itemBox.classList.add('item')

    const inputTask = document.createElement('input')
    inputTask.type = 'text'
    inputTask.disabled = true
    inputTask.value = nome
    inputTask.classList.add('item-input')

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.innerText = 'EDITAR'
    editBtn.addEventListener('click', () => editTarefa(inputTask, nome))


    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    removeBtn.innerText = 'REMOVER'
    removeBtn.addEventListener('click', () => removeTarefa(itemBox, nome))

    container.append(itemBox)
    itemBox.append(inputTask)
    itemBox.append(editBtn)
    itemBox.append(removeBtn)

    todos.push(nome)

    input.value = ''
    input.focus()
}

function editTarefa(input, tarefa) {
    input.disabled = !input.disabled
    if (!input.disabled) {
        const index = todos.indexOf(tarefa)
        todos[index] = input.value
        salvarTarefas()
    }
}


function removeTarefa(itemBox, tarefa) {
    container.removeChild(itemBox)
    const index = todos.indexOf(tarefa)
    todos.splice(index, 1)
    salvarTarefas()
    
}


addButton.addEventListener('click', () => {
    addTarefa(input.value)
    salvarTarefas()
})
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTarefa(input.value)
        salvarTarefas()
    }
})

todos.forEach(task => {
    addTarefa(task)    
});