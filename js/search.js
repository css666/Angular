(function() {

	var searchModule = angular.module('searchModule', ['nuomi.httpService']);
	searchModule.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/search/:page', {
			templateUrl: 'list/searchlist.html',
			controller: 'SearchController'
		})
	}]);
	searchModule.controller('SearchController', ['$scope', '$http', 'httpServicre', '$routeParams', '$route', "$rootScope", 'appconfig', function($scope, $http, httpServicre, $routeParams, $route, $rootScope, appconfig) {
//		method=baidu.ting.search.catalogSug&query=海阔天空
        var query=$routeParams.page;
		var parmars = {
			method: 'baidu.ting.search.catalogSug',
			query:query
		}
      httpServicre.josnp(appconfig.listUrl, parmars, function(rec) {
			console.log(rec);
			$scope.songList = rec.album;
//			$scope.totalPage=rec.song[0].song_id;
			
           $scope.$apply();
		

		})
		

		

	}])

})()