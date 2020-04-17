const getMiddleValues = (num, d) =>{
    let numString = num.toString();
    numString = (numString.length - d)%2 == 0 ? '' +numString : '0' +numString;
    let stringLength = Math.floor((numString.length-d)/2);
    let finalString = numString.slice(stringLength, stringLength+d);
    return finalString;
}

const transformToR = (x, d) => (x*Math.pow(10,-d)).toFixed(d);

module.exports = {getMiddleValues, transformToR};