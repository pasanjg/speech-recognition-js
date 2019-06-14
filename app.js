const btn = document.querySelector('.talk');
const content = document.querySelector('.content');


// Responses

const greetings = [
    'Im good you little piece of love!',
    'Doing good bro!',
    'Leave me alone!'
];

const weather = [
    'Weather is fine!',
    'You need a tan.',
    'I’m going to be discussing global warming next week, it’s quite a heated topic'
];

const jokes = [
    'I’m going to be discussing global warming next week, it’s quite a heated topic',
    'Yesterday, a clown held the door open for me. It was such a nice jester!',
    'The machine at the coin factory just suddenly stopped working, with no explanation. It doesn’t make any cents!',
    'Why can’t you run through a campground?\r\nBecause You can only ran, because it’s past tents.',
    'What do you call a thieving alligator?\r\nA Crookodile',
    'Never trust math teachers who use graph paper. They’re always plotting something.'

];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('Voice is activates. Speak to the microphone');
};

recognition.onresult = function (event) {
    console.log(event);
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent += 'Me: ' + transcript + '\r\n';
    console.log(transcript);

    readOutLoud(transcript);
};

// add the listener to the button

btn.addEventListener('click', () => {
    recognition.start();
});


function readOutLoud(message) {

    const speech = new SpeechSynthesisUtterance();

    if (message.includes('hi') || message.includes('hello') || message.includes('how are you')) {
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }
    else if (message.includes('weather')){
        const finalText = weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalText;
    }
    else if (message.includes('joke')){
        const finalText = jokes[Math.floor(Math.random() * jokes.length)];
        speech.text = finalText;
    }
    else if (message.includes('name')){
        const finalText = 'My name is Jeff';
        speech.text = finalText;
    }
    else {
        speech.text = 'I dont know what you said';
    }

    //speech.text = message
    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
    content.textContent += 'Jeff: ' + speech.text + '\r\n';
}
