/* ELEMENTOS HTML UTILIZADOS */
const copyBtn = document.getElementById("copy-btn");
const copyTooltip = document.getElementById("copy-tooltip");
const form = document.querySelector("form");
const closeModalBtn = document.querySelector(".close-modal");
const modalContainer = document.querySelector(".modal-container");
const modalLoader = document.querySelector(".modal-loader");
const modal = document.querySelector(".modal");

/* FUNCIONES PARA EL BOTÓN "COPIAR" */

// Copia mi Email al portapapeles del usuario
function copyEmail() {
    navigator.clipboard.writeText("matigomez2173@gmail.com");
    copyTooltip.innerText = "Copiado";
}

// Restaura el mensaje del Tooltip "Copiar"
function restoreCopyMsg() {
    if(copyTooltip.innerText == "Copiado")
        copyTooltip.innerText = "Copiar";
}

/* FUNCIONES PARA EL FUNCIONAMIENTO DEL FORMULARIO */

// Maneja el envio del formulario de contacto
async function formSubmit(e) {
    e.preventDefault()
    showModalLoader();

    const formData = new FormData(e.target);
    const { isValid, data } = validateFormData(formData);

    if (isValid) {
        try {
            const response = await executeEmailSend(data);
            console.log("SUCCESS", response.status, response.text);
            showModalResult(true, data);
        } catch (error) {
            console.log("FAILED...", error);
            showModalResult(false, data);
        }
    }
    else {
        showModalResult(false, data);
    }
}

// Valida y formatea los datos del formulario
function validateFormData(formData) {
    const data = {};
    let isValid = true;

    formData.forEach((value, key) => {
        data[key] = value.trim()
        if (!value) {
            isValid = false;
        }
    });

    return { isValid, data };
}

// Ejecuta el envio del correo y retorna una promesa que resuelve o rechaza con un objeto que contiene el estado y el texto
async function executeEmailSend(data) {
    return emailjs.send("default_service", "template_9av6ppa", data);
}

// Muestra una pantalla de carga en el contenedor del Modal
function showModalLoader() {
    modalContainer.classList.add('show');
    modalLoader.classList.add('show');
    closeModalBtn.disabled = true;
}

function closeModalLoader() {
    modalLoader.classList.remove('show');
    closeModalBtn.disabled = false;
}

// Completa los datos del Modal (dependiendo de un estado) y lo muestra
function showModalResult(isSuccess, data) {
    closeModalLoader();
    
    const fullName = data["fst-name"] && data["lst-name"] ? `${data["fst-name"]} ${data["lst-name"]}` : "lo siento";
    document.querySelector(".modal-client-name").textContent = fullName;
    
    const description = isSuccess
        ? `Gracias por ponerte en contacto conmigo. Pronto estaré leyendo tu mensaje y te responderé a la dirección de correo que me indicaste: ${data["email"]}`
        : ":( Algo salió mal al enviarme tu mensaje. Prueba intentando nuevamente más tarde, o contactame directamente a mi"
    document.querySelector(".modal-description").textContent = description;
    
    modal.classList.add('show');
}

// Cierra el Modal y reinicia el formulario
function closeModal() {
    modal.classList.remove("show");
    modalContainer.classList.remove("show");
    form.reset();
}

// Inicializando EmailJS
emailjs.init({publicKey: "0FIM2mvsHi7iAjPzJ"});


/* AGREGACIÓN DE EVENT LISTENER A LOS ELEMENTOS HTML*/

// Escucha eventos sobre la interacción del usuario sobre el botón "Copiar"
copyBtn.addEventListener("click", copyEmail);
copyBtn.addEventListener("mouseout", restoreCopyMsg);
copyBtn.addEventListener("touchend", restoreCopyMsg);

// Escucha eventos de envío de formulario
form.addEventListener("submit", formSubmit);

// Escucha eventos de click en el botón de "Cerrar" del modal
closeModalBtn.addEventListener("click", closeModal);
