const runDemoButton = document.querySelector("#run-demo");
const demoOutput = document.querySelector("#demo-output");

runDemoButton.addEventListener("click", function () {
    demoOutput.textContent = runHoistingDemo();
});

function runHoistingDemo() {
    let result = "";

    result += greet("Maya") + "\n";
    result += "score before assignment: " + score + "\n";

    var score = 10;
    result += "score after assignment: " + score;

    return result;

    function greet(name) {
        return "Hello, " + name + "!";
    }
}
