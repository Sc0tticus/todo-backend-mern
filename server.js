const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose
	.connect('mongodb://127.0.0.1:27017/mern-todo', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to DB'))
	.catch(console.error);

app.use('/', todoRoutes);

app.listen(3001, () => console.log('Server started on port 3001'));
