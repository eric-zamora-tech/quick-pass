let increasePasswordLengthButton = document.getElementById("increase-password-length-button");
let decreasePasswordLengthButton = document.getElementById("decrease-password-length-button");
let passwordLengthLabel = document.getElementById("password-length-label");
let passwordLengthSlider = document.getElementById("password-length-slider");
let includeUpperCaseLettersOption = document.getElementById("include-upper-case-letters-option");
let includeLowerCaseLettersOption = document.getElementById("include-lower-case-letters-option");
let includeNumbersOption = document.getElementById("include-numbers-option");
let includeSpecialCharactersOption = document.getElementById("include-special-characters-option");
let generatedPasswordLabel = document.getElementById("generated-password-label");
let regeneratePasswordButton = document.getElementById("regenerate-password-button");

let passwordLength = 16;
let availableCharacters = 0b1111;
let generatedPassword = "";


function updatePassword() {
    generatedPassword = generatePassword(passwordLength, availableCharacters);
    updateUI();
}
    
function updateUI() {
    generatedPasswordLabel.innerText = generatedPassword;
    passwordLengthLabel.innerText = passwordLength;
    passwordLengthSlider.value = passwordLength;
    includeUpperCaseLettersOption.checked = availableCharacters & 0b1000;
    includeLowerCaseLettersOption.checked = availableCharacters & 0b0100;
    includeNumbersOption.checked = availableCharacters  & 0b0010;
    includeSpecialCharactersOption.checked = availableCharacters  & 0b0001;
}

function updatePasswordLength(len) {
    if(passwordLength < 1 || passwordLength > 100) return;
    
    passwordLength = len;
    updatePassword();
}

function updateAvailableCharacters(e) {
    availableCharacters ^= 1 << e.target.defaultValue;

    if(availableCharacters == 0b0000) {
        availableCharacters ^= 1 << e.target.defaultValue;
        updateUI();
        return
    }

    updatePassword();
}

function generatePassword(len, availableCharacters) {
    let selectedCharacters = "";
    let randomPassword = "";

    if(availableCharacters & 0b1000) selectedCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(availableCharacters & 0b0100) selectedCharacters += "abcdefghijklmnopqrstuvwxyz";
    if(availableCharacters & 0b0010) selectedCharacters += "0123456789";
    if(availableCharacters & 0b0001) selectedCharacters += "~`! @#$%^&*()_-+={[}]|:;'<,>.?/";

    for(let i = 0; i < len; i++) {
        let randomCharacterIndex = Math.floor(Math.random() * selectedCharacters.length);
        randomPassword += selectedCharacters[randomCharacterIndex];
    }

    return randomPassword;
}
    
updatePassword();

increasePasswordLengthButton.addEventListener("click", () => {updatePasswordLength(++passwordLength)});
decreasePasswordLengthButton.addEventListener("click", () => {updatePasswordLength(--passwordLength)});
regeneratePasswordButton.addEventListener("click", () => {updatePassword()});
passwordLengthSlider.addEventListener("input", (e) => {updatePasswordLength(e.target.value)});
document.querySelectorAll("input[type='checkbox']").forEach(cb => {cb.addEventListener("change", (e) => {updateAvailableCharacters(e)});});