import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource{
    async saveLog(log: LogEntity): Promise<void> {
        //const securityLevel = this.securityLeveUpper(log.level);
        const securityLevel = severityEnum[log.level];
        const newLog = await prismaClient.logModel.create({
            data:{
                level: securityLevel,
                message: log.message,
                origin: log.origin
            }
        });
        console.log('Postgre log created ', newLog.id);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        //const securityLevel = this.securityLeveUpper(severityLevel);
        const securityLevel = severityEnum[severityLevel];
        const logs = await prismaClient.logModel.findMany({
            where:{
                level: securityLevel
            }
        });
        return logs.map(postgreLog=>LogEntity.fromObject(postgreLog));
    }

    securityLeveUpper(log:LogSeverityLevel){
        switch(log){
            case LogSeverityLevel.low :
                return 'LOW';
            case LogSeverityLevel.medium :
                return 'MEDIUM';
            case LogSeverityLevel.high :
                return 'HIGH';
        }
    }
}