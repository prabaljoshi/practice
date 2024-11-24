function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value === '') {
        alert('Please enter a task');
        return;
    }

    var li = document.createElement('li');
    li.appendChild(document.createTextNode(taskInput.value));

    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function() {
        var li = this.parentNode;
        li.parentNode.removeChild(li);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
}

document.getElementById('taskList').addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'LI') {
        e.target.classList.toggle('completed');
    }
});
