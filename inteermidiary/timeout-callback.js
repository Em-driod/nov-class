const startButton = document.querySelector("#start-button");
const timerMessage = document.querySelector("#timer-message");

startButton.addEventListener("click", function () {
    startButton.disabled = true;
    timerMessage.textContent = "Waiting for 2 seconds...";

    setTimeout(function () {
        timerMessage.textContent = "The timeout is finished!";
        startButton.disabled = false;
    }, 2000);
});
