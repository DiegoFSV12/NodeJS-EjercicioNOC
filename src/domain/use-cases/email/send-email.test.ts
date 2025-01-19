import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe('send-email-logs.ts',()=>{

    const mockEmailSercive={
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockRepository={
        saveLog:jest.fn(),
        getLogs:jest.fn()
    }
    const sendEmailLogs = new SendEmailLogs(
        mockEmailSercive as any,
        mockRepository,
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('Should call sendEmail and saveLog',async ()=>{
        const result = await sendEmailLogs.execute('cooldiego70@gmail.com');
        expect(result).toBe(true);
        expect(mockEmailSercive.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log Email sent",
            origin: "send-email-logs.ts",
        });
    });

    test('Should log in case of error',async ()=>{
        mockEmailSercive.sendEmailWithFileSystemLogs.mockResolvedValue(false);
        const result = await sendEmailLogs.execute('cooldiego70@gmail.com');
        expect(result).toBe(true);
        expect(mockEmailSercive.sendEmailWithFileSystemLogs).toBeCalledTimes(1);
        expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toBeCalledWith({
            createdAt: expect.any(Date),
            level: "low",
            message: "Log Email sent",
            origin: "send-email-logs.ts",
        });
    });
})