app.controller('ArticleController', ['$rootScope','$scope', 'articleData', '$window', '$sce', '$location',
	function($rootScope, $scope, articleData, $window, $sce, $location) {
    var vm = this;

    $scope.$on('$viewContentLoaded', function () {
        $window.scrollTo(0, 0);
    });

    $rootScope.metadata = articleData;
    $rootScope.metadata.url = $location.absUrl();
    $rootScope.metadata.type = "article";

    vm.urlLink = $location.path();

    vm.article = articleData;

    vm.renderHtml = function(html) {
    	   return $sce.trustAsHtml(html);
    	};
  }
]);