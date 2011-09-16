(function(){
  
  var dirObject = function(o) {
    for (key in o) {
      if (o.hasOwnProperty(key)) {
        console.log(key + ':', o[key]);
      }
    }
  };
  
  var dirStacktrace = function(stacktrace) {
    console.group('Stack trace');
    stacktrace.forEach(function (trace, idx) {
      console.groupCollapsed(idx + '. ' + shortPath(trace.file) + '(' + trace.line + '): ' + trace.class + trace.type + trace.function + '(' + joinArguments(trace.args) + ')');
      dirObject(trace);
      console.groupEnd();
    });
    console.groupEnd();
  };
  
  var shortPath = function (path) {
    return path.split('/').splice(-3).join('/');
  };
  
  var joinArguments = function (args) {
    var result = [];
    args.forEach(function (arg) {
      if (typeof arg === 'object') {
        result.push(arg.__className);
      } else {
        result.push(arg);
      }
    });
    return result.join(', ');
  };

  chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      request.forEach(
        function ( item ) {
          if (item.action === 'exception') {
            console.error("Exception '" + item.body.Class + "' with message '" + item.body.Message + "' in " + shortPath(item.body.File) + ':' + item.body.Line);
            dirStacktrace(item.body.Trace);
          } else {
            console[item.action]( item.body );
          }
        }
      );
    }
  );
  
})();