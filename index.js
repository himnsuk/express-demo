const config = require('config')
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger')
const authentication = require('./middleware/authentication');
const express = require('express');

const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');


//Configuration
console.log(`Application Name ${config.get('name')}`);
console.log(`Mail Server Name ${config.get('mail.host')}`);
console.log(`Mail Password ${config.get('mail.password')}`);
app.use(logger);

// Applying Routing
app.use('/api/course', courses);
app.use('/', home);

// templating engine

app.set('view engine', 'pug');
app.set('views', './views'); //default and optional setting

app.use(authentication);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(helmet());

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
}

// Environment Variable

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log('app environment variable', app.get('env'));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to ${port}`));
