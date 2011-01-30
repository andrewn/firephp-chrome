(function(){
  
  var SENDER_CONTENT_SCRIPT = "sender_content_script",
      SENDER_EXTENSION      = "sender_extension";
  
  chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      
      var senderType = sender.tab ? SENDER_CONTENT_SCRIPT : SENDER_EXTENSION;
      
      request.forEach(
        function ( item ) {
          console[item.action]( item.body );
        }
      );
      
    }
  );
  
})();