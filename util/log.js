const fs = require('fs')
const logPath = './connection.log'

function ensureLogFile() {
  const isExists = fs.existsSync(logPath)
  // 만일 경로에 파일이 존재하지 않는다면
  if ( !isExists ) {
    // 빈 파일을 생성합니다.
    fs.writeFileSync(logPath, '')
  }
}

function readFromLogFile() {
  // 만일 로그 파일이 없다면 일단 생성합니다
  ensureLogFile()
  // 이제 로그 파일로부터 내용을 읽어 반환합니다.
  return fs.readFileSync(logPath).toString('utf8')
}

function writeLogFile(remoteAddress) {
  // 이전의 로그를 받아옵니다
  const beforeLog = readFromLogFile()
  // 새로운 로그를 작성할 겁니다.
  const now = new Date().toGMTString()
  const newLog = `${now}: ${remoteAddress} 접속`
  // 이전의 로그에 새로운 로그를 합쳐 이어쓰기합니다.
  fs.writeFileSync(logPath, `${beforeLog}\n${newLog}`)
}

module.exports = { writeLogFile, readFromLogFile }