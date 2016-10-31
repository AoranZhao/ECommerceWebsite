'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('products', {
      url: '/products',
      template: '<products></products>'
    })
    .state('newProduct', {
    	url: '/products/new',
    	template: '<new-product></new-product>'
    })
    .state('viewProduct', {
    	url: '/products/:id',
    	template: '<view-product></view-product>'
    })
    .state('editProduct', {
    	url: '/products/:id/edit',
    	template: '<edit-product></edit-product>'
    });
}
