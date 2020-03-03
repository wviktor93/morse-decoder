const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};

function decode(expr) {

    let length = expr.length;


    expr = expr.split('');

    let exprArr = [];

    for (let i = 0; i < expr.length; i++) {
        if (expr[i + 1] === "0" && expr[i] === "1") {
            exprArr.push(".");
            i++;
        }
        else if (expr[i + 1] === "1" && expr[i] === "1") {
            exprArr.push("-");
            i++;
        } else if (expr[i + 1] === "0" && expr[i] === "0") {
            exprArr.push("0");
            i++;
        }
        else {
            exprArr.push(expr[i]);
        }
    }


    exprArr = exprArr.join("");

    // console.log(exprArr);

    exprArr = exprArr.split("0");

    // console.log(exprArr)


    let res = [];

    for (let i = 0; i < exprArr.length; i++) {
        // console.log(exprArr[i].indexOf("**********"))
        // console.log(exprArr[i].indexOf("**********") + 10)
        // console.log(exprArr[i].length)
        // console.log(exprArr[i].substring(0, 3))
        // console.log(MORSE_TABLE[exprArr[i].substring(0, 3)])
        let flag = 0;

        for (key in MORSE_TABLE) {
            if (flag < 1) {
                if (exprArr[i] === key) {
                    res.push(MORSE_TABLE[key]);
                    flag++;
                }
                else if (exprArr[i] === key + "**********") {
                    res.push(MORSE_TABLE[key] + " ");
                    flag++;
                }
                else if (exprArr[i] === "*") {
                    res.push(exprArr[i]);
                    flag++;
                }
                else if (exprArr[i].indexOf("**********") > -1 && exprArr[i].indexOf("**********") + 10 < exprArr[i].length) {
                    res.push(MORSE_TABLE[exprArr[i].substring(0, 3)] + " ");
                    exprArr[i] = exprArr[i].substring(13, exprArr[i].length);
                    for (let j = 0; j < exprArr[i].length; j += 5) {
                        let number = MORSE_TABLE[exprArr[i].substring(j, j + 5)];
                        res.push(number);
                    }
                    flag++;
                }
                else if (exprArr[i].length > 5 && exprArr[i].indexOf("**********") <= -1) {
                    let preRes = [];
                    for (let k = exprArr[i].length; k >= 0; k -= 5) {
                        if (k < 5) {
                            preRes.unshift(MORSE_TABLE[exprArr[i].substring(0, k)]);
                        } else {
                            let number = MORSE_TABLE[exprArr[i].substring(k - 5, k)];
                            preRes.unshift(number);
                        }
                    }
                    for (let l = 0; l < preRes.length; l++) {
                        res.push(preRes[l]);
                    }
                    flag++;
                }
            }

        }
    }

    // console.log(res)

    return res.join("");

}

module.exports = {
    decode
}



// const expr = "00101010100000000010001011101000101110100000111111**********00001011110000111111000010111000101110100000111010";
// const result = "hello world";
// console.log(decode(expr));

// const expr2 = "000000001100101010100000000010**********00111110110000101011000000101000111011100000111011**********00111010100000101110000011111100001011110000001110**********001010111000001111110011101011**********00101111110000101011000000111100101111100000101010**********0000111111001010101100000000100000101110**********000000001100101010100000000010**********0010111010000000101100111110100011101111**********000011101000001111110000111110";

// console.log(decode(expr2));


// const expr = "000000101100000011100000101010000010111100000000100000101110**********00001111110000001110**********000000001100101010100000000010**********00001010110010111010000000001100000010100000001111000000101100000000110000000010**********00111110110000101011000000001000001010100000000011000000101000001111110000001110**********00001111110010101110**********0010111010000000101000101011100000000010**********000000001100101010100000000010**********00001010110000001110000000101000101010110000000010000010111000001010100000000010**********000000101100000011100000111010**********0000000010001010101100000000100000101110001110111100000000110010101010000000101000000011100000111110**********00000010100000101010**********10101010111010111111";
// const result = "answer on the ultimate question of life the universe and everything is 42";
// console.log(decode(expr));

// const

//     expr = "00000000100000111010101010111100111011100000001011111110101011111010101010101010";
// const result = "ed3ca775";
// console.log(decode(expr));
// console.log(decode(expr) === result);