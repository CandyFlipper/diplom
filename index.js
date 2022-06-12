const fs = require('fs')
const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

const db = require('./db')
const Items = db.shop

app.get('/', (req, res) => {
    res.send('HELLO ZALUPA + GOVNOOOOO')
})
// if (req.url === '/') {
//     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
//         if (err) {
//         throw err
//         }
    
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         })
//         res.end(data)
//     })
app.listen(PORT, () => console.log('server started on post ${PORT}'))