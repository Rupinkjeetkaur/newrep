//full name validation
document.querySelector('#full-name').addEventListener('blur',(event)=>{
    let err = document.querySelector(".error-messg");
    err.innerText = "";
    try{
        //if field empty
        if(event.target.validity.valueMissing)
            throw event.target.validationMessage;
        
        else if(event.target.validity.patternMismatch){
            //event.target.setCustomValidity("Enter A valid name");
            throw "Please enter a valid name!";
        }

        else{
            event.target.style.borderBottomColor = 'green';
            err.innerText = "";
        }
    }

    catch(messg){
        err.innerText = messg;
    }
    
});


//to validate email
document.querySelector('#email').addEventListener('blur',(event)=>{
    validateEmail(event);
});

//to validate confirm email
document.querySelector('#confirm-email').addEventListener('blur',(event)=>{
    validateEmail(event);
    validateConfirmation(document.querySelector('#email'),event.target);
});


//function for email and confirm email validation
function validateEmail(event){
    let error = event.target.nextElementSibling;
    error.innerText = "";
    try{
        
        if(event.target.validity.valueMissing)
            throw event.target.validationMessage;

        else if(!event.target.validity.valid || event.target.value.slice(-4)!='.com')
            throw "Please enter a valid email.";

        else
            event.target.style.borderBottom = '2px solid green';
         
    }

    
    catch(messg){
        error.innerText = messg;
    }

}

//for validating confirm 
function validateConfirmation(el,cEl){
    if(el.value == cEl.value){
        cEl.nextElementSibling.innerText = "";
        document.querySelector('[type="submit"]').removeAttribute('disabled');
    }

    else{
        cEl.nextElementSibling.innerText = "Confirm email not mached!";
        document.querySelector('[type="submit"]').setAttribute('disabled',"disabled");
    }
}


//validating contact number
document.querySelector('#contact-no').addEventListener('blur',function(event){
    let error = event.target.nextElementSibling ;
    error.innerText = "";
    try{
        if(event.target.validity.valueMissing)
            throw event.target.validationMessage;

        else if(event.target.value.length!=10)
            throw "Please enter 10 digit mobile number.";

        else    
            event.target.style.borderBottom = "2px solid green";
    }
    catch(messg){
        error.innerText = messg;
    }
});


//password show/hide functionality
document.querySelector('.passkey-icon').addEventListener('click',displayPassword);
document.querySelectorAll('.passkey-icon')[1].addEventListener('click',displayPassword);

function displayPassword(event){
    if(event.target.parentNode.getAttribute('data-display-passkey')=='off'){
        event.target.parentNode.setAttribute('data-display-passkey','on');
        event.target.setAttribute('class','fas fa-eye-slash');
        event.target.parentElement.previousSibling.previousSibling.setAttribute('type','text');
        console.log(event.target.parentElement.previousSibling.previousSibling);
    }
    else{
        event.target.parentNode.setAttribute('data-display-passkey','off');
        event.target.setAttribute('class','fas fa-eye');
        event.target.parentElement.previousSibling.previousSibling.setAttribute('type','password');
    }
}


//adding to password field
document.querySelector("#passkey").addEventListener('blur',validatePassword);

//password validation
function validatePassword(event){
    let error = event.target.parentElement.nextElementSibling;
    error.innerText = "";
    try{
        console.log((event.target.value));
        console.log();
    if(event.target.validity.valueMissing)
        throw event.target.validationMessage;

    else if(!(/[0-9]{4,}/g).test(event.target.value)){
        throw "There must be atleast 4 digit.";
    }

    else if(event.target.value.length<8 || event.target.value.length>15){
        
        throw "Password must be 8 to 15 charaters.";
    }

    else{
        document.querySelector('[type="submit"]').removeAttribute('disabled');
        event.target.style.borderBottom = "2px solid green";
    }

    }
    catch(messg){
        document.querySelector('[type="submit"]').setAttribute('disabled',"disabled");
        error.innerText = messg;
    }
    console.log(error);
}


//confirm password validation
document.querySelector('#confirm-passkey').addEventListener('blur',function(event){
    try{
        var error = document.querySelectorAll('.error-messg')[5];
        error.innerText = "";
        if(event.target.validity.valueMissing)
            throw event.target.validationMessage;

        else if(document.querySelector('#passkey').value != event.target.value){
            throw "Password not matched!";
        }

        else{
            document.querySelector('[type="submit"]').removeAttribute('disabled');
            event.target.style.borderBottom = "2px solid green";
        }
    }

    catch(messg){
        document.querySelector('[type="submit"]').setAttribute('disabled',"disabled");
        error.innerText = messg;
    }
});

console.log(document.querySelector('#email'));

/*Captcha*/

let captchaText = document.querySelector('#captcha');
let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#csubmit');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refresh');

let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];
for(let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
captchaText.innerHTML = emptyArr.join('');

userText.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
        if(userText.value === captchaText.innerHTML) {
            output.classList.add("greenText");
            output.innerHTML = "Correct!";
        } else {
            output.classList.add("redText");
            output.innerHTML = "Incorrect, please try again";
        }
    }
});

submitButton.addEventListener('click',  function() {
    if(userText.value === captchaText.innerHTML) {
        output.classList.add("greenText");
        output.innerHTML = "Correct!";
    } else {
        output.classList.add("redText");
        output.innerHTML = "Incorrect, please try again";
    }
});

refreshButton.addEventListener('click', function () {
    userText.value = "";
    let refreshArr = [];
    for(let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    captchaText.innerHTML = refreshArr.join('');
    output.innerHTML = "";
});

submitButton.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
    if(userText.value === captchaText.innerHTML) {
        console.log("correct!");
        output.classList.add("greenText");
        output.innerHTML = "Correct!";
    } else {
        output.classList.add("redText");
        output.innerHTML = "Incorrect, please try again";
    }
    }
});
