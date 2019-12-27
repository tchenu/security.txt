chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.tab !== undefined ) {
            document.getElementById('securityContent').innerText = request.tab.content
        }
    }
);
chrome.runtime.sendMessage({popup: true});