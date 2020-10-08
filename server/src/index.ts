import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Content } from './entity/Content';

createConnection()
    .then(async (connection) => {
        // console.log('Inserting a new user into the database...');
        // const user = new User();
        // user.email = 'admin@gmail.com';
        // user.username = 'admin';
        // user.password = 'passwordtest';
        // await connection.manager.save(user);
        // console.log('Saved a new user with id: ' + user.id);

        // console.log('Loading users from the database...');
        // const users = await connection.manager.find(User);
        // console.log('Loaded users: ', users);

        // console.log(
        //     'Here you can setup and run express/koa/any other framework.'
        // );
        const content1 = new Content();
        content1.title = 'me.jpg';
        await connection.manager.save(content1);

        const content2 = new Content();
        content2.title = 'me-and-bears.jpg';
        await connection.manager.save(content2);

        const user = new User();
        user.username = 'John Cena';
        user.email = 'wwe@wwe.com';
        user.password = 'passwordtest';
        user.contents = [content1, content2];
        await connection.manager.save(user);
    })
    .catch((error) => console.log(error));
