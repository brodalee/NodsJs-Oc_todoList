module.exports = class Todo {
    constructor(todo) {
        this.todo = todo;
        this.id = this.generateUniqId();
    }
    generateUniqId() {
        return (new Date().valueOf());
    }
}
