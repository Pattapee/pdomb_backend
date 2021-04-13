import bodyParser from 'body-parser';
import * as cors from 'cors';
import dotenv from 'dotenv';
import * as express from 'express';
import * as fs from 'fs';
import helmet from 'helmet';
import { Client } from 'ldapts'
import cron from 'node-cron';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import routes from './api';
import itemStatusService from './services/ItemStatusServices'
import ProductStatusService from './services/ProductStatusServices'

createConnection().then(async (connection) => {
  // Connects to the Database -> then starts the express
  // Create a new express application instance
  dotenv.config();
  const port = process.env.SERVER_PORT;
  const app = express.default();

  // Call midlewares
  app.use(cors.default());
  app.use(helmet());
  app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

  // Set all routes from routes folder.
  app.use('/', routes);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  // Recheck and initalData
  await ProductStatusService.IninitalData();
  await itemStatusService.IninitalData();
});
