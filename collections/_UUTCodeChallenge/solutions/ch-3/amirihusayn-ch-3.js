let length;
let counter = 0;
let capse = false;
let isfirstInputInitialized = false;
let result = [];

function readPassword(input) {
    if(input == "CAPS")
        capse = !capse;
    else
    {
        if(capse)
            result += input.toUpperCase();
        else
            result += input.toLowerCase();
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.on( 'line', input => {
    if(!isfirstInputInitialized) {
        length = Number(input);
        isfirstInputInitialized = true;
    }
    else {
        counter++;
        readPassword(input);
        if(length == counter)
            readline.close();
    }
});

readline.on( 'close', () => {
    console.log(result);
});

// 9
// m
// CAPS
// y
// CAPS
// p
// a
// CAPS
// s
// s
