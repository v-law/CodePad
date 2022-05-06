# CodePad

CodePad is a google chrome extension created for easy recording of code snippets.

## Functionality

The pop-up loads objects from a JSON file with its text notes and URLs. When some text is highlighted (selected) before the extension is clicked, the text is added to the JSON folder with the current page's URL and added to the CodePad pop-up.

## Technical Issues

The fetch POST method is not working to add the new object containing the highlighted text and current URL to the JSON file.
Scoping issues with retrieving data from the window through the pop-up javascript code was fixed using the chrome tabs API.
