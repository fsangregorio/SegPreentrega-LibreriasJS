const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const eMail = document.getElementById("eMail");
const consulta = document.getElementById("consulta");


formulario.addEventListener("submit", validarFormulario);

function validarFormulario(event){
    event.preventDefault();
    
    const usuario = {
        nombre: nombre.value,
        apellido: apellido.value,
        edad: edad.value,
        eMail: eMail.value,
        consulta: consulta.value,
    }

    console.log(usuario);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su consulta ha sido enviada con éxito.',
        showConfirmButton: false,
        timer: 2500
      })

    formulario.reset();
}

function guardarDatos() {
    
    const datosUsuario = {
        Nombre: nombre.value,
        Apellido: apellido.value,       
        Edad: edad.value,
        EMail: eMail.value,
        Consulta: consulta.value,
    }

    const datosUsuarioJSON = JSON.stringify(datosUsuario)

    localStorage.setItem('Usuario', datosUsuarioJSON)

    const datosUsuario2 = JSON.parse(localStorage.getItem('Usuario'))
    console.log(datosUsuario2)

}