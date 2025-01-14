import {envs} from './config/plugins/envs.plugin';
import { LogModel } from './data/mongo-conf';
import { MongoDatabase } from './data/mongo-conf/init';
import { Server } from './presentation/server';

(async() => {
  main();
})();

async function main(){//Espera a que se connecte al servidor
  await MongoDatabase.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });
  // //Crear un collection y documento (tabla y registro)
  // const newLog = await LogModel.create({
  //   message: 'Test message desde mongo',
  //   origin: 'app.ts',
  //   level: 'low'
  // });
  // await newLog.save();
  // console.log(newLog)
  // //Server.start();

  const logs = await LogModel.find();
  console.log(logs[2].level);
}



