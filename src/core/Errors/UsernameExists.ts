export class UsernameExists extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "UsernameExists"
        this.message = "This username has already been taken. Please choose another one!"
    }
}