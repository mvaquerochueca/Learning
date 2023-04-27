import { validateId, validateUrl, validateText } from './helpers/validators.js'
import { findUserById } from './helpers/data-managers.js'
import { users, posts, savePosts } from '../data.js'

export default function createPost(userId, image, text) {
    validateId(userId, 'userId'),
        validateUrl(image, 'image'),
        validateText(text)

    const user = findUserById(userId)

    if (!user) throw new Error(`user with id ${userId} does not exist`)

    let id = 'post-1'
    const _posts = posts()

    const lastPost = _posts[_posts.length - 1]

    if (lastPost) {
        id = 'post-' + (parseInt(lastPost.id.slice(5)) + 1)
    }

    const reader = new FileReader()

    const post = {
        id,
        author: userId,
        image: reader.result,
        text,
        date: new Date(),
    }

    _posts.push(post)
    savePosts(_posts)
}

reader.readAsDataURL(imageFile)

//TODO
//chek if user exist with userId
//create post Id
//create post objetc and add author , image, text  anda date(new date propierties )
//add post to post array
