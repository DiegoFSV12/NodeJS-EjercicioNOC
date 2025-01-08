import { CheckService } from '../domain/use-cases/checks/check-service';
import {CronService} from './cron/cron-service';

export class Server{
    public static start(){
        console.log('Server started...');
        CronService.createJob(
            '*/5 * * * * *',
            ()=>{
                const date = new Date();
                console.log('Mensaje cada 5 segundos',date);
                new CheckService(
                    () => console.log('success'),
                    (error)=>console.log(error)
                ).execute('http://localhost:3000/profile');
            }
        );
        
    }
}