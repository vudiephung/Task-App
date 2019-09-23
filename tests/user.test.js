const request = require('supertest')
const User = require('../src/models/user')
const app = require('../src/app')
const { userOne, userOneID, setupDB } = require('./fixtures/db')

beforeEach(setupDB)

test('Register a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Vu Diep Hung',
        email: 'hungvudiep@gmail.com',
        password: 'HinewUser@'
    }).expect(201)

    // Assert that the DB was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response 
    expect(response.body).toMatchObject({
        user: {
            name: 'Vu Diep Hung',
            email: 'hungvudiep@gmail.com',
        },
        token: user.tokens[0].token
    })

    //
    expect(user.password).not.toBe('HinewUser@')
})

test('Login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Should not login non-existing user', async () => {
    await request(app).post('/users').send({
        email: 'hungvudiep@gmail.com',
        password: 'This is not my password'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // set the header
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', '123123')
        .send()
        .expect(401)
})

test('Should delete Account', async () => {
    const response = await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})

test('Should not delete unauthenticated Account', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer hithere`)
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user filed', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Hung Vu Diep',
            email: 'vdh@vudiephung.com'
        })
        .expect(200)
    const user = await User.findById(userOneID)
    expect({
        name: user.name,
        email: user.email
    }).toEqual({
        name: 'Hung Vu Diep',
        email: 'vdh@vudiephung.com'
    })
})

test('Should not update invalid user fileds', async () => {
    await request(app)
        .patch('/users/me')
        .send({ location: "Bien Hoa" })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(400)
})