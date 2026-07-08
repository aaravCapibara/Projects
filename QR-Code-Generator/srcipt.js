let imgBox = document.querySelector(".imgBox");
let qrImg = document.querySelector(".qrImage");
let qrText = document.querySelector(".qrText");
let genQr = document.querySelector(".genraterQR");
let message = document.querySelector("h2");

function GenerateQr() {
    let url = qrText.value.trim();
    if (url.startsWith("http://") || url.startsWith("https://")) {
        if(url.length > 0) {
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrText.value}`;
            imgBox.classList.add("show-img");

            message.classList.remove("hide");
            message.textContent = "Double click the QR code to copy!";
            setTimeout(() => {
            message.classList.add("hide");
            }, 1000);
        } else {
            qrText.classList.add("error");
            setTimeout(() => {
            qrText.classList.remove("error");
        }, 600);
        };

        message.classList.remove("hide");
        message.textContent = "Enter a URL";
        setTimeout(() => {
            message.classList.add("hide");
        }, 1000);
    } else {
        qrText.classList.add("error");
        setTimeout(() => {
        qrText.classList.remove("error");
        }, 600);

        message.classList.remove("hide");
        message.textContent = "Please enter a valid URL";
        setTimeout(() => {
            message.classList.add("hide");
        }, 1000);
    };
    
};

async function copyQR() {
    if (!qrImg.src) {
        message.classList.remove("hide");
        message.textContent = "No QR code to copy yet!";
        setTimeout(() => {
            message.classList.add("hide");
        }, 1000);
        return;
    };

    try {
        const response = await fetch(qrImg.src);
        const blob = await response.blob();

        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);

        message.classList.remove("hide")
        message.textContent = "Copied QR code!";
        setTimeout(() => {
            message.classList.add("hide");
        }, 1000);
    } catch (err) {
        message.classList.remove("hide")
        message.textContent = `Failed to copy QR code!${err}`;
        setTimeout(() => {
            message.classList.add("hide");
        }, 1000);
    };
};

qrImg.addEventListener("dblclick", copyQR);
genQr.addEventListener("click",GenerateQr);