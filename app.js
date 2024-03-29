const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const mongoDB_URI = 'mongodb+srv://jorge:mongodb@cluster0-8c4e8.mongodb.net/Middleware';

const app = express();
const store = new MongoDBStore({
    uri: mongoDB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

const errorController = require('./controllers/error');
const isAuth = require('./middleware/is-auth');

app.set('view engine', 'ejs');
app.set('views', 'views');

const authRoutes = require('./routes/auth');
const erpRoutes = require('./routes/erp');
const crmRoutes = require('./routes/crm');
const homeRoutes = require('./routes/home');
const dbRoutes = require('./routes/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(flash());

app.use(authRoutes);
app.use(isAuth, homeRoutes);
app.use(isAuth, erpRoutes);
app.use(isAuth, crmRoutes);
app.use(isAuth, dbRoutes);

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
