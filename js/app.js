
jQuery.noConflict();

var app = angular.module('myApp',['ngRoute','appDirective']);

// 路由配置
app.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'tpls/index.html',
		controller: 'indexCtrl',
	}).when('/docsrc',{
		templateUrl: 'tpls/document.html',
		controller: 'documentCtrl',
	}).otherwise({
		redirectTo: '/'
	});
});


// 首页导航控制器
app.controller('indexNavCtrl',function($scope,HttpData){
	
	$scope.plan = {};
	$scope.plan.bClick = false;
	$scope.plan.bNav = false;

	$scope.service = HttpData;
	
});

// 首页主内容控制器
app.controller('indexCtrl',function($scope){
	
});

// 文档控制器
app.controller('documentCtrl',function($scope,HttpData){
	
	$scope.bill = {};
	$scope.service = HttpData;
	
	$scope.bill.url = 'tpls/doc'+$scope.service.getInClude+'.html';
	
	// 挂监听
	$scope.$watch('service.getInClude',function(n,o,scope){
		$scope.bill.url = 'tpls/doc'+$scope.service.getInClude+'.html';
	});

});

// 服务横跨
app.factory('HttpData',function($http){
	
	var httpData = {};
	// 会话缓存.
	httpData.getInClude = 1;
	
	return httpData;
});

// 指令 获取 data-value
app.directive('aClick',function(){
	return {
		restrict: 'A',
		link: function(scope,ele,attrs){
			jQuery(ele[0]).on('click',function(){
				scope.service.getInClude = attrs['value'];
				scope.$apply('scope.service.getInClude');
			});
		}
	}
});



