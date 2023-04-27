import { validateId } from './helpers/validators.js'
import { users, posts } from '../data.js'

export default function retrievePosts(userId) {
    validateId(userId, 'use id')

    const found = users().some((user) => user.id === userId)

    if (!found) throw new Error(`user with id ${userId} not found`)

    return posts().toReversed()
}
//Hacer dos botones , uno para ver mis post y otro para ver todos los post

//TODO
//retrieve post
//return post
