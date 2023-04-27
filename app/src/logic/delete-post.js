import { validateId } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'
import { users, posts, savePosts } from '../data.js'

export default function deletePost(userId, postId) {
    validateId(userId, 'userId')
    validateId(postId, 'postId')

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} does not exist`)

    const _posts = posts()

    const index = _posts.findIndex((post) => post.id === postId)

    if (index < 0) throw new Error(`post with id ${postId} does not exist`)

    if (_posts[index].author !== userId)
        throw new Error(
            `user with id ${userId} is not the author of post with id ${postId}`
        )

    _posts.splice(index, 1)

    savePosts(_posts)
}
