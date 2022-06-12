const fs = require('fs')
const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// db.sequelize.sync({ force: true })

app.get('/', (req, res) => {
    res.send('HELLO ZALUPA + GOVNOOOOO')
})

app.post('/additem', async (req, res) => {
    try {
        const item = req.body
        const itemCreated = await db.Items.create(item)
        return res.send(itemCreated);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Произошла хуйня"
        });
    }

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
app.listen(PORT, () => console.log(`server started on post ${PORT}`))
