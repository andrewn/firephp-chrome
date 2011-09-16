(function(){
  chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      request.forEach(
        function ( item ) {
          if (item.action === 'exception') {
            var shortPath = function (path) {
                  return path.split('/').splice(-3).join('/');
                },
                joinArguments = function (args) {
                  var result = [];
                
                  args.forEach(function (arg) {
                    if (typeof arg === 'object') {
                      result.push(arg.__className);
                    } else {
                      result.push(arg);
                    }
                  });
                  
                  return result.join(', ');
                },
                title = "Exception '" + item.body.Class + "' with message '" + item.body.Message + "' in " + shortPath(item.body.File) + ':' + item.body.Line;
                
            console.error(title);

            console.group('Stack trace');

            item.body.Trace.forEach(function (trace, idx) {
              console.groupCollapsed(idx + '. ' + shortPath(trace.file) + '(' + trace.line + '): ' + trace.class + trace.type + trace.function + '(' + joinArguments(trace.args) + ')');
              console.log(trace);
              console.groupEnd();
            })
            
            console.groupEnd();
          } else {
            console[item.action]( item.body );
          }
        }
      );
    }
  );
  
})();