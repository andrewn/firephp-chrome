var Bootstrap = (function (){
  
  var webNavigationEventNames = [
    'onBeforeNavigate',
    'onBeforeRetarget',
    'onCommitted',
    'onCompleted',
    'onDOMContentLoaded',
    'onErrorOccurred'
  ];
  
  function addAPI( object, events, handler ) {
    events.forEach( function (eventName) {
        object[eventName].addListener( handler );
    });
  };
  
  var STABLE        = 'STABLE',
      EXPERIMENTAL  = 'EXPERIMENTAL';
  
  function getApiNs() {
      var ns;
      if (chrome.webNavigation) {
        ns = {
          type: STABLE,
          ns  : chrome 
        };
      } else if (chrome.experimental && chrome.experimental.webNavigation) {
        ns = {
          type: EXPERIMENTAL,
          ns  : chrome.experimental 
        };        
      }
      return ns;
  }
  
  function registerListeners() {
    var apiNs = getApiNs();
    if ( apiNs ) {
       addAPI( 
          apiNs.ns.webNavigation, 
          ['onDOMContentLoaded'], 
          function ( evt ) {
            // Get tab for this event and initialise
            // controller
            chrome.tabs.get( evt.tabId, function(tab) {
              console.log('Creating new controller for ', evt.url, tab);
              new Controller( evt.url, tab );
            });
          }
        );      
    } else {
      console.error('webNavigation API doesn\'t exist. Exiting');
    }
    console.log('webNavigation API is ', apiNs.type);
  };
  
  return {
    init: function () {
      registerListeners();
    }
  };
  
})();