function getNotes() {
    const notes = document.querySelector('.notesdiv');

    fetch('config.json')
        .then((data) => data.json())
        .then((data) => {
            console.log(data);
            data.forEach((elem, i) => {
                const note = document.createElement('div');
                note.setAttribute('class', 'note');
                note.appendChild(document.createTextNode(elem.text));
                note.addEventListener('click', function (e) {
                    chrome.tabs.create({
                        url: elem.url
                    });
                }, false);
                notes.appendChild(note);
            });
        })
        .catch((err) => {
            console.log('Error: ', err);
        });
}

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

    // getNotes();

    const noteobj = {};
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        noteobj.url = tabs[0].url;
    });

    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        if (selection[0] !== '') {
            noteobj.text = selection[0];
            console.log(noteobj);
            fetch(chrome.runtime.getURL('config.json'), {
                method: 'POST',
                body: JSON.stringify(noteobj),
                headers: {
                    'Content-Type': 'application/JSON; charset=UTF-8'
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const note = document.createElement('div');
                    note.setAttribute('class', 'note');
                    note.appendChild(document.createTextNode(noteobj.text));
                    note.addEventListener('click', function (e) {
                        // chrome.tabs.update
                        chrome.tabs.create({
                            url: noteobj.url
                        });
                    }, false);
                    notes.appendChild(note);
                })
                .then(getNotes)
                .catch((err) => {
                    console.log('Error: ', err);
                });
        } else getNotes();
    });




});