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
        '1.png': ['Ντο', 'Σολ', 'Λα', 'Φα'],
        '2.png': ['Ντο', 'Μι', 'Ντο', 'Σολ'],
        '3.png': ['Ντο', 'Φα', 'Σολ', 'Σολ'],
        '4.png': ['Σολ', 'Φα', 'Μι', 'Λα'],
        '5.png': ['Σολ', 'Ντο', 'Μι', 'Λα'],
        '6.png': ['Φα', 'Λα', 'Ρε', 'Σι'],
        '7.png': ['Μι', 'Φα', 'Λα', 'Μι'],
        '8.png': ['Ρε', 'Σολ', 'Σι', 'Ρε'],
        '9.png': ['Μι', 'Φα', 'Σολ', 'Λα'],
        '10.png': ['Μι', 'Φα', 'Σι', 'Σολ'],
        '11.png': ['Φα', 'Λα', 'Σι', 'Ντο'],
        '12.png': ['Σολ', 'Φα', 'Μι', 'Ρε'],
        '13.png': ['Λα', 'Μι', 'Ντο', 'Ρε'],
        '14.png': ['Ντο', 'Ρε', 'Μι', 'Σολ'],
        '15.png': ['Ντο', 'Μι', 'Φα', 'Ρε'],
        '16.png': ['Λα', 'Ντο', 'Μι', 'Φα'],
        '17.png': ['Ντο', 'Ρε', 'Μι', 'Λα'],
        '18.png': ['Σολ', 'Σι', 'Ρε', 'Μι'],
        '19.png': ['Ντο', 'Λα', 'Σι', 'Σολ'],
        '20.png': ['Σι', 'Φα', 'Μι', 'Ρε'],
        '21.png': ['Σολ', 'Φα', 'Ρε', 'Ντο'],
        '22.png': ['Σι', 'Φα', 'Φα', 'Ντο'],
        '23.png': ['Λα', 'Μι', 'Φα', 'Ντο'],
        '24.png': ['Σολ', 'Μι', 'Σι', 'Σολ'],
        '25.png': ['Ρε', 'Σι', 'Σολ', 'Μι'],
        '26.png': ['Φα', 'Ρε', 'Σι', 'Σολ'],
        '27.png': ['Μι', 'Ρε', 'Σι', 'Ρε'],
        '28.png': ['Σολ', 'Ρε', 'Λα', 'Σι'],
        '29.png': ['Φα', 'Ντο', 'Λα', 'Φα'],
        '30.png': ['Σολ', 'Ντο', 'Λα', 'Φα'],
        '31.png': ['Φα', 'Ντο', 'Λα', 'Φα'],
        '32.png': ['Φα', 'Μι', 'Μι', 'Λα'],
        '33.png': ['Λα', 'Μι', 'Φα', 'Φα'],
        '34.png': ['Φα', 'Λα', 'Ντο', 'Φα'],
        '35.png': ['Ντο', 'Φα', 'Σι', 'Μι']
    };
    
    let imageNames = Object.keys(noteMappings);
    let currentImageIndex = 0;
    let selectedNotes = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        shuffleArray(imageNames);
        currentImageIndex = 0;
        loadCurrentImage();
    }

    function loadCurrentImage() {
        const imageName = imageNames[currentImageIndex];
        noteImage.src = imageName;
        selectedNotes = [];
        noteButtons.forEach(button => button.classList.remove('selected'));
    }

    function resetSelection() {
        selectedNotes = [];
        noteButtons.forEach(button => button.classList.remove('selected'));
    }

    function checkAnswer() {
        const imageName = imageNames[currentImageIndex];
        const correctNotes = noteMappings[imageName];
        
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
        musicToggleButton.style.backgroundImage = 'url("stop.png")';
    }

    function stopMusic() {
        backgroundMusic.pause();
        musicToggleButton.style.backgroundImage = 'url("play.png")';
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
        currentImageIndex = (currentImageIndex + 1) % imageNames.length;
        loadCurrentImage();
    });

    resetButton.addEventListener('click', resetSelection);

    restartButton.addEventListener('click', startGame);

    linesButton.addEventListener('mousedown', () => {
        helpImage.src = 'grammes.png';
        helpImageContainer.classList.remove('hidden');
    });

    linesButton.addEventListener('mouseup', () => {
        helpImageContainer.classList.add('hidden');
    });

    spacesButton.addEventListener('mousedown', () => {
        helpImage.src = 'diastimata.png';
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
