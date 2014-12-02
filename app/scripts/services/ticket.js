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

    var names = ['Rubberband & Mr Sufyan (Not for Sale)',
      'Jamie Wong (Noise 2012 Winner) & Artiste/Band 4',
      'Artiste/Band 5 & Ruth and Fatt',
      'Paraprhase & Artiste/Band 8',
      'Artiste/Band 9 & Mode Rage',
      'Artiste/Band 11 & Artiste/Band 12',
      'Tabula and Blues Band from Crazy Elephants',
      'Jack and Rai & Afterhours',
      'Artiste/Band 17 & Trisno Acoustic Duo',
      'Artiste/Band 19 & Artiste/Band 20'];
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

    var day;
    $rootScope.tickets = [];
    for(var i=0; i<10; i++) {console.log(i);
      if(i<2) {
        console.log('Day 1');
        day='Day 1';
      } else if(i>1&&i<6) {
        day='Day 2';
      } else {
        day='Day 3';
      }
      $rootScope.tickets.push({
        name: names[i],
        time: time[i],
        day: day,
        bean:10,
        seat:40,
        stand:1000,
        table:8
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
