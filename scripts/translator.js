//https://rapidapi.com/dickyagustin/api/text-translator2/playground/apiendpoint_147f196f-95f1-49c4-9d04-84f4e422e342

//paraphrase
//https://rapidapi.com/alreadycoded/api/ai-based-text-paraphrasing/playground/apiendpoint_7092fd68-4040-4174-b909-ca90e6f9c162

//https://rapidapi.com/genius-tools-genius-tools-default/api/paraphrase-genius/playground/apiendpoint_ae211be3-55e8-4793-9e2e-0672113bbd04

const translateForm = document.getElementById("translate-section");
const copyTranslatedTextBtn = document.getElementById('copy-translated-words-btn');
const pasteTextBtn = document.getElementById('paste-words-to-translate-btn');

function loadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.toggle("flex");
  loadingScreen.classList.toggle("hidden");
}

function switchFeaturesUi() {
  const translateSection = document.getElementById("translate-section");
  const paraphraseSection = document.getElementById("paraphrase-section");
  const translateSwitchBtn = document.getElementById("translate-switch-btn");
  const paraphraseSwitchBtn = document.getElementById("paraphrase-switch-btn");

  translateSwitchBtn.addEventListener("click", () => {
    translateSection.classList.remove("hidden");
    translateSection.classList.add("flex");
    translateSwitchBtn.classList.remove("switchToParaphraseToggle");
    translateSwitchBtn.classList.add("switchToTranslateToggle");
    paraphraseSwitchBtn.classList.remove("switchToTranslateToggle");
    paraphraseSwitchBtn.classList.add("switchToParaphraseToggle");
    paraphraseSection.classList.remove("flex");
    paraphraseSection.classList.add("hidden");
  });

  paraphraseSwitchBtn.addEventListener("click", () => {
    paraphraseSection.classList.remove("hidden");
    paraphraseSection.classList.add("flex");
    paraphraseSwitchBtn.classList.remove("switchToParaphraseToggle");
    paraphraseSwitchBtn.classList.add("switchToTranslateToggle");
    translateSwitchBtn.classList.remove("switchToTranslateToggle");
    translateSwitchBtn.classList.add("switchToParaphraseToggle");
    translateSection.classList.remove("flex");
    translateSection.classList.add("hidden");
  });
}
switchFeaturesUi();

function switchElements(element1, element2) {
  //Create a new temporary placeholder
  const placeholder = document.createElement("div");

  //Move placeholder to element1 position
  element1.parentNode.insertBefore(placeholder, element1);

  //Move element 1 to element 2 position
  element2.parentNode.insertBefore(element1, element2);

  //Move element 2 to placeholder position
  placeholder.parentNode.insertBefore(element2, placeholder);

  //Remove placeholder
  placeholder.parentNode.removeChild(placeholder);
}

function swapLanguage() {
  const firstLanguage = document.getElementById("first-language");
  const secondLanguage = document.getElementById("second-language");
  const firstLanguageSec = document.getElementById("first-translate-group");
  const secondLanguageSec = document.getElementById("second-translate-group");
  const swapButton = document.getElementById("switch-btn");

  swapButton.addEventListener("click", () => {
    //switchElements(firstLanguage, secondLanguage)
    switchElements(firstLanguageSec, secondLanguageSec);
    //const translateForm = document.getElementById('translate-section');
    //console.log(translateForm.childNodes)
  });
}
swapLanguage();

async function sendRequest(url, method, data) {
  const options = {
    method: method,
    headers: {
      "x-rapidapi-key": "0e8fcdd673mshac9b775a16a5122p1aa8bejsnc3ca899167fd",
      "x-rapidapi-host": "text-translator2.p.rapidapi.com",
    },
    body: data,
  };

  try {
    const result = await fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        throw new Error("Something went wrong! Try restarting the page");
      });
    return result;
  } catch (error) {
    const newError = new Error("Something went wrong! Try restarting the page");
    alert(newError);
  }
}

function appendLanguagesToUi(allLanguages, selectSection) {
  allLanguages.forEach((language) => {
    const languageCode = language.code;
    const languageName = language.name;
    const newOption = document.createElement("option");
    newOption.classList = "bg-white text-black";
    newOption.value = languageCode;
    newOption.textContent = languageName;
    selectSection.append(newOption);
  });
}

function getAllLanguages() {
  sendRequest(
    "https://text-translator2.p.rapidapi.com/getLanguages",
    "GET"
  ).then((response) => {
    const firstLanguage = document.getElementById("first-language-option");
    const secondLanguage = document.getElementById("second-language-option");
    appendLanguagesToUi(response.data.languages, firstLanguage);
    appendLanguagesToUi(response.data.languages, secondLanguage);
  });
}
getAllLanguages()

//const translateForm = document.getElementById('translate-section');
//const firstEle = translateForm.childNodes[1]
//const secondEle = translateForm.childNodes[5]
//console.log(firstEle);
//console.log(secondEle);

function translator() {
  translateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    loadingScreen()

    //Hide copy indication
    const copyIndication = copyTranslatedTextBtn.querySelector('.copied-indication');
    copyIndication.classList.add('opacity-0');

    const firstEle = translateForm.childNodes[1];
    const secondEle = translateForm.childNodes[5];
    const firstLanguageText = firstEle.querySelector("textarea");
    //console.log(firstLanguageText)
    const secondLanguageText = secondEle.querySelector("textarea");
    //console.log(secondLanguageText)
    const source_language = firstEle.querySelector("select");
    const target_language = secondEle.querySelector("select");

    const data = new FormData();
    data.append("source_language", source_language.value);
    data.append("target_language", target_language.value);
    data.append("text", firstLanguageText.value);

    sendRequest(
      "https://text-translator2.p.rapidapi.com/translate",
      "POST",
      data
    ).then((response) => {
      secondLanguageText.value = response.data.translatedText;
      loadingScreen()
    });
  });
}
translator();

//const firstEle = translateForm.childNodes[1];
//const secondEle = translateForm.childNodes[5];
//const firstLanguageText = firstEle.querySelector("textarea");
////console.log(firstLanguageText)
//const secondLanguageText = secondEle.querySelector("textarea");
////console.log(secondLanguageText)


function copyText(textToCopy, copyBtn){
    navigator.clipboard.writeText(textToCopy)
    .then(()=>{
        const copyIndication = copyBtn.querySelector('.copied-indication');
        copyIndication.classList.remove('opacity-0');
    })
    .catch(()=>{
        const newError = new Error('Failed to copy text');
        alert(newError) 
    })
}

function pasteText(pasteLocation){
    navigator.clipboard.readText()
    .then((text)=>{
        //Where to paste
        pasteLocation.value = text;
    })
    .catch(()=>{
        const newError = new Error('Failed to paste text');
        alert(newError) 
    })
}


copyTranslatedTextBtn.addEventListener('click', ()=>{
    const secondEle = translateForm.childNodes[5];
    const secondLanguageText = secondEle.querySelector("textarea");
    copyText(secondLanguageText.value, copyTranslatedTextBtn);
})

pasteTextBtn.addEventListener('click', ()=>{
    const firstEle = translateForm.childNodes[1];
    const firstLanguageText = firstEle.querySelector("textarea");
    pasteText(firstLanguageText)
})

const clearTextBtn = document.getElementById('clear-language-words-btn');
clearTextBtn.addEventListener('click', ()=>{
    const firstEle = translateForm.childNodes[1];
    const firstLanguageText = firstEle.querySelector("textarea");
    firstLanguageText.value = ''

    const secondEle = translateForm.childNodes[5];
    const secondLanguageText = secondEle.querySelector("textarea");
    secondLanguageText.value = ''
})