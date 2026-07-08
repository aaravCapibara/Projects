const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#toText");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const icons = document.querySelectorAll(".speaker, .copy");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }

        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;

    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            let translated = data.responseData.translatedText;
            let match = data.responseData.match;

            if (
                translated.toUpperCase().includes("MYMEMORY WARNING") ||
                match < 0.5 ||
                translated.trim().toLowerCase() === text.trim().toLowerCase()
            ) {
                alert("Translation not found. Please check your spelling or try a different word.");
                toText.setAttribute("placeholder", "Translation");
                toText.value = "";
                return;
            }

            toText.value = translated;
            toText.setAttribute("placeholder", "Translation");
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong. Please try again.");
            toText.setAttribute("placeholder", "An error occurred");
        });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!fromText.value && !toText.value) return;

        if (target.classList.contains("copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            window.speechSynthesis.speak(utterance);
        }
    });
});