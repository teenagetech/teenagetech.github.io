function numberToWords(number) {
    const words = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
        'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six',
        'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three',
        'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine',
        'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six',
        'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three',
        'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine'
    ];
    return words[number];
}

function getOrdinalSuffix(number) {
    if (number >= 1 && number <= 31) {
        const suffixes = [
            'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
            'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth',
            'twentieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth',
            'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth', 'thirty-first'
        ];
        return suffixes[number - 1];
    }
    return numberToWords(number);
}

function getCurrentTimeInWords() {
    const now = new Date();

    let hour = now.getHours();
    const minute = now.getMinutes();
    const day = now.toLocaleString('default', { weekday: 'long' }).toLowerCase();
    const month = now.toLocaleString('default', { month: 'long' }).toLowerCase();
    const dayOfMonth = now.getDate();

    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;

    const hourInWords = numberToWords(hour);
    // Handle single-digit minutes by prepending 'oh'
    const minuteInWords = minute === 0 ? "o'clock" : minute < 10 ? `oh ${numberToWords(minute)}` : numberToWords(minute);
    const dayOfMonthInWords = getOrdinalSuffix(dayOfMonth);

    return `it's ${hourInWords} ${minuteInWords} on ${day}, ${month} ${dayOfMonthInWords}.`;
}

function updateClock() {
    const clockElement = document.getElementById('wordClock');
    clockElement.textContent = getCurrentTimeInWords();
}

document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 500);
});
