require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const cron = require('node-cron');
const ProcessarServices = require('./services/ProcessarServices');
const Aniversario = require('./services/AniversarioServices');
const app = express();




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORREÇÃO AQUI:
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}));

app.use(flash());

app.use((req, res, next) => {
  // Aqui definimos 'messages' para que o EJS o reconheça
  res.locals.messages = req.flash();
  next();
});

cron.schedule('0 07 09 * * *', async () => {
  console.log('Executou às 14:27 verificando aniversariantes');
  await Aniversario.Verificar();
});

cron.schedule('*/30 * * * * *', async () => {
  console.log('Verificando campanhas...');
  await ProcessarServices.processar();

});

app.use(routes);
module.exports = app;