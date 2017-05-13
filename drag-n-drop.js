
function getElementXY( element ) {
    var rect = element.getBoundingClientRect();
    var xy = {
        x: rect.left,
        y: rect.top,
    };
    
    return xy;
}

function makeSubstitue( elem ) {
    
    var $elem = $( elem );
    
    var subsCss = {
        opacity: 0.2
        
    };
    var $subs = $elem.clone();
    
    $subs
        .css( subsCss )
        .insertAfter( $elem );
        
    return $subs;
}

function moveElement( elem, distanceX, distanceY ) {
    
    var elemXY = getElementXY( elem );
    var style = window.getComputedStyle( elem );
    var marginLeft = parseInt( style.getPropertyValue('margin-left') );
    var marginTop = parseInt( style.getPropertyValue('margin-top') );
   
    var newCss = {
        position: 'fixed',
        top: elemXY.y - marginTop + distanceY,
        left: elemXY.x - marginLeft + distanceX
    };
    
    $( elem ).css( newCss );
}


function enableDrag( elem ) {

    var mouseDownXY;
    var oldMouseXY = null;
    var isDragStarted = false;
    var $substitute = null;

    $( window ).on( 'mousedown', function ( event ) {
        
        if ( event.target !== elem ) {
            return;
        }
        
        var mouseXY = {
            x: event.clientX,
            y: event.clientY
        };
        
        isDragStarted = true;
        oldMouseXY = mouseXY;
        
        $substitute = makeSubstitue( elem );
    } );

    $( window ).on( 'mouseup', function ( event ) {
        
        isDragStarted = false;
        $substitute.remove();
    });

    $( window ).on( 'mousemove', function ( event ) {
        
        if ( isDragStarted === false 
                || oldMouseXY === null ) {
            return;
        }
       
        var $elem = $( '#drag-me' );
        var elem = $elem.get(0);
        
        var currentMouseXY = { x: event.clientX, y: event.clientY };
        
        var distanceX = currentMouseXY.x - oldMouseXY.x;
        var distanceY = currentMouseXY.y - oldMouseXY.y; 
        
        moveElement( elem, distanceX, distanceY );
        oldMouseXY = currentMouseXY;
        
    });
}

var d = document.getElementById( 'drag-me' );
enableDrag( d );