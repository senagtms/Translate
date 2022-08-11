const fromLang = document.querySelector("#from-lang");
const toLang= document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons")
for(let lang in languages){
   const option = `<option value="${lang}">${languages[lang]}</option>`

   fromLang.value = "tr-TR";
   toLang.value = "en-GB";

   fromLang.insertAdjacentHTML("beforeend",option);
   toLang.insertAdjacentHTML("beforeend",option);
   
}



btnTranslate.addEventListener("click",()=>{
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;
    const api_url= `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`;
    fetch(api_url).then(res=> res.json()).then(data=>{

        toText.value = data.responseData.translatedText

    })

})

exchange.addEventListener("click", ()=>{
    let text= fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang
})

for(let icon of icons){
    icon.addEventListener("click", (element)=>{
        if(element.target.classList.contains("fa-copy")){
            if(element.target.id == "from"){
                console.log("copy from");
                navigator.clipboard.writeText(fromText.value)
            }
            else{
                console.log("copy to");
                navigator.clipboard.writeText(toText.value)
            }
        }else{
            let utterance;
            if(element.target.id=="from"){
                console.log("voice");
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value
            }
            else{
                console.log("voice to");
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance)

        }
    })
}