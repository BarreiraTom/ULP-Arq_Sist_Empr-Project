const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

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
//////////////////// JASMIM ///////////////////////////////
var request = require('request');

request(
    {
        url: 'https://identity.primaverabss.com/core/connect/token',
        method: 'POST',
        auth: {
            user: 'ERP-TO-CRM', // TODO : put your application client id here
            pass: '1518606f-a8d4-40bd-ae5b-b192da6a859c' // TODO : put your application client secret here
        },
        form: {
            grant_type: 'client_credentials',
            scope: 'application'
        }
    },
    function(err, res) {
        if (res) {
            var json = JSON.parse(res.body);
            // console.log('Access Token:', json.access_token);
            return json.access_token;
        } else {
            console.log('Could not obtain acess token.');
        }
    }
);
////////////////////////////////////////////////////////
app.use(homeRoutes);

app.use(errorController.get404);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server started');
});
