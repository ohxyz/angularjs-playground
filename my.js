angular.module( 'myApp', [
    
    'phoneList',
    'ngRoute',
    'phoneDetail',
    'core'

] );

angular.
  module('myApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');
    }
  ]);


angular.
    module('myApp').
    component('greetUser', {
        template: 'Hello, {{$ctrl.user}}!',
        controller: function GreetUserController() {
            this.user = 'world';
        }
    });

/*
angular.module( 'phoneList', [] );

angular
    .module( 'phoneList' )
    .component( 'phoneList', {
        
        templateUrl: 'phone-list.template.html',
        
        controller: ['$http', function ( $whatTheFuck ){
            
            var self = this;
            self.orderProp = 'age';
            
            $whatTheFuck
                .get( 'phones.json' )
                .then( function ( response ) {
                    
                    self.phones = response.data;
                });
                
        }]
        
    } );
*/

/*
angular.module('phoneDetail', [
  'ngRoute'
]);

angular.
    module('phoneDetail').
    component('phoneDetail', {
    
        templateUrl: '/phone-detail.template.html',
    
        controller: ['$http', '$routeParams',
            function PhoneDetailController( $http, $routeParams ) {
                var self = this;
                
                self.setImage = function setImage( imageUrl ) {
                    
                    self.mainImageUrl = imageUrl;
                }

                $http
                    .get('phone/' + $routeParams.phoneId + '.json')
                    .then( function ( response ) { 
                    
                        self.phone = response.data;
                        self.setImage(self.phone.images[0]);
                    })
            }
        ]
        
    } );
*/

angular.module( 'core', [] );

angular
    .module( 'core' )
    .filter( 'checkmark', function () {
        
        return function( input ) {
            return input ? '\u2713' : '\u2718';
        }

    });
    
    
angular.module( 'core.phone', [ 'ngResource' ] );

angular
    .module( 'core.phone' )
    .factory( 'Phone', [ '$resource', function ( $resource ) {
        
        return $resource( 'phone/:phoneId.json', {}, {
            
            query: {
                method: 'GET',
                params: { phoneId: 'phones' },
                isArray: true
            }
        } ); 
        
    } ] );
    
angular.module( 'phoneList', [ 'core.phone' ] );

angular
    .module( 'phoneList' )
    .component( 'phoneList', {
        
        templateUrl: 'phone-list.template.html',
        
        controller: [ 'Phone', function PhoneListController( Phone ) {
            
            this.phones = Phone.query();
            this.orderProp = 'age'; 
            
        } ]
        
    } );
    
angular.module( 'phoneDetail', [

    'ngRoute',
    'core.phone'
    
] );
   
angular
    .module( 'phoneDetail' )
    .component( 'phoneDetail', {
        
        templateUrl: 'phone-detail.template.html',
        
        controller: [ '$routeParams', 'Phone', function( $routeParams, Phone ) {
            
            var self = this;
            
            self.phone = Phone.get( 
                    
                    { phoneId: $routeParams.phoneId },
                    
                    function( phone ) {
                                        
                        self.setImage( phone.images[0] );
                                        
                    }
            );
                    
            self.setImage = function setImage( imageUrl ) {
                
                self.mainImageUrl = imageUrl;
            };
            
        } ]

    } );
    
    
    
    