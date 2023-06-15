const main = document.querySelector('#main')

function createPost({id, title, body }, userName) {
    const htmlSegment = `
    <div class="card m-2 bg-light" style="width: 30rem;">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${userName}</h6>
            <p class="card-text">${body}</p>
            <div class="accordion accordion-flush" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${id}" aria-expanded="true" aria-controls="collapseOne">
                        Comments
                    </button>
                    </h2>
                    <div id="collapse-${id}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <ol class="list-group list-group-numbered" id="comment-box-${id}"></ol>
                    </div>
                </div>
            </div>
        </div>
        <ol class="list-group list-group-numbered" id="comment-box-${id}"></ol>
        </div>
        </div>
    `
    
    main.innerHTML+=htmlSegment
}

function createComments({email, body, postId}){
    const comment = document.querySelector(`#comment-box-${postId}`)
    const html = comment.innerHTML
    const htmlSegment = 
    `  <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${email}</div>
            ${body}
            </div>
        </li>
    `
    comment.innerHTML += htmlSegment
}

async function getUsers() {
    let url = `https://jsonplaceholder.typicode.com/users`
    let userData = await fetch(url)
    return userData.json()
}

async function getPost(user) {
    let url = `https://jsonplaceholder.typicode.com/posts`
    let postData = await fetch(url)
    let post = await postData.json() 
    
    post.forEach(element => {
        let userName = user[element.userId -1].username
        createPost(element,userName)
    });
}

async function getComments() {
    let url = `https://jsonplaceholder.typicode.com/comments`
    let commentData = await fetch(url)
    let comments = await commentData.json()
    comments.forEach(element => {
        createComments(element)
    }); 
}

async function posts() {
    let user = await getUsers()
    await getPost(user)
    await getComments()
}

posts()
