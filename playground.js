(function () {
    
    // Firefox & Safari solution:
    // http://stackoverflow.com/questions/3977596/how-to-make-divs-in-html5-draggable-for-firefox
    

    var $draggable = $( '#draggable' );
    var $dropArea = $( '#drop-area' );

    $draggable.on( 'dragstart', function ( event ) {
        
        $draggable.css( 'opacity', 0.2 );
        //Add following line to make Firefox work
        event.originalEvent.dataTransfer.setData('Text', this.id) 
    });

    $draggable.on( 'drag', function () {

        
    });


    $draggable.on( 'dragend', function () {
        
        $draggable.css( 'opacity', 1 );
        
    });

    /* START: Define #drop-area's handlers */

    $dropArea.on( 'dragenter', function ( event ) {
        // Not necessarilly to use preventDefault method. Without preventDefault method, 
        // ondrop still works on Chrome.
        // event.preventDefault();
        $dropArea.css( 'background-color', 'yellow' );

    });

    
    $dropArea.on( 'dragover', function ( event ) {
        // preventDefault method MUST be called so that ondrop event can work.
        event.preventDefault();

    });
    
    $dropArea.on( 'dragleave', function () {
        
        $dropArea.css( 'background-color', 'transparent' );
    });


    $dropArea.on( 'drop', function ( event ) {
        console.log('dropped');
        $dropArea.css( 'background-color', 'orange' );
        $dropArea.append($draggable);
    });


})();


var youtube = '<iframe style="width:100%;height:100%;" id="trailer" src="https://www.youtube.com/embed/tR-mDxUpWts?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
var options = {
    width: 640,
    height: 360,
    top: '15%',
    content: youtube,
    triggerElement: '#open-popup'
};

new Popup( options );


var initPerfectScrollbar = function () {
    
    var containers = document.querySelectorAll( '#wrapper' );
    
    containers.forEach( function ( container ) {
        console.log( container );
        Ps.initialize( container );
        
        
    } );
}

initPerfectScrollbar();