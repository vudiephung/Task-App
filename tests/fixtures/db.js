const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Hung',
    email: 'hungvudiep@example.com',
    password: 'hellothere@123',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
}

const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'hithere@123',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'taks 1 false',
    completed: false,
    owner: userTwo._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task 2 true',
    completed: true,
    owner: userTwo._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task 3 false',
    completed: false,
    owner: userOne._id
}

const setupDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOne,
    userOneID,
    userTwo,
    userTwoID,
    taskOne, taskTwo, taskThree,
    setupDB
}
