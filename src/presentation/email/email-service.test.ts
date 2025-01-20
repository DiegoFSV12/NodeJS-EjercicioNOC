import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from "./email-service";

describe('email-service.ts',()=>{
    const mockSendEmail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail:mockSendEmail
    });

    test('should send email',async()=>{
        const emailService = new EmailService();
        const options:SendMailOptions = {
            to: 'cooldiego70@gmail.com',
            subject:'Test',
            htmlBody:'<h1>Testing</h1>'
        }
        const sent = await emailService.sendEmail(options);
        expect(sent).toBe(true);
        expect(mockSendEmail).toHaveBeenCalledWith({
            "attachments": expect.any(Array), 
            "html": "<h1>Testing</h1>", 
            "subject": "Test", 
            "to": "cooldiego70@gmail.com"});
    });

    test('should send email with attachments',async()=>{
        const emailService = new EmailService();
        const sent = await emailService.sendEmailWithFileSystemLogs('cooldiego70@gmail.com');
        expect(sent).toBe(true);
        expect(mockSendEmail).toHaveBeenCalledWith({
            "attachments": expect.arrayContaining([
                {"filename": "logs-all.log","path": "./logs/logs-all.log"},
                {"filename": "logs-medium.log","path": "./logs/logs-medium.log"},
                {"filename": "logs-high.log","path": "./logs/logs-high.log"},]), 
            "html": expect.any(String), 
            "subject": "Logs del servidor", 
            "to": "cooldiego70@gmail.com"});
    })
})