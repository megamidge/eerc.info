const exec = require('child_process').execSync
let buildType = 'eerc'
const [potentialBtype] = process.argv.slice(2)
if (potentialBtype) {
  buildType = potentialBtype
}

console.log('Building', buildType)

Promise.resolve()
  //ensure we are on correct firebase project
  .then(() => {
    exec(`firebase use ${buildType}`, { stdio: [0, 1, 2] })
  })
  //build add
  .then(() => {
    exec('quasar build -m pwa', { stdio: [0, 1, 2] })
  })
  //deploy app
  .then(() => {
    exec('firebase deploy --only hosting', { stdio: [0, 1, 2] })
  })
  .catch(err => {
    console.error('ERROR:', err)
    process.exit(1)
  })
