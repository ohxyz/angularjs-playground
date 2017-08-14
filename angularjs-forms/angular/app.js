angular.module( 'myApp', [ 'myForm' ] );

angular.module( 'myForm', [ ] )
       .controller( 'MyFormController', [ '$scope', function ( $scope ) { 

            $scope.handleStartDateChange = function () {

                //$scope.bill.endDate = $scope.bill.startDate;
            };

            $scope.handleStartDateBlur = function () {

                if ( $scope.bill === undefined ) {

                    return;
                }

                if ( validateDateString( $scope.bill.startDate ) === false ) {
                    
                    return;
                }

                var startDateLiteral = $scope.bill.startDate;

                var dateRegex = /(\d{2})[/](\d{2})[/](\d{4})/;

                startDateLiteral = startDateLiteral.replace( dateRegex, '$2/$1/$3');
                startDate = new Date( startDateLiteral );

                var daysAfter = 85;
                var millisecondsAfter = daysAfter * 24 * 60 * 60 * 1000;
                var endDate = new Date( startDate.getTime() + millisecondsAfter );

                var endDateDate = endDate.getDate();
                var endDateDateLiteral = endDateDate < 10
                                       ? '0' + endDateDate
                                       : endDateDate.toString();

                var endDateMonth = ( endDate.getMonth() + 1 );
                var endDateMonthLiteral = endDateMonth < 10
                                        ? '0' + endDateMonth
                                        : endDateMonth.toString();

                var endDateLiteral = endDateDateLiteral + '/' +
                                     endDateMonthLiteral + '/' +
                                     endDate.getFullYear().toString();

                console.log( 1, endDateLiteral );

                $scope.bill.endDate = endDateLiteral;
            }

       } ] );


function validateDateString( dateString ) {

    if ( dateString === undefined ) {

        return false;
    }

    var slashes = dateString.match( /[/]/g );

    if ( slashes === null || slashes.length !== 2 ) {

        return false;
    }
    
    var dateTrimmed = dateString.replace( /\s+/g, '' );
    
    if ( dateTrimmed.length !== 10 ) {

        return false;
    }

    var dateMonthYear = dateTrimmed.split( '/');

    var date = parseInt( dateMonthYear[0], 10 );
    var month = parseInt( dateMonthYear[1], 10 );
    var year = parseInt( dateMonthYear[2], 10 );

    if ( date > 31 || month > 12 ) {

        return false;
    }
    
    return true;
}




