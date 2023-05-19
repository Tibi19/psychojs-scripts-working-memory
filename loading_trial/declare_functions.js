/**********  BEFORE EXPERIMENT  **********/

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function getRandomInt(upToExclusiveInt) {
    return Math.floor(Math.random() * upToExclusiveInt);
}

function getRandomIntBetween(fromInclusiveInt, upToExclusiveInt) {
    return fromInclusiveInt + getRandomInt(upToExclusiveInt);
}

function getRandomDigitsOrderedBackwards(availableDigits, digitsCount) {
    // Example digits ordered backwards for control trial: 5432, 8765, 3210
    let randomDigits = '';
    let availableDigitsLength = availableDigits.length;
    let possibleIndexForAvailableDigitsStart = digitsCount - 1;
    let endCharIndexToStartFrom = getRandomIntBetween(possibleIndexForAvailableDigitsStart, availableDigitsLength);
    for(let i = endCharIndexToStartFrom; i >= 0 && randomDigits.length < digitsCount; i--)
        randomDigits += availableDigits.charAt(i);
        
    return randomDigits;
}

function getRandomDigits(availableDigits, digitsCount, isControlTrial) {
    if(isControlTrial)
        return getRandomDigitsOrderedBackwards(availableDigits, digitsCount);
    
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

function getGazePosition() {
    // Update tracking coordinates to the average of last n gazes
    let x = util.sum(window.xGazes) / window.xGazes.length;
    let y = util.sum(window.yGazes) / window.yGazes.length;
    
    gazePosition = util.to_height(
        [
          x - psychoJS.window.size[0] / 2,
          -1 * (y - psychoJS.window.size[1] / 2)
        ], 
        'pix', 
        psychoJS.window
    );
    
    return gazePosition;
}