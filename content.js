var request = new XMLHttpRequest();
request.open('GET', '/security.txt', true);
request.setRequestHeader("Content-Type", 'text/plain');

request.onload = function() {
    const secure = this.status === 200 && request.getResponseHeader('Content-Type').includes('text/plain')
    chrome.runtime.sendMessage({secure: secure});
};

request.onerror = function() {
    console.log('ERROR from security.txt extension');
};

request.send();