const fs = require('fs')
const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

const db = require("./db");
const bodyParser = require("body-parser");
const ItemsService = require("./services/items");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
//db.sequelize.sync({ force: true })

app.use('/static', express.static('./static'))
// странички
app.get('/', async (req, res) => {
    const items = await ItemsService.getForMain()
    res.render('pages/index', {
        items
    });
})
app.get('/catalog', async (req, res) => {
    const options = req.query.category
    const search = req.query.search
    console.log(options)
    let items = {}
    if (options) {
        items = await ItemsService.getByCategory(options)
    } else if (search) {
        items = await ItemsService.getByName(search)
    } else {
        items =  await ItemsService.getAll(options)
    }
    res.render('pages/catalog', {
        items
    });
})

app.get('/catalog/:id', async (req, res) => {
    const item = await ItemsService.getById(req.params.id)
    res.render('pages/card', {
        item
    });
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

// Добавление
app.post('/additem', async (req, res) => {
    try {
        const item = req.body
        const itemCreated = await db.Items.create(item)
        return res.send(itemCreated);
    } catch (e) {
        res.status(500).send({
            message: e.message || "eror"
        });
    }

})
app.listen(PORT, () => console.log(`server started on post ${PORT}`))
