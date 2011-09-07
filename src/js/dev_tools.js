chrome.experimental.devtools.resources.onFinished.addListener(function(resources) {
    var tabId   = chrome.experimental.devtools.inspectedWindow.tabId,
        headers = resources.response.headers;
    chrome.extension.sendRequest({
          tabId   : tabId
        , headers : headers
    });
});