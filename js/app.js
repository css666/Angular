(function() {

	var nuomiApp = angular.module('nuomiApp', ['ngRoute', 'nuomi.httpService', 'detailModule', 'searchModule', 'listModule', 'adModule']);

	//路由  每个模块的路由单独放到子模块中配置
	nuomiApp.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {
				templateUrl: 'ad/ad.html'

			}).
		otherwise({
						redirectTo:'/'
				     })

	}])
	nuomiApp.constant('appconfig', {
		listUrl: 'http://tingapi.ting.baidu.com/v1/restserver/ting'

	});
	//    定义翻页指令  
	nuomiApp.directive('page', [function() {
		// Runs during compile
		return {
			replace: true,
			template: '<ul class="pagination">\
                <li ng-click="hundlePage(item)" ng-class="{active:item==current}" ng-repeat="item in pages"><a>{{item}}</a></li>\
            </ul>',
			link: function($scope, iElm, iAttrs, controller) {

				$scope.$watch('pageConfig', function(n) {
					if(n) {
						var total = n.total;
						var show = n.show;
						var current = n.current;

						var region = Math.floor(show / 2); // 5

						//左右俩边数字的个数
						var begin = current - region;

						//开始值最小是1
						begin = Math.max(1, begin);

						var end = begin + show;
						//
						if(end > total) { // 31 > 30
							end = total + 1; // end = 31
							begin = end - show //31 - 7 = 24     24,25,26,27,28,29,30
							begin = Math.max(1, begin);
						}
						var pagination = iElm[0];

						var pages = [];

						$scope.pages = pages;
						$scope.current = current;
						$scope.hundlePage = function(index) {
							//调用控制器传递过来的方法
							n.click(index);
						}
						for(var i = begin; i < end; i++) {
							pages.push(i);
						}
					}
				})

			}
		};
	}]);
	//定义输入提示指令
	nuomiApp.directive("search", ['$location', "$route", "$routeParams", function($location, $route, $routeParams) {
		return {
			replace: true,
			template: '<div class="topsearch"><div id="navsearch" class="navsearch"><form ng-submit="search()" class="navbar-form navbar-right">\
					  <input ng-model="input" type="text" id="input" class="form-control" placeholder="Search...">\
					  </form><div class="sarchbox" id="serchbox"></div>\
					</div></div>',
			link: function($scope, iElm, iAttrs, controller) {

				$("#input").on("keyup", function(event) {
                    console.log(event.keyCode)
                    if(event.keyCode!=13){
                    	var kd = $('#input').val(); //获取输入框内的值
					     var url = "http://tip.soku.com/search_tip_1?query=" + kd;
					    queryMessage(url);
                    }
					$("#input").focus();

				})

				$scope.search = function(event) {
                    $('#serchbox').empty();
                    
					$location.path('search/' + $scope.input);

				}
			}

		}
	}]);
	//定义跨域查询

	function queryMessage(url) {
		var div = $('#serchbox');
		$.ajax({
			type: 'get',
			url: url,
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			jsonpCallback: 'message',
			success: function(data) {
				var tag = '<ul class="list-group">';
				for(var i = 0; i < data.r.length; i++) {
					var item = data.r[i];
					var title = item.w;

					tag += '<li ondblclick="sdbclick(event)" class="list-group-item">' + title + '</li>';
				}
				tag += '</ul>';

				div.html(tag);
				div.find('li').hover(function() {
					$(this).css('color', 'red');
				}, function() {
					$(this).css('color', 'black');
				})

			},
			error: function() {
				console.log('error');
			}
		});
	}

})();
var sdbclick = function(event) {
	$("#input").val(event.target.innerHTML);
	$("#input").focus();
	$('#serchbox').empty()

}