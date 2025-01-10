import {FastifyReply } from "fastify";
import CustomError from './customError'; // Adjust the path as necessary

export default function HandleCustomError(e: unknown, reply: FastifyReply) {
    if (e instanceof CustomError) {
        reply.code(e.code).send(e.message);
        return;
    }
    reply.code(500).send('Internal Server Error');
}