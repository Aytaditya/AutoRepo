document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('new-task').addEventListener('keydown', function(e){if(e.key === 'Enter') addTask();});
function addTask() {
    const input = document.getElementById('new-task');
    const taskText = input.value.trim();
    if (!taskText) return;
    const li = document.createElement('li');
    li.textContent = taskText;
    li.addEventListener('click', function() { li.classList.toggle('completed'); });
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = function(event) { event.stopPropagation(); li.remove(); };
    li.appendChild(delBtn);
    document.getElementById('todo-list').appendChild(li);
    input.value = '';
}
