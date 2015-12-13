(function() {
   'use strict';
   angular.module('app')
    .controller('customerController',
        ['customerService', '$q', '$mdDialog', CustomerController]);

    function CustomerController(customerService, $q, $mdDialog) {
      var self = this;

      self.selected = null;
      self.customers = [];
    };
})();
