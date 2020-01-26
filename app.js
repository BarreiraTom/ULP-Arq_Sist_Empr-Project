const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

const errorController = require('./controllers/error');
// const isAuth = require('./middleware/is-auth');

app.set('view engine', 'ejs');
app.set('views', 'views');

const erpRoutes = require('./routes/erp');
const crmRoutes = require('./routes/crm');
const homeRoutes = require('./routes/home');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRoutes);

app.use(errorController.get404);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server started');
});
