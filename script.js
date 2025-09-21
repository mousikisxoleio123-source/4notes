document.addEventListener('DOMContentLoaded', () => {
    const noteImage = document.getElementById('noteImage');
    const noteButtons = document.querySelectorAll('.note-button');
    const checkButton = document.getElementById('checkButton');
    const nextButton = document.getElementById('nextButton');
    const resetButton = document.getElementById('resetButton');
    const restartButton = document.getElementById('restartButton');
    const linesButton = document.getElementById('linesButton');
    const spacesButton = document.getElementById('spacesButton');
    const helpImageContainer = document.getElementById('helpImageContainer');
    const helpImage = document.getElementById('helpImage');
    const successSound = document.getElementById('successSound');
    const failSound = document.getElementById('failSound');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggleButton = document.getElementById('musicToggle');
    const backgroundButtons = document.querySelectorAll('.bg-button');

    const noteMappings = {
        'https://i.imgur.com/5QlU7AE.png': ['Ντο', 'Σολ', 'Λα', 'Φα'],
        'https://i.imgur.com/YUxiA5h.png': ['Ντο', 'Μι', 'Ντο', 'Σολ'],
        'https://i.imgur.com/X6cOj6V.png': ['Ντο', 'Φα', 'Σολ', 'Σολ'],
        'https://i.imgur.com/RUmMFtp.png': ['Σολ', 'Φα', 'Μι', 'Λα'],
        'https://i.imgur.com/1ejL1uE.png': ['Σολ', 'Ντο', 'Μι', 'Λα'],
        'https://i.imgur.com/rVJs7Hf.png': ['Λα', 'Φα', 'Ρε', 'Σι'],
        'https://i.imgur.com/ZF4lCzU.png': ['Μι', 'Φα', 'Λα', 'Μι'],
        'https://i.imgur.com/s7DNjna.png': ['Ρε', 'Σολ', 'Σι', 'Ρε'],
        'https://i.imgur.com/OJbGuRf.png': ['Μι', 'Φα', 'Σολ', 'Λα'],
        'https://i.imgur.com/MYyjNfr.png': ['Μι', 'Φα', 'Σι', 'Σολ'],
        'https://i.imgur.com/VcKM7Au.png': ['Φα', 'Λα', 'Σι', 'Ντο'],
        'https://i.imgur.com/BsKyiRH.png': ['Σολ', 'Φα', 'Μι', 'Ρε'],
        'https://i.imgur.com/M9ZrnIu.png': ['Λα', 'Μι', 'Ντο', 'Ρε'],
        'https://i.imgur.com/CLQwVg9.png': ['Ντο', 'Ρε', 'Μι', 'Σολ'],
        'https://i.imgur.com/Tgf1fUE.png': ['Ντο', 'Μι', 'Φα', 'Ρε'],
        'https://i.imgur.com/5VXtEqW.png': ['Λα', 'Ντο', 'Μι', 'Φα'],
        'https://i.imgur.com/4HX6t3r.png': ['Ντο', 'Ρε', 'Μι', 'Λα'],
        'https://i.imgur.com/Lpj2iWM.png': ['Σολ', 'Σι', 'Ρε', 'Μι'],
        'https://i.imgur.com/RAdYeZx.png': ['Ντο', 'Λα', 'Σι', 'Σολ'],
        'https://i.imgur.com/VQZPKg7.png': ['Σι', 'Φα', 'Μι', 'Ρε'],
        'https://i.imgur.com/I1wefZL.png': ['Σολ', 'Φα', 'Ρε', 'Ντο'],
        'https://i.imgur.com/coA25PX.png': ['Σι', 'Φα', 'Φα', 'Ντο'],
        'https://i.imgur.com/VrczxX9.png': ['Λα', 'Μι', 'Φα', 'Ντο'],
        'https://i.imgur.com/T1IXMIM.png': ['Σολ', 'Μι', 'Σι', 'Σολ'],
        'https://i.imgur.com/P7di0Yv.png': ['Ρε', 'Σι', 'Σολ', 'Μι'],
        'https://i.imgur.com/Zcjd9pd.png': ['Φα', 'Ρε', 'Σι', 'Σολ'],
        'https://i.imgur.com/DoDvB8I.png': ['Μι', 'Ρε', 'Σι', 'Ρε'],
        'https://i.imgur.com/NJ13cLR.png': ['Σολ', 'Ρε', 'Λα', 'Σι'],
        'https://i.imgur.com/HEzKGwz.png': ['Φα', 'Ντο', 'Λα', 'Φα'],
        'https://i.imgur.com/5dlT0EZ.png': ['Σολ', 'Ντο', 'Λα', 'Φα'],
        'https://i.imgur.com/FGswyhy.png': ['Φα', 'Ντο', 'Λα', 'Φα'],
        'https://i.imgur.com/J1EtwaK.png': ['Φα', 'Μι', 'Μι', 'Λα'],
        'https://i.imgur.com/aHDb2kR.png': ['Λα', 'Μι', 'Φα', 'Φα'],
        'https://i.imgur.com/2A3djdF.png': ['Φα', 'Λα', 'Ντο', 'Φα'],
        'https://i.imgur.com/8sYBgpS.png': ['Ντο', 'Φα', 'Σι', 'Μι']
    };

    let imageURLs = Object.keys(noteMappings);
    let currentImageIndex = 0;
    let selectedNotes = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        shuffleArray(imageURLs);
        currentImageIndex = 0;
        loadCurrentImage();
    }

    function loadCurrentImage() {
        const imageURL = imageURLs[currentImageIndex];
        noteImage.src = imageURL;
        selectedNotes = [];
        noteButtons.forEach(button => button.classList.remove('selected'));
    }

    function resetSelection() {
        selectedNotes = [];
        noteButtons.forEach(button => button.classList.remove('selected'));
    }

    function checkAnswer() {
        const imageURL = imageURLs[currentImageIndex];
        const correctNotes = noteMappings[imageURL];

        const isCorrect = selectedNotes.length === 4 &&
                          selectedNotes.every((note, index) => note === correctNotes[index]);

        if (isCorrect) {
            successSound.play();
        } else {
            failSound.play();
        }
    }

    function playMusic() {
        backgroundMusic.currentTime = 4;
        backgroundMusic.play();
        musicToggleButton.style.backgroundImage = 'url("https://i.imgur.com/your-stop-link.png")'; 
    }

    function stopMusic() {
        backgroundMusic.pause();
        musicToggleButton.style.backgroundImage = 'url("https://i.imgur.com/your-play-link.png")'; 
    }

    // Event Listeners
    noteButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (selectedNotes.length < 4) {
                selectedNotes.push(button.textContent);
                button.classList.add('selected');
            }
        });
    });

    checkButton.addEventListener('click', checkAnswer);

    nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % imageURLs.length;
        loadCurrentImage();
    });

    resetButton.addEventListener('click', resetSelection);

    restartButton.addEventListener('click', startGame);

    linesButton.addEventListener('mousedown', () => {
        helpImage.src = 'https://i.imgur.com/your-grammes-link.png'; 
        helpImageContainer.classList.remove('hidden');
    });

    linesButton.addEventListener('mouseup', () => {
        helpImageContainer.classList.add('hidden');
    });

    spacesButton.addEventListener('mousedown', () => {
        helpImage.src = 'https://i.imgur.com/your-diastimata-link.png'; 
        helpImageContainer.classList.remove('hidden');
    });

    spacesButton.addEventListener('mouseup', () => {
        helpImageContainer.classList.add('hidden');
    });

    musicToggleButton.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            stopMusic();
        }
    });

    backgroundButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bgImage = e.currentTarget.querySelector('img').src;
            document.body.style.backgroundImage = `url('${bgImage}')`;
        });
    });

    // Start
    startGame();
    playMusic();
});