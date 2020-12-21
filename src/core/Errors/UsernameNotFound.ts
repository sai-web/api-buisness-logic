export class UsernameNotFound extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "UsernameNotFound"
        this.message = "The credential you've entered are incorrect. Please re-check them!"
    }
}