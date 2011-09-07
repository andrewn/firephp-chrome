var Bootstrap = (function (){
  
  var STABLE        = 'STABLE',
      EXPERIMENTAL  = 'EXPERIMENTAL';

  var viewer = new Logger();
  
  function getApiNs() {
      var ns;
      if (chrome.webRequest) {
        ns = {
          type: STABLE,
          ns  : chrome 
        };
      } else if (chrome.experimental && chrome.experimental.webRequest) {
        ns = {
          type: EXPERIMENTAL,
          ns  : chrome.experimental 
        };        
      }
      return ns;
  }
  
  function registerListeners(tabId) {
    var apiNs = getApiNs(),
        filter = {
          types: ["main_frame" /*, "sub_frame", "xmlhttprequest", "other",  "stylesheet", "script", "image", "object" */]
          //, tabId: tabId
        },
        extraInfoSpec = ["statusLine", "responseHeaders"];
    if ( apiNs ) {
      apiNs.ns.webRequest.onCompleted.addListener(
        function(details) {
            console.log("webRequest.onCompleted", tabId, details);
            var headers = {};
            details.responseHeaders.forEach(function (item) {
              headers[item.name] = item.value;
            });
            console.log("headers", headers);
            var consoleMessages = viewer.log(headers);
            
            console.log("about to send tab %o the following consoleMessages %o", tabId, consoleMessages);

            chrome.tabs.sendRequest( 
              tabId, 
              consoleMessages
              /* responseCallback - not used */
            );
        }, 
        filter, 
        extraInfoSpec
      ); 
         // function ( evt ) {
         //    Get tab for this event and initialise
         //    controller
         //   chrome.tabs.get( evt.tabId, function(tab) {
         //     console.log('Creating new controller for ', evt.url, tab);
         //     new Controller( evt.url, tab );
         //   });
         //  }
    } else {
      console.error('webRequest API doesn\'t exist. Exiting');
    }
    console.log('webRequest API is ', apiNs.type);
  };
  
  return {
    init: function () {
      //registerListeners();
      /*
      chrome.contextMenus.create({
        "title": "Activate FirePHP", 
        "contexts":["all"],
        "onclick": function (info, tab) {
            console.log("Activate FirePHP for tab ", tab.id);
            registerListeners(tab.id);
        }
      });
      */
       
      chrome.experimental.devtools.resources.getHAR(function(result) {
        var entries = result.entries;
        if (!entries.length) {
          Console.warn("ChromeFirePHP suggests that you reload the page to track" +
              " FirePHP messages for all the resources");
        }

        chrome.experimental.devtools.resources.onFinished.addListener(
          function () { chrome.experimental.devtools.log("test"); }
        );
      });

    }
  };
  
})();