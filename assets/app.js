//variables
const formulario = document.querySelector("#formulario");
const respuesta = document.querySelector("#respuesta");
const boton = document.querySelector("#boton");
let arrayTweet = [];

//eventos
(() => {
    formulario.addEventListener("submit", validarForm);
    respuesta.addEventListener('click', eliminarTweet);
    //mostrarDatos de LocalStorage cuando se recarga la pagina
    document.addEventListener("DOMContentLoaded", () => {
        const datosLS = JSON.parse(localStorage.getItem('misTweets')) || [];
        arrayTweet = datosLS;
        mostrarHTML();
    })
})()


//funciones
function validarForm(e) {
    e.preventDefault()
    //llamar al valor del input
    const tweet = document.querySelector("#tweet").value;
    if (!tweet.trim()) {
        mostrarAlerta("FORMULARIO VACIO")
        return
    }
    const objTweet = { id: Date.now(), tweet }
    arrayTweet = [...arrayTweet, objTweet];
    formulario.reset();
    mostrarHTML();

}

function mostrarAlerta(sms) {
    boton.textContent = sms
    boton.classList.add('boton-error');
    boton.classList.remove('boton');
    boton.disabled = true
    

    setTimeout(() => {
        boton.classList.remove('boton-error');
        boton.classList.add('boton');
        boton.textContent = "MIS TWEETS";
        boton.disabled = false
    }, 2000)
}

//MOSTRAR EN EL HTML
function mostrarHTML(){
    //limpiar el html
    while(respuesta.firstChild){
        respuesta.removeChild(respuesta.firstChild);
    }
    //iteramos el array
    arrayTweet.forEach( (item) => {
        const {tweet, id} = item;
        const lista = document.createElement('li');
        lista.classList.add('lista')
        lista.innerHTML = `
        <p>${tweet}</p>
        <button class="eliminar" data-id="${id}">x</button>
        `
        respuesta.appendChild(lista)
    } )
    if(arrayTweet.length === 0){
        const lista = document.createElement('li');
        lista.textContent = 'NO HAY TWEETS'
        lista.style.textAlign = 'center'
        respuesta.appendChild(lista)
    }
    //GUARDAR DATOS EN LOCALSTORAGE
    guardarLocalStorage();
}
function guardarLocalStorage(){
    localStorage.setItem('misTweets', JSON.stringify(arrayTweet));
}

function eliminarTweet(e){
    if(e.target.classList.contains('eliminar')){
        const id = e.target.getAttribute('data-id');
        const arrayFilter = arrayTweet.filter( (item) => item.id != id)
        arrayTweet = arrayFilter;
        mostrarHTML();
    }
}