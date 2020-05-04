// $('#button').on('click', function(){
//     const firstName = $('#firstName').val();
//     const lastName = $('#lastName').val();
//     const password = $('#password').val();
//     const email = $('#email').val();
//     const age = $('#age').val();
//     const about = $('#about').val();

//     const url = "http://localhost:4001/users/register";
//     const data = { 
//         firstName: firstName,
//         lastName: lastName,
//         password: password,
//         email: email,
//         age: age,
//         about: about };
//     // $.post(url, JSON.stringify(data), function(response) {
//     //     console.log(response)
//     // })
//     $.ajax({
//         type: "POST",
//         url: url,
//         data: JSON.stringify(data),
//         contentType: "application/json; charset=utf-8"
//     })
// })


$('#button').on('click', function(){
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const password = $('#password').val();
    const email = $('#email').val();
    const age = $('#age').val();
    const about = $('#about').val();
const fd = new FormData();    
fd.append( 'firstName', firstName);
fd.append( 'lastName', lastName);
fd.append( 'password', password);
fd.append( 'email', email);
fd.append( 'age', age);
fd.append( 'about', about);
fd.append( 'avatar', $("#avatar")[0].files[0]);
$.ajax({
  url: 'http://localhost:4001/users/register',
  data: fd,
  processData: false,
  contentType: false,
  type: 'POST',
  success: function(data){
    window.location.replace("http://localhost:4001/users/login")
}});
})

