var app = angular.module('xcidicApp', ['ngAnimate', 'ui.router', 'ui.bootstrap', '720kb.socialshare']);

app.filter('htmlToText', function() {
  return function(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  };
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');  

  $stateProvider
  .state('layout', {
    abstract: true,
    views: {
      'header': {
        templateUrl: 'resources/views/header.html',
        controller: 'HeaderController',
        controllerAs: 'vm'
      },
      'content': {
        template:'<ui-view/>'
      },
      'footer': {
        templateUrl: 'resources/views/footer.html'
      }
    }
  })
  .state('layout.home', {
    url: '/',
    templateUrl: 'resources/views/home.html',
    controller: 'HomeController',
    controllerAs: 'vm',
    metadata: {
      title: 'BNL Consulting',
      description: 'BNL description'
    }
  })
  .state('layout.article', {
      abstract: true,
      url: '/article',
      template: '<ui-view/>'
    })
  .state('layout.article.view', {
    url: '/{id:[0-9]{1,4}}',
    templateUrl: 'resources/views/articleView.html',
    controller: 'ArticleController',
    controllerAs: 'vm',
    resolve: {
      articleData: getArticleId
    },
    metadata: {
      title: 'BNL Article',
      description: 'BNL article description'
    }
  });

  $locationProvider.html5Mode(true);

  getArticleId.$inject = ['$stateParams', 'ArticlesService'];

  function getArticleId($stateParams, ArticlesService) {
    return ArticlesService.getArticleDetail($stateParams.id);
  }
});