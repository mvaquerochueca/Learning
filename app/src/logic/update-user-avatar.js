import { validateUrl, validateId } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'
import { saveUser } from '../data.js'

export function updateUserAvatar(userId, avatar) {
    validateId(userId, 'user Id')
    validateUrl(avatar, 'avatar Url')

    const user = findUserById(userId)

    if (!user) throw new Error('user not found')

    user.avatar = avatar

    saveUser(user)
}
