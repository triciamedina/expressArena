const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheeseburgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send('Great choice!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        Host Name: ${req.hostname}
        Method: ${req.method}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;
    const home = req.query.home;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        return res.status(400).send('Please provide a race');
    }

    if(!home) {
        return res.status(400).send('Please provide a home');
    }

    const greeting = `Greetings ${name} the ${race} of ${home}, welcome to our kingdom.`;

    res.send(greeting);
});

app.get('/sum', (req, res) => {
    const numA = Number(req.query.a);
    const numB = Number(req.query.b);

    if (!numA) {
        return res.status(400).send('Please provide a valid value for a');
    } 

    if (!numB) {
        return res.status(400).send('Please provide a valid value for b');
    }

    const sum = numA + numB;

    res.send(`The sum of ${numA} and ${numB} is ${sum}`);
});

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = Number(req.query.shift);

    if (!text) {
        return res.status(400).send('Please provide text');
    }

    if (!shift) {
        return res.status(400).send('Please provide a valid value for shift')
    }

    const stringArr = text.split("");

    const numArr = [];
    stringArr.forEach(char => {numArr.push(char.charCodeAt(0)+ shift)});

    const cipherArr = [];
    numArr.forEach(num => {cipherArr.push(String.fromCharCode(num))});

    const cipher = cypherArr.join("");
    res.send(cipher)
});

app.get('/lotto', (req, res) => {
    const arr = req.query.numbers;

    // Checks that 6 numbers values are provided in the query
    if (!arr) {
        return res.status(400).send('Please provide 6 numbers')
    } else if (arr.length != 6) {
        return res.status(400).send('Please provide 6 numbers')
    };

    // Creates a new array with values converted from strings to numbers
    // If there are duplicates, returns 400 status
    const queryNums = []
    for (let i = 0; i < arr.length; i ++) {
        let num = Number(arr[i]);
        if (queryNums.indexOf(num) === -1) {
            queryNums.push(num)
        } else {
            return res.status(400).send('Please provide 6 unique numbers');
        };
    };
    console.log(queryNums);

    // Checks that numbers are between  1 and 20
    for (let i = 0; i < queryNums.length; i++) {
        if (queryNums[i] < 1 || queryNums[i] > 20) {
            return res.status(400).send('Please provide numbers between 1 and 20');
        };
    };

    // Generates random numbers between two values
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    // Creates an array of 6 unique lotto numbers
    const lottoNums = [];
    while (lottoNums.length < 6) {
        let a = getRandomInt(1, 20)
        if (lottoNums.indexOf(a) === -1) {
            lottoNums.push(a);
        };
    };
    console.log(lottoNums)

    // Counts how many matching numbers are in queryNums and lottoNums
    let count = 0;
    queryNums.forEach(num1 => {
        lottoNums.forEach(num2 => {
            if (num1 === num2) {
                count = count + 1;
            };
        });
    });

    if (count < 4) {
        return res.send(`You have ${count} matching numbers. Sorry, you lose.`)
    };

    if (count === 4) {
        return res.send(`You have ${count} matching numbers. Congratulations, you win a free ticket!`);
    };

    if (count === 5) {
        return res.send(`You have ${count} matching numbers. Congratualtions! You win $100!`); 
    };

    if (count === 6) {
        return res.send(`You have ${count} matching numbers. Wow, Ubelieveable! You could have won the mega millions!`);
    };
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});