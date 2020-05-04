
// $("#button").on('click', () => {
// $.ajax({
//     type: "GET",
//     url: "http://localhost:4001/posts/allposts",
//     headers: {
//         Authorization: "Bearer " + window.localStorage.getItem("testKey")
//     },
//     contentType: "application/json; charset=utf-8",
//     success: function (data) {
//         console.log(data)
//         data.posts.forEach(element => {
//             const post = (`
//                 <div class="post">
//                 <p class="author">${element.firstName} ${element.lastName}</p>
//                 <p class="postText">${element.postText}</p>
//                 <p class="time">${element.timeCreated}</p>
//                 </div>`);
//             $("#posts").append(post)
//         });
//     }
// })
// })

const ajaxWithAuth = (type, url, success, json) => {
    $.ajax({
        type: type,
        url: url,
        headers: {
            Authorization: "Bearer " + window.localStorage.getItem("testKey")
        },
        data: json,
        contentType: "application/json; charset=utf-8",
        success: success
    })
}

ajaxWithAuth("GET", "http://localhost:4001/posts/allposts", function (data) {
    console.log(data)
    $("#main").empty()
    data.posts.forEach(element => {
        const post = (`
            <div class="post">
            <p class="author">${element.firstName} ${element.lastName}</p>
            <p class="postText">${element.postText}</p>
            <p class="time">${element.timeCreated}</p>
            </div>`);
        $("#main").append(post)
    });
})

$("#allPosts").on("click", () => {
    ajaxWithAuth("GET", "http://localhost:4001/posts/allposts", function (data) {
        console.log(data)
        $("#main").empty()
        data.posts.forEach(element => {
            const post = (`
            <div class="post">
            <p class="author">${element.firstName} ${element.lastName}</p>
            <p class="postText">${element.postText}</p>
            <p class="time">${element.timeCreated}</p>
            </div>`);
            $("#main").append(post)
        });
    })
})


$("#allUsers").on("click", () => {
    ajaxWithAuth("GET", "http://localhost:4001/users/all", function (data) {
        $("#main").empty()
        data.Users.forEach(element => {
            const user = (`
            <div class="user">
            <p class="name">${element.Name}</p>
            <img src="/avatars/${element.Avatar}" width="50px" alt="avatar">
            <p class="age">Age: ${element.Age}</p>
            <p class="about">About: ${element.About}</p>
            
            </div>
            `)
            $("#main").append(user)
        })
    })
})

function deletePost(postId, postIndex) {
    ajaxWithAuth("DELETE", "http://localhost:4001/posts/myposts", function (data) {
        $(`.${postIndex}`).remove()
    }, JSON.stringify({ postId: postId }))
}

function updatePost(postId, postIndex) {
    const inputvalue = $(`#input${postIndex}`).val()
    ajaxWithAuth("PUT", "http://localhost:4001/posts/myposts", function (data) {
        $(`.${postIndex}`).children('.postText').text(data)
    }, JSON.stringify({ postId: postId, postText: inputvalue }))
}

function createPost() {
    const inputvalue = $(`#newPostText`).val()
    ajaxWithAuth("POST", "http://localhost:4001/posts/myposts", function (data) {
        ajaxWithAuth("GET", "http://localhost:4001/posts/myposts", function (data) {
            $("#main").empty()
            data.myposts.forEach((element, index) => {
                const post = (`
            <div class="post ${index}">
            <p class="author">${element.firstName} ${element.lastName}</p>
            <p class="postText">${element.postText}</p>
            <p class="time">${element.timeCreated}</p>
            <input type="text" name="postText" value="${element.postText}" id="input${index}">
            <button onclick="updatePost('${element._id}', '${index}')" >Update post</button>
            <button onclick="deletePost('${element._id}', '${index}')">Delete post</button>
            </div>
            `)
                $("#main").append(post)
            })
        })
    }, JSON.stringify({ postText: inputvalue }))
}




$("#myPosts").on("click", () => {
    ajaxWithAuth("GET", "http://localhost:4001/posts/myposts", function (data) {
        $("#main").empty()
        data.myposts.forEach((element, index) => {
            const post = (`
            <div class="post ${index}">
            <p class="author">${element.firstName} ${element.lastName}</p>
            <p class="postText">${element.postText}</p>
            <p class="time">${element.timeCreated}</p>
            <input type="text" name="postText" value="${element.postText}" id="input${index}">
            <button onclick="updatePost('${element._id}', '${index}')" >Update post</button>
            <button onclick="deletePost('${element._id}', '${index}')">Delete post</button>
            </div>
            `)
            $("#main").append(post)
        })
    })
})

$('#newPost').on("click", () => {
    $("#main").empty()
    const form = (`
    <div class="post">
    <p>Write a new post:</p>
    <input type="text" name="postText" value="" id="newPostText" required>
    <button onclick="createPost()">Submit post</button>
    </div>
    `)
    $("#main").append(form)
})

$("#myProfile").on("click", () => {
    $("#main").empty()
    ajaxWithAuth("GET", "http://localhost:4001/users/myprofile", function (data) {
        $("#main").empty()
        const user = (`
            <div class="user">
            <p class="name">Your name: ${data[0].firstName} ${data[0].lastName}</p>
            <img src="/avatars/${data[0].avatar}" width="50px" alt="avatar">
            <p class="age">Age: ${data[0].age}</p>
            <p class="about">About: ${data[0].about}</p>
            <p class="email">Your email:${data[0].email}</p>
            </div>
            `)
        $("#main").append(user)

    })
})


$("#logout").on("click", () => {
    window.localStorage.setItem("testKey", 'erased');
    window.location.replace("http://localhost:4001/users/login")
})
