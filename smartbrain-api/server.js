const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const handleRegister = require('./controllers/register');
const signin = require('./controllers/signin');
const profileGet = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'TvnvVYRd#q36@o*',
		database: 'smart-brain',
	},
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('hello'));

app.get('/profile/:id', profileGet(db));

app.post('/signin', signin(db, bcrypt));

app.post('/register', handleRegister(db, bcrypt));

app.put('/image', image.image(db));

app.post('/imageurl', image.apiCall());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});
