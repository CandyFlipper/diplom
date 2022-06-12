const fs = require('fs')
const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
// db.sequelize.sync({ force: true })

app.use('/static', express.static('./static'))

app.get('/', (req, res) => {
    res.render('pages/index');
})

app.get('/catalog/:id', (req, res) => {
    res.render('pages/catalog');
})

app.get('/catalog', (req, res) => {
    res.render('pages/catalog');
})

app.get('/contacts', (req, res) => {
    res.render('pages/contacts');
})

app.get('/about', (req, res) => {
    res.render('pages/about');
})

app.get('/cart', (req, res) => {
    res.render('pages/cart');
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
