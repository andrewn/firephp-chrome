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
        object[eventName].addListener(
          handler
        );
    });
  };
  
  function registerListeners() {
    addAPI( 
      chrome.experimental.webNavigation, 
      ['onDOMContentLoaded'], 
      function ( evt ) {
        // Get tab for this event and initialise
        // controller
        chrome.tabs.get( evt.tabId, function(tab) {
          new Controller( evt.url, tab );
        });
      }
    );    
  }
  
  return {
    init: function () {
      registerListeners();
    }
  }
  
})();