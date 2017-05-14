/* Playground Libs */
function Popup( options ) {

    var settings = $.extend( {
        
        width: '90%',
        height: 400,
        content: 'This is a modal popup box.',
        border: '1px solid #333',
        backgroundColor: '#eee',
        onopen: function() {},
        onclose: function() {},
        enableModal: false,
        enableAlwaysCenter: true,
        maxNumber: 1
        
    }, options );
    
    if ( Popup.popups.length >= settings.maxNumber ) {
        throw "Maximum number of popups reached.";
    }

    /* START: Create a popup window. */
    this.$popup = $( '<div>' );
    this.$closeButton = $( '<div>' );
    
    this.onclose = settings.onclose;
    this.onopen = settings.onopen;
    
    var $body = $( 'body' )  
    var popupWidth = settings.width;
    var popupHeight = settings.height;
    var content = settings.content;
    
    var popupCss = {
        position: 'fixed',
        zIndex: 100,
        width: popupWidth,
        height: popupHeight,
        border: settings.border,
        backgroundColor: settings.backgroundColor
    };
    
    var closeButtonCss = {
        
        position: 'absolute',
        top: 0,
        right: 0,
        width: 64,
        height: 64,
        cursor: 'pointer',
        backgroundColor: '#aaa'
    };
    
    this.$closeButton.css( closeButtonCss );
    this.$popup.css( popupCss );
    
    this.$popup.append( this.$closeButton )
        .append( content )
        .appendTo( $body );
        
    this.$popup.data( 'isClosed', false );
    this.setPopupPosition();
    
    settings.onopen();
    Popup.popups.push( this );

    /* END: Create a popup window. */
    
    if ( settings.enableModal === true ) {
        
        if ( Popup.isModalCreated === false ) {

            var $modal = $( '<div>' );
            var modalCss = {
                
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 99,
                display: 'none'
                
            };
            
            $modal.css( modalCss ).appendTo( $body );
            Popup.$modal = $modal;
            Popup.isModalCreated = true;
        }
        
        Popup.$modal.show();
        Popup.isModalEnabled = true;
    }
    
    var self = this;
    
    this.$closeButton.on('click touchstart', function () {
        self.close();
    });
          
    if ( settings.enableAlwaysCenter === true ) {
        
        $( window ).resize( function () {
            self.setPopupPosition();
        });
    }
}

Popup.prototype.getCenteringSettings = function ( ) {
    
    var $window = $( window );
    var viewPortWidth = $window.width();
    var viewPortHeight = $window.height();
    
    var elementOuterWidth =  this.$popup.outerWidth();
    var elementOuterHeight =  this.$popup.outerHeight();
    
    var positionTop =  ( viewPortHeight - elementOuterHeight ) / 2;
    var positionLeft = ( viewPortWidth - elementOuterWidth ) / 2;

    return {
        top: positionTop,
        left: positionLeft
    };
}

Popup.prototype.setPopupPosition = function ( ) {
    
    var centeringSettings = this.getCenteringSettings ();
    var popupCss = {
        top: centeringSettings.top,
        left: centeringSettings.left,   
    };
    
    this.$popup.css( popupCss );
}

Popup.prototype.open = function () {
    
    this.$popup.show();
    this.$popup.data( 'isClosed', false );
    this.onopen();
}

Popup.prototype.close = function () {
    
    this.$popup.hide();
    this.$popup.data( 'isClosed', true );
    this.onclose();
    
    if ( Popup.isModalEnabled === true 
            && Popup.isAllClosed() === true ) {
        Popup.$modal.hide();
    }
}

$.extend( Popup, {
    
    popups: [],
    
    isModalCreated: false,
    
    isModalEnabled: false,
    
    $modal: null,
    
    isAllClosed: function () {
        
        var isAllClosed = true;
        
        for ( var i = 0; i < this.popups.length; i ++ ) {
            
            var isClosed = this.popups[ i ].$popup.data( 'isClosed' );
            isAllClosed = isAllClosed && isClosed;
        }
        
        return isAllClosed;
    }
    
} );

$( '#open-popup' ).click( function () {
    var youtube = '<iframe style="width:100%;height:100%;" id="trailer" src="https://www.youtube.com/embed/tR-mDxUpWts?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
    var options = {
        width: 640,
        height: 360,
        content: youtube
    };
    var popup = Popup.popups.length >= 1 ? Popup.popups[0].open() : new Popup( options );
});

for ( var i = 0; i < 0; i ++ ) {
    new Popup();
}