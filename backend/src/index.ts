import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import express from 'express';
import mongoose from 'mongoose';
import requestIp from 'request-ip';
import { Logger } from './utilities';
import * as router from './routers';

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const logger = new Logger('ROLL');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '../../../frontend/build')));

app.use('/api', router.user);
app.use('/api', router.auth);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});

app.use((req, res, next) => {
  return res.status(404).json({ status: 404, message: 'Not Found' });
});

const sslPath = (file: string) => {
  return path.join(__dirname, '..', 'ssl', file);
}

const options = {
  key: fs.readFileSync(sslPath('private.key')),
  cert: fs.readFileSync(sslPath('certificate.crt')),
  ca: fs.readFileSync(sslPath('ca_bundle.crt'))
}
const server = https.createServer(options, app);

server.listen(process.env.SERVERPORT!, () => logger.info(`Server listen at port ${process.env.SERVERPORT!}`));

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGOURL!);

mongoose.connection.on("open", async () => {
  logger.info('Mongo DB ready');
});