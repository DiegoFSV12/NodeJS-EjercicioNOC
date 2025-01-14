import {envs} from './config/plugins/envs.plugin';
import { MongoDatabase } from './data/mongo-conf/init';
import { Server } from './presentation/server';

(async() => {
  main();
})();

async function main(){//Espera a que se connecte al servidor
  await MongoDatabase.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_USER
  });
  Server.start();
}


