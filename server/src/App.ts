import * as express from 'express';
import * as cors from 'cors';
import * as favicon from 'express-favicon';
import 'reflect-metadata';

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
        this.app = express();
        this.app.use(cors());

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
    }
}

export default App;
