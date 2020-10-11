import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {
    createConnection,
    getRepository,
    getConnection,
    createQueryBuilder,
} from 'typeorm';
import { User, Content, Image, Tag } from './entity';

createConnection()
    .then(async () => {
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
                        const content = await getRepository(Content.Content)
                            .createQueryBuilder('content')
                            .orderBy('created_at', 'DESC')
                            .leftJoinAndSelect('content.images', 'image')
                            .leftJoinAndSelect('content.tags', 'tag')
                            .getMany()
                            .then((result) => res.status(200).send(result))
                            .catch((err) => res.sendStatus(404));
                    }
                );

                //제목 검색
                this.app.post(
                    '/serch/title',
                    async (req: express.Request, res: express.Response) => {
                        const content = await getRepository(User.User)
                            .createQueryBuilder('user')
                            .leftJoinAndSelect('user.contents', 'content')
                            .where('content.title like :title', {
                                title: `%${req.body.title}%`,
                            })
                            .leftJoinAndSelect('content.images', 'image')
                            .leftJoinAndSelect('content.tags', 'tag')
                            .getMany().then(result => res.status(200).send(result))
                            .catch((err) => res.sendStatus(404));
                    }
                );
                //태그 검색
                this.app.post(
                    '/serch/tag',
                    async (req: express.Request, res: express.Response) => {
                        const content = await getRepository(User.User)
                            .createQueryBuilder('user')
                            .leftJoinAndSelect('user.contents', 'content')
                            .leftJoinAndSelect('content.images', 'image')
                            .leftJoinAndSelect('content.tags', 'tag')
                            .where('tag.tagName like :tagName', {
                                tagName: `%${req.body.tagName}%`,
                            })
                            .getMany().then(result => res.status(200).send(result))
                            .catch((err) => res.sendStatus(404));
                    }
                );
                //게시글 추가
                this.app.post(
                    '/addPost',
                    async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User).findOne({
                            username: req.body.username,
                        });
                        //글 추가
                        const content = await getConnection()
                            .createQueryBuilder()
                            .insert()
                            .into(Content.Content)
                            .values([{ title: req.body.title, user }])
                            .execute()
                            .then((result) => {
                                //이미지 추가
                                const imageRepository = getRepository(
                                    Image.Image
                                );
                                const image = imageRepository.create();
                                image.imgName = req.body.imgName;
                                image.content = result.identifiers[0].id;
                                imageRepository.save(image);
                                //태그 추가
                                const tagRepository = getRepository(Tag.Tag);
                                const tag = tagRepository.create();
                                tag.tagName = req.body.imgName;
                                tag.content = result.identifiers[0].id;
                                tagRepository.save(tag);
                            }).then(result => res.sendStatus(201))
                            .catch((err) => res.sendStatus(404));
                    }
                );
                //게시글 수정
                this.app.put(
                    '/post',
                    async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User).find({
                            username: req.body.username,
                        });
                        const content = await getRepository(
                            Content.Content
                        ).findOne({
                            title: req.body.title,
                            created_at: req.body.created_at,
                        });
                        await getConnection()
                            .createQueryBuilder()
                            .update(Content.Content)
                            .set({ title: req.body.title })
                            .where(
                                `content.created_at = '${req.body.created_at}'`,
                                { user }
                            )
                            .execute();
                        await getConnection()
                            .createQueryBuilder()
                            .update(Image.Image)
                            .set({ imgName: req.body.imgName })
                            .where(`content.id = ${content.id}`)
                            .execute();
                        await getConnection()
                            .createQueryBuilder()
                            .update(Tag.Tag)
                            .set({ tagName: req.body.tagName })
                            .where(`content.id = ${content.id}`)
                            .execute()
                            .catch((err) => res.sendStatus(404));
                        return res.sendStatus(201);
                    }
                );

                //게시글 삭제  
                this.app.delete(
                    '/post',
                    async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User).find({
                            username: req.body.username,
                        });
                        const deleteContent = await getConnection()
                            .createQueryBuilder()
                            .delete()
                            .from(Content.Content)
                            .where(
                                `content.created_at = '${req.body.created_at}' and content.title = '${req.body.title}' `,
                                { user }
                            )
                            .execute()
                            .then((result) =>
                                res.sendStatus(200)
                            )
                            .catch((err) => {
                                console.log(err);
                                res.sendStatus(404);
                            });
                    }
                );

                //게시글 상세정보
                this.app.post(
                    '/post',
                    async (req: express.Request, res: express.Response) => {
                        try {
                            const content = await getRepository(User.User)
                                .createQueryBuilder('user')
                                .leftJoinAndSelect('user.contents', 'content')
                                .where('content.id like :id', {
                                    id: `%${req.body.id}%`,
                                })
                                .leftJoinAndSelect('content.images', 'image')
                                .leftJoinAndSelect('content.tags', 'tag')

                                .getOne().then(result => res.status(200).send(result))
                                .catch((err) => res.sendStatus(404));
                        } catch (error) {
                            console.error(error);
                        }
                    }
                );

                // 유저 추가
                this.app.post(
                    '/signup',
                    async (req: express.Request, res: express.Response) => {
                        const user = await getRepository(User.User).findOne({
                            email: req.body.email,
                        });
                        if (user) {
                            return res.sendStatus(404);
                        } else {
                            const addUser = await getRepository(
                                User.User
                            ).create(req.body);
                            const result = await getRepository(User.User)
                                .save(addUser).then(result => res.sendStatus(201))
                                .catch((err) => res.sendStatus(404));
                        }
                    }
                );
                //로그인 req요청에 맞는 유저가 있을 시, res 200 ELSE 404 response
                this.app.post(
                    '/signin',
                    async (req: express.Request, res: express.Response) => {
                        try {
                            const user = await getRepository(User.User).findOne(
                                {
                                    email: req.body.email,
                                    password: req.body.password,
                                }
                            );
                            if (user) {
                                return res.sendStatus(200);
                            } else {
                                return res.sendStatus(404);
                            }
                        } catch (error) {
                            console.error(error);
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
