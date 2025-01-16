import { envs } from '../config/plugins/envs.plugin';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log-datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgre-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';


const fslogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const mongologRepository = new LogRepositoryImpl(
  new MongoLogDatasource
);
const postgreslogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource
);



export class Server {

  public static async start() {

    console.log( 'Server started...' );

    //Mandar Email
    // const emailService = new EmailService();
    // new SendEmailLogs(emailService,logRepository).execute([
    //   ''
    // ]);

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckServiceMultiple(
          [fslogRepository,postgreslogRepository,mongologRepository],
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );
        // new CheckService().execute( 'http://localhost:3000' );
        
      }
    );

    //const logs =  await logRepository.getLogs(LogSeverityLevel.high);
    //console.log(logs);

  }


}


