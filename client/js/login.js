$('#button').on('click', function(){
    const password = $('#password').val();
    const email = $('#email').val();
    const url = "http://localhost:4001/users/login";
    const data = { 
        password: password,
        email: email
    };
    // $.post(url, JSON.stringify(data), function(response) {
    //     console.log(response)
    // })
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(data){
            if (data.token) {
                window.localStorage.setItem("testKey", data.token);
                window.location.replace("http://localhost:4001/posts")
            }
        }
    })
})