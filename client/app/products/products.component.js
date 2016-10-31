'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './products.routes';

var errorHandler, uploadHander;

export class ProductsComponent {

  /*@ngInject*/
  constructor($scope, Product, Auth) {
    'ngInject';
    this.products = Product.query();
    this.Product = Product;
    this.isAdmin = Auth.isAdminSync;
  }
}

export class ProductViewComponent {
  /*@ngInject*/
  constructor($scope, $state, $stateParams, Product, Auth) {
    'ngInject';
    this.product = Product.get({id: $stateParams.id});
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.Product = Product;
    this.isAdmin = Auth.isAdminSync;
  }

  deleteProduct() {
    var $state = this.$state;
    this.Product.delete({id: this.product._id}, function success(/*value, responseHeaders*/) {
      $state.go('products');
    }, errorHandler(this));
  }
}

export class ProductNewComponent {

  /*@ngInject*/
  constructor($scope, $state, Product, Upload, $timeout) {
    'ngInject';
    this.product = {};
    this.Product = Product;
    this.$state = $state;
    this.upload = uploadHander(this, Upload, $timeout);
    // console.log('this:', this);
  }

  addProduct(product) {
    // this.Product.create(this.product);
    var $state = this.$state;
    var upload = this.upload;
    var product = this.product;
    this.Product.save(this.product, function success(value) {
      // this.$state.go('viewProduct', {id: value._id});
      // upload(product.image, value._id);
      $state.go('viewProduct', {id: value._id});
    }, errorHandler(this))
    // this.$state.go('products');
  }
}

export class ProductEditComponent {

  /*@ngInject*/
  constructor($scope, $state, $stateParams, Product, Upload, $timeout) {
    'ngInject';
    this.product = Product.get({id: $stateParams.id});
    this.Product = Product;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.upload = uploadHander($scope, Upload, $timeout);
  }

  editProduct(product) {
    var $state = this.$state;
    var upload = this.upload;
    var product = this.product;
    this.Product.update({id: this.product._id}, this.product, function success(value /*, responseHeaders*/) {
      upload(product.image, product._id);
      $state.go('viewProduct', {id: value._id});
    }, errorHandler(this));
  }
}

errorHandler = function(that) {
  return function error(httpResponse) {
    that.errors = httpResponse;
  }
}

uploadHander = function($scope, Upload, $timeout) {
  return function(file, productId) {
    console.log('file:', file);
    if (file && !file.$error) {
      console.log('intre file:', file);
      $scope.file = file;
      file.upload = Upload.upload({
        url: '/api/products/' + productId + '/upload',
        file: file
      });

      file.upload.then(function(response) {
        $timeout(function() {
          file.result = response.data;
          console.log('success file:', file);
        });
      }, function(response) {
        if (response.status > 0) {
          console.log(response.status + ': ' + response.data);
          errorHandler($scope)(response.status + ": " + response.data);
        }
      });

      file.upload.progress(function(evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      })
    }
  }
}

export default angular.module('meanshopApp.products', [uiRouter])
  .config(routes)
  .component('products', {
    template: require('./templates/product-list.html'),
    controller: ProductsComponent,
    controllerAs: 'productsCtrl'
  })
  .component('newProduct', {
    template: require('./templates/product-new.html'),
    controller: ProductNewComponent,
    controllerAs: 'productNewCtrl'
  })
  .component('viewProduct', {
    template: require('./templates/product-view.html'),
    controller: ProductViewComponent,
    controllerAs: 'productViewCtrl'
  })
  .component('editProduct', {
    template: require('./templates/product-edit.html'),
    controller: ProductEditComponent,
    controllerAs: 'productEditCtrl'
  })
  .name;
