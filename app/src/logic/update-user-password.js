import {
    validatePasswordLogin,
    validatePasswordRegister,
    validateId,
} from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'
import { saveUser } from '../data.js'

export function updateUserPassword(
    userId,
    password,
    newPassword,
    newPasswordConfirm
) {
    validateId(userId)
    validatePasswordLogin(password)
    validatePasswordRegister(newPassword, 'new password')
    validatePasswordRegister(newPasswordConfirm, 'new password confirm')

    const user = findUserById(userId)

    if (!user) throw new Error('user not found')

    if (password !== user.password) throw new Error('wrong actual password')

    if (newPassword !== newPasswordConfirm)
        throw new Error('password confirmation mismatch')

    if (newPassword === password)
        throw new Error('new password equals old password')

    user.password = newPassword

    saveUser(user)
}
