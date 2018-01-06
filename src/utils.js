exports.getHTML = function ( url, callback, obj ) {

    // Feature detection
    if ( !window.XMLHttpRequest ) return;

    // Create new request
    var xhr = new XMLHttpRequest();

    // Setup callback
    xhr.onload = function() {
        if ( callback && typeof( callback ) === 'function' ) {
            callback( this.responseXML, obj );
        }
    }

    // Get the HTML
    xhr.open( 'GET', url );
    xhr.responseType = 'document';
    xhr.send();

};
