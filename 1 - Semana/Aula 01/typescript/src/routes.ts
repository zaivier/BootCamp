import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: 'Athus',
        email: 'athuskz@gmail.com',
        password: 'senha',
        techs: ['Node Js', 'ReactJs', 
        {
            title: 'React-native',
            experience: 50
        }]
    });
    return response.json({ message: 'Hello World' });
}