angular.module( 'myApp', [ 'myForm' ] );

angular.module( 'myForm', [] )
       .controller( 'MyFormController', [ '$scope', function ( $scope ) {

            $scope.bill = {

                startDate: getOzDateLiteral( new Date() ),
                endDate: getOzDateLiteral( getDateAfterSomeDays( new Date(), 85 ) )
            };

            console.log( 0, $scope );

            $scope.handleStartDateChange = function () {
                
                

            };

            $scope.handleSubmit = function () {

                console.log( 'form1', $scope.form1 );
            };

            $scope.handleStartDateBlur = function () {

                if ( $scope.bill === undefined ) {

                    return;
                }

                if ( validateDateLiteral( $scope.bill.startDate ) === false ) {
                    
                    return;
                }

                var startDateLiteral = $scope.bill.startDate;
                var endDateLiteral = getOzDateLiteralAfterSomeDays( startDateLiteral, 85 );

                $scope.bill.endDate = endDateLiteral;
            }

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




