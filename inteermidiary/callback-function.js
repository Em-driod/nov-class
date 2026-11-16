function greet() {
    console.log("Hello!");
}

function executeFunction(callback) {
    callback();
}

executeFunction(greet);
