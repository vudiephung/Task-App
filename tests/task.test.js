const Task = require('../src/models/task')
const app = require('../src/app')
const request = require('supertest')
const { userOne
    , setupDB
    , userTwo
    , taskOne
    , taskTwo
    , taskThree
} = require('./fixtures/db')

beforeEach(setupDB)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'New task to-do',
            completed: true
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect({
        description: task.description,
        completed: task.completed
    }).toEqual({
        description: 'New task to-do',
        completed: true
    })
})

test('Tasks for userOne', async () => {
    //request taks for userone
    const taskResponse = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(taskResponse.body.length).toBe(1)
})

test('User One Should not detele any tasks of user Two', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`) // task 2 was owned by user 2
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // authorized user one
        .send()
        .expect(404)
})