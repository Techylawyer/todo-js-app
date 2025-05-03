const todosDisplay = document.getElementById('todosDisplay')

todoForm.addEventListener('submit', todoSubmitHandler)

function todoSubmitHandler(e) {
  e.preventDefault()

  let formData = new FormData(todoForm)
  let todoValue = formData.get('todo')

  if (todoValue === '') {
    alert('Please enter a valid to-do item')
    return
  }

  const HTMLString = `
  <li><i class="fa-regular fa-square"></i><span class="todoText">${todoValue.trim()}</span><span class="delete ${todoValue}">❌</span></li>`

  todosDisplay.insertAdjacentHTML('beforeend', HTMLString)

  todoForm.reset()

  deleteTodos()
  updateTodos()
  completeTodo()
  clearTodos()
}

// delete existing todos
function deleteTodos() {
  const deleteTodo = document.querySelectorAll('.delete')
  for (let todo of deleteTodo) {
    todo.addEventListener('click', (e) => {
      e.target.parentElement.remove()
    })
  }
}

//update existing todos
function updateTodos() {
  const todoText = document.querySelectorAll('.todoText')
  todoText.forEach((todo) => {
    todo.addEventListener('dblclick', () => {
      const input = document.createElement('input')
      input.type = 'text'
      input.value = todo.textContent
      input.style.width = '100px'

      todo.replaceWith(input)
      input.focus()

      function save() {
        const newText = input.value
        todo.textContent = newText
        input.replaceWith(todo)
      }

      input.addEventListener('blur', save)
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          input.blur()
        }
      })
    })
  })
}

//complete checkbox
function completeTodo() {
  const checkBox = document.querySelectorAll('.fa-regular')

  for (let box of checkBox) {
    box.addEventListener('click', () => {
      box.nextElementSibling.classList.toggle('strike')
    })
  }
}

// clear all todos
function clearTodos() {
  const clearBtn = document.querySelector('#clear')
  const todosList = document.querySelectorAll('#todosDisplay li')
  clearBtn.addEventListener('click', () =>
    todosList.forEach((todo) => todo.remove())
  )
}

deleteTodos()
updateTodos()
completeTodo()
clearTodos()
