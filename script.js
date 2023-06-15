const main = document.querySelector('#main')
// get the main element under which we will have our posts

const numberPost = document.querySelector('#number-of-posts')


function createPost({id, title, body }, userName) {
    // Creates the post content
    const htmlSegment = `
    <div class="card m-2 bg-light " style="width: 30rem;" id="post-${id}">
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
    // add each individual post to the main 
    main.innerHTML+=htmlSegment
}

function createComments({email, body, postId}){
    // create comments for each post
    const comment = document.querySelector(`#comment-box-${postId}`)
    const htmlSegment = 
    `  <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${email}</div>
            ${body}
            </div>
        </li>
    `
    // add each individual comment under the post
    comment.innerHTML += htmlSegment
}

async function getUsers() {
    // gets us the username to map with userId
    let url = `https://jsonplaceholder.typicode.com/users`
    let userData = await fetch(url)
    return userData.json()
}

async function getPost(user) {
    // gets the data for each post
    let url = `https://jsonplaceholder.typicode.com/posts`
    let postData = await fetch(url)
    let post = await postData.json() 
    
    //loop through each postsdata and create the post
    post.forEach((element) => {
        let userName = user[element.userId -1].username
        createPost(element,userName)
    });
}

async function getComments() {
    // gets the comments and create comments
    let url = `https://jsonplaceholder.typicode.com/comments`
    let commentData = await fetch(url)
    let comments = await commentData.json()
    comments.forEach(element => {
        createComments(element)
    }); 
}

async function posts() {
    // gets all of the functions together
    let user = await getUsers()
    await getPost(user)
    await getComments()
}

posts()

//Control the number of posts to display
numberPost.addEventListener('change', (e) => {
    const posts = main.children
    for(let post of posts){
        let id = parseInt(post.id.substring(5))
        if(id <= parseInt(e.target.value)){
            post.classList.remove('d-none')
        }
        else{
            post.classList.add('d-none')
        }
    }
})
// calling the name function 
