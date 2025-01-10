export default class CustomError extends Error {
    code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = this.constructor.name; // Set the error name to the class name
        this.code = code
    }
}