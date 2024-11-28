document.addEventListener("DOMContentLoaded", () => {
    const heartCanvas = document.getElementById("heartCanvas");
    const clickMessage = document.getElementById("click-message");

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const ctx = heartCanvas.getContext("2d");

    function drawHeart() {
        let progress = 0;
        const steps = 180;
        const interval = 20;

        function animateHeart() {
            if (progress === 0) {
                ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
                ctx.strokeStyle = "#ff6b6b";
                ctx.lineWidth = 3;
                ctx.beginPath();
            }

            const t = (progress / steps) * 2 * Math.PI;
            const x = 200 + 160 * Math.pow(Math.sin(t), 3);
            const y = 200 - (130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t));

            if (progress === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            ctx.stroke();

            if (progress < steps) {
                progress++;
                setTimeout(animateHeart, interval);
            } else {
                clickMessage.style.display = "block";
                heartCanvas.addEventListener("click", onHeartClick);
            }
        }
        animateHeart();
    }
    drawHeart();

    function onHeartClick() {
        heartCanvas.classList.add("animate");
        clickMessage.style.display = "none";
        setTimeout(() => {
            document.getElementById("intro-screen").style.display = "none";
            document.getElementById("main-content").style.display = "block";
        }, 1300);
    }

    function updateTimer() {
        const startDate = new Date("2024-01-13");
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        daysElement.innerText = days;
        hoursElement.innerText = hours;
        minutesElement.innerText = minutes;
        secondsElement.innerText = seconds;
    }
    setInterval(updateTimer, 1000);

    function checkAnswer(questionId, isCorrect) {
        const currentQuestion = document.getElementById(questionId);
        currentQuestion.style.display = "none";

        if (isCorrect) {
            const nextQuestion = currentQuestion.nextElementSibling;
            if (nextQuestion && nextQuestion.classList.contains("quiz-question")) {
                nextQuestion.style.display = "block";
            } else {
                document.getElementById("quiz-result").style.display = "block";
                document.getElementById("quiz-result").innerText = "Du hast alle Fragen richtig beantwortet! ❤️";
            }
        } else {
            document.getElementById("quiz-result").style.display = "block";
            document.getElementById("quiz-result").innerText = "Oops, versuch es nochmal! Ich weiß, du kannst es schaffen! ❤️";
            document.getElementById("retry-button").style.display = "block";
        }
    }
    window.checkAnswer = checkAnswer;

    function retryQuiz() {
        const questions = document.querySelectorAll('.quiz-question');
        questions.forEach(question => {
            question.style.display = 'none';
        });

        document.getElementById('question1').style.display = 'block';

        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('retry-button').style.display = 'none';
    }
    window.retryQuiz = retryQuiz;
});

document.addEventListener("DOMContentLoaded", () => {
    const floatingHeartsContainer = document.getElementById("floating-hearts-container");

    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
        floatingHeartsContainer.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        });
    }

    setInterval(createFloatingHeart, 1000); // Alle 1 Sekunde ein neues Herz
});

document.addEventListener("DOMContentLoaded", () => {
    const carouselModal = document.getElementById("carousel-modal");
    const openCarousel = document.getElementById("open-carousel");
    const prevSlide = document.getElementById("prev-slide");
    const nextSlide = document.getElementById("next-slide");
    const carouselSlider = document.getElementById("carousel-slider");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;

    openCarousel.addEventListener("click", () => {
        carouselModal.classList.add("visible");
    });

    prevSlide.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextSlide.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        carouselSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    carouselModal.addEventListener("click", (event) => {
        if (event.target === carouselModal) {
            carouselModal.classList.remove("visible");
            currentSlide = 0;
            updateCarousel();
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const memoryGame = document.getElementById("memory-game");
    const restartButton = document.getElementById("restart-game");
    const images = [
        "https://www.dropbox.com/scl/fi/5ftwhec5j61dprwmxpyts/Sarah-Bad.jpg?rlkey=23vyipf2fu9xshhdbcf8hpxw3&st=330nwi4y&dl=1",
        "https://www.dropbox.com/scl/fi/ihd8e4jgjwrs3yn1zfp6y/Sarah-Bart.jpeg?rlkey=c22qp25v1pzp1h3ld60qinteq&st=zzvjz58b&dl=1",
        "https://www.dropbox.com/scl/fi/sc8dpni80x4zlji1hw6hf/Sarah-Daddy.jpeg?rlkey=8sa8mb7f09otiy8hqhr23tqg4&st=pwmphrcp&dl=1",
        "https://www.dropbox.com/scl/fi/nit2agckpuzzu7g9irui6/sarah-daumen.jpg?rlkey=vi1xv1k37d43ydx7jfgp6svny&st=yp88ut3p&dl=1",
        "https://www.dropbox.com/scl/fi/bh5ld4ihg801oqg3du3kl/Sarah-Kind.jpeg?rlkey=g22j72s0vp3n0nioxvd6xi4j2&st=am7aeh7h&dl=1",
        "https://www.dropbox.com/scl/fi/6olm7q6mdx83c6fe0avsm/Sarah-Singen.jpeg?rlkey=3014amjuti961zcdmhei7ax2m&st=t47jngl9&dl=1",
    ];

    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchedPairs = 0;

    function initGame() {
        memoryGame.innerHTML = "";
        matchedPairs = 0;
        restartButton.classList.add("hidden");

        cards = [...images, ...images]
            .map((img, index) => createCard(img, index % images.length))
            .sort(() => Math.random() - 0.5);
        cards.forEach((card) => memoryGame.appendChild(card));
    }

    function createCard(img, imageIndex) {
        const card = document.createElement("div");
        card.classList.add("memory-card");

        const frontFace = document.createElement("img");
        frontFace.src = img;

        if (imageIndex === 0 || imageIndex === 2 || imageIndex === 5) {
            frontFace.style.transform = "scaleX(-1)";
        }

        const backFace = document.createElement("div");
        backFace.classList.add("back-face");
        backFace.textContent = "❤";

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", flipCard);

        return card;
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add("flipped");

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.querySelector("img").src === secondCard.querySelector("img").src;

        if (isMatch) {
            disableCards();
            matchedPairs++;
            if (matchedPairs === images.length) {
                showWinMessage();
                restartButton.classList.remove("hidden");
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function showWinMessage() {
        const winMessage = document.createElement("div");
        winMessage.classList.add("win-message");
        winMessage.textContent = "🎉 Glückwunsch! Du hast alle Paare gefunden! 🎉";
        document.body.appendChild(winMessage);

        setTimeout(() => {
            winMessage.remove();
        }, 5000);
    }

    restartButton.addEventListener("click", initGame);

    initGame();
});

document.addEventListener("DOMContentLoaded", () => {
    const scrambledLettersContainer = document.getElementById("scrambled-letters");
    const checkSolutionButton = document.getElementById("check-solution");
    const resultMessage = document.getElementById("result-message");

    const message = ["ICH", "LIEBE", "DICH"];
    const allLetters = shuffleArray(message.join("").split(""));

    let letterIndex = 0;
    message.forEach((word) => {
        const row = document.createElement("div");
        row.classList.add("word-row");

        for (let i = 0; i < word.length; i++) {
            const letterDiv = createLetterDiv(allLetters[letterIndex]);
            row.appendChild(letterDiv);
            letterIndex++;
        }

        scrambledLettersContainer.appendChild(row);
    });

    function createLetterDiv(char) {
        const div = document.createElement("div");
        div.classList.add("letter");
        div.textContent = char;

        div.setAttribute("draggable", "true");
        div.addEventListener("dragstart", onDragStart);
        div.addEventListener("dragover", onDragOver);
        div.addEventListener("drop", onDrop);

        return div;
    }

    let draggedElement = null;

    function onDragStart(event) {
        draggedElement = event.target;
        event.target.classList.add("dragging");
    }

    function onDragOver(event) {
        event.preventDefault();
    }

    function onDrop(event) {
        event.preventDefault();

        if (event.target.classList.contains("letter") && event.target !== draggedElement) {
            const temp = draggedElement.textContent;
            draggedElement.textContent = event.target.textContent;
            event.target.textContent = temp;
        }
        draggedElement.classList.remove("dragging");
        draggedElement = null;
    }

    checkSolutionButton.addEventListener("click", () => {
        const currentSolution = Array.from(scrambledLettersContainer.children).map((row) =>
            Array.from(row.children).map((letter) => letter.textContent).join("")
        );

        if (JSON.stringify(currentSolution) === JSON.stringify(message)) {
            resultMessage.textContent = "🎉 Richtig! Du hast die Botschaft entschlüsselt! 🎉";
        } else {
            resultMessage.textContent = "❌ Versuche es nochmal! Du schaffst das!";
        }
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
