
function cutExcessText(text) {

    if (text.length > 80) {
        let cutText = text.slice(0, 81);
        if (cutText[cutText.length - 1] === " ") cutText = cutText.slice(0, 80);
        return `${cutText}...`;
    }

    return text;

}

export { cutExcessText }
