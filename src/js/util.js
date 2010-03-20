var util = (function(){
    return {
        bind: function ( context, fn ) {
            return function () {
                 fn.apply( context, arguments );
            }
        },
        
        filterObjByPatternInKey: function( keyRegexp, obj ) {
            var results = {};
            
            for ( o in obj ) {
                if ( keyRegexp.test( o ) ) {
                    results[o] = obj[o];
                }
            }
            
            return results;
        }
    };
})();