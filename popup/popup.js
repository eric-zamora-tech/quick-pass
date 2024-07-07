let passwordLengthLabel = document.getElementById("password-length-label");
let passwordLengthSlider = document.getElementById("password-length-slider");
let includeUpperCaseLettersOption = document.getElementById("include-upper-case-letters-option");
let includeLowerCaseLettersOption = document.getElementById("include-lower-case-letters-option");
let includeNumbersOption = document.getElementById("include-numbers-option");
let includeSpecialCharactersOption = document.getElementById("include-special-characters-option");
let generatedPasswordLabel = document.getElementById("generated-password-label");
let regeneratePasswordButton = document.getElementById("regenerate-password-button");
let copyToClipboardIcon = document.getElementById("copy-to-clipboard-icon");
let toolTipText = document.getElementsByClassName("tooltip-text");
let passwordStrengthBar = document.getElementById("password-strength-bar");

let passwordLength = 16;
let availableCharacters = 0b1111;
let generatedPassword = "";
let passwordStrength = 0;

function copyPasswordToClipboard() {
    navigator.clipboard.writeText(generatedPasswordLabel.innerText);
    console.log("blank");
    toolTipText[0].style.visibility = "visible";
    toolTipText[0].style.opacity = "1";
    setTimeout(() => {
        toolTipText[0].style.opacity = "0";
    }, 2000);
    setTimeout(() => {
        toolTipText[0].style.visibility = "hidden";
    }, 2500);
}

function updatePassword() {
    generatedPassword = generatePassword(passwordLength, availableCharacters);
    updateUI();
}

function updateUI() {
    generatedPasswordLabel.innerText = generatedPassword;
    passwordLengthLabel.innerText = passwordLength;
    passwordLengthSlider.value = passwordLength;
    passwordStrengthBar.value = passwordStrength;
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

function calculatePasswordStrength(length, symbols) {
    let entropy = Math.log2(Math.pow(symbols, length));
    if(entropy <= 42) return 33;
    else if (entropy > 42 && entropy <= 85) return 66;
    else return 100;
}

function generatePassword(len, availableCharacters) {
    let selectedCharacters = "";
    let randomPassword = "";
    
    if(availableCharacters & 0b1000) selectedCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(availableCharacters & 0b0100) selectedCharacters += "abcdefghijklmnopqrstuvwxyz";
    if(availableCharacters & 0b0010) selectedCharacters += "0123456789";
    if(availableCharacters & 0b0001) selectedCharacters += "!\"#$%" + String.fromCharCode(38) + "'()*+,-./:;" + String.fromCharCode(60) + "=>?@[\\]^_`{|}~";
    
    for(let i = 0; i < len; i++) {
        let randomCharacterIndex = Math.floor(Math.random() * selectedCharacters.length);
        randomPassword += selectedCharacters[randomCharacterIndex];
    }

    passwordStrength = calculatePasswordStrength(len, selectedCharacters.length);
    return randomPassword;
}

updatePassword();

regeneratePasswordButton.addEventListener("click", () => {updatePassword()});
passwordLengthSlider.addEventListener("input", (e) => {updatePasswordLength(e.target.value)});
document.querySelectorAll("input[type='checkbox']").forEach(cb => {cb.addEventListener("change", (e) => {updateAvailableCharacters(e)});});
copyToClipboardIcon.addEventListener("click", (e) => {copyPasswordToClipboard()});