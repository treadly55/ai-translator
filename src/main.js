let selectedLanguage = ""
let isFirstTranslation = true
const loader = document.querySelector(".loader")

const updateSelectedLanguage = (event) => {
  selectedLanguage = event.target.value
  const imageElement = document.getElementById('headerImage')
  if (selectedLanguage === "Klingon") {
    imageElement.src = "/images/worf.png"
  } else {
    imageElement.src = "/images/parrot.png"
  }
}

document.querySelectorAll('.radio-card input').forEach(input => {
  input.addEventListener('change', updateSelectedLanguage)
})

function toggleTranslationBox() {
  const box = document.getElementById('trans-box');
  box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
}

function headerTextUpdate () {
  document.getElementById('translated-header').textContent = `Here is the ${selectedLanguage} translation:`
}

function restart() {
  document.getElementById("lang-form").reset()
  document.getElementById("translatedText").innerHTML = ""
  document.getElementById("restart-button").style.display = "none"
  document.getElementById("trans-box").style.display = "none"
  document.getElementById("translate-button").style.display = "flex"
  document.getElementById("translate-again-button").style.display = "none"
  document.getElementById('translate-button').innerHTML = "Translate"
  isFirstTranslation = true
}

function showRestartButton() {
  document.getElementById("restart-button").style.display = "flex"
}

document.getElementById('restart-button').addEventListener('click', function(){
  restart()
})

//MAIN FUNCTION//
function translateTextFunction() {
  if (isFirstTranslation) {
    toggleTranslationBox()
    headerTextUpdate()
    showRestartButton()
    loader.style.display = "flex"
    isFirstTranslation = false
  } else {
    headerTextUpdate()
  }
}

document.getElementById('lang-form').addEventListener('submit', async (event) => {
  event.preventDefault()
  translateTextFunction()
  const prompt = userInput.value
  selectedLanguage = document.querySelector('input[name="options"]:checked').value
  await fetchTranslation(prompt, selectedLanguage)
})

async function fetchTranslation(prompt, selectedLanguage) {
  try {
    const response = await fetch('/.netlify/functions/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        selectedLanguage
      })
    });

    if (!response.ok) {
      throw new Error('Translation request failed');
    }

    const data = await response.json();
    document.getElementById('translatedText').innerText = data.translation;
    document.getElementById('translate-button').innerHTML = "Translate Again";
    loader.style.display = "none";
  } catch (error) {
    document.getElementById('response').innerText = `Error: ${error.message}`;
    loader.style.display = "none";
  }
}

//SPEECH SYNTH FN
let currentUtterance = null;
let isPaused = false;
const playButtonText = document.getElementById('play');

function speakText(text, lang = 'en-US', speed) {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = speed
    currentUtterance = utterance
    isPaused = false
    utterance.onend = () => {
        playButtonText.innerHTML = "Play Translation"
        currentUtterance = null
        isPaused = false
    }
    speechSynthesis.speak(utterance)
}

document.getElementById("play").addEventListener("click", function () {
    const text = document.getElementById("translatedText").innerText

    if (isPaused && currentUtterance) {
        speechSynthesis.resume()
        isPaused = false
        playButtonText.innerHTML = "Pause"
        return
    }
    if (speechSynthesis.speaking && !isPaused) {
        speechSynthesis.pause()
        isPaused = true
        playButtonText.innerHTML = "Resume"
    } else if (!speechSynthesis.speaking) {
        speakText(text, "en-US", 0.8)
        playButtonText.innerHTML = "Pause"
    }
})

document.getElementById("stop").addEventListener("click", () => {
    speechSynthesis.cancel()
    playButtonText.innerHTML = "Play Translation"
    currentUtterance = null
    isPaused = false
})
