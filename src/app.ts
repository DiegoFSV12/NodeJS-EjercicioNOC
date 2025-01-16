import { PrismaClient } from '@prisma/client';
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
//Inserciones en PRISMA
// const prisma = new PrismaClient();
// const newLog = await prisma.logModel.create({
//   data:{
//     level: 'HIGH',
//     message: 'Test message',
//     origin: 'App.ts'
//   }
// });
// console.log({newLog});

//Lectura en PRISMA
const prisma = new PrismaClient();
const logs = await prisma.logModel.findMany({
  where:{
    level: 'MEDIUM'
  }
});
console.log(logs);



  // //Crear un collection y documento (tabla y registro)
  // const newLog = await LogModel.create({
  //   message: 'Test message desde mongo',
  //   origin: 'app.ts',
  //   level: 'low'
  // });
  // await newLog.save();
  // console.log(newLog)
  //Server.start();

  // const logs = await LogModel.find();
  // console.log(logs[2].level);
}



