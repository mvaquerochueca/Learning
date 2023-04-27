import { context, hide } from '../ui.js'
import createPost from '../logic/create-post.js'
import { renderPosts } from '../pages/home-page.js'

export default function initAddPostPanel(homePage) {
    const addPostPanel = homePage.querySelector('.add-post')
    const addPostForm = addPostPanel.querySelector('form')

    addPostForm.querySelector('.button-cancel').onclick = (event) => {
        event.preventDefault()

        addPostForm.reset()

        hide(addPostPanel)
    }

    addPostPanel.querySelector('form').onsubmit = (event) => {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            createPost(context.userId, image, text)

            alert('post created')

            hide(addPostPanel)
            renderPosts()
        } catch (error) {
            alert(error.message)
        }
    }
    return addPostPanel
}
