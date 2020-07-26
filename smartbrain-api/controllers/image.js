const Clarifai = require('../node_modules/clarifai');

const app = new Clarifai.App({
	apiKey: '557ccc63e44f4c5fb86574df24263277',
});

const apiCall = () => (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
		.then((data) => res.json(data))
		.catch((err) => res.status(400).json('Unable to work with API'));
};

const image = (db) => (req, res) => {
	const { id } = req.body;

	db('users')
		.increment('entries', 1)
		.where({ id })
		.returning('entries')
		.then((entries) => res.json(entries[0]))
		.catch((err) => res.status(400).json('Entries not found'));
};

module.exports = { image, apiCall };
