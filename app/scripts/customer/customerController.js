(function() {
   'use strict';
   angular.module('app')
    .controller('customerController',
        ['customerService', '$q', '$mdDialog', CustomerController]);

    function CustomerController(customerService, $q, $mdDialog) {
      var self = this;

      self.selected = null;
      self.customers = [];
      self.selectedIndex = 0;
      self.filterText = null;
      self.selectCustomer = selectCustomer;
      self.deleteCustomer = deleteCustomer;
      self.saveCustomer = saveCustomer;
      self.createCustomer = createCustomer;
      self.filter = filterCustomer;
    };

    // load initial customer
    getAllCustomer();

    //
    // Internal functions
    //

    function selectCustomer(customer, index) {
      self.selected = angular.isNumber(customer) ?
                          self.customer[customer] : customer;
      self.selectedIndex = angular.isNumber(customer) ?
                            customer : index;
    };

    
})();
