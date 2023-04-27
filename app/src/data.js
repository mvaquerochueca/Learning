console.log('load data')

export const users = () =>
    'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []

// users.push({
//     id: 'user-1',
//     name: 'Kaladin Stormblessed',
//     email: 'kaladin@stormblessed.com',
//     password: '123123123',
// })

// users.push({
//     id: 'user-2',
//     name: 'Adolin Kholin',
//     email: 'adolin@kholin.com',
//     password: '123123123',
// })

// users.push({
//     id: 'user-3',
//     name: 'Shallan Davar',
//     email: 'shallan@davar.com',
//     password: '123123123',
// })

export const posts = () => {
    const posts =
        'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []

    posts.forEach((post) => (post.date = new Date(post.date)))

    return posts
}

// posts.push({
//     id: 'post-1',
//     author: 'user-1',
//     image: 'https://static.displate.com/280x392/displate/2023-02-11/663a72ae8d113831d58f9e651cdd7ac0_19788ce7fe31bc09ea9c7393645c9c28.jpg',
//     text: 'Kaladin Stormblessed',
//     date: new Date(2023, 8, 6, 23, 45, 0),
// })

// posts.push({
//     id: 'post-2',
//     author: 'user-1',
//     image: 'https://www.worldanvil.com/uploads/images/6af624c2ffb7462ce5c73062cb612109.jpg',
//     text: 'Adolin',
//     date: new Date(2023, 1, 28, 3, 45, 0),
// })

// posts.push({
//     id: 'post-3',
//     author: 'user-2',
//     image: 'https://i1.sndcdn.com/artworks-000249151731-f9juwu-t500x500.jpg',
//     text: 'Shallan',
//     date: new Date(2023, 10, 19, 13, 45),
// })

export function saveUsers(users) {
    localStorage.usersJson = JSON.stringify(users)
}
export function saveUser(user) {
    const _users = users()

    const index = _users.findIndex((_user) => _user.id === user.id)

    if (index < 0) _users.push(user)
    else _users.splice(index, 1, user)

    saveUsers(_users)
}

export function savePosts(posts) {
    localStorage.postsJson = JSON.stringify(posts)
}

export function savePost(post) {
    const _posts = posts()

    const index = _posts.findIndex((_post) => _post.id === post.id)

    if (index < 0) _posts.push(post)
    else _posts.splice(index, 1, post)

    savePosts(_posts)
}
