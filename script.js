emailjs.init({publicKey: "0FIM2mvsHi7iAjPzJ"});

let copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", copyEmail);
copyBtn.addEventListener("mouseout", restoreCopyMsg);
copyBtn.addEventListener("touchend", restoreCopyMsg);
let copyTooltip = document.getElementById("copy-tooltip");

let form = document.querySelector("form");
form.addEventListener("submit", sendEmail);

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
            },
            (error) => {
                console.log("FAILED...", error);
            },
        );
    }
}

function copyEmail() {
    navigator.clipboard.writeText("matigomez2173@gmail.com");
    copyTooltip.innerText = "Copiado"
}

function restoreCopyMsg() {
    if(copyTooltip.innerText == "Copiado")
        copyTooltip.innerText = "Copiar";
}
