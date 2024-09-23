document.addEventListener("DOMContentLoaded", function() {
    let gamesq = [];
    let usersq = [];

    let buttons = ["red", "blue", "green", "yellow"];

    let started = false;
    let level = 0;

    let h2 = document.querySelector("h2");

    document.addEventListener("keypress", function() {
        if (!started) {
            console.log("Game is started");
            started = true;
            levelup();
        }
    });

    function btnFlash(btn) {
        if (btn) { // Check if btn is not null
            btn.classList.add("flash");
            setTimeout(function() {
                btn.classList.remove("flash");
            }, 250);
        } else {
            console.error("Button is null");
        }
    }

    function levelup() {
        level++;
        h2.innerText = `Level ${level}`;

        // Random button choose
        let randIdx = Math.floor(Math.random() * 4); // Changed to 4
        let randcolor = buttons[randIdx];
        let randbtn = document.querySelector(`.${randcolor}`);
        console.log(randIdx);
        console.log(randcolor);
        console.log(randbtn);
        console.log(gamesq);

        if (randbtn) {
            gamesq.push(randcolor); // Add to game sequence
            btnFlash(randbtn);
        } else {
            console.error(`No button found for color: ${randcolor}`);
        }
    }

    // Add event listeners for buttons
    buttons.forEach(color => {
        let btn = document.querySelector(`.${color}`);
        if (btn) {
            btn.addEventListener("click", function() {
                usersq.push(color);
                btnFlash(this);
                checkAnswer(usersq.length - 1);
            });
        } else {
            console.error(`Button with class ${color} not found`);
        }
    });

    function checkAnswer(currentLevel) {
        if (usersq[currentLevel] === gamesq[currentLevel]) {
            if (usersq.length === gamesq.length) {
                setTimeout(levelup, 1000);
                usersq = [];
            }
        } else {
            h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
            // Reset game
            started = false;
            level = 0;
            gamesq = [];
            usersq = [];
        }
    }
});
