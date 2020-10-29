//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

function guardarDatos() {
    // Funcion que guarda los datos ingresados en el form para creacion de perfil

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let edad = document.getElementById("edad").value;
    let email = document.getElementById("email").value;
    let numero = document.getElementById("number").value;

    let datos = JSON.stringify({
        "nombre": nombre, 
        "apellido": apellido,
        "edad": edad,
        "email": email,
        "number" : numero,
    })

    localStorage.setItem('Datos', datos);
    
    
}
