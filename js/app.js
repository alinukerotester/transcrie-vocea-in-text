const speechRecognitionService = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognitionService = new speechRecognitionService();

const startBtn = document.querySelector(".btn-start");
const textLog = document.querySelector(".text-log");

const languages = {
    English: "en-US",
    Romanian: "ro-RO"
};

startBtn.addEventListener("click", () => {
    recognitionService.lang = determineLanguage();
    recognitionService.continuous = true;

    recognitionService.onresult = handleResult;
    recognitionService.start();
});

function determineLanguage(){
    const selected = document.querySelector('#language').value;
    switch(selected){
        case 'English':
            return languages.English;
        case 'Romanian':
            return languages.Romanian;
        default:
            throw new Error('Language not supported');
    }
}

function handleResult(event){
    const results = [];
    for(const result of event.results){
        results.push(`${result[0].transcript}`)
    }
    textLog.innerHTML += results.at(-1);
}