document.addEventListener('DOMContentLoaded', () => {
    const title = document.createElement('h1');
    title.setAttribute('class', 'header')
    title.innerText = 'CodePad';
    document.querySelector('body').appendChild(title);

    const intro = document.createElement('div');
    intro.setAttribute('class', 'intro');
    intro.innerText = "highlight some text to add to your CodePad !!";
    document.querySelector('.header').appendChild(intro);

    const notesdiv = document.createElement('div');
    notesdiv.setAttribute('class', 'notesdiv');
    document.querySelector('body').appendChild(notesdiv);

    const notes = document.querySelector('.notesdiv');
    //const query = { active: true, currentWindow: true };

    const note = document.createElement('div');
    note.setAttribute('class', 'note');
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        console.log(selection);
        if (!chrome.runtime.lastError) {
        note.innerHTML = selection;//[0];
        }
    });
    notes.appendChild(note);
    
    // chrome.tabs.query(query, (tabs) => {
    //     const note = document.createElement('div');
    //     note.setAttribute('class', 'note');
    //     note.innerHTML = getHighlightedText(tabs[0].url);
    //     notes.appendChild(note);
    //     console.log(tabs);
    // });
});

const getHighlightedText = (text) => {
    var notetext = '';
    if (window.getSelection) {
        notetext = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        notetext = document.selection.createRange().text;
    }
    return `${notetext} from ${text}`;
}