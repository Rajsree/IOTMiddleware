var Todo = require('./models/todo');
var deviceDetails = require('./models/device');

function getDetails(res) {
    deviceDetails.find(function (err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(todos); // return all todos in JSON format
    });
};

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    app.get('/api/devices', function (req, res) {
        // use mongoose to get all device details in the database
        getDetails(res);
    });

    // create device entry and send back all device details after creation
    app.post('/api/devices', function (req, res) {
        // create a device information comes from AJAX request from Angular
        deviceDetails.create({
            deviceTag: req.body.text,
            status : "ON",
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);
            // get and return all the devices after you create another
            getDetails(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
