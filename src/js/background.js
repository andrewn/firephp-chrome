var logger   = new Logger();

// Add the X-FirePHP-Version header to all requests
var filter, 
    extraInfoSpec = ["blocking", "requestHeaders"];
chrome.experimental.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        var headers = details.requestHeaders;
        headers.push({
            name  : "X-FirePHP-Version",
            value : "0.6"
        });
        console.log(details);
        return {
            requestHeaders: headers
        }
    }, 
    /* RequestFilter */ filter, 
    /* array of string */ extraInfoSpec
);


// The dev panel sends us interesting requests
// via dev_tools.js
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var headersMap = {};
    request.headers.forEach(function (item) {
        headersMap[item.name] = item.value;
    });

    var items = logger.log(headersMap);

    chrome.tabs.sendRequest(
        request.tabId,
        items
    );
  }
);