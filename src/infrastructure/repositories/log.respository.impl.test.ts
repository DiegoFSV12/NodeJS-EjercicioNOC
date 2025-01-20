import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('log.repository.impl.ts',()=>{
    const mockLogDataSource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const logrepository = new LogRepositoryImpl(mockLogDataSource);

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('saveLog should call the logdataSource',async()=>{
        const log = {level: LogSeverityLevel.high, message:'hola'} as LogEntity;
        await logrepository.saveLog(log);
        expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
    });
    test('getLogs should call the logdataSource',async()=>{
        await logrepository.getLogs(LogSeverityLevel.high);
        expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.high);
    });
})