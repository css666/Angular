(function() {
    var detailModule = angular.module('detailModule', ['nuomi.httpService']);
    detailModule.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        when('/detail/:movieId', {
            templateUrl: 'detail/detail.html',
            controller: 'DetailController'
        })
    }])
   detailModule.controller('DetailController', ['$scope', '$http', 'httpServicre', '$routeParams', '$route', "$rootScope", 'appconfig', function($scope, $http, httpServicre, $routeParams, $route, $rootScope, appconfig) {
		   
           $scope.song_id=$routeParams.movieId;
           var parmars = {
			method: 'baidu.ting.song.playAAC',
			songid:$scope.song_id
		   }
           httpServicre.josnp(appconfig.listUrl, parmars, function(rec) {
			
            
            var download=rec.bitrate.file_link;
            console.log(download)
			$scope.detailImg = rec.songinfo.pic_big;
			$scope.title = rec.songinfo.album_title;
			
			$("#ximg")[0]["src"] = $scope.detailImg;
			var lryparmars = {
			method: 'baidu.ting.song.lry',
			songid:$scope.song_id
		   }
		   var flag=true;
		   $("#play").on('click',function(){
		   	  if(flag){
		   	  	   $('#music').get(0).play();
		   	  	   flag=false;
		   	  	   this.innerHTML="暂停";
		   	  }else{
		   	  	$('#music').get(0).pause();
		   	  	   flag=true;
		   	  	   this.innerHTML="播放";
		   	  }
		   	  
		   })
          httpServicre.josnp(appconfig.listUrl,lryparmars,function(rec){
			  	     
			  	     var arry=rec.lrcContent.split("\n");
			  	     var lrys=[];
			  	     arry.forEach(function(ele,index){
			  	     	  lrys.push(ele.substring(10));
			  	     })
			  	     $scope.lryss=lrys;
                       $scope.$apply();
			  })
			  
          });
          
			
		 
    }])
   
	

})();
