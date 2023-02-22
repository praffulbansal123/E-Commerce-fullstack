import nodeMailer from 'nodemailer'
import Locals from '../config/config'

interface emailInput {
    email: string,
    subject: string,
    message: string
}

const sendEmail = async (input: emailInput) => {

    const transpoter = nodeMailer.createTransport({
        service: Locals.config().smptService,
        auth: {
            user: Locals.config().smptMail,
            pass: Locals.config().smptPass,
        }
    })

    const mailInput = {
        from: Locals.config().smptMail,
        to: input.email,
        subject: input.subject,
        text: input.message
    }

    await transpoter.sendMail(mailInput)
}

export default sendEmail