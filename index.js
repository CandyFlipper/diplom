const fs = require('fs')
const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

const db = require("./db");
const bodyParser = require("body-parser");
const ItemsService = require("./services/items");
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

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
    const category = await ItemsService.getCategory()
    let items = {}
    if (options) {
        items = await ItemsService.getByCategory(options)
    } else if (search) {
        items = await ItemsService.getByName(search)
    } else {
        items =  await ItemsService.getAll(options)
    }
    res.render('pages/catalog', {
        items,
        category
    });
})

app.get('/catalog/products', async (req, res) => {
    const item = await ItemsService.getAll()
    res.send(item)
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

const transporter = nodemailer.createTransport(
    smtpTransport({
        service: 'yandex',
        host: 'smtp.yandex.ru',
        auth: {
            user: 'avtozpchty138@yandex.ru',
            pass: 'peotvidhrwnzuiib',
        },
    })
);

function sendEmail() {
    const mailOptions = {
        from: 'avtozpchty138@yandex.ru',
        to: 'danila.aleksandrov.up@mail.ru\n',
        subject: 'Заказ мафака',
        text: 'Соси хуй',
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}

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
