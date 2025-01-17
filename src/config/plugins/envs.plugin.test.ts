import { envs } from "./envs.plugin";

describe('envs.plugin.ts',()=>{
    test('should return env options',()=>{
        const expectedStructure = {
            PORT: expect.any(Number),
            SERVICE: expect.any(String),
            EMAIL: expect.any(String),
            KEY: expect.any(String),
            MONGO_URL: expect.any(String),
            MONGO_DB_NAME: expect.any(String),
            MONGO_USER: expect.any(String),
            MONGO_PASS: expect.any(String),
        };
    
        expect(envs).toMatchObject(expectedStructure);
    });

    test('should return error if not found env',async ()=>{
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })
})