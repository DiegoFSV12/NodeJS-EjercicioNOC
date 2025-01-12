import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions{
    to:string | string[],
    subject:string,
    htmlBody:string,
    attachments?: Attachment[];
}

interface Attachment{
    filename:string,
    path:string
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

    constructor(
        private readonly logRepository:LogRepository,
    ){}


    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const {to,subject,htmlBody, attachments=[]} = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            });
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email Sent',
                origin: 'email-service.ts'
            });
            this.logRepository.saveLog(log);
            console.log(sentInformation);
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email-service.ts'
            });
            this.logRepository.saveLog(log);
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to:string|string[]){
        const subject = 'Logs del servidor';
        const htmlBody = `<h1>ORRAI CAUSA</h1>
        <p>Prueba de envio de mensaje con archivos</p>`;
        const attachments:Attachment[]=[
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            }
        ];
        return this.sendEmail({to,subject,htmlBody,attachments});
    }
}