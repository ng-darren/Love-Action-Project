define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name lapApp.Ticket
   * @description
   * # Ticket
   * Service in the lapApp.
   */
  angular.module('lapApp.services.Ticket', [])
	.service('Ticket', function ($rootScope, $resource, FIREBASE_URL, Firebase, $firebase) {
	// AngularJS will instantiate a singleton by calling "new" on this function
    var ref = new Firebase(FIREBASE_URL + 'tickets');
    var homeRef = new Firebase(FIREBASE_URL);
    var home = $firebase(homeRef);
    var tickets = $firebase(ref);

    var names = ['Dave Matthew\'s Band and Rolling Stones',
      'Beetles & Beyond',
      'GnR and Metallica',
      'Beetles and SodaGreen',
      'Beyond and May Day',
      'Paraprhase & Nirvana',
      'May Day and SodaGreen',
      'Led Zepplin & Beetles',
      'Nirvana & Red Hot Chilli Peppers',
      'May Day and SodaGreen'];
    var time = ['19 Dec (Fri) 1945-2200hrs',
      '19 Dec (Fri) 2200-0030hrs',
      '20 Dec (Sat) 1400-1600hrs',
      '20 Dec (Sat) 1600-1830hrs',
      '21 Dec (Sat) 1830-2100hrs',
      '21 Dec (Sat) 2100-2330hrs',
      '21 Dec (Sun) 1400-1600hrs',
      '21 Dec (Sun) 1600-1830hrs',
      '21 Dec (Sun) 1830-2100hrs',
      '21 Dec (Sun) 2100-2330hrs'];

    $rootScope.tickets = [];
    for(var i=0; i<9; i++) {
      $rootScope.tickets.push({
        name: names[i],
        time: time[i],
        bean:10,
        seat:20,
        stand:40,
        table:5
      });
    }
    
    var Ticket = {
      all: function () {
        return home.$child('tickets').$on('child_added', function(transactions) {
          // Calculate number of tickets left
          angular.forEach(transactions.snapshot, function(v){
            if(v.hasOwnProperty('item_name')) {
              angular.forEach($rootScope.tickets, function(t) {
                if(t.name === v.item_name) {
                  switch (v.item_number) {
                    case 'stand':
                      t.stand -= v.quantity;
                      break;
                    case 'seat':
                      t.seat -= v.quantity;
                      break;
                    case 'bean':
                      t.bean -= v.quantity;
                      break;
                    case 'table':
                      t.table -= v.quantity;
                      break;
                  }
                }
              });
            }
          });
        });
      },
      find: function (ticketId) {
        return tickets.$child(ticketId);
      }
    };

    return Ticket;
	});
});
