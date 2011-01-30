var Controller = (function(){
    function Controller( remote_url, tab ){
        this.url = remote_url;
        this.tab = tab;
        
        // Model
        this.remote = new RemoteService();
        this.remote.setUrl( this.url )
                   .setConnection( new Connection() );
        
        // View
        this.viewer = new Logger();
        
        // Connect model to view
        var self = this;
        this.remote.on( 
            'logged_items',
            function(items) {
                self.displayLoggedItems( items, self.tab );
            });
        
        // tell model to load data
        this.remote.load();
    };
    Controller.prototype = {
        
        displayLoggedItems: function( items, tab ) {
            var consoleMessages = this.viewer.log( items );
            chrome.tabs.sendRequest( 
              tab.id, 
              consoleMessages
              /* responseCallback - not used */
            );
        }
    };
    return Controller;
})();

//new Controller( document.location.toString() );