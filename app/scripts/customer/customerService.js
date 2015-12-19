(function() {
   'use strict';
   var mysql = require('mysql');

   // Create MySql database connection
   var connection = mysql.createConnection({
      host: 'localhost',
      port: '3306',
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
        var query = "SELECT * FROM customers";
        connection.query(query, function(err, rows) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(rows);
          }
        });
        return deferred.promise;
      };

      function getCustomerById(id) {
        var deferred = $q.defer();
        var query = "SELECT * FROM customers WHERE customer_id = ?";
        connection.query(query, [id], function(err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
      };

      function getCustomerByName(name) {
        var deferred = $q.defer();
        var query = "SELECT * FROM customers WHERE name LIKE ?%";
        connection.query(query, [name], function(err, rows) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(rows);
          }
        });
        return deferred.promise;
      };

      function createCustomer(customer) {
        var deferred = $q.defer();
        var query = "INSERT INTO customers SET ?";
        connection.query(query, customer, function(err, result) {
          if (err) {
            deferred.reject(err);
          } else {
            var newId = result.insertId;
            getCustomerById(newId).then(function(rows) {
              deferred.resolve(rows[0]);
            },  function(err) {
              deferred.reject(err);
            });
          }
        });
        return deferred.promise;
      };

      function deleteCustomer(id) {
        var deferred = $q.defer();
        var query = "DELETE FROM customers WHERE customer_id = ?";
        connection.query(query, [id], function(err, result) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(result.affectedRows);
          }
        });
        return deferred.promise;
      };

      function updateCustomer(customer) {
        var deferred = $q.defer();
        var query = "UPDATE customers SET name = ? WHERE customer_id = ?";
        connection.query(query, [customer.name, customer.customer_id], function(err, result) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(result);
          }
        });
        return deferred.promise;
      }
    };
})();
