
export const utilService = {
    makeId,
    makerRandomWords,
    saveToStorage,
    loadFromStorage
}

function makeId(length = 6) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function makerRandomWords(words) {
    const length = words * 5
    var text = "";
    var possible = "qwertyuiopasdfghjklzxcvbnm";
    for (var i = 1; i <= length; i++) {
        if(i % 6 === 0) text += ' '
        else text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}