/*
    Understands WildFire logging headers

*/
var Logger = (function(){
    function Logger(){};
    Logger.prototype = {
                
         wfToChromeMap: {
             "LOG" : "log",
             "INFO": "info",
             "WARN": "warn",
             "ERROR":"error"
         },
        
        meta: [
            /X-Wf-Protocol-[\d]*/,
            /X-Wf-[\d]*-Plugin-[\d]*/,
            /X-Wf-[\d]*-Structure-[\d]*/
        ],
        
        logging: [
            /X-Wf-[\d]*-[\d]*-[\d]*-([\d]*)/
        ],
        
        commandMessage: /(\d*) *\| *(\[.*\])\ *| */,
        
        log: function ( headers ) {
            var logMessages = [];
            for ( item in headers ) {
                var logKey = item.match(this.logging[0]);
                if (logKey) {
                    var commandParts = headers[item].match( this.commandMessage ),
                        size = commandParts[1],
                        msg  = JSON.parse( commandParts[2] ),
                        meta = msg[0],
                        body = msg[1],
                        idx = parseInt(logKey[1], 10);
                    
                    if ( meta["Type"] in this.wfToChromeMap ) {
                        var action = this.wfToChromeMap[meta["Type"]];
                        logMessages.push({
                            'idx': idx,
                            'meta': meta,
                            'body': body,
                            'action': action
                        });
                    }              
                } else {
                    //console.warn('not logging info', item);
                }                
            }

            logMessages.sort(function (a, b) { return a.idx - b.idx; });
                        
            return logMessages;
        }
        
    };
    return Logger;
})();
