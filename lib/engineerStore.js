// javascript

var Engineer = (function(){
	
	var obj = {};
	
	// 显示字段长度判定 s = 字符串 n = 限制长度,默认140 返回实际显示字符串 
	obj.showText = function(s,n){
		
		try{
			if(typeof s != 'string'){
				throw {'message':'不是一个字符串','name':'类型不对'};
			}
		}catch(err){
			console.log(err.name+':\r\n'+err.message);
			return '';
		}
		
		var num = null;
		
		if(!arguments[1]){
			num = 140;
		}else{
			num = n;
		}
		
		var len = s.length;
		
		if(len>=num){
			var a = s.substr(0,num);
			return a+'……';
		}
		
		return s;
	}
	// 发送字段剩余判定    返回一个用于 判定是否可以提交的布尔值 .
	obj.fieldText = function(s,parent){
		
		try{
			if(typeof s != 'string'){
				throw {'message':'不是一个字符串','name':'类型不对'};
			}
		}catch(err){
			console.log(err.name+':\r\n'+err.message);
			return '';
		}
		
		
		var len = s.length;
		var c = null;
		
		if(len < 100){
			c = 0;
		}
		if(len > 100 && len < 140){
			c = 1;
		}
		if(len >= 140){
			c = 2;
		}
		var g = null;
		if(c){
			(function(){
				
				var f = null;
				if(c == 1){
					f = '剩余' + (140 - len) + '字符';
					g = 'true'
				}else{
					f = '超出' + (len - 140 + 1) + '字符';
					g = 'false';
				}
				
				parent.innerText = f;

			})();
		}else{
			(function(){
				
				parent.innerText = '';
		
				g = 'true'
				
			})();
		}
		return g;
	}
	// 多文件上传  文件域id,上传文件组命名,上传参数method,url    待测试
	obj.fileUpLoad = function(id,arrName,json,succ,fail){
		
		var file = document.getElementById(id);
		var files = file.files;
		
		var myFile = new FormData();
		myFile.append(arrName,files);
		
		var ajax = new XMLHttpRequest();
		ajax.open(json.method,json.url,true);
		ajax.send(myFile);
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4){
				if(ajax.status==200){
					succ(ajax.responseText,ajax.status,ajax);
				}else{
					fail(ajax,ajax.errorContext);
				}
			}
		}
	}
	

	
	
	return obj;
	
})();




