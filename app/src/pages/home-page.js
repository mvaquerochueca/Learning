console.log('load home-page')

import initProfilePanel from '../components/profile-panel.js'
import { context, show, hide } from '../ui.js'
import { loginPage } from './login-page.js'
import retrievePosts from '../logic/retrieve-post.js'
import retrieveUser from '../logic/retrieve-user.js'
import { updatePost } from '../logic/update-posts.js'
import initAddPostPanel from '../components/add-post-panel.js'
import toggleLikePost from '../logic/toggle-like-post.js'
import deletePost from '../logic/delete-post.js'
import { savePost } from '../data.js'

const DEFAULT_AVATAR_URL =
    'https://www.17thshard.com/forum/uploads/monthly_2016_11/cosmere_symbol.png.6e4715593bec01929a850170904f5a4d.png'

export const homePage = document.querySelector('.home')
const avatarImage = homePage.querySelector('.home-header-avatar')
const profileLink = homePage.querySelector('a')
const addPostButton = homePage.querySelector('.add-post-button')

const profilePanel = initProfilePanel(homePage, avatarImage)
const addPostPanel = initAddPostPanel(homePage, renderPosts)

const editPostPanel = homePage.querySelector('.edit-post')
const editPostForm = editPostPanel.querySelector('form')

const postListPanel = homePage.querySelector('.post-list')

profileLink.onclick = function (event) {
    event.preventDefault()

    show(profilePanel)
    hide(postListPanel)
}

homePage.querySelector('.button-home').onclick = function () {
    show(postListPanel)
    hide(profilePanel)
}

homePage.querySelector('.btn-container-header-logout').onclick = function () {
    delete context.userId
    avatarImage.src = DEFAULT_AVATAR_URL
    hide(homePage, profilePanel)
    show(loginPage)
}
addPostButton.onclick = () => show(addPostPanel)

editPostForm.onsubmit = (event) => {
    event.preventDefault()

    const postId = event.target.postId.value
    const image = event.target.image.value
    const text = event.target.text.value

    try {
        updatePost(context.userId, postId, image, text)
        alert('post Updated')

        hide(editPostPanel)
        renderPosts()
    } catch (error) {
        alert(error.message)
    }
}

editPostForm.querySelector('.button-cancel').onclick = (event) => {
    event.preventDefault()

    editPostForm.reset()

    hide(editPostPanel)
}
export function renderPosts() {
    try {
        const posts = retrievePosts(context.userId)

        postListPanel.innerHTML = ''

        posts.forEach((post) => {
            const postItem = document.createElement('article')

            const image = document.createElement('img')
            image.src = post.image

            const text = document.createElement('p')
            text.innerText = post.text

            const date = document.createElement('time')
            date.innerText = post.date.toLocaleString()

            if (post.author === context.userId) {
                const editButton = document.createElement('button')
                editButton.style.height = '50%'
                editButton.style.fontSize = '1rem'
                editButton.style.borderRadius = '5px'

                editButton.innerText = 'Edit'

                const deleteButton = document.createElement('button')
                deleteButton.style.fontSize = '1rem'
                deleteButton.style.height = '50%'
                deleteButton.style.borderRadius = '5px'

                deleteButton.innerText = 'Delete'

                editButton.onclick = () => {
                    editPostForm.querySelector('input[type=hidden]').value =
                        post.id
                    editPostForm.querySelector('input[type=url]').value =
                        post.image
                    editPostForm.querySelector('textarea').value = post.text

                    show(editPostPanel)
                }

                deleteButton.onclick = () => {
                    try {
                        deletePost(context.userId, post.id)
                        alert('post deleted')
                        renderPosts()
                    } catch {
                        alert(error.message)
                    }
                }

                postItem.append(image, text, date, editButton, deleteButton)
            } else {
                postItem.append(image, text, date)
            }

            // if (post.author === context.userId) {
            //     const deleteButton = document.createElement('button')
            //     deleteButton.innerText = 'Delete'

            //     deleteButton.onclick = () => {
            //         deletePost(context.userId, post.id)
            //         alert('post deleted')
            //         renderPosts()
            //         savePost()
            //     }
            // }

            const likeButton = document.createElement('button')
            likeButton.style.fontSize = '.9rem'
            likeButton.style.borderRadius = '5px'
            const countLikes = (post.likes && post.likes.length) || 0
            likeButton.innerText =
                post.likes && post.likes.includes(context.userId)
                    ? `❤️ (${countLikes})`
                    : `🤍 (${countLikes})`

            likeButton.onclick = () => {
                try {
                    toggleLikePost(context.userId, post.id)

                    renderPosts()
                } catch (error) {
                    alert(error.message)
                }
            }

            postItem.appendChild(likeButton)

            postListPanel.appendChild(postItem)
        })

        return true
    } catch (error) {
        alert(error.message)

        return false
    }
}

export function renderUser() {
    try {
        const user = retrieveUser(context.userId)

        profileLink.innerText = user.name

        avatarImage.src = user.avatar ? user.avatar : DEFAULT_AVATAR_URL

        return true
    } catch (error) {
        alert(error.message)

        return false
    }
}
