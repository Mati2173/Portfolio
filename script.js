/* ELEMENTOS HTML UTILIZADOS */
let copyBtn = document.getElementById("copy-btn");
let copyTooltip = document.getElementById("copy-tooltip");
let form = document.querySelector("form");
let closeModalBtn = document.querySelector(".close-modal");


/* FUNCIONES PARA EL DESPLAZAMIENTO DE LAS IMAGENES */

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

// Abre el Modal y le coloca la información dependiendo si la información es válida o no
function openModal(isSucess, info) {
    document.querySelector(".modal-client-name").textContent = `${info["fst-name"]} ${info["lst-name"]}`;
    
    if (isSucess) {
        document.querySelector(".modal-description").textContent = `Gracias por ponerte en contacto conmigo. Pronto estaré leyendo tu mensaje y te responderé a la dirección de correo que me indicaste: ${info["email"]}`;
    }
    else {
        document.querySelector(".modal-description").textContent = ":( Algo salió mal al enviarme tu mensaje. Prueba intentando nuevamente más tarde, o contactame directamente a mi";
    }

    document.querySelector(".modal-container").classList.add("show");
}

// Cierra el modal y reinicia el formulario
function closeModal() {
    document.querySelector(".modal-container").classList.remove("show");
    form.reset();
}

// Me envia un correo si la información es válida y lo muestra en el modal
function sendEmail(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target)
    const data = {}
    let valid = true;
    
    formData.forEach((value, key) => {
        data[key] = value;
        if(value == "")
            valid = false;
    });
    
    if(valid) {
        emailjs.send("default_service", "template_9av6ppa", data).then(
            (response) => {
                console.log("SUCCESS", response.status, response.text);
                openModal(true, data);
            },
            (error) => {
                console.log("FAILED...", error);
                openModal(false, data);
            },
        );
    }
    else {
        openModal(false, data);
    }
}

// Inicializando EmailJS
emailjs.init({publicKey: "0FIM2mvsHi7iAjPzJ"});


/* AGREGACIÓN DE EVENT LISTENER A LOS ELEMENTOS HTML*/

// Escucha eventos sobre la interacción del usuario sobre el botón "Copiar"
copyBtn.addEventListener("click", copyEmail);
copyBtn.addEventListener("mouseout", restoreCopyMsg);
copyBtn.addEventListener("touchend", restoreCopyMsg);

// Escucha eventos de envío de formulario
form.addEventListener("submit", sendEmail);

// Escucha eventos de click en el botón de "Cerrar" del modal
closeModalBtn.addEventListener("click", closeModal);
