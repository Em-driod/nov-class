function greet(name, callback) {
    callback("Good morning, " + name + "!");
}

const greetingForm = document.querySelector("#greeting-form");
const nameInput = document.querySelector("#name-input");
const greetingMessage = document.querySelector("#greeting-message");

greetingForm.addEventListener("submit", function (event) {
    event.preventDefault();
  
      const name = nameInput.value.trim();
    if (name === "") {
        greetingMessage.textContent = "Please enter your name.";
        nameInput.focus();
        return;
    }

    greet(name, function (message) {
        greetingMessage.textContent = message;
    });
});





