import {CronJob} from 'cron';

export class Server{
    public static start(){
        console.log('Server started...');
        const job = new CronJob(
            '*/10 * * * * *',//segundos,minutos,horas,dias,meses,dia de la semana
            ()=>{
                console.log('Un mensaje x cada 10 segundos');
            }
        );
        job.start();
    }
}