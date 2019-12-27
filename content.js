/**
 * Main process, request a security.txt file and send a message in turn.
 */
const request = new XMLHttpRequest();
request.open('GET', '/security.txt', true);
request.setRequestHeader("Content-Type", 'text/plain');

request.onload = function() {
    const secure = this.status === 200 && request.getResponseHeader('Content-Type').includes('text/plain')
    let content = 'security.txt is not detected.';

    if (secure) {
        content = request.response;
    }

    chrome.runtime.sendMessage({secure: secure, content: content});
};

request.onerror = function() {
    console.log('ERROR from security.txt extension');
};

request.send();