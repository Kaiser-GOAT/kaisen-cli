const inquirer = require('inquirer')
const db = require('./db')
const prompt = inquirer.createPromptModule()

module.exports.add = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}
module.exports.finish = async (taskArr) => {
  const list = await db.read()
  list.forEach((task, index) => {
    taskArr.forEach((taskName) => {
      if (task.title === taskName) {
        list[index].done = true
      }
    })
  })
  await db.write(list)
}

function askForCreateTask() {
  prompt({
    type: 'input',
    name: 'title',
    message: '任务标题',
  }).then((answer4) => {
    module.exports.add(answer4.title)
  })
}

function changeTaskName(list, index) {
  prompt({
    type: 'input',
    name: 'title',
    message: '重命名标题',
    default: list[index].title,
  }).then((answer3) => {
    list[index].title = answer3.title
    db.write(list)
  })
}
function complete(list, index) {
  list[index].done = true
  db.write(list)
}
function incomplete(list, index) {
  list[index].done = false
  db.write(list)
}
function deleteTask(list, index) {
  list.splice(index, 1)
  db.write(list)
}

function enquireActions(list, index) {
  const actions = {
    complete,
    incomplete,
    deleteTask,
    changeTaskName,
  }

  prompt({
    type: 'list',
    name: 'action',
    message: '选择你想执行的操作',
    choices: [
      { name: '标为已完成', value: 'complete' },
      { name: '标为未完成', value: 'incomplete' },
      { name: '重命名', value: 'changeTaskName' },
      { name: '删除', value: 'deleteTask' },
      { name: '退出', value: 'quit' },
    ],
  }).then((answer2) => {
    const action = actions[answer2.action]
    action && action(list, index)
  })
}

function printTasks(list) {
  prompt({
    type: 'list',
    name: 'index',
    message: '选择你想操作的任务',
    choices: [
      { name: '退出', value: '-1' },
      ...list.map((task, index) => {
        return {
          name: `${task.done ? '[x]' : '[_]'} ${index + 1}. ${task.title}`,
          value: index.toString(),
        }
      }),
      { name: '创建任务', value: '-2' },
    ],
  }).then((answer) => {
    const index = parseInt(answer.index)
    if (index >= 0) {
      //选中了一个任务
      //询问操作
      enquireActions(list, index)
    }
    if (index === -2) {
      //创建任务
      askForCreateTask()
    }
  })
}

module.exports.show = async () => {
  const list = await db.read()
  printTasks(list)
}
