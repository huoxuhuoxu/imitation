
var appDirective = angular.module('appDirective',[]);

// index nav hover
appDirective.directive('hoverGo',function(){
	return {
		restrict: 'A',
		link: function(scope,ele,attrs){
			jQuery(ele[0]).hover(function(){
				if(scope.plan.bClick){
					var iIndex = attrs['nav'];
					jQuery('.total_ni_a').css({
						'background':'none',
						'color': '#fff'
					});
					jQuery('.total_ns_sb').eq(iIndex).css('top','0px');
					jQuery('.total_ns_sence').siblings().hide()
					.end().eq(iIndex).show();
				}
				jQuery(this).css({
					'background':'#efedcb',
					'color': '#ff6600'
				});
			},function(){
				if(!scope.plan.bClick){
					jQuery(this).css({
						'background':'none',
						'color': '#fff'
					});
				}
			});
		}
	}
});
// index nav click
appDirective.directive('clickGo',function(){
	return {
		restrict: 'A',
		link: function(scope,ele,attrs){
			jQuery(ele[0]).on('click',function(){
				if(!scope.plan.bClick){
					scope.plan.bClick = true;
					jQuery(ele[0]).css({
						'background':'#efedcb',
						'color': '#ff6600'
					});
					var iIndex = attrs['nav'];
					jQuery('.total_ns_sence').eq(iIndex)
					.siblings().hide().end().show();
					jQuery('.total_ns_sb').eq(iIndex).stop().animate({
						'top': '0px'
					});
					jQuery('.totle_nav_select,.total_nav_displace').css(
						'border-bottom','3px #ff6600 solid'
					).stop().animate({
						'height': '200px',
					});
				}else{
					jQuery('.total_ni_a').css({
						'background':'none',
						'color': '#ffffff'
					});
					scope.plan.bClick = false;
					var iIndex = attrs['nav'];
					jQuery('.total_ns_sb').eq(iIndex).stop().animate({
						'top': '-200px'
					});
					jQuery('.totle_nav_select,.total_nav_displace').stop().animate({
						'height': '0px',
					}).queue(function(next){
						// 如果点击过快 导致列队与css 执行时间上出错.
						if(scope.plan.bClick){
							jQuery(this).stop().animate({
								'height': '200px',
							});
							return '';
						};
						jQuery(this).css('border-bottom','0px #ff6600 solid');
						jQuery('.total_ns_sence').hide();
						next();
					});
				}
				// $apply/$watch 都是 数据跟视图相关交互 如果只是纯碎的变量变化 不需要绑定监听.
			});
		}
	}
});
// index scroll fixed
appDirective.directive('scrollFixed',function(){
	return {
		restrict: 'A',
		compile: function(ele,attrs,transclude){
			jQuery(window).on('scroll',function(){
				var iScrollTop = jQuery(this).scrollTop();
				if(iScrollTop>60){
					jQuery('.total_nav').addClass('navbar navbar-fixed-top')
					.removeClass('rela');
				}else{
					jQuery('.total_nav').removeClass('navbar navbar-fixed-top')
					.addClass('rela');
				}	
			});
		}
	}
});
// index window resize
appDirective.directive('wResize',function(){
	return {
		restrict: 'A',
		link: function(scope,ele,attrs){
			jQuery(window).on('resize',function(){
				if(jQuery(window).width()>720){
					jQuery('.total_pos_nav').hide();
					jQuery('body').css('overflow-y','auto');
					/* 视口切换时,全面清空 */
					jQuery('.total_ns_sence').hide();
					jQuery('.total_ns_sb').css('top','-200px');
					jQuery('.totle_nav_select,.total_nav_displace').css({
						'border-bottom':'0px #ff6600 solid',
						'height': '0px'
					});
					jQuery('.total_ni_a').css({
						'background':'none',
						'color': '#fff'
					});
					scope.plan.bNav = false;
					scope.plan.bClick = false;
				}
			});
		}
	}
});
// index click down
appDirective.directive('clickDown',function(){
	return {
		restrict: 'A',
		link: function(scope,ele,attrs){
			jQuery(ele[0]).on('click',function(){
				if(!scope.plan.bNav){
					jQuery('.total_pos_nav').show();
					scope.plan.bNav = true;
					jQuery('body').css('overflow-y','hidden');
					return '';
				}
				jQuery('.total_pos_nav').hide();
				jQuery('body').css('overflow-y','auto');
				scope.plan.bNav = false;
			});
		}
	}
});
// index click height
appDirective.directive('clickHeight',function(){
	return {
		restrict: 'A',
		link: function(scope,ele,attrs){
			jQuery(ele[0]).on('click',function(){
				
				var oPn = jQuery(this).next('.total_pn_nt');
				
				if(oPn.height()>0){
					oPn.stop().animate({
						'height': '0px',
					});
				}else{
					oPn.show().stop(true).animate({
						'height': '200px',
					}).siblings('.total_pn_nt')
					.stop(true).animate({
						'height': '0px',
					}).queue(function(next){
						oPn.siblings('.total_pn_nt').hide();
					});
				}
				
			});
		}
	}
});








