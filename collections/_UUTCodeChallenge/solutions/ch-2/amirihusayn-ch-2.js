let dataset = [];
let searchIndex = 0;
let result = [];
let messageCount;
let commandCount = 0;

function perform(command) {
    messageCount = 0;
    commandCount++;
    if(commandCount <= 100000)
    {
        const anchor =  command.split(' ')[0];
        if(anchor == "Add")
            add(command);
        if (anchor == "Find")
            find(command);
    }
    else
        process.exit(0);
}

function add(command) {
    const idIndex = command.split(' ').length - 1;
    const id = command.split(' ')[idIndex];
    const newUser = command.replace("Add ", "");
    dataset.push(newUser);
    result.push("User " + id + " added successfully");
    messageCount++;
}

function find(command) {
    found = false;
    searchIndex += 1;
    const idIndex = dataset[0].split(' ').length - 1;
    const targetUserId = command.replace("Find ", "");
    dataset.forEach((user, id) => {
        id = user.split(' ')[idIndex];
        if(id == targetUserId) {
            result.push("" + searchIndex + user);
            messageCount++;
            found = true;
        }
    });

    if(!found) {
        let idArray = [];
        dataset.forEach(user => {
            idArray.push(user.split(' ')[idIndex]);
        });
        for (let index = 0; index < idArray.length; index++) {
            if(idArray[index].startsWith(targetUserId) && messageCount <= 10) {
                result.push("" + searchIndex + " " + dataset[index]);
                messageCount++;
                found = true;
            }
        }
    }

    if(!found) {
        messageCount++;
        result.push("" + searchIndex + " No user found");
    }
    else
    {
        if(messageCount > 0) {
            const sorted = result.slice(result.length - messageCount, result.length);
            sorted.sort();
            for (let index = 0; index < messageCount; index++) {
                result.pop();
            }
            sorted.reverse();
            for (let index = 0; index < messageCount; index++) {
                result.push(sorted[index]);
            }
        }
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.on( 'line', input => {
    perform(input);
    for (let index = 0; index < messageCount; index++)
        console.log(result[result.length - index - 1]);
    result = [];
});

readline.on( 'close', () => {
    process.exit(0);
});

// Inputs
// Add Ali male 20 ali20ali
// Add Mohammad male 21 mohammadm
// Add Akbar male 30 akbar30
// Find ali
// Add Maryam female 20 maryam20
// Find mohammad21
// Add Mahtab female 13 mahtab13
// Add Maziar male 40 maziarAk
// Find ma


// Outputs
// User ali20ali added successfully
// User mohammadm added successfully
// User akbar30 added successfully
// 1 Ali male 20 ali20ali
// User maryam20 added successfully
// 2 No user found
// User mahtab13 added successfully
// User maziarAk added successfully
// 3 Mahtab female 13 mahtab13
// 3 Maryam female 20 maryam20
// 3 Maziar male 40 maziarAk