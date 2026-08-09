const http = require('http')
const fs = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, 'data', 'students.json')

function checkDataFile() {
    const dataFolder = path.dirname(DATA_FILE)
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder)
    }
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, '[]')
    }
}

function readStudents() {
    checkDataFile()
    const raw = fs.readFileSync(DATA_FILE)
    return JSON.parse(raw)
}

function writeStudents(students) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2))
}

function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', chunk => (body += chunk))
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {})
            } catch (err) {
                reject(err)
            }
        })
    })
}

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
}

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
    }

    if (req.url === '/students' && req.method === 'GET') {
        const students = readStudents()
        sendJSON(res, 200, students)
        return
    }

    if (req.url === '/students' && req.method === 'POST') {
        try {
            const body = await getRequestBody(req)
            const id = Date.now()

            const newStudent = {
                id,
                name: body.name,
                email: body.email,
                phone: body.phone,
                dob: body.dob,
                department: body.department,
                programme: body.programme
            }

            const students = readStudents()
            students.push(newStudent)
            writeStudents(students)

            sendJSON(res, 201, newStudent)
        } catch (err) {
            sendJSON(res, 400, { error: 'Invalid JSON in request body' })
        }
        return
    }

    if (req.url.startsWith('/students/') && req.method === 'PUT') {
        const id = Number(req.url.split('/')[2])

        try {
            const body = await getRequestBody(req)
            const students = readStudents()
            const index = students.findIndex(s => s.id === id)

            if (index === -1) {
                sendJSON(res, 404, { error: 'Student not found' })
                return
            }

            const existing = students[index]

            const updatedStudent = {
                ...existing,
                name: body.name,
                email: body.email,
                phone: body.phone,
                dob: body.dob,
                department: body.department,
                programme: body.programme,
                id
            }

            students[index] = updatedStudent
            writeStudents(students)

            sendJSON(res, 200, updatedStudent)
        } catch (err) {
            sendJSON(res, 400, { error: 'Invalid JSON in request body' })
        }
        return
    }

    if (req.url.startsWith('/students/') && req.method === 'DELETE') {
        const id = Number(req.url.split('/')[2])

        let students = readStudents()
        const student = students.find(s => s.id === id)

        if (!student) {
            sendJSON(res, 404, { error: 'Student not found' })
            return
        }

        students = students.filter(s => s.id !== id)
        writeStudents(students)

        sendJSON(res, 200, { message: 'Student deleted successfully' })
        return
    }

    sendJSON(res, 404, { error: 'Route not found' })
})

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})