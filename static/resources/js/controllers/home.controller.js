app.controller('HomeController', ['$rootScope', '$scope', '$window', 'ArticlesService', '$location',
	function($rootScope, $scope, $window, ArticlesService, $location) {
    var vm = this;

    $scope.$on('$viewContentLoaded', function () {
            $window.scrollTo(0, 0);
        });
    
    $rootScope.metadata = {
    	title: 'Xcidic Blog - An Innovative Technology Lab',
    	url: $location.absUrl(),
    	type: 'website',
    	image: 'resources/images/logo.png',
    	detail: 'Xcidic is a fast growing startup based in Singapore with a focus on re-defining web development, web design, and e-commerce. We love data and care deeply about creative design at the front-end as well as the beautiful coding at the back.'
    }

    vm.articles = ArticlesService.getArticles();
  }
]);