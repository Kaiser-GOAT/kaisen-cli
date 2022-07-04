const db = require('./db')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}
module.exports.showAll = async () => {
  const list = await db.read()
  list.forEach((task, index) => {
    console.log(`${task.done ? '[x]' : '[_]'} ${index + 1}. ${task.title}`)
  })
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

inquirer
  .prompt([
    {
      type: 'list',
      name: 'index',
      message: '请选择操作任务',
      choices: ['1', '2', '3'],
    },
  ])
  .then((answers) => {
    console.log(answers)
  })
