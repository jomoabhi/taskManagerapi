var i = 0;
fetchTasks(i);

const newTaskAdd = document.querySelector('form');
newTaskAdd.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTaskDesc = document.querySelector('#taskDesc').value;
  var taskStatus = false;
  if (document.querySelector('#accept:checked') !== null) {
    taskStatus = true;
  }
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      description: newTaskDesc,
      completed: taskStatus,
    }),
  })
    .then((response) => {
      location.href = '/dashboard';
      return response.json();
    })
    .then((data) => {
      console.log('Task Successfully Added');
    });
});

var flag = 1;
document.querySelector('#next-btn').addEventListener('click', (e) => {
  if (flag) {
    i = i + 3;
    fetchTasks(i);
  }
});

document.querySelector('#prev-btn').addEventListener('click', (e) => {
  if (i >= 2) {
    i = i - 3;
    fetchTasks(i);
  }
});

function fetchTasks(i) {
  fetch('/tasks?sortBy=createdAt:desc&limit=3&skip=' + i, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var taskComp = "<span style='color:green'>Finished</span>";
      var taskPend = "<span style='color:red'>Pending</span>";
      var num = i + 1;
      const name = data[0].username;
      document.querySelector('#vibemsg').innerHTML = `Welcome ${name}`;
      delete data[0];
      // console.log(data)
      var taskInformation = '1';
      if (data.length === 1) {
        flag = 0;
        taskInformation = `Sorry!! No more tasks left`;
        document.querySelector('#next-btn').style = 'display:none';
      } else {
        document.querySelector('#next-btn').style = 'display:flex';
        flag = 1;
      }

      if (flag) {
        taskInformation = data
          .map((task) => {
            var id = task._id;
            return `<div class="taskinfo">
                    <table>
                        <tr>
                            <td>${num++}: <span class="hide-sm">Description : </span>${
              task.description
            }</td>
                            <td><button class="btn" id="${id}" onclick=deleteTask(id)><i class="fas fa-trash-alt" style="font-size:18px"></i></button></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td><b><span class="hide-sm">Status : </span>${
                              task.completed === true ? taskComp : taskPend
                            }</b></td>
                            <td><button class="taskPend" id="${
                              '0' + id
                            }" onclick=updateTaskStatus(id)><span class="hide-sm">Mark </span>Pending</button></td>
                            <td><button class="taskComp" id="${
                              '1' + id
                            }" onclick=updateTaskStatus(id)><span class="hide-sm">Mark Finished</span><span class="show-sm">Done</span></button></td>
                        </tr>
                    </table>
                    <br>Created At : ${task.createdAt.substr(0, 10)}
                    <b>Updated At : ${task.updatedAt.substr(0, 10)}</b>
                </div>`;
          })
          .join('');
      }
      document.querySelector('#message-1').innerHTML = taskInformation;
    });
}

const signOut = document.querySelector('#logOut');

signOut.addEventListener('click', (e) => {
  fetch('/users/logout', {
    method: 'POST',
  }).then((response) => {
    console.log('Successfully Logged Out');
    location.replace('/');
  });
});

document.querySelector('.task-button').addEventListener('click', (e) => {
  document.getElementById('newTask').style = 'display:flex';
});

document.querySelector('.cancelButton').addEventListener('click', (e) => {
  document.getElementById('newTask').style.cssText = 'display:none;';
});

function deleteTask(id) {
  fetch('/tasks/' + id, {
    method: 'DELETE',
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Task Successfully deleted');
      fetchTasks(i);
    });
}

function updateTaskStatus(id) {
  const fStat = id[0];
  id = id.slice(1);
  completed = fStat === '0' ? 'false' : 'true';
  fetch('/tasks/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      completed,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Task Successfully Updated');
      fetchTasks(i);
    });
}
