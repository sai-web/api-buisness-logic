//validate the request so that you dont return important credentials
export const invalidCreds = (obj: object) => {
    return obj.hasOwnProperty("password") || obj.hasOwnProperty('email') || obj.hasOwnProperty('phone')
}