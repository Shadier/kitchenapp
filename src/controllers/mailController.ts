import { Router } from 'express'
export const entrada = Router()
'use strict';

const nodemailer = require('nodemailer');
const ical = require('ical-generator');
let infoEvent;
let emailError = [];
const emailContent = "<h1>Kitchen Dutty Event </h1><h2>Saludos desde RH</h2><p>Por favor acepta esta invitacion a tu calendario, cualquier duda o comentario enviar correo a Recursos Humanos</p>"

entrada.post('/', (req, res) => {
    const events = req.body;
    let response = postEvents(events);
    return res.status(200).send(response)
})

function postEvents(events) {
    events.forEach((e) => {

        let date;
        let dateStart;
        let dateEnd;
        if (e.shiftam)//Morning
        {
            date = e.start.split('T', 1)
            dateStart = date + "T10:15:00.0600";
            dateEnd = date + "T10:30:00.0600";
        }
        else {//Afternoon
            date = e.start.split('T', 1)
            dateStart = date + "T16:00:00.0600";
            dateEnd = date + "T16:15:00.0600";
        }

        e.title = e.title + "@sciodev.com";
        e.start = dateStart;
        e.end = dateEnd;

        
        sendEmail(changeInfoEvent(e));

    });
    if(emailError.length == 0)
        emailError.push({status: 200});


    return emailError;
}

function changeInfoEvent(event) {
    return infoEvent = {
        start: event.start,
        end: event.end,
        summary: "KitchenDuty Event",
        description: emailContent,
        location: "Kitchen",
        from: "KitchenDuty@sciodev.com",
        to: {
            required: event.title //Destinatario
        },
        subject: "KitchenDuty Event"
        
        
    };
}

const account = {
    server: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    user: "AKIAI3QAYH64AUAV5DIA",
    pass: "AmYH6pQTsqeBigWa+LkqQRW0kRoeMC5yVwRfMt8h7md4"
}




async function sendEmail(infoEvent) {

    let transporter = nodemailer.createTransport({
        host: account.server,
        port: account.port,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass
        }
    })
    transporter.sendMail(createCalenderEVent(infoEvent), (err, info) => {
        return err ? emailError.push(infoEvent.to.required) : console.log(info);
    })


}

function createCalenderEVent(infoEvent) {
    let cal = ical();

    cal.createEvent({
        start: new Date(infoEvent.start),
        end: new Date(infoEvent.end),
        summary: infoEvent.summary,
        description: infoEvent.description,
        location: infoEvent.location,
    });
    return {
        from: infoEvent.from,
        to: infoEvent.to.required,
        subject: infoEvent.subject,
        attachments:[{
            filename:"Event.ics",
            contentType: "text/calendar",
            content:Buffer.from(cal.toString())
        }],
        html: emailContent
        
    };
}

