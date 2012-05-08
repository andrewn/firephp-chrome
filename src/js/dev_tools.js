chrome.devtools.network.onRequestFinished.addListener(function(resources) {
    var tabId   = chrome.devtools.inspectedWindow.tabId,
        headers = resources.response.headers;
    chrome.extension.sendRequest({
          tabId   : tabId
        , headers : headers
    });
});
