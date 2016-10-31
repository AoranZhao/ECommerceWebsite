'use strict';
const angular = require('angular');

/*@ngInject*/
export function productsService($resource) {
  'ngInject';
  // Service logic
  // ...
  return $resource('/api/products/:id', null, {
    'update': {method: 'PUT'},
    'get': {method: 'GET'},
    'save': {method: 'POST'},
    'query': {method: 'GET', isArray: true},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'}
  })
  // var last_id = 5;
  // var prods = [
  //   {_id: 1, title: 'Product 1', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
  //   {_id: 2, title: 'Product 2', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
  //   {_id: 3, title: 'Product 3', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
  //   {_id: 4, title: 'Product 4', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
  //   {_id: 5, title: 'Product 5', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
  // ];

  // // Public API here
  // return {
  //   query() {
  //     return prods;
  //   },

  //   get(params) {
  //     var result = {};
  //     angular.forEach(prods, function(product) {
  //       if (product._id == params.id) {
  //         return this.product = product;
  //       }
  //     }, result);
  //     return result.product;
  //   },

  //   delete(params) {
  //     angular.forEach(prods, function(product, index) {
  //       if (product._id == params._id) {
  //         console.log(product, index);
  //         prods.splice(index, 1);
  //         return;
  //       }
  //     })
  //   },

  //   create(product) {
  //     product._id = ++last_id;
  //     prods.push(product);
  //   },

  //   update(product) {
  //     var item = this.get(product);
  //     if (!item) return false;

  //     item.title = product.title;
  //     item.price = product.price;
  //     item.quantity = product.quantity;
  //     item.description = product.description;
  //     return true;
  //   }
  // };
}


export default angular.module('meanshopApp.productsService', [])
  .factory('Product', productsService)
  .name;
