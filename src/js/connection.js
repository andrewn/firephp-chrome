var Connection = (function(){
    function Connection(){};
    Connection.prototype = {
        
        FIREPHP_REQUEST_HEADER    : 'X-FirePHP-Version',
        FIREPHP_SUPPORTED_VERSION : '0.4',
        
        getHeaders: function ( url, callback ) {
            var req = new XMLHttpRequest(),
                headers = {};
            
            req.onreadystatechange = util.bind( this, function() { 
        			if(req.readyState == 4) {
        				if(req.status == 200) {
        					headers = req.getAllResponseHeaders();
        				} else {
        				    throw new Error('Exception gettting HEAD (status: %o)', (req.status?re.status:null));
        				}	
    				    				
        				headers = this._parseHeaders( headers );
    				    				
        				callback( headers );
        			} 
        		});
    		
            req.open("HEAD", url, true); 
            
            // Instead of changing the User-Agent (which isn't possible in 
            // Chrome), set a header as documented here:
            //    http://bit.ly/bxK4Oi
            req.setRequestHeader( this.FIREPHP_REQUEST_HEADER, this.FIREPHP_SUPPORTED_VERSION );
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