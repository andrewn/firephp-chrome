var logger   = new Logger();

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