(function() {
   'use strict';
   var mysql = require('mysql');

   // Create MySql database connection
   var connection = mysql.createConnection({
      host: 'localhost',
      user: 'connie',
      password: 'password',
      database: 'customer_manager'
   });

   angular.module('app')
    .service('customerService', ['$q', CustomerService]);

    function CustomerService($q) {
      return {
        getCustomers : getCustomers,
        getById : getCustomerById,
        getByName : getCustomerByName,
        create: createCustomer,
        destroy: deleteCustomer,
        update: updateCustomer
      };

      function getCustomers() {
        var deferred = $q.defer();

        return deferred.promise;
      };

      function getCustomerById() {
        var deferred = $q.defer();

        return deferred.promise;
      };

      function getCustomerByName() {
        var deferred = $q.defer();

        return deferred.promise;
      };

      function createCustomer() {
        var deferred = $q.defer();

        return deferred.promise;
      };

      function deleteCustomer() {
        var deferred = $q.defer();

        return deferred.promise;
      };

      function updateCustomer() {
        var deferred = $q.defer();

        return deferred.promise;
      }
    };
})();
