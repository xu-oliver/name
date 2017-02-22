var app = angular.module("run",[]);//声明依赖注入
function data(res){
	try { 
		$(".add")
		.append("<div class='body'>" + "<a>" + res.result.ratenm + "</a>" + "<a>" + res.result.rate + "</a>" + "</div>");
	} catch (e) { 
		if($(".body").length > 1){
			
		}else if($(".icon-spinner").length === 0){
			$(".add").append("<i class='icon-spinner icon-spin'></i>");
		}
	}
}
app.controller("index",function($scope,$http){//依赖注入
	var a = "http://api.k780.com:88/?app=finance.rate&scur=USD&tcur=";
	var b = new Array('CNY','EUR','JPY','HKD','GBP','AUD','CAD');
	var c = "&appkey=23278&sign=7d4d0ac2c560133f1d76b1196bd39030&format=json&jsoncallback=data";
	for(var k = 0;k < b.length;k++){
		$http.jsonp(a+b[k]+c)
	}
})