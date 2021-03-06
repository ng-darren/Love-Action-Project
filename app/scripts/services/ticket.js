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

    var names = ['Session 1 - Rubberband & Mr Sufyan (Not for Sale)',
      'Session 2 - Jamie Wong (Noise 2012 Winner) & Daniel Purnomo feat. local singer/actress Gillian Tan',
      'Session 3 - Singapore Char Siew Bao & Ruth and Fatt',
      'Session 4 - Paraphrase & Jane Doe',
      'Session 5 - Love Me Knot & Moderage',
      'Session 6 - Tabula & Jack and Rai',
      'Session 7 - ShiLi & Adi & Afterhours',
      'Session 8 - Crazy Notes & Trisno'];
    var time = ['19 Dec (Fri) 1945-2200hrs',
      '19 Dec (Fri) 2200-0000hrs',
      '20 Dec (Sat) 1400-1600hrs',
      '20 Dec (Sat) 1600-1830hrs',
      '20 Dec (Sat) 1900-2100hrs',
      '21 Dec (Sun) 1400-1600hrs',
      '21 Dec (Sun) 1630-1830hrs',
      '21 Dec (Sun) 1900-2100hrs'];
    var pic = ['', 's2.jpg', 's3.jpg', 's4.jpg', 's5.jpg', 's6.jpg', 's7.jpg', 's8.jpg', 's9.jpg'];

    var day;
    $rootScope.tickets = [];
    for(var i=0; i<10; i++) {
      if(i<2) {
        day='Day 1';
      } else if(i>1&&i<5) {
        day='Day 2';
      } else {
        day='Day 3';
      }
      $rootScope.tickets.push({
        name: names[i],
        time: time[i],
        pic: pic[i],
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
