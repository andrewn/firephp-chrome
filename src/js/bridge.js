(function(){
  chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      request.forEach(
        function ( item ) {
          console[item.action]( item.body );
        }
      );
    }
  );
  
})();