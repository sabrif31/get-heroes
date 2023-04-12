const fs = require('fs')
const spawnObj = require('child_process').spawn
const path = require('path')
const http = require('http')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const hostname = 'localhost'
const port = 9999

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const directoryPath = path.join(__dirname, 'ableton song');
const directoryPath = 'G:\\ableton\\ableton song\\'
const getList = async () => {
  let data = []
  const files = fs.readdirSync(directoryPath)
  files.forEach((file) => {
    if (fs.statSync(directoryPath + file).isDirectory()) {
      const items = fs.readdirSync(directoryPath + file)
      items?.forEach((item) => {
        if (
          fs.statSync(directoryPath + file + '\\' + item).isFile() &&
          path.extname(item).toLowerCase() === '.als'
        ) {
          data = [
            ...data,
            {
              name: item,
              folder: file,
              time: fs
                .statSync(directoryPath + file + '\\' + item)
                .mtime.getTime(),
            },
          ]
        }
      })
    }
  })
  return data
    .sort(function (a, b) {
      return a.time - b.time
    })
    .map(function (v) {
      return { name: v.name, folder: v.folder, time: new Date(v.time) }
    })
    .reverse()
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/ableton/project/files', async (req, res) => {
  res.send(JSON.stringify({ datas: await getList() }))
})

app.post('/ableton/open/project', async (req, res) => {
  let data = req.body
  // console.log('PATH PROJECT', directoryPath + data.folder + "\\" + data.name)
  progToOpen = spawnObj(
    'G:\\Programs\\Ableton\\Live 11 Suite\\Program\\Ableton Live 11 Suite.exe',
    [directoryPath + data.folder + '\\' + data.name]
  )
  res.send({ data: "Le projet est entrain de s'ouvrir !" })
})

app.listen(port, () => {
  console.log(`App listening on ${hostname}: ${port}`)
})

/**
 * OTHER CODE
 */

var app2 = http.createServer(async (req, res) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' /* @dev First, read about security */,
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  if (['GET', 'POST'].indexOf(req.method) > -1) {
    res.writeHead(200, headers)
    res.end(JSON.stringify({ datas: await getList() }))
    return
  }

  res.writeHead(405, headers)
  res.end(`${req.method} is not allowed for the request.`)
})
// app2.listen(port, hostname);
/*
function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}
*/
