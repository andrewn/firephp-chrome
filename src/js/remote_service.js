var RemoteService = (function(){
    function RemoteService(){};
    RemoteService.prototype = {
        _eventCallbacks: {},
        
        setUrl: function( url ) {
            this._url = url;
            return this; // chaining
        },
        
        setConnection: function( connection ) {
            this._connection = connection;
            return this; // chaining
        },
        
        on: function ( event, callback ) {
            if ( !this._eventCallbacks[event] ) {
                this._eventCallbacks[event] = [];
            }
            this._eventCallbacks[event].push( callback );
            return this; // chaining
        },
        
        fire: function ( event, data ) {
            if ( this._eventCallbacks[event] ) {
                this._eventCallbacks[event].forEach( 
                    function( callback ) {
                        callback( data );
                    });
            }
        },
        
        load: function () {
            
            this._connection.getHeaders( 
                this._url, 
                util.bind( 
                    this,
                    function (headers) {
                        var firePhpHeaders = {};
                    
                        // get any firephp headers
                        firePhpHeaders = util.filterObjByPatternInKey( /X-Wf-/, headers);
                    
                        // set headers to caller
                        this.fire( 'logged_items', firePhpHeaders );
                    }
                )
            );
            
        }
        
    };
    return RemoteService;
})();