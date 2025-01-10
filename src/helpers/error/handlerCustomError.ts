export default function HandleCustomError(e: any, reply: any) {
    if (e instanceof CustomError) {
        reply.code(e.code).send(e.message);
        return;
    }
    reply.code(500).send('Internal Server Error');
}