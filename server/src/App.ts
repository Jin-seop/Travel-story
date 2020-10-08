import * as express from 'express';
import {Request, Response} from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
// import * as favicon from 'express-favicon'; 파비콘 적용시 주석 해제
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import {User} from './entity/User'

class App {
    public app: express.Application;

    /**
     * @ class App
     * @ method bootstrap
     * @ static
     *
     */
    public static bootstrap(): App {
        return new App();
    }

    constructor() {

        createConnection().then(async(connection)=>{

            const userRepository = connection.getRepository(User);

            this.app = express();
            this.app.use(bodyParser.json());
            this.app.use(
                bodyParser.urlencoded({
                    extended: false,
                })
            );
            this.app.use(
                cors({
                    origin: [`${process.env.TEST_IP}`],
                    methods: ['GET', 'POST', 'PUT', 'DELETE'],
                    credentials: true,
                })
            );
            //배포시 경로 바꿔서 파비콘 적용하기(정적 파일제공 참고)
            // this.app.use(favicon(__dirname + '../images/favicon.ico'));
    
            this.app.get(
                '/',
                (
                    req: express.Request,
                    res: express.Response,
                    next: express.NextFunction
                ) => {
                    res.send('Hello world');
                }
            );

            this.app.get('/user', async function(req:Request, res:Response){
              const user = await userRepository.find()
              res.json(user)
            })
            
            //port 최하단.
            const port: number = Number(process.env.PORT) || 3000;
            this.app.listen(port, () =>
            console.log(`Express server listening at ${port}`)
            ).on('error', (err) => console.error(err));

            

        })
    }
}

export default App;
