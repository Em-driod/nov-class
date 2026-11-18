const form = document.querySelector(".person-form");
const message = document.querySelector(".message");
const getBtn = document.querySelector(".get-btn");

// Fetch one random user and show it in the form fields.
async function getPerson(event) {
    event.preventDefault();
    message.textContent = "Loading...";
    getBtn.disabled = true;
    try {
        const response = await fetch("https://randomuser.me/api/");
        if (!response.ok) {
            message.textContent = "Could not get a person. Try again.";
            return;
        }
        const data = await response.json();
        const user = data.results[0];
        const loc = user.location;
    

        document.querySelector(".photo").src = user.picture.large;
        document.querySelector(".name").value = user.name.first + " " + user.name.last;
        document.querySelector(".email").value = user.email;
        document.querySelector(".address").value = loc.street.number + " " + loc.street.name + ", " + loc.city + ", " + loc.country;
        message.textContent = "";
    } catch {
        message.textContent = "Network error. Check your connection.";
    } finally {
        getBtn.disabled = false;
    }
}

form.addEventListener("submit", getPerson);
