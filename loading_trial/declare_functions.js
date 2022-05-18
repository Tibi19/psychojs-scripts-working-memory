/**********  BEFORE EXPERIMENT  **********/

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function getRandomInt(upToExclusiveInt) {
    return Math.floor(Math.random() * upToExclusiveInt);
}

function getRandomDigits(availableDigits, digitsCount) {
    let randomDigits = '';
    let availableDigitsLength = availableDigits.length;
    while(randomDigits.length < digitsCount) {
        let nextDigit = availableDigits.charAt(getRandomInt(availableDigitsLength));
        if(!randomDigits.includes(nextDigit)) {
            randomDigits += nextDigit;
        }
    }
    return randomDigits;
}

function reverseString(stringToReverse) {
    let reversedString = '';
    for(let i = stringToReverse.length - 1; i >= 0; i--) {
        reversedString += stringToReverse.charAt(i);
    }
    return reversedString;
}