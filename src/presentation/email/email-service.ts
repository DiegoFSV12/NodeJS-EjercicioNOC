import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions{
    to:string,
    subject:string,
    htmlBody:string,
    //attachments
}
//attachments
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.SERVICE,
        auth:{
            user: envs.EMAIL,
            pass: envs.KEY
        }
    });

    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const {to,subject,htmlBody} = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody
            });
            console.log(sentInformation);
            return true;
        } catch (error) {
            return false;
        }
    }
}