import 'source-map-support/register'; // source-map을 사용하기 위해 추가함.
import App from './App';
import * as express from 'express';

const app: express.Application = new App().app;


