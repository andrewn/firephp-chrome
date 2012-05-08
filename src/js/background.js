var logger   = new Logger();

console.log("Firing up FirePHP Debugger");

// Add the X-FirePHP-Version header to all requests
var filter, 
    extraInfoSpec = ["blocking", "requestHeaders"];


chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        var headers = details.requestHeaders;

	console.warn("Inserting X-FirePHP header");

        headers.push({
            name  : "X-FirePHP-Version",
            value : "0.6.1"
        });
        return {
            requestHeaders: headers
        }
    }, 
    {urls: ["<all_urls>"]},
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
                 
    if (items.length) {                
        chrome.tabs.sendRequest(
            request.tabId,
            items
        );
    }
  }
);

console.log("Completed BG Page Load");
