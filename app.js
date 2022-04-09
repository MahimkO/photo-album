require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const PORT = process.env.PORT ?? 3000;

const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const registrationRouter = require('./routes/registrationRouter');
const photoRouter = require('./routes/photoRouter');
const albumRouter = require('./routes/albumRouter');

const app = express();
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));

app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true })); // для форм
app.use(express.json()); // для json

app.use(session({
  name: 'sid',
  store: new FileStore(),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/photo', photoRouter);
app.use('/album', albumRouter);

app.listen(PORT, () => {
  console.log('server start on', PORT);
});
