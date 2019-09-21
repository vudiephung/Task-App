const sgMail = require('@sendgrid/mail')

const sendGridAPIkey = process.env.SENDGIRD_API

sgMail.setApiKey(sendGridAPIkey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hungvudiep@gmail.com',
        subject: 'Welcome to the Task App.',
        text: `Welcome to the app, ${name}. Let me know how you get along with the App.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hungvudiep@gmail.com',
        subject: 'Task App Unsubscription',
        text: `Please tell us the reason why you cancel from Task App, ${name}. Let we what you experienced`
    })
}

module.exports = { sendWelcomeEmail, sendCancelEmail } 