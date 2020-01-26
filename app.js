const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

const errorController = require('./controllers/error');
// const isAuth = require('./middleware/is-auth');

const mongoDB_URI = 'mongodb+srv://jorge:mongodb@cluster0-8c4e8.mongodb.net/Middleware';


app.set('view engine', 'ejs');
app.set('views', 'views');

const erpRoutes = require('./routes/erp');
const crmRoutes = require('./routes/crm');
const homeRoutes = require('./routes/home');
const dbRoutes = require('./routes/db');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);
app.use(erpRoutes);
app.use(crmRoutes);
app.use(dbRoutes);

app.use(errorController.get404);

mongoose
    .connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, function() {
            console.log('Server connected ate ' + new Date().toLocaleString());
        });
    })
    .catch(err => {
        console.log(err);
    });
