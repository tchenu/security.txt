/**
 * Send message to background to inquire the security state
 * @see https://developer.chrome.com/extensions/runtime#method-sendMessage
 */
chrome.runtime.sendMessage({popup: true});

/**
 * Intercept response from background to get the content of the security file and insert it
 * @see https://developer.chrome.com/extensions/runtime#event-onMessage
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.tab !== undefined ) {
            document.getElementById('securityContent').innerText = request.tab.content
        }
    }
);