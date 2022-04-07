function generateDieHards(length) {
    const max = findMax(length);
    const min = findMin(max);
    const firstNumber = (min % 2 == 0) ? min + 1 : min;
    const lastNumber = (max % 2 == 0) ? max - 1 : max;
    const step = (min >= 10) ? 2 : 1;
    for(let number = firstNumber; number <= lastNumber; number += step) {
        if(isCheckNeeded(number))
            if(isDieHard(number, min))
                console.log(number);
    }
    readline.close();
}

function findMax(length) {
    let max = 1;
    for (let index = 1; index <= length; index++)
        max *= 10;
    return max--;
}

function findMin(max) {
    return Math.floor((max + 1) / 10);
}

function isCheckNeeded(number) {
    const isCheckNeeded = number % 2 == 0 || number % 3 == 0 || number % 5 == 0 || number % 7 == 0;
    return (number < 10) ? true : ( (isCheckNeeded) ? false : true);
}

function isDieHard(number, min) {
    let dieHardFlag = true;
    for(let divider = min; divider >= 1; divider /= 10) {
        divider = Math.floor(divider);
        if(!isPrime(Math.floor(number / divider))) {
            dieHardFlag = false;
            break;
        }
    }
    return dieHardFlag;
}

function isPrime(number) {
    let primeFlag = true;
    if(number == 1)
        return false;
    if(number == 2)
        return true;
    for(let index = 2; index <= number / 2; index ++) {
        if(number % index == 0) {
            primeFlag = false;
            break;
        }
    }
    return primeFlag;
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.on( 'line', length => {
    generateDieHards(length);
});