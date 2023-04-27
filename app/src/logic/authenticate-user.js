import { validateEmail, validatePasswordLogin } from './helpers/validators.js'
import { findUserByEmail } from './helpers/data-managers.js'
export function authenticateUser(email, password) {
    validateEmail(email)
    validatePasswordLogin(password)

    const foundUser = findUserByEmail(email)

    if (!foundUser) throw new Error('user not found')

    if (foundUser.password !== password) throw new Error('wrong password')

    return foundUser.id
}
