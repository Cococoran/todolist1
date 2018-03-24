//定义log函数
const log = console.log.bind(console)

//定义document.querySelector()函数
const e = function(selector) {
	return document.querySelector(selector)
}

// 用一个 todo 参数返回一个 todo cell 的 HTML 字符串
const templateTodo = function(todo) {
	let t =`
		<div class='todo-cell'>
			<button class='todo-button todo-complete'>Complete</button>
			<button class='todo-button todo-delete'>Delete</button>
			<span contenteditable='true'>${todo}</span>
		</div>	
	`
	return t 
}

//载入所有存储在localStorage中的todo
const loadTodos = function() {
    let s = localStorage.savedTodos
    log('s',typeof(s), s)
    if (s == undefined) {
        return []
    } else {
        let ts = JSON.parse(s)
        return ts
    }
}

//将指定todo载入HTML页面
const toggleTodo = function(container, todo) {
	let html = templateTodo(todo)
	return container.insertAdjacentHTML('beforeend', html)
}
//把所有todo插入页面
const insertTodos = function(todos) {
	let container = e('#id-div-container')
	for (let i = 0; i < todos.length; i++) {
		let todo = todos[i]
		toggleTodo(container, todo)
	}
}

//保存todo在localStorage中
const savedTodos = function(todo) {
	let todos = loadTodos()
	log('todos', typeof(todos), todos)
	todos.push(todo)
	let s = JSON.stringify(todos)
	log('shit ', typeof(s), s)
	localStorage.savedTodos = s
}

//删除todo
const deleteTodos = function(container, todoCell) {
	let todos = loadTodos()
	for(let i = 0; i < todos.length; i++) {
		let cell = container.children[i] 
		if (todoCell == cell) {
			log('删除 cell, 找到下标', i)
			todoCell.remove()
			let todos = loadTodos()
			todos.splice(i, 1)
			let s = JSON.stringify(todos)
        	localStorage.savedTodos = s
		} 
	}
}

//对Add进行绑定
const addButton = e('#id-button-add')
addButton.addEventListener('click', function(event) {
	log('点击了Add按钮')
	let todoInput = e('#id-input-todo')
	let todo = todoInput.value
	savedTodos(todo)
	let container = e('#id-div-container')
	toggleTodo(container, todo)
}) 

//对Compelte和Delete按钮进行绑定
const buttons = e('#id-div-container')
buttons.addEventListener('click', function(event) {
	let self = event.target
	let todoDiv = self.parentElement
	if(self.classList.contains('todo-complete')){
		log('点击了complete按钮')
		todoDiv.classList.toggle('done')
	} else if(self.classList.contains('todo-delete')) {
		log('点击了delete按钮')
		let container = todoDiv.parentElement
		log('container', container.children)
		deleteTodos(container, todoDiv)
	}
})

const __main = function() {
	savedTodos()
}

__main()

















