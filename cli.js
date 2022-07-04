const { program } = require('commander')
const api = require('./index')

program.addOption(false)

program
  .command('add')
  .description('add a taskName')
  .argument('[args...]')
  .action((args) => {
    api.add(args.join(' ')).then(
      () => {
        console.log('添加成功')
      },
      () => {
        console.log('添加失败')
      }
    )
  })

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(
      () => {
        console.log('清除成功')
      },
      () => {
        console.log('清除失败')
      }
    )
  })

program
  .command('show')
  .description('show all task')
  .action(() => {
    api.showAll()
  })

program
  .command('fin')
  .description('finish a task')
  .argument('<args...>')
  .action((task) => {
    console.log(task)
    api.finish(task)
  })
program.parse()
