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
            /X-Wf-[\d]*-[\d]*-[\d]*-[\d]*/
        ],
        
        commandMessage: /(\d*) *\| *(\[.*\])\ *| */,
        
        log: function ( headers ) {
            for ( item in headers ) {
                if ( this.logging[0].test(item) ) {
                    var commandParts = headers[item].match( this.commandMessage ),
                        size = commandParts[1],
                        msg  = JSON.parse( commandParts[2] ),
                        meta = msg[0],
                        body = msg[1];
                        
                    if ( meta["Type"] in this.wfToChromeMap ) {
                        var action = this.wfToChromeMap[meta["Type"]];
                        console[action]( body );
                    }
                    
                } else {
                    //console.warn('not logging info', item);
                }                
            }
        }
        
    };
    return Logger;
})();