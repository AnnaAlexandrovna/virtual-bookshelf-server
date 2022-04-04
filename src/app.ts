import express, { Application } from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './utils/dbConnection';
import { corsMiddleware } from './middleware/cors';
import { router } from './routes/index';
import { logger } from './logger/index';

dotenv.config();
export const app: Application = express();
if(process.env.NODE_ENV !== 'test') {
    const server = app.listen(process.env.PORT ?? 3000, () => { console.log(`Server has been started on port ${process.env.PORT ?? 3000}`); });
    process.on('SIGTERM', () => { server.close(() => { console.log('Process terminated'); }); });
}
dbConnection();
app.use(corsMiddleware);
app.use(logger);
app.use(router);