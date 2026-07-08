let Prompt = document.querySelector("#promt");          // text input field
let container = document.querySelector(".container");   // the "Hello There!" heading section
let btn = document.querySelector(".btn");                // send button
let chatContainer = document.querySelector(".chat-container"); // holds all chat messages

let pastedImage = null;   // stores a base64 image string if the user pastes one

/* =========================================================
   IMAGE PASTE HANDLING
   ========================================================= */
Prompt.addEventListener("paste", (e) => {
    let items = e.clipboardData.items;

    for (let item of items) {
        if (item.type.startsWith("image/")) {
            let file = item.getAsFile();
            let reader = new FileReader();

            reader.onload = function (event) {
                pastedImage = event.target.result;
                showImagePreview(pastedImage);
            };

            reader.readAsDataURL(file);
        }
    }
});

function showImagePreview(base64) {
    let existing = document.querySelector(".preview-img");
    if (existing) existing.remove();

    let preview = document.createElement("img");
    preview.src = base64;
    preview.classList.add("preview-img");
    document.querySelector(".promt-area").appendChild(preview);
}


/* =========================================================
   SEND MESSAGE
   ========================================================= */
function sendMessage() {
    let currentMessage = Prompt.value.trim();
    let currentImage = pastedImage;

    if (currentMessage === "" && !currentImage) {
        container.style.display = "flex";
        return;
    } else {
        container.style.display = "none";
    }

    let html = `<div class="img">
            <img src="user.png" alt="ai.png" width="50px">
        </div>
            <p class="text"></p>`;

    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = currentMessage;

    if (currentImage) {
        let imgPreview = document.createElement("img");
        imgPreview.src = currentImage;
        imgPreview.style.maxWidth = "200px";
        imgPreview.style.borderRadius = "10px";
        userChatBox.appendChild(imgPreview);
    }

    chatContainer.appendChild(userChatBox);
    Prompt.value = "";

    setTimeout(() => showLoading(currentMessage, currentImage), 500);

    pastedImage = null;
    let oldPreview = document.querySelector(".preview-img");
    if (oldPreview) oldPreview.remove();
}

btn.addEventListener("click", sendMessage);

Prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});


/* =========================================================
   CALL GEMINI API
   ========================================================= */
async function getApiResponse(aiChatBox, message, imageData) {
    let textElement = aiChatBox.querySelector(".text");

    let parts = [{ text: message }];

    if (imageData) {
        let base64Data = imageData.split(",")[1];
        let mimeType = imageData.match(/data:(image\/\w+);/)[1];

        parts.push({
            inlineData: {
                mimeType: mimeType,
                data: base64Data
            }
        });
    }

    try {
        let response = await fetch(Api_Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        "role": "user",
                        "parts": parts
                    }
                ]
            })
        });

        let data = await response.json();

        let apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!apiResponse) {
            apiResponse = "Sorry, I couldn't get a response right now. Please try again in a moment.";
            console.log("API issue, full response:", data);
        }
        textElement.innerText = apiResponse;
    } catch (error) {
        console.log(error);
        textElement.innerText = "Something went wrong. Please try again.";
    } finally {
        aiChatBox.querySelector(".loading").style.display = "none";
    }
}


/* =========================================================
   SHOW LOADING BUBBLE (now includes a copy button)
   ========================================================= */
function showLoading(message, imageData) {
    let html = `<div class="img">
            <img src="ai.png" alt="ai.png" width="50px">
        </div>
            <p class="text"></p>
        <img class="loading" src="loading.gif" alt="loading.gif" height="50">
        <i class="far fa-copy copy-btn" title="copy to clipboard"></i>`;

    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);

    getApiResponse(aiChatBox, message, imageData);
}


/* =========================================================
   COPY TO CLIPBOARD (for AI responses)
   - Event delegation since chat boxes are created dynamically.
   - Shows a green checkmark animation on successful copy.
   ========================================================= */
chatContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("copy-btn")) {
        let aiChatBox = e.target.closest(".ai-chat-box");
        let textToCopy = aiChatBox.querySelector(".text").textContent;

        navigator.clipboard
            .writeText(textToCopy)
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = "#48bb78";
    element.title = "Copied!";

    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = "";
        element.title = "copy to clipboard";
    }, 1500);
}


/* =========================================================
   HELPER: CREATE A CHAT BOX ELEMENT
   ========================================================= */
function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}