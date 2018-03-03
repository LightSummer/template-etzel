$(function(){  
 
		var contenturl =window.location.href;     
		$.ajax({
			url:UC_URL+'weixinapi',
			data:{article_url:contenturl},
			type:'get',
			dataType:'jsonp',
			jsonp: 'callback',
			success:function(msg){  
				if(msg.code == 'A0200'){ 
					 wx.config({
					    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					    appId: msg.data.appid, // 必填，公众号的唯一标识
					    timestamp: msg.data.timestamp, // 必填，生成签名的时间戳
					    nonceStr: msg.data.noncestr, // 必填，生成签名的随机串
					    signature: msg.data.signature,// 必填，签名，见附录1
					    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					 
				wx.ready(function(){ 
					wx.error(function (res) {
					  console.log(res.errMsg);
					});
 					wx.onMenuShareTimeline({
					    title: $("#title").val()+"-"+$("#user_nick").val(), 
				        link: contenturl,
				        imgUrl: $("#head").val(),  
					    success: function () {  
					    	$('#tipsdiv').show().html('已分享');
							setTimeout(function(){$("#tipsdiv").fadeOut(100);},1500);    
					    	// alert('已分享');
					        // 用户确认分享后执行的回调函数
					    },
					    cancel: function () {
					    	$('#tipsdiv').show().html('已取消');
							setTimeout(function(){$("#tipsdiv").fadeOut(100);},1500);
					    	 //alert('已取消');
					        // 用户取消分享后执行的回调函数
					    }
					}); 
					
					wx.onMenuShareAppMessage({
					    title: $("#title").val()+"-"+$("#user_nick").val(),
				        desc: $('#summary').val(),
				        link: contenturl,
				        imgUrl: $("#head").val(),
					    success: function () { 
					    	$('#tipsdiv').show().html('已分享');
							setTimeout(function(){$("#tipsdiv").fadeOut(100);},1500); 
					    	// alert('已分享');
					        // 用户确认分享后执行的回调函数
					    },
					    cancel: function () { 
					    	$('#tipsdiv').show().html('已取消');
							setTimeout(function(){$("#tipsdiv").fadeOut(100);},1500);
					    	//alert('已取消');
					        // 用户取消分享后执行的回调函数
					    }
					});  
				}); 	
					  
				} 
			},
			error:function(){}
		})
	})