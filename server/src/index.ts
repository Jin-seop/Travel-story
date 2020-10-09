import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { createConnection, getRepository, getConnection, createQueryBuilder } from 'typeorm';
import { User, Content, Image, Tag } from './entity';

createConnection()
    .then(async (connection) => {
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
                this.app.use(
                    cors({
                        origin: '*',
                        methods: ['GET', 'POST', 'PUT', 'DELETE'],
                        credentials: true,
                    })
                );
                this.app.use(bodyParser.json());
                this.app.use(
                    bodyParser.urlencoded({
                        extended: false,
                    })
                );

                //배포시 경로 바꿔서 파비콘 적용하기(정적 파일제공 참고)
                // this.app.use(favicon(__dirname + '../images/favicon.ico'));

                //최신 글 받기
                this.app.get(
                    '/NewPost',
                    async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User)
                        .createQueryBuilder('user')
                        .leftJoinAndSelect('user.contents','content')
                        .leftJoinAndSelect('content.images','image')
                        .leftJoinAndSelect('content.tags','tag')
                        .getMany()
                        return res.status(200).send(user)
                    }
                );

                //제목 검색
                this.app.post(
                    '/serch/title',
                    async (req: express.Request, res: express.Response) => {
                        const content = await getRepository(User.User)
                        .createQueryBuilder('user')
                        .leftJoinAndSelect('user.contents','content')
                        .where('content.title like :title',{title:`%${req.body.title}%`})
                        .leftJoinAndSelect('content.images','image')
                        .leftJoinAndSelect('content.tags','tag')
                        .getMany()
                        return res.status(200).send(content);
                    }
                );
                //게시글 추가(태그,이미지 추가 할 것!)
                this.app.post(
                    '/addPost',
                    async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User).findOne({
                            username: req.body.username,
                        });
                        const content = await getConnection()
                            .createQueryBuilder()
                            .insert()
                            .into(Content.Content)
                            .values([{ title: req.body.title, user }])
                            .execute();

                        return res.status(201).send('게시글 추가');
                    }
                );
                    //게시글 수정
                this.app.put('/post', async (req: express.Request, res: express.Response) => {
                    const user = await getRepository(User.User).find({
                        username: req.body.username
                    });

                    const updateContent = await getConnection()
                    .createQueryBuilder()
                    .update(Content.Content)
                    .set({ title:req.body.title })
                    .where(`content.created_at = '${req.body.created_at}'`,{ user })
                    .execute().catch(err => console.error(err));
                    return res.status(201)
                })

                //게시글 삭제 (유저이름과 제목,작성시간 필요!)
                    this.app.delete('/post',async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User).find({
                            username: req.body.username
                        });
                        const deleteContent = await getConnection()
                        .createQueryBuilder()
                        .delete()
                        .from(Content.Content)
                        .where(`content.created_at = '${req.body.created_at}' and content.title = '${req.body.title}' `,{ user })
                        .execute()
                        return res.status(200)
                    })

                // 유저 추가
                this.app.post(
                    '/signup',
                    async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User).findOne({
                            email: req.body.email,
                        });
                        if (user) {
                            return res.send('이미 존재하는 유저입니다.');
                        } else {
                            const addUser = await getRepository(
                                User.User
                            ).create(req.body);
                            const result = await getRepository(User.User)
                                .save(addUser)
                                .catch((err) => console.error(err));
                            return res.status(201);
                        }
                    }
                );
            }
        }

        const port: number = Number(process.env.PORT) || 4000;
        const app: express.Application = new App().app;

        app.listen(port, () =>
            console.log(`Express server listening at ${port}`)
        ).on('error', (err) => console.error(err));
    })
    .catch((error) => console.log(error));
