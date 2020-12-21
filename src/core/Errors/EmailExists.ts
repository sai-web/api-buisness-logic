export class EmailExists extends Error {
    constructor(...params: Array<any>) {
        super(...params)
        this.name = "EmailExists"
        this.message = "An account with this email already exists. If you forgot your password, move to the reset password route"
    }
}