import { envs } from '../config/plugins/envs.plugin';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';


const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);



export class Server {

  public static start() {

    console.log( 'Server started...' );

    //Mandar Email
    console.log(envs.SERVICE, envs.EMAIL, envs.KEY, envs.PORT);

    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'cooldiego70@gmail.com',
      subject: 'PRUEBA ORRAI',
      htmlBody: `<h1>ORRAI CAUSA</h1>
      <p>loremorrai p causa añañay gogogo</p>`
    });

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
    //     // new CheckService().execute( 'http://localhost:3000' );
        
    //   }
    // );


  }


}


