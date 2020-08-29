var btn = document.getElementById("boton");
var user = document.getElementById("user");
var password = document.getElementById("password");

var alert = document.getElementById("alert")


function checkData(e){
    if(user.value === "" || password.value === ""){
        alert.innerHTML= `<strong>Usuario y/o contraseña incorrectos.</strong>`
        e.preventDefault();

    }else{
    
    localStorage.setItem("user", user.value);
    window.location.href = "firstpage.html";
    e.preventDefault();
	}
	
	
}

btn.addEventListener('click', checkData)