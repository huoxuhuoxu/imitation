// jQuery


jQuery.noConflict();

var EngineerjQ = (function($){
	
	var obj = {};
	
	// 控制规则 被控制规则 替换规则 是否有父级   对于父级兄弟级是 笼统的 全选. 适用于导航与内容内置一个主块级
	obj.selectChange = function (sCtrl,sClass,noClass,bV){
		
		var aCtrl = $(sCtrl);
		var aClass = $(sClass);
		
		aCtrl.each(function(index,value){
			
			$(value).on('click',function(){
				
				if($(this).hasClass(noClass)){
					return '';
				}
				
				if(bV){
					$(this).addClass(noClass).parent().siblings() // 父级兄弟的判定 没有细分
					.find(sCtrl).removeClass(noClass);
				}else{
					$(this).addClass(noClass).siblings(sCtrl).removeClass(noClass);
				}
				
				aClass.eq(index).removeClass('dis_none').siblings(sClass).addClass('dis_none');
				
			});
			
		});
		
	}
	// 适用于 导航和关联内容实际并没有在一个块级内的情况
	obj.selectChange2 = function(sCtrl,sClass){
		var aCtrl = $(sCtrl);
		var aClass = $(sClass);
		aCtrl.each(function(index,value){
			$(value).on('click',function(){
				aClass.eq(index).removeClass('hide').siblings(sClass).addClass('hide');
			});
		});
	}
	
	// id = id images = 图片数组 imgRad = 图片大小数组(半径) localArray = 路径数组
	obj.ballsCollion = function(id,images,imgRad,localArray){
		
		var c=document.getElementById(id);
		var cxt=c.getContext('2d');
			  
		var iNum=images.length , balls=[] , iW=$(window).width();
		c.width=iW;
		var w=c.width,h=c.height;
		
		// 窗口变化 一向优化.
		$(window).resize(function(){
			if(iW<$(window).width()){
				iW=$(window).width();
				c.width=iW;
				w=c.width;
			}
		});
		
		var imgs = images;
		var imgr = imgRad;
		
		(function(){
			
			for(var i=0;i<iNum;i++){
				
				var tempSize=imgr[i];
				var tempImg=imgs[i];
				
				var tempSpeed=12-Math.floor(tempSize/10);
				var tempAngle=Math.floor(Math.random()*360);
				var tempRadian=tempAngle*Math.PI/180;
				var tempaX=Math.cos(tempRadian)*tempSpeed;
				var tempaY=Math.sin(tempRadian)*tempSpeed;
				
				var placeOK=false;
				
				while(!placeOK){
					
					var tempX=Math.floor(Math.random()*(w-tempSize*2)+tempSize);
					var tempY=Math.floor(Math.random()*(h-tempSize*2)+tempSize);
					
					var ball={
						'x':tempX,'y':tempY,'r':tempSize,'s':tempImg,'href':i,
						'aX':tempaX,'aY':tempaY,'nextX':tempX,'nextY':tempY,'mass':tempSize
					} // 数组的通用i与相同对象的通用i的不同性.
					
					placeOK=fnTestInitial(ball);
					
				}
				
				balls.push(ball);
				
			}
			
		})();
		
		function fnTestInitial(a){
			var retVal=true;
			for(var i=0;i<balls.length;i++){
				var ball=balls[i];
				if(fnInitial(a,ball)){
					return false;
				}
			}
			return retVal;
		}
		
		function fnInitial(a,b){
			var retVal=false;
			var dx=a.nextX-b.nextX;
			var dy=a.nextY-b.nextY;
			var ra=(dx*dx+dy*dy);
			if((ra)<((a.r+b.r)*(a.r+b.r))){ // ??????碰撞？ 初始情况下的位置重叠
				retVal=true;
			}
			return retVal
		}
	
		function fnRender(){
			
			for(var i=0;i<balls.length;i++){
				fnDrawImg(i);
			}
			
		}
		
		function fnDrawImg(i){
			var ball=balls[i];
			ball.x=ball.nextX;
			ball.y=ball.nextY;
			
			var img=new Image();
			img.src=ball.s;
			
			cxt.save();
			cxt.beginPath();
			cxt.arc(ball.x,ball.y,ball.r,0,Math.PI*2,false);
			cxt.closePath();
			cxt.clip();
			cxt.drawImage(img,ball.x-ball.r,ball.y-ball.r,ball.r*2,ball.r*2);
			cxt.restore();
		
		}
		
		function fnDataUp(){
			for(var i=0;i<balls.length;i++){
				var ball=balls[i];
				ball.nextX=(ball.x+=ball.aX);
				ball.nextY=(ball.y+=ball.aY);
			}
		}
		
		function fnWall(){
			for(var i=0;i<balls.length;i++){
				var ball=balls[i];
				if(ball.nextX+ball.r>w){
					ball.nextX=w-ball.r;
					ball.aX*=-1;
				}else if(ball.nextX-ball.r<0){
					ball.nextX=ball.r;
					ball.aX*=-1;
				}else if(ball.nextY+ball.r>h){
					ball.nextY=h-ball.r;
					ball.aY*=-1;
				}else if(ball.nextY-ball.r<0){
					ball.nextY=ball.r;
					ball.aY*=-1;
				}
			}
		}
		
		function fnCollision(){
			for(var i=0;i<balls.length;i++){
				var ball=balls[i];
				for(var j=i+1;j<balls.length;j++){
					var ballTest=balls[j];
					if(fnInitial(ball,ballTest)){
						collision(ball,ballTest);
					}
				}
			}
		}
		
		function collision(a,b){
			
			var dx=a.nextX-b.nextX;
			var dy=a.nextY-b.nextY;
			var angle=Math.atan2(dy,dx);
			
			var speed_1=Math.sqrt(a.aX*a.aX+a.aY*a.aY);
			var speed_2=Math.sqrt(b.aX*b.aX+b.aY*b.aY);
			
			var ra_1=Math.atan2(a.aY,a.aX);
			var ra_2=Math.atan2(b.aY,b.aX);
			
			var aX_1=Math.cos(ra_1-angle)*speed_1;
			var aY_1=Math.sin(ra_1-angle)*speed_1;
			var aX_2=Math.cos(ra_2-angle)*speed_2;
			var aY_2=Math.sin(ra_2-angle)*speed_2;
			
			var final_x_1=((a.mass-b.mass)*aX_1+(b.mass+b.mass)*aX_2)/(a.mass+b.mass);
			var final_x_2=((b.mass-a.mass)*aX_2+(a.mass+a.mass)*aX_1)/(a.mass+b.mass);
			var final_y_1=aY_1;
			var final_y_2=aY_2;
			
			a.aX=Math.cos(angle)*final_x_1+Math.cos(angle+Math.PI/2)*final_y_1;
			a.aY=Math.sin(angle)*final_x_1+Math.sin(angle+Math.PI/2)*final_y_1;
			b.aX=Math.cos(angle)*final_x_2+Math.cos(angle+Math.PI/2)*final_y_2;
			b.aY=Math.sin(angle)*final_x_2+Math.sin(angle+Math.PI/2)*final_y_2;
			
			a.nextX=(a.nextX+=a.aX);
			a.nextY=(a.nextY+=a.aY);
			b.nextX=(b.nextX+=b.aX);
			b.nextY=(b.nextY+=b.aY);
			
		}
		
		function fnDrawScreen(){
			
			fnDataUp();
			
			fnWall();
			
			fnCollision();
			
			fnRender();
			
		}
		
		setInterval(function(){
			
			cxt.clearRect(0,0,w,h);
			fnDrawScreen();
			
		},30);
		
		fnDrawScreen();
		// 实现点击
		$(c).on('click',function(e){
			
			var x=e.clientX;
			var y=e.clientY-($(c).offset().top-$(document).scrollTop());
			
			for(var i=0;i<balls.length;i++){
				var ball=balls[i];
				if(x>(ball.x-ball.r)&&x<(ball.x+ball.r)&&y>(ball.y-ball.r)&&y<(ball.y+ball.r)){
					var h=null;
					h=i;
				}
			}
			
			if(h||h==0){
				fnWindowHref(h);
			}
			
			
		});
		// 实现跳转
		function fnWindowHref(a){
			var local=null;
			
			local = localArray[h];
			
			window.location.href=local;
		}
		
	}
	
	// 读取文件 参数 id = id  parent = 加载完成后放入 那个父级  sClass = 给 img 添加的规则
	obj.fileReader = function(id,parent,sClass){
		
		var file=document.getElementById(id);
		
		$(file).on('change',function(){
			
			if(window.File&&window.FileList&&window.FileReader&&window.Blob){
				
				var ele=file.files;
				
				for(var i=0;i<ele.length;i++){
					fnChangePic(ele[i]);
				}
				
			}else{
				alert('亲,您的浏览器不支持 File API ,无法进行在线预览,如有需要请更换浏览器，如:chrome（谷歌）,火狐,360,opera等.');
			}
			
		});
		
		// 循环加载
		function fnChangePic(a){
			var reader = new FileReader();
			$(reader).on('load',function(e){
				try{
					if(!parent){
						throw {'name':'参数错误','message':'必须传入第二参数'}
					}
				}catch(err){
					console.log(err.name+':\r\n'+err.message);
					return '';
				}
				var oImg = $('<img />');
				if(sClass){
					oImg.addClass(sClass);
				}
				oImg.attr('src',e.target.result);
				
				oImg.appendTo($(parent));
				
				if($(parent).hasClass('hide')){
					$(parent).removeClass('hide');
				}
			});
			reader.readAsDataURL(a);
		}
		
	}
	
	
	
	return obj;
	
})(jQuery);
