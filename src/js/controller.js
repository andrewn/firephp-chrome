var Controller = (function(){
    function Controller( remote_url ){
        this.url = remote_url;
        
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
                self.displayLoggedItems( items );
            });
        
        // tell model to load data
        this.remote.load();
    };
    Controller.prototype = {
        
        displayLoggedItems: function( items ) {
            this.viewer.log( items );
        }
    };
    return Controller;
})();

new Controller( document.location.toString() );