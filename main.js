//Todo list en version plus minimifié 
/*****************REQ************************/
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
/*****************OBJS************************/
const Todo = require('./Modules/Todo');
/************VARS*************************/
const todos = [];
/*****************************************/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/index.html');
});

io.on('connection', (socket) => {
    //Send to all todos datas
    socket.on("start", (data) => {
        //me but all
        socket.emit("getdata", {
            listTodo: todos
        });
        //all but me
        socket.broadcast.emit("getdata", {
            listTodo: todos
        });
    });
    //adding a new todos and updating for all
    socket.on('emitnewtodo', (data) => {
        todos.push((new Todo(data.todo)));
        //me but all
        socket.emit("getdata", {
            listTodo: todos
        });
        //all but me
        socket.broadcast.emit("getdata", {
            listTodo: todos
        });
    });
    //deleting a todos and updating for all
    socket.on('supptodo', (data) => {
        for (let i = 0; i < todos.length; i++) {
            if (data.id == parseInt(todos[i].id)) {
                todos.splice(i, 1);
            }
        }
        //me but all
        socket.emit("getdata", {
            listTodo: todos
        });
        //all but me
        socket.broadcast.emit("getdata", {
            listTodo: todos
        });
    });
});
server.listen(8086);