#!/usr/bin/env node

const { program } = require('commander')
const api = require('./index')

// program.addOption(false)

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
    api.show()
  })

program
  .command('fin')
  .description('finish a task')
  .argument('<args...>')
  .action((task) => {
    api.finish(task)
  })

if (process.argv.length === 2) {
  process.argv.push('show')
}

program.parse(process.argv)
