var Connection = (function(){
    function Connection(){};
    Connection.prototype = {
        
        getHeaders: function ( url, callback ) {
            var req = new XMLHttpRequest(),
                headers = {};
            
            // Need to let server know we are a FirePHP user agent
            var ua = navigator.userAgent + ' FirePHP/0.4';
            
            req.onreadystatechange = util.bind( this, function() { 
    			if(req.readyState == 4) {
    				if(req.status == 200) {
    					headers = req.getAllResponseHeaders();
    				} else {
    				    throw new Error('Exception gettting HEAD');
    				}	
    				    				
    				headers = this._parseHeaders( headers );
    				    				
    				callback( headers );
    			} 
    		});
    		
            req.open("HEAD", url, true); 
            
            // @HACK Can't set the User-Agent in Chrome so need
            // to use something else (this requires the WildFire)
            // server library to be patched
            //req.setRequestHeader( 'User-Agent', ua );
            req.setRequestHeader( 'X-Wf-User-Agent', ua );
            req.send(null);
            
            
        },
                
        _parseHeaders: function ( header_string ) {
            var headers = {},
                lines   = header_string.split(/[\n\f\r]/);
            
            lines.forEach( function ( line, index ) {
                
               var keyValue = line.split( /([\w.\/\\-]*):(.*)/ ),
                    key,
                    val;
                                            
                if ( keyValue[1] ) {
                    key = keyValue[1].trim();
                    val = keyValue[2].trim();
                    headers[ key ] = val;
                }
                
            });
            
            return headers;
        }
        
    };
    return Connection;
})();