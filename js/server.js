(function() {
	var httpService = angular.module('nuomi.httpService', []);

	function isEmptyObject(obj) {
		for(var n in obj) {
			return true
		}
		return false;
	}
	httpService.service("httpServicre", ["$window", function($window) {
		this.josnp = function(url, parmars, fun) {

			if(isEmptyObject(parmars)) {
				var querystring = "?";
				for(key in parmars) {
					querystring += key + "=" + parmars[key] + "&&";
				}
				var funName = "my" + new Date().getTime();
				querystring += "callback" + "=" + funName;
				$window[funName] = function(rec) {
					fun(rec);
					$window.document.body.removeChild(script);
				}
			}else{
				var querystring = " ";
			}

			var script = $window.document.createElement('script');
			script.src = url + querystring;

			$window.document.body.appendChild(script);

		}
	}])
})()