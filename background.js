chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const state = request.secure ? 'secure' : 'not_secure';
        chrome.browserAction.setIcon({
            path : {
                "16": `images/${state}_16.png`,
                "48": `images/${state}_48.png`,
                "128": `images/${state}_128.png`,
            }
        });
    });