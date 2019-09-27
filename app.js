require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDef.js');
const log4js = require('log4js');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const debug = require('debug')('node-app_copy');
const cluster = require('express-cluster');
const log = log4js.getLogger("startup");
log4js.configure('./config/log4js.json');

try {
  require('fs').mkdirSync('./log');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/index', indexRouter)
app.use('/users', usersRouter)

/// error handlers

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         log.error("Something went wrong:", err);
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     log.error("Something went wrong:", err);
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
