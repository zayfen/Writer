import { spawn } from 'child_process'

export function runCommands (hexoRoot: string, cmds: string[]): void {
  runCmd(cmds[0], hexoRoot, true).then(event => {
    if (cmds.length === 1) {
      console.log("=========== All COMMANDS EXECUTED =========")
      return
    }
    runCommands(hexoRoot, cmds.slice(1))
  })
}

function runCmd (cmd: string, cwd: string, detach: boolean = false): Promise<string> {
  let cmdArr: string[] = cmd.split(' ')
  let _cmd: string = cmdArr[0]
  let args: string[] = cmdArr.slice(1) || []
  return new Promise((resolve, reject) => {

    let process = null
    if (detach) {
      process = spawn(_cmd, args, { detached: true, cwd: cwd, stdio: ['ignore', 'ignore', 'ignore'] })
      process.unref()
    } else {
      process = spawn(_cmd, args, { cwd: cwd })
      process.stdout.on("data", chunk => console.log(chunk.toString('ascii')))
      process.stderr.on('data', chunk => console.error(chunk.toString('ascii')))      
    }

    process.on('close', code => {
      console.log(`RunCmd: ${cmd} Finished!`)
      resolve('finish')
    })
  })
}