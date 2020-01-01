/**
 * Object of tabIds, example : {1:'secure', 2: 'not_secure'} 
 */
let scannedTabs = {};

/**
 * Will update the extension icon
 * @param {string} securityState Determine extension icon. Can be secure || not_secure. 
 */
const updateSecureIcon = (securityState) => {
    chrome.browserAction.setIcon({
        path : {
            "16": `images/${securityState}_16.png`,
            "48": `images/${securityState}_48.png`,
            "128": `images/${securityState}_128.png`,
        }
    });
};

/**
 * Update current icon when content.js send a message.
 * @see https://developer.chrome.com/extensions/runtime#event-onMessage
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // from content
        if (request.secure !== undefined) {
            const securityState = request.secure ? 'secure' : 'not_secure';
            updateSecureIcon(securityState);
    
            // set new tab in scanned tabs
            scannedTabs[`${sender.tab.id}`] = {secure: securityState, content: request.content}
            chrome.runtime.sendMessage({
                data: {
                    content: request.content
                }
            });
        }

        // from popup
        if (request.popup !== undefined) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                const tab = tabs[0];
                const tabId = tab.id;

                chrome.runtime.sendMessage({tab: scannedTabs[`${tabId}`]})
            });
        }
    }
);

/**
 * Update current icon on active tab is changed
 * @see https://developer.chrome.com/extensions/tabs#event-onActivated
 */
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, (tab) => { 
        const scannedTab = scannedTabs[`${tab.id}`]
        if (scannedTab !== undefined) {
            updateSecureIcon(scannedTab.secure);
        } else {
            updateSecureIcon('not_secure');
        }
    });
});