document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filter = document.getElementById('filter');
  
    let tasks = [];
  
    // Load tasks from local storage on page load
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      displayTasks();
    }
  
    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    filter.addEventListener('change', filterTasks);
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;
  
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
  
      tasks.push(task);
      saveTasksToLocalStorage();
      displayTasks();
      taskInput.value = '';
    }
  
    function handleTaskClick(event) {
      const target = event.target;
      if (target.classList.contains('delete-btn')) {
        const taskId = parseInt(target.parentElement.dataset.id);
        deleteTask(taskId);
      } else if (target.classList.contains('checkbox')) {
        const taskId = parseInt(target.parentElement.dataset.id);
        toggleTaskCompletion(taskId);
      }
    }
  
    function deleteTask(taskId) {
      tasks = tasks.filter((task) => task.id !== taskId);
      saveTasksToLocalStorage();
      displayTasks();
    }
  
    function toggleTaskCompletion(taskId) {
      tasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      saveTasksToLocalStorage();
      displayTasks();
    }
  
    function filterTasks() {
      const filterValue = filter.value;
      displayTasks(filterValue);
    }
  
    function saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function displayTasks(filter = 'all') {
      taskList.innerHTML = '';
      const filteredTasks = filter === 'all' ? tasks : tasks.filter((task) => task.completed === (filter === 'completed'));
  
      filteredTasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id;
        listItem.innerHTML = `
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
          <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(listItem);
      });
    }
  });
  