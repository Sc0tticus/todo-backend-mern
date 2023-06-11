const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// The GET / todos route uses the Todo.find() method.
// This is an asynchronous operation that returns a Promise.
// The reason for this is that it has to read data from the MongoDB database,
// which is an I / O operation that can take an indeterminate amount of time.
// Thus, to avoid blocking the rest of the code from running while it waits for the database operation, it's done asynchronously.
// The await keyword is used to pause execution of the function until the Promise resolves,
// 	and then the result of the Promise(the todos from the database) is assigned to the todos variable.
router.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

router.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
});

router.post('/todo/new', async (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});

	try {
		await todo.save();
		res.json(todo);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json(result);
});

router.put('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json();
});

module.exports = router;
