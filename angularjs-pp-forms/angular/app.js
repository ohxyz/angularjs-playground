angular.module( 'predictablePlanQuote', [] )
       .controller( 'predictablePlanQuoteCtrl', [ '$scope', function ( $scope ) {

            $scope.ppQuote.startDateElec = '';


       } ] );



function getDateAfterSomeDays( dateObject, daysAfter ) {

    var millisecondsAfter = daysAfter * 24 * 60 * 60 * 1000;
    return new Date( dateObject.getTime() + millisecondsAfter );
}

function getOzDateLiteralAfterSomeDays( ozDateLiteral, daysAfter ) {

    var dateRegex = /(\d{2})[/](\d{2})[/](\d{4})/;
    var normalDateLiteral = ozDateLiteral.replace( dateRegex, '$2/$1/$3');
    var normalDate = new Date( normalDateLiteral );
    var dateAfter = getDateAfterSomeDays( normalDate, daysAfter );

    return getOzDateLiteral( dateAfter );

}

function getOzDateLiteral( dateObjectOrLiteral ) {
    
    var date;

    if ( dateObjectOrLiteral === undefined ) {

        date = new Date();
    }
    
    date = new Date( dateObjectOrLiteral );

    var dateOfDate = date.getDate();
    var monthOfDate = date.getMonth() + 1;

    var literal = ( dateOfDate > 9 ? '' : '0' ) + dateOfDate + '/'
                + ( monthOfDate > 9 ? '' : '0' ) + monthOfDate + '/'
                + date.getFullYear();

    return literal;
}

function validateDateLiteral( dateLiteral ) {

    if ( dateLiteral === undefined ) {

        return false;
    }

    var slashes = dateLiteral.match( /[/]/g );

    if ( slashes === null || slashes.length !== 2 ) {

        return false;
    }
    
    var dateTrimmed = dateLiteral.replace( /\s+/g, '' );
    
    if ( dateTrimmed.length !== 10 ) {

        return false;
    }

    var dateMonthYear = dateTrimmed.split( '/' );

    var date = parseInt( dateMonthYear[0], 10 );
    var month = parseInt( dateMonthYear[1], 10 );
    var year = parseInt( dateMonthYear[2], 10 );

    if ( date > 31 || month > 12 ) {

        return false;
    }
    
    return true;
}




