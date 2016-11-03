(function() {

	var listModule = angular.module('listModule', ['nuomi.httpService']);
	listModule.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/:category/:page?', {
			templateUrl: 'list/list.html',
			controller: 'ListController'
		})
	}]);
	listModule.controller('ListController', ['$scope', '$http', 'httpServicre', '$routeParams', '$route','$location',"$rootScope", 'appconfig', function($scope, $http, httpServicre, $routeParams, $route,$location,$rootScope, appconfig) {
		var type = 0;
        switch($routeParams.category) {
			case 'hot':
				type=2;
				break;
			case 'new':
				type=1;
				break;
			case 'rock':
				type=11;
				break;
			case 'oe':
				type=21;
				break;
			case 'old':
				type=22;
				break;
			case 'movie':
				type=24;
				break;
			case 'love':
				type=23;
                 break;
            case 'wang':
				type=25;
                 break;
            default : 
                $location.path('/');
                 break; 

				
			
		}

		
		var count = 12;
		var currentPage = parseInt($routeParams.page || 1);

		$scope.currentPage = currentPage;
		var start = (currentPage - 1) * 10;

		var parmars = {
			method: 'baidu.ting.billboard.billList',
			type: type,
			size: count,
			offset: start
		}

		httpServicre.josnp(appconfig.listUrl, parmars, function(rec) {
			console.log(rec)
			$scope.songList = rec.song_list;
			$scope.title = rec.billboard.name;
			$scope.ximg = rec.billboard.pic_s210;
			$("#ximg")[0]["src"] = $scope.ximg

			$scope.total = parseInt(rec.billboard.billboard_songnum);

			$scope.totalPage = Math.ceil($scope.total / count);
			$scope.pageConfig = {
				total: $scope.totalPage,
				current: currentPage,
				show: 10,
				click: function(index) {
					// alert(index);
					//更改路由的参数,控制分页,需要用到$route
					$route.updateParams({
							page: index
						})
						//刷新路由
						// $route.reload();
				}
			};

			$scope.$apply();

		})

	}])

})()