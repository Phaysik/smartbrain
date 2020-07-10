import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date(),
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date(),
		},
	],
};

app.get('/', (req, res) => {
	res.send(database.users);
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	const user = database.users.find((u) => u.id === id);
	if (user) {
		res.json(user);
	} else {
		res.status(404).json('failure');
	}
});

app.post('/signin', (req, res) => {
	// bcrypt
	// 	.compare(
	// 		'apples',
	// 		'$2b$10$oJ901LaGjDlfoc6ntIoWVuenGb.vfREIiH1qMICFdoxVBUjOkB0Xe'
	// 	)
	// 	.then((result) => {
	// 		console.log(result);
	// 	});

	if (
		database.users.find((user) => {
			return (
				user.email === req.body.email && user.password === req.body.password
			);
		})
	) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error loggin in');
	}
});

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;

	// bcrypt.hash(password, 10).then((result) => {
	// 	console.log(result);
	// });

	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date(),
	});

	res.json(database.users[database.users.length - 1]);
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	const user = database.users.find((u) => u.id === id);
	console.log(user);
	if (user) {
		user.entries++;
		res.json(user);
	} else {
		res.status(404).json('failure');
	}
});

app.listen(3000, () => {
	console.log('App is running on port 3000');
});
