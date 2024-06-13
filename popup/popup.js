var generatePasswordButton = document.getElementById("generator");
var passwordLengthSlider = document.getElementById("password-length-slider");
var passwordLengthSliderLabel = document.getElementById("password-length-slider-label");

var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
var len = passwordLengthSlider.value;

passwordLengthSliderLabel.innerHTML = len;

function generatePassword(characters, length) {
    var passwordField = document.getElementById("generated-password");
    generatedPassword = "";
    for (let i = 0; i < length; i++) {
        var randomCharacterIndex = Math.floor(Math.random() * chars.length);
        generatedPassword += characters[randomCharacterIndex];
    }
    passwordField.innerHTML = `${generatedPassword}`;
}

passwordLengthSlider.oninput = function() {
    passwordLengthSliderLabel.innerHTML = passwordLengthSlider.value;
    generatePassword(chars, passwordLengthSlider.value)
}
generatePasswordButton.addEventListener("click", () => generatePassword(chars, len));