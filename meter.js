

var $handle = $( '#handle' );
var $meter = $( '#meter' );
var startMouseXY;
var isDragStarted = false;
var originalHandleLeft = parseInt( $handle.css( 'left' ) );
var maxHandleLeft = parseInt( $meter.css( 'width' ) )
                        - parseInt( $handle.css( 'left' ) )
                        - parseInt( $handle.css( 'width' ) );
                        
var step = ( maxHandleLeft - originalHandleLeft ) / 100;

console.log(  maxHandleLeft, originalHandleLeft, step );

$( window ).on( 'mousedown', function ( event ) {
    if ( event.target !== $handle.get( 0 ) ) {
        return;
    }
    
    isDragStarted = true;
    startMouseXY = {
        x: event.clientX,
        y: event.clientY
    };
    console.log( startMouseXY );
});


$( window ).on( 'mousemove', function ( event ) {
    if ( isDragStarted === false ) {
        return; 
    }
    var handleLeft = parseInt( $handle.css( 'left' ) );
    
    // console.log( 'target left:', $handle.css( 'left' ), handleLeft );

    var currentMouseXY = {
        x: event.clientX,
        y: event.clientY
    };
    
    var distanceX = currentMouseXY.x - startMouseXY.x;

    if ( handleLeft <= originalHandleLeft && distanceX <= 0 ) {
        $handle.css( 'left', originalHandleLeft );
        return;
    }

    if ( handleLeft >= maxHandleLeft && distanceX >= 0) {
        $handle.css( 'left', maxHandleLeft );
        return;
    }

    var handleLeft = parseInt( $handle.css( 'left' ) );
    var newHandleLeft = handleLeft + distanceX;
    $handle.css( 'left', newHandleLeft );
    startMouseXY = currentMouseXY;
        
    var distanceMoved = newHandleLeft - originalHandleLeft;
    var percentageRaw = distanceMoved 
                        / ( ( maxHandleLeft - originalHandleLeft ) / 100 );
    
    var percentageRounded = Math.floor( percentageRaw );
    
    // Percentage can overflow if mouse moves too fast
    percentageRounded = percentageRounded <= 100 ? percentageRounded : 100;
    percentageRounded = percentageRounded >= 0 ? percentageRounded : 0;
    
    $meter.data( 'percentage', percentageRounded );

    console.log( $meter.data('percentage') );
});

$( window ).on( 'mouseup', function ( event ) {
    isDragStarted = false;
    
} );