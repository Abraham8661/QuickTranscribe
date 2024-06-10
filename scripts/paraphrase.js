async function postRequest(url, method, data) {
    const options = {
      method: method,
      headers: {
        "x-rapidapi-key": "0e8fcdd673mshac9b775a16a5122p1aa8bejsnc3ca899167fd",
        "x-rapidapi-host": "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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


function paraphraser(){
    const paraphraseForm = document.getElementById('paraphrase-section');
    paraphraseForm.addEventListener('submit', (event)=>{
        event.preventDefault()
        loadingScreen()
        const textToParaphrase = paraphraseForm.querySelector("textarea");
        const data = {
            language: 'en',
            strength: 3,
            text: textToParaphrase.value,
        }
        postRequest('https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite', 'POST', data)
        .then((response)=>{
            loadingScreen()
            const paraphraseResultSec = document.getElementById('paraphrase-result-section');
            paraphraseResultSec.classList.remove('hidden');
            paraphraseResultSec.classList.add('flex');
            const paraphraseResult = document.getElementById('paraphrase-result');
            paraphraseResult.textContent = response.rewrite;
        })
    }) 
}
paraphraser()

//Paste Text
const paraphrasePasteTextBtn = document.getElementById('paste-words-to-paraphrase-btn');
paraphrasePasteTextBtn.addEventListener('click', ()=>{
    //Where to paste
    const paraphraseForm = document.getElementById('paraphrase-section');
    const paraphraseTextBox = paraphraseForm.querySelector("textarea");
    pasteText(paraphraseTextBox)
})

//Copy paraphrased text
const paraphraseCopyTextBtn = document.getElementById('copy-paraphrase-btn');
paraphraseCopyTextBtn.addEventListener('click', ()=>{
    //Where to paste
    const paraphraseResult = document.getElementById('paraphrase-result');
    copyText(paraphraseResult.textContent, paraphraseCopyTextBtn)
})

//Clear Texts
function clearAllTexts(){
    const paraphraseForm = document.getElementById('paraphrase-section');
    const paraphraseTextBox = paraphraseForm.querySelector("textarea");
    const paraphraseResult = document.getElementById('paraphrase-result');
    const paraphraseResultSec = document.getElementById('paraphrase-result-section');
    const clearTextsBtn = document.getElementById('clear-paraphrase-words-btn');
    clearTextsBtn.addEventListener('click', ()=>{
        paraphraseTextBox.value = '';
        paraphraseResult.textContent = '';
        paraphraseResultSec.classList.remove('flex');
        paraphraseResultSec.classList.add('hidden');
    })
}
clearAllTexts()