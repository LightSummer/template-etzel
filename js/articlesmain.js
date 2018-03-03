;(function($,window,document){  
/**
 * Created by Administrator on 2016/3/11.
 */

/*headcontrol*/ 
var u = $(document),f = $(".site-nav");
var m = !0, g = !0, y = 0, b = 50, w = u.scrollTop(), E, S,h=$('.navbar-top').height(); 
!$.isMobile && f[0] && (f.addClass("site-nav-pc"), u.scrollTop() !== 0 && f.removeClass("site-nav-white"), u.on("scroll", function (e) {
    var t = u.scrollTop();
    w > t && !m || w < 0 ? (y += w - t, y > b && (f[0].style.top = "0", m = !0, y = 0)) : w < t && m ? (y += t - w, y > b && (f[0].style.top = -h+'px', m = !1, y = 0)) : y = 0, w = t, E && clearTimeout(E), E = setTimeout(function () {
        var e = u.scrollTop();
        e <= 0 && !g ? (f.addClass("site-nav-white"), g = !0) : e > 0 && g && (f.removeClass("site-nav-white"), g = !1)
    }, 100)
}));

	var obj = $(this);
	var timeout = 0;
	var allowajax = true;  
	var Collectionallowajax =true;
	var uid = $('#uid').val(); 
	var uname = $('#uname').val();
	var cookie_user_id = $('#cookie_uid').val(); 
	$("#lastpagetime").val($("#datalastpagetime").val());
	var rewardallow = $('#rewardallow').val();
	var Articles = { 
		init:function(){ 
			this.nitialization();//初始化
			this.scroll();//第一屏滚动
			this.Usernum();//用户信息
			this.IsFollow();////判定用户是否被关注
			this.FollowAdd();//添加关注 
			this.FollowHover();//鼠标滑过时关注更改样式
			this.FollowDel();//取消关注
			//this.UserLatestPageNone();//隐藏添加更多最新文章
			this.ArchiveSlide();//日期归档 js下拉效果 
			this.Articlediamond();//加载赞赏
			this.FootPrintAdd();//添加脚印
			this.RankRead();//个人排行阅读
//			this.UserNotebook();//某个用户下的所有分类
			
//			this.UserFans();//用户的粉丝
			//this.UserCollection();//用户首页下专题 
//			this.CollectionAddMany();//加载更多专题
//													//			this.IsCollectionFowllow();//判定是否专题被关注
//			this.CollectionMouseover();//专题经过离开效果
//			this.CollectionFollowing();//专题的取消操作
//			this.CollectionFollow();//专题的添加 
			this.UserLatestPage();//用户最新文章分页 
			//this.RightSildeDown();//右侧下拉效果  
			this.editzl();
		},
		 
		 
		nitialization:function(){  
	        $('.fa-search').on('click',function(){
		      $('.search-form').show();
		        $('.t_y').hide();
		        $('.search-query').show().addClass('expansion').css({
		            'width': '200px;'
		        });
		    });
		    var w=$('.editable_span').text();
		    $('.avatar-name').find('.return').on("click",function(){
		        $('.avatar-name').find('.pencil').css("display","inline-block");
		        $('.click_btn').css('display','none');
		        $('.editable_span').text(w).attr('contentEditable',"false");
		    });
		    
		    
		    $('.editable_span').on('keyup',function() { 
		     	var noteCount = $.trim($('.editable_span').html()).length; 
			    if (noteCount > 10) {  
					$(this).text($(this).text().substring(0,10));  
					$('.editable_span').focusEnd();
			    } 
			}).keydown(function() {
			    var noteCount = $.trim($('.editable_span').html()).length; 
			    if (noteCount > 10) { 
					$(this).text($(this).text().substring(0,10)); 
					$('.editable_span').focusEnd();
			    } 
			});
		    
		    
		    
		    
		    
		    $('.avatar-name').find('.store').on("click",function(){
		        $('.avatar-name').find('.pencil').css("display","inline-block");
		        $('.click_btn').css('display','none');
		        $('.editable_span').attr('contentEditable',"false");
		        var regcolumnname = /^[[\s\S]{2,10}$/i ;
		        if(regcolumnname.test($.trim($('.editable_span').html()))){ 
		        	var anyfield = $('.editable_span').attr('zn'); 
			        $.ajax({
						 url:UC_URL+'user/setfield',
						 data:{value:$.trim($('.editable_span').html()),anyfield:anyfield}, 
						 type:'get',
						 dataType:'jsonp',
						 jsonp:'callback',
						 success:function(msg){ 
						 	if(msg.meta.code != 200){
						 		if(msg.meta.code == 400){
							 		var message = '参数错误,请重新填写';
			        				Articles.commonnoty(message);
						 		}else{
						 			var message = '服务器繁忙,请稍后重新填写';
			        				Articles.commonnoty(message);
						 		}
						 	}else if(msg.meta.code == 200){
					 			var message = '恭喜，专栏名称保存成功';
		        				Articles.commonnoty(message);
					 		}
					 	 }, 
					 	error:function(){
					 		console.log('数据错误，请联系开发员');return false;
					 	},  
					});   
		        }else{
		        	var message = '专栏名不符合规范且不得超过10个字,请重新填写';
		        	Articles.commonnoty(message);
		        }
		    });
		    
		    
		    $('.avatar-name').find('.pencil').on("click",function(){
		         $('.editable_span').attr('contentEditable',"true");
		         var editor = document.getElementsByClassName('editable_span').item(0);
		         editor.onfocus = function () { 
	                 var sel,range;
	                 if (window.getSelection && document.createRange) {
	                     range = document.createRange();
	                     range.selectNodeContents(editor);
	                     range.collapse(true);
	                     range.setEnd(editor, editor.childNodes.length);
	                     range.setStart(editor, editor.childNodes.length);
	                     sel = window.getSelection();
	                     sel.removeAllRanges();
	                     sel.addRange(range);
	                 } else if (document.body.createTextRange) {
	                     range = document.body.createTextRange();
	                     range.moveToElementText(editor);
	                     range.collapse(true);
	                     range.select();
	                 } 
		         };
		         editor.focus();
		         $(this).css('display','none');
		         $('.click_btn').css('display','inline-block');
			});
	        
	        
	        
	        
	        $('.avatar-name').on("mouseover mouseout",function(event){ 
	        	var valid=Articles.getCookie('click'+uid); 
	        	if(valid){
	        		if(uid == cookie_user_id){ 
				        if(event.type == "mouseover" && $(window).width()>758){
				            if($('.pencil').css('display')=='none' && $('.click_btn').css('display')=='none'){
				                //$('.pencil').css('display','inline-block');
				            }else{
				                $('.pencil').css('display','none');
				            }
				        }else if(event.type == "mouseout" && $(window).width()>758){
				            $('.pencil').css('display','none');
				        }else if($(window).width()<=758){
				            $('.pencil').css('display','none');
				        } 
	        		}
	        	} 
		    }); 
		}, 
		  
		
		getCookie:function(objName)
        {
        	var arrStr = document.cookie.split("; ");
        	for(var i = 0;i < arrStr.length;i ++)
        	{			 
        		var temp = arrStr[i].split("=");	 
        		if(temp[0] == objName) return unescape(temp[1]);		 
        	}	 
        },
        
		
		
		
		editzl:function(){
			$('.editable_span').blur(function () { 
	            if($(this).text().length <1){  
		            $('.editable_span').focus(); 
	            }
	        });
		},
		
		
		
		
		
		commonnoty:function(message){
			clearTimeout(timeout);
			timeout = setTimeout(function(){
				$(".notybox").noty({
					layout: 'topCenter',//布局 就是信息提示框放在哪儿
					text: message,//提示内容 
					type: "confirm",//默认类型 内建了alert，warning和error，success，information和confirm对话框
					animation: {	//默认的显示和关闭动画
						open: {height: 'toggle'}, // jQuery animate function property object
						close: {height: 'toggle'}, // jQuery animate function property object
						easing: 'swing', // easing
						speed: 200 // opening & closing animation speed
					},
					timeout: 1000,
				});
			},500); 
		},
		
		
		 
		
		scroll:function(){
			$('a[href*=#],area[href*=#]').click(function() {   
	            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
	                var $target = $(this.hash);  
	                $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
	                if ($target.length) {  
	                    var targetOffset = $target.offset().top;  
	                    $('html,body').animate({  
	                                scrollTop: targetOffset  
	                            },  
	                            1000);  
	                    return false;  
	                }  
	            }  
	        });  
		},
		
		
		toThousands:function(num) {
		    var result = '', counter = 0;
		    num = (num || 0).toString();
		    for (var i = num.length - 1; i >= 0; i--) {
		        counter++;
		        result = num.charAt(i) + result;
		        if (!(counter % 3) && i != 0) { result = ',' + result; }
		    }
		    return result;
		},
		
		Usernum:function(){ 
			$.ajax({
				 url:UC_URL+'user/userNum',
				 data:{user_id:uid}, 
				 type:'get',
				 dataType:'jsonp',
				 jsonp:'callback',
				 success:function(msg){   
				 	if(msg.meta.code == 200){
				 		if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){ 
				 			if(msg.data.num.click >= 10000){
				 				$('#readnum').html(Math.floor(msg.data.num.click/1000)/10+' 万'); 
				 			}else{
				 				$('#readnum').html(msg.data.num.click); 
				 			}
				 			
				 			if(msg.data.num.article >= 10000){
				 				$('#articlenum').html(Math.floor(msg.data.num.article/1000)/10+' 万');
				 			}else{
				 				$('#articlenum').html(msg.data.num.article);
				 			}
				 		
				 			if(msg.data.follow.fans >= 10000){
				 				$('#fansnum').html(Math.floor(msg.data.follow.fans/1000)/10+' 万'); 
				 			}else{
				 				$('#fansnum').html(msg.data.follow.fans); 
				 			} 
				 		}else{ 
					 		$('#readnum').html(Articles.toThousands(msg.data.num.click)); 
					 		$('#articlenum').html(Articles.toThousands(msg.data.num.article));
					 		$('#fansnum').html(Articles.toThousands(msg.data.follow.fans));
				 		}
				 		$('#addfansnum').val(msg.data.follow.fans);
				 	}
			 	 }, 
			 	error:function(){
			 		console.log('数据错误，请联系开发员');return false;
			 	},  
			});   
		},
		
		
		
		IsFollow:function(){ 
			if(cookie_user_id !='' && cookie_user_id !=undefined &&　uid != cookie_user_id){
				$.ajax({
					type:'get',
					url:UC_URL+'follow/'+uid, 
					data:{fans_uid:cookie_user_id},
					dataType:"jsonp",
					jsonp: 'callback',
					success:function(msg){   
						if(msg.meta.code == '200'){;
							$('#followtrends').find('.follow').hide();
							$('#followtrends').find('.following').css({'display':'block'});
						}
					},
					error:function(){
				 		console.log('请求是否关注信息失败'); 
				 	}, 
				}); 
			}else if(cookie_user_id == uid){
				$('#followtrends').hide();
			}
		},
		
		
		
		FollowAdd:function(){
			$(document).on('click','.addfollow',function(){   
				if(cookie_user_id !='' && cookie_user_id !=undefined &&　uid != cookie_user_id){  
					$.ajax({
						type:'get',
						url:UC_URL+'follow/followadd', 
						data:{'friend_uid':uid},
						dataType:'jsonp',
						jsonp: 'callback',
						beforeSend:function(){  
							$('#followtrends').find('.addfollow').hide();
							$('#followtrends').find('.following').css({'display':'block'});
						}, 
						success:function(msg){    
							if(msg.meta.code == '200'){
								$('#fansnum').html(parseInt($('#fansnum').html())+parseInt(1));
		 					}else{ 
		 						$('#followtrends').find('.addfollow').show();
								$('#followtrends').find('.following').hide();
		  					}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
						    console.log(XMLHttpRequest.status);    
						    console.log(XMLHttpRequest.readyState);    
						    console.log(textStatus);
						}
					});  
				}else{
					window.location.href = UC_URL+'sign/in?from='+window.location.href;
				}
			})   
		},
		
		
		
		FollowHover:function(){
			$("#followtrends").hover(function(){ 
			 	if($(this).find('.following').children('a').hasClass('infollow')){ 
			 		$(this).find('.following').find('.infollow').hide();
					$(this).find('.following').find('.delfollow').show(); 
			 	} 
			},function(){   
				if($(this).find('.following').children('a').hasClass('delfollow')){  
					$(this).find('.following').find('.infollow').show();
					$(this).find('.following').find('.delfollow').hide();
				}
			});
		},
		
		
		
		
		FollowDel:function(){
			$(document).on('click','.delfollow',function(){
				if(cookie_user_id !='' && cookie_user_id !=undefined &&　uid != cookie_user_id){ 
					$.ajax({
						type:'get',
						url:UC_URL+'follow/followdelete',
						data:{uid:uid},  
						dataType:"jsonp",
						jsonp: 'callback',
						beforeSend:function(){    
							$('#followtrends').find('.addfollow').show();
							$('#followtrends').find('.following').hide();
						}, 
						success:function(msg){    
							if(msg.meta.code == '200'){
								$('#fansnum').html(parseInt($('#fansnum').html())-parseInt(1)); 
							}else{ 
								$('#followtrends').find('.addfollow').hide();
								$('#followtrends').find('.following').find('.delfollow').show();
							}
						},
						error:function(){
							window.location.href = UC_URL+'sign/in?from='+window.location.href; 
					 	}, 
					});  
				}else{
					window.location.href = UC_URL+'sign/in?from='+window.location.href;
				} 
			}) 
		},
		
		
		Articlediamond:function(){
			if(rewardallow == 'y'){
				var ids = [];
				$('.zxwz_new').each(function(i,n){
					ids[i] = $(this).attr('aid');
				}) ;
				if(ids.length > 0 ){ 
					$.ajax({
						type:'get',
						url:UC_URL+'artice/diamond',
						data:{'ids':ids},
						dataType:'jsonp',
						jsonp:'callback',
						success:function(msg) {  
							if(msg.code == 200){   
								$.each(msg.msg, function(i, n){
									$('#num_hot_'+i).append('<li><i class="fa fa-diamond"></i>'+n+'</li>'); 
								});  
							}
						},
						error:function(err){
						 	console.log('赞赏数据添加失败');
					 	}, 
					});
				} 
			}
		},
		
		
		FootPrintAdd:function(){
			var which = 'home'; 
			if(uid != cookie_user_id){ 
				var uuid = new Fingerprint({canvas: true}).get();  
				$.ajax({
					type:'get',
					url:UC_URL+'footprint/add', 
					data:{user_id:uid,which:which,cookie_user_id:cookie_user_id,uuid:uuid},
					dataType:"jsonp",
					jsonp: 'callback',
					success:function(msg){ 
						if(msg.meta.code != '200'){  
						console.log('添加脚印失败');
						} 
					},
					error:function(){
				 		console.log('添加失败'); 
				 	}, 
				});
			}
		},
		
		RankRead:function(){ 
			var that = this;
			$.ajax({
				type:'get',
				url:UC_URL+'rank', 
				data:{user_id:uid,show_summary:'n'},
				dataType:"jsonp",
				jsonp: 'callback',
				success:function(msg){   
					var content = ''; 
					if(msg.meta.code == 200){
						if(msg.data.click.length > 0){ 
							for(i=0;i<msg.data.click.length;i++){
								switch(i){
									case 0:
										var xiangshu = "0px";
										break;
									case 1:
										var xiangshu = "-17px";
										break;
									case 2:
										var xiangshu = "-34px";
										break;
									case 3:
										var xiangshu = "-51px";
										break;
									case 4:
										var xiangshu = "-68px";
										break;
								
								}  
 								content+="<li><span style='background-image : url("+UC_PUBLIC_DEFAULT+"images/index_10.png);background-position: 0px "+xiangshu+";'></span><a target='_blank' href='"+msg.data.click[i].article_url+"'>"+msg.data.click[i].title.substr(0,14)+"</a></li>";
							}
						}else{
							content+="暂无文章,请撰写吧";
						}
					}else if(msg.meta.code == '400'){
						console.log('参数错误');
					}else{
						console.log('服务器内部错误,请联系管理员');
					}
					$('#phcontent').html(content); 
					that.UserNotebook();//某个用户下的所有分类 
				},
				error:function(err){
					that.UserNotebook();//某个用户下的所有分类
				 if(err.status == 500){
				 }
			 		console.log('数据错误，请联系开发员'); 
			 	}, 
			}); 
		},
		
		
		
		UserNotebook:function(){
			var that = this;
			$.ajax({
				type:'get',
				url:UC_URL+'notebook',
				data:{'user_id':uid},
				dataType:'jsonp',
				jsonp:'callback',
				success:function(msg) { 
					if(msg.meta.code==200){
						var num = 10;//msg.data.length;
						var usernotebook = '';
							for(var i=0;i<num;i++){ 
								if(msg.data[i] != null || msg.data[i] !=undefined){ 
									usernotebook+='<li><a href=http://'+uname+BLOG_DOMAIN+msg.data[i].nid+'_list_1.html>'+msg.data[i].name.substr(0,14)+'</a></li>';  
								}
							}
						$("#usernotebook").html(usernotebook); 
					}
					
					that.Archive();//日期归档
				},
				error:function(err){
					that.Archive();//日期归档
				 if(err.status == 500){
				 }
			 		console.log('数据错误，请联系开发员'); 
			 	}, 
			});
		},
		
		
		
		
		
		Archive:function(){
			var that = this;
			$.ajax({
				type:'get',
				url:UC_URL+'archive', 
				data:{user_id:uid},
				dataType:"jsonp",
				jsonp: 'callback',
				success:function(msg){  
					var content='';  
					if(msg.meta.code=='200'){
						for(i=0;i<msg.data.year_lists.length;i++){ 
							if(msg.data.year_lists[i] != null && msg.data.year_lists[i] != undefined && msg.data.year_lists[i].yearnum > 0){
								content+="<li><div class='ti'><a href='javascript:;'>"+msg.data.year_lists[i].year+"&nbsp"+msg.data.year_lists[i].china_year+"&nbsp（"+msg.data.year_lists[i].yearnum+"）</a></div><dl style='display: none;'>";
								//if(i == 0){
//									content+="<dl style='display: block;'>";
//								}else{
//									content+="<dl style='display: none;'>";
//								}
								for(j=0;j<msg.data.year_lists[i].month_lists.length;j++){  
									if(msg.data.year_lists[i].month_lists[j].monthnum !=0){ 
										content+="<dd><a href='http://"+uname+BLOG_DOMAIN+"archive/"+msg.data.year_lists[i].year+msg.data.year_lists[i].month_lists[j].month+"_1.html'>"+msg.data.year_lists[i].month_lists[j].month+"月 （"+msg.data.year_lists[i].month_lists[j].monthnum+"）</a></dd>";
 									} 
								} 
								content+="</dl></li>";
							}
						} 
						$('#zlsyrqgd').attr('href','http://'+uname+BLOG_DOMAIN+'archive/'+msg.data.year_lists[0].year+msg.data.year_lists[0].month_lists[0].month+'_1.html');
						$('.daohang_all_article').children('a').attr('href','http://'+uname+BLOG_DOMAIN+'archive/'+msg.data.year_lists[0].year+msg.data.year_lists[0].month_lists[0].month+'_1.html');
					}else if(msg.meta.code=='400'){ 
						content = "<li><div class='ti'><a href='javascript:;'>"+msg.data.year+'&nbsp;'+msg.data.china_year+"（0）</a></div></li>";
					}else{ 
						content = '';
					} 
					$('#yearnum').html(content);
					
					
					that.UserFans();//某个用户下的粉丝
				},
				error:function(err){
					that.UserFans();//某个用户下的粉丝
				 if(err.status == 500){
				 }
			 
			 		console.log('数据错误，请联系开发员'); 
			 	}, 
			});
		},
		
		
		
		
		
		
		
		
		UserFans:function(){ 
			$.ajax({
				url:UC_URL+'follow/articlefans',
				data:{'user_id':uid,fans_flag:true,limit:15},
				type:'get',
				dataType:'jsonp',
				jsonp:'callback',
				success:function(msg) {   
					var content=''; 
					if(msg.data.length > 0){
						for(i=0;i<15;i++){ 
							if(msg.data.length > 0){
								if(msg.data[i] !=null && msg.data[i] !=undefined){ 
									if(msg.data[i].avatar == '' || msg.data[i].avatar == undefined){
										if(msg.data[i].group_id == 200){
											content+="<li><a target='_blank' href='"+msg.data[i].user_url+"' class='color_"+msg.data[i].avatar_color+"' style='width: 50px; height: 50px; border-radius: 50%;display: inline-block;'><span class='s'>"+msg.data[i].nickname.substring(0,1)+"</span><span  title='专栏作家' class='V_king V_king_s'><img src='"+UC_PUBLIC_DEFAULT+"images/kings.png' alt=''/></span></a></li>";
										}else{
											content+="<li><a target='_blank' href='"+msg.data[i].user_url+"' class='color_"+msg.data[i].avatar_color+"' style='width: 50px; height: 50px; border-radius: 50%;display: inline-block;'><span class='s'>"+msg.data[i].nickname.substring(0,1)+"</span></a></li>";
										}
									}else{ 
										if(msg.data[i].group_id == 200){
											if(msg.data[i].avatar.indexOf(BLOG_DOMAIN) > -1){
												content+= "<li><a target='_blank' href='"+msg.data[i].user_url+"'><img class='fsi' src='"+msg.data[i].avatar+"!m160' onerror=\"this.src='"+UC_PUBLIC_DEFAULT+"images/default_avatar.jpg'\" alt='#'><span  title='专栏作家' class='V_king V_king_s'><img src='"+UC_PUBLIC_DEFAULT+"images/kings.png' alt=''/></span></a></li>";
											}else{
												content+= "<li><a target='_blank' href='"+msg.data[i].user_url+"'><img class='fsi' src='"+msg.data[i].avatar+"' onerror=\"this.src='"+UC_PUBLIC_DEFAULT+"images/default_avatar.jpg'\" alt='#'><span  title='专栏作家' class='V_king V_king_s'><img src='"+UC_PUBLIC_DEFAULT+"images/kings.png' alt=''/></span></a></li>";
											}
										}else{
											if(msg.data[i].avatar.indexOf(BLOG_DOMAIN) > -1){ 
												content+= "<li><a target='_blank' href='"+msg.data[i].user_url+"'><img class='fsi' src='"+msg.data[i].avatar+"!m160' onerror=\"this.src='"+UC_PUBLIC_DEFAULT+"images/default_avatar.jpg'\" alt='#'></a></li>";
											}else{
												content+= "<li><a target='_blank' href='"+msg.data[i].user_url+"'><img class='fsi' src='"+msg.data[i].avatar+"' onerror=\"this.src='"+UC_PUBLIC_DEFAULT+"images/default_avatar.jpg'\" alt='#'></a></li>";
											}
										}
									}
								}
							} 
						}
					}else{
						content+="<p>您还没有粉丝，您可以通过分享自己满意的文章，让更多人了解您！</p>";
					} 
					
					//content+="<li><a href='"+UC_URL+'follow/'+uid+"/fans' style='width: 50px; height: 50px; border-radius: 50%; background-color: #333;display: inline-block;'><span>"+$('#addfansnum').val()+"</span></a></li>";
					//content+="<li><a href='javascript:;' style='width: 50px; height: 50px; border-radius: 50%; background-color: #333;display: inline-block;'><span>"+$('#addfansnum').val()+"</span></a></li>";
					$('#userarticlefans').html(content);
					
					
					$(window).resize();
					//Articles.UserCollection();//用户首页下专题 
//					Articles.CollectionAddMany();//加载更多专题 
//					Articles.CollectionMouseover();//专题经过离开效果
//					Articles.CollectionFollowing();//专题的取消操作
//					Articles.CollectionFollow();//专题的添加 
					Articles.UserLatestPageNone();//隐藏添加更多最新文章
					
				},
				error:function(a,b,c){  
				 	$(window).resize();
					//Articles.UserCollection();//用户首页下专题 
//					Articles.CollectionAddMany();//加载更多专题 
//					Articles.CollectionMouseover();//专题经过离开效果
//					Articles.CollectionFollowing();//专题的取消操作
//					Articles.CollectionFollow();//专题的添加 
					Articles.UserLatestPageNone();//隐藏添加更多最新文章 
			 		console.log('数据错误，请联系开发员'); 
			 	}, 
			}); 
		},
		
		
		
		UserCollection:function(){
			var that = this;
			$.ajax({
				type:'get',
				url:UC_URL+'user/'+uid+'/collection',
				data:{'type':'follower',limit:2},
				dataType:'jsonp',
				jsonp:'callback',  
				success:function(msg) {  
					var content = ''; 
					if(msg.meta.code == '200'){
						//判断用户下是否有专题
						var counts = msg.data.length;
						if(counts > 0){
							$('#zr_list').show(); 				//显示专题
							for(var i=0;i< counts;i++){
								content+="<li><a class='avatar' href='"+UC_URL+"collection/"+msg.data[i].cid+"'><img src='"+COLLECTIONPIC_URL+msg.data[i].cover+"' onerror=\"this.src='"+UC_URL+"public/assets/img/photo02.jpg'\" alt='180'></a><div class='collections-info'><div class='p_name'><a href='"+UC_URL+'collection/'+msg.data[i].cid+"'>"+msg.data[i].name.substr(0,15)+"</a></div><ul class='num_hot_list'><li>创建者：<a  href='"+UC_URL+'user/'+msg.data[i].user_id+"/latest-article'>"+msg.data[i].nickname+"</a></li><li>文章数：<a class='blue-link' href='"+UC_URL+msg.data[i].user_id+"/latest-article''>"+msg.data[i].collection_nums.c_article+"</a></li><li>关注数：<a class='blue-link' href='"+UC_URL+"collection/"+msg.data[i].cid+"'>"+msg.data[i].collection_nums.c_fans+"</a></li></ul><div class='btn btn-success follow collectionfollowadd' style='display: block'><a href='javascript:;'><i class='fa fa-fw fa-plus'></i> <span class='postfollwer' data-value="+msg.data[i].cid+" c_u_id="+msg.data[i].user_id+">添加关注</span></a></div><div class='btn btn-success following1' style='display: none'><a href='javascript:;'><i class='fa fa-fw fa-check'></i> <span>正在关注</span></a><a style='display: none' href='javascript:;'><i class='fa fa-fw fa-times'></i> <span class='updatefollwer' data-value="+msg.data[i].cid+" c_u_id="+msg.data[i].user_id+">取消关注</span></a></div></div></li>";
							} 
							
							if(counts < 2){
								Collectionallowajax = false;  
								$('.add_btn_new_zt').hide();
							}else{ 
								var collectionlastlist = msg.data[msg.data.length-1];  
								if(collectionlastlist.follower_addtime == $('#collectiontime').val()){
									Collectionallowajax = false; 
									$('.add_btn_new_zt').hide();
								}else{  
									$('#collectiontime').val(collectionlastlist.follower_addtime); 
								}
							}
							$('#article_zt_list').html(content);
							that.IsCollectionFowllow();
						}else{
							$('#zr_list').hide();
						}  
					}else if(msg.meta.code == '400' || msg.meta.code == '500'){
						$('#zr_list').hide();
						
					}
				}
			}); 
		},
		 
	
	
		CollectionAddMany:function(){  
			var that = this;
			$(document).on('click','.Collectionaddmany',function(){ 
				
			 	if(Collectionallowajax != false){
				 	$.ajax({
						url:UC_URL+'user/'+uid+'/collection',
						type: 'get', 
						data: {lastpagetime:$('#collectiontime').val(),'type':'follower',limit:2},
						dataType : "jsonp",
						jsonp: 'callback',
						beforeSend:function(){  
							obj.removeClass('Collectionaddmany');
						},
						success:function(msg) {  
							obj.addClass('Collectionaddmany');
							var content = ''; 
							if(msg.meta.code == '200'){ 
								//判断用户下是否有专题
								var counts = msg.data.length;
								if(counts > 0){
									for(var i=0;i< counts;i++){
										content+="<li><a class='avatar' href='"+UC_URL+"collection/"+msg.data[i].cid+"'><img src='"+COLLECTIONPIC_URL+msg.data[i].cover+"' onerror=\"this.src='"+UC_URL+"public/assets/img/photo02.jpg'\" alt='180'></a><div class='collections-info'><div class='p_name'><a href='"+UC_URL+'collection/'+msg.data[i].cid+"'>"+msg.data[i].name.substr(0,20)+"</a></div><ul class='num_hot_list'><li>创建者：<a href='"+UC_URL+'user/'+msg.data[i].user_id+"/latest-article'>"+msg.data[i].nickname+"</a></li><li>文章数：<a class='blue-link' href='"+UC_URL+msg.data[i].user_id+"/latest-article''>"+msg.data[i].collection_nums.c_article+"</a></li><li>关注数：<a class='blue-link' href='"+UC_URL+"collection/"+msg.data[i].cid+"'>"+msg.data[i].collection_nums.c_fans+"</a></li></ul><div class='btn btn-success follow collectionfollowadd' style='display: block'><a href='javascript:;'><i class='fa fa-fw fa-plus'></i> <span class='postfollwer' data-value="+msg.data[i].cid+" c_u_id="+msg.data[i].user_id+">添加关注</span></a></div><div class='btn btn-success following' style='display: none'><a href='javascript:;'><i class='fa fa-fw fa-check'></i> <span>正在关注</span></a><a style='display: none' href='javascript:;'><i class='fa fa-fw fa-times'></i> <span class='updatefollwer' data-value="+msg.data[i].cid+" c_u_id="+msg.data[i].user_id+">取消关注</span></a></div></div></li>";
									}  
									
									if(msg.data.length < 2){
										Collectionallowajax = false;  
										$('.add_btn_new_zt').hide();
									}else{ 
										var collectionlastlist = msg.data[msg.data.length-1]; 
										if(collectionlastlist.follower_addtime == $('#collectiontime').val()){
											Collectionallowajax = false; 
											$('.add_btn_new_zt').hide();
										}else{ 
											$('#collectiontime').val(collectionlastlist.follower_addtime); 
										}
									}
									$('#article_zt_list').append(content);
									that.IsCollectionFowllow();
								}else{
									content+='暂无数据';
								}  
							}else if(msg.meta.code == '400'){
								$('#zr_list').hide();
							}
						},
						error:function(e){
							console.log(e);
						}
					});  
			 	}else{ 
			 		$('.add_btn_new_zt').hide();
			 	} 
			 }) 
		},
	
	
	
	
	
	
	
	
	
	
		IsCollectionFowllow:function(){  
			if(cookie_user_id){ 
				$.ajax({
					type:'get',
					url:UC_URL+'isfollower',
					dataType:'jsonp',
					jsonp:'callback',
					success:function(data) {  
						if(data.meta.code == 200){
							var num = data.data.length;
							$('.postfollwer').each(function() {
								for(var i=0;i<num;i++){
									if(parseInt($(this).attr('data-value'))==data.data[i].c_id){
										$(this).parent().parent().hide();
										$(this).parent().parent().next().show();
									}
								}
							});
						}
					},
				}); 
			 }
		},
		
		
		CollectionMouseover :function(){
		   $(document).on('mouseover','.following',function(){
				$(this).find('a').eq(0).hide();
				$(this).find('a').eq(1).show();
		   });
		   $(document).on('mouseout','.following',function(){
				$(this).find('a').eq(0).show();
				$(this).find('a').eq(1).hide();
		  });
		},
		
		
		
		is_sign:function(url){ 
			if(!cookie_user_id){
				window.location.href = UC_URL+'sign/in';
			}else{
				return true;
			}	
		},
		
		
		CollectionFollowing:function(){ 
		   var that = this;   
		   $(document).on('click','.following1',function(){
			   if(that.is_sign()){ 
					var  cid = $(this).find('a').eq(1).find('span').attr('data-value');
					var  data ={
								'cid':cid,
						 };
					$.ajax({
						type:'put',
						url:UC_URL+'collection/'+data.cid+'/user',
						data:data,
						dataType:'jsonp',
						jsonp:'callback',
						success:function(data) { 
							if(data.meta.code == 200){
								obj.hide();
								obj.prev().show();
								
							}else{
								var msg = '保存失败';
		
							}
						},  
				});
			   } 
		   });
		},
		
		
		CollectionFollow:function(){ 
		   var that = this; 
		 //  var url = UC_URL+'user/'+uid+'/latest-article';
		   $(document).on('click','.collectionfollowadd',function(){
			   if(that.is_sign()){
			//	var obj = $(this);
				var  cid = $(this).find('span').attr('data-value');
				var  c_u_id = $(this).find('span').attr('c_u_id'); 
				var  name =$(this). parents('.collections-info').children('.p_name').find('a').html();
				var  data ={
						'cid':cid,
						'name':name,
						'c_u_id':c_u_id,
				};
				 $.ajax({
						type:'post',
						url:UC_URL+'collection/'+cid+'/user',
						data:data,
						dataType:'jsonp',
						jsonp:'callback',
						success:function(data) { 
							if(data.meta.code == 200){
								obj.hide();
								obj.next().show();
							}else{
								var msg = '保存失败';
		
							}
						},
						error:function(msg){
							
							console.log('删除失败 服务器错误'+msg);
							},   
						}); 
				 }
			}); 
		},
		
		
		
		UserLatestPageNone:function(){  
			if(allowajax){
			 	$.ajax({
					url: window.location.href,
					type: 'get', 
					data: {lastpagetime:$('#lastpagetime').val()},
					dataType : "jsonp",
					jsonp: 'callback', 
					beforeSend:function(){
						//$('.add_btn_new_article').find('span').removeClass('addarticle');
					},
					success:function(msg) {
						//$('.add_btn_new_article').find('span').addClass('addarticle');
						var content = ''; 
						if(msg.meta.code == 200){  
							if(msg.data.count > 0){ //有数据  
								var lastlist = msg.data.lists[msg.data.count-1]; 
								$('#lastpagetime').val(lastlist.add_time);  
								for(i=0;i<msg.data.lists.length;i++){
										if(msg.data.lists[i].pics.exists == 'y'){ 
											if(msg.data.lists[i].pics.url.length > 0){
												content+="<li class='zxwz_new new_article_"+lastlist.add_time+"' style='display:none' aid='"+msg.data.lists[i].aid+"'>";
											}else{
												content+="<li class='zxwz_new li-noimg new_article_"+lastlist.add_time+"' style='display:none' aid='"+msg.data.lists[i].aid+"'>";
											} 
										}else{
											content+="<li class='zxwz_new li-noimg new_article_"+lastlist.add_time+"' style='display:none' aid='"+msg.data.lists[i].aid+"'>";
										}
										
										if(msg.data.lists[i].is_recommend == 'y'){
											content+="<a target='_blank' href='"+msg.data.lists[i].article_url+"'><div class='wz_l'><h3><img src='"+UC_PUBLIC_DEFAULT+"/images/jian.png' alt='2'/>"+msg.data.lists[i].title.substring(0,30)+"</h3><div class='p_div'><P>"+msg.data.lists[i].summary.substring(0,150)+"</P>";
										}else{ 
											content+="<a target='_blank' href='"+msg.data.lists[i].article_url+"'><div class='wz_l'><h3>"+msg.data.lists[i].title.substring(0,30)+"</h3><div class='p_div'><P>"+msg.data.lists[i].summary.substring(0,150)+"</P>";
										}
										
										
										if(msg.data.lists[i].pics.exists == 'y'){ 
											if(msg.data.lists[i].pics.url.length > 0){
												var nurlreg = /images.blogchina.com/;
												if(nurlreg.test(msg.data.lists[i].pics.url[0])){ 
													content+="<div class='wz_r'><img src='"+msg.data.lists[i].pics.url[0]+"!m240' alt=''/></div>";
												}else{
													if(msg.data.lists[i].pics.url[0] !=null || msg.data.lists[i].pics.url[0] !=undefined || msg.data.lists[i].pics.url[0]!=''){ 
														content+="<div class='wz_r'><div class='wz_r_box' style='background:url("+msg.data.lists[i].pics.url[0]+")center;background-size: 100% auto;-moz-background-size: 100% auto;background-repeat: no-repeat;' ></div></div>";
													}
												}
											}
										}
										content+="</div><div class='wz_t'><ul class='num_hot' id='num_hot_"+msg.data.lists[i].aid+"'><li><i class='icon-eye'><img src='"+UC_PUBLIC_DEFAULT+"images/shu.png' alt=''/></i>"+msg.data.lists[i].nums.click+"</li><li><i class='fa fa-comment-o'></i>"+msg.data.lists[i].nums.comment+"</li><li><i class='fa fa-thumbs-o-up'></i>"+msg.data.lists[i].nums.support+"</li></ul><span class='pull-left'>"+msg.data.lists[i].gsh_add_time+"</span></div></div></a></li>";			
								} 
								$('.wz_list').append(content);
								//$('.add_btn_new_article').show(); 
								/*保证方图居中显示*/
								var $Iw=$(".wz_r_box").width();
					    		$(".wz_r_box").css("height",$Iw);
					    		
					    		
					    		//加载赞赏数
					    		if(rewardallow == 'y'){ 
						    		var ids = [];
									$('.new_article_'+lastlist.add_time).each(function(i,n){
										ids[i] = $(this).attr('aid');
									}) ; 
									if(ids.length > 0 ){ 
										$.ajax({
											type:'get',
											url:UC_URL+'artice/diamond',
											data:{'ids':ids},
											dataType:'jsonp',
											jsonp:'callback',
											success:function(msg) {  
												if(msg.code == 200){    
													$.each(msg.msg, function(i, n){
														$('#num_hot_'+i).append('<li><i class="fa fa-diamond"></i>'+n+'</li>'); 
													});  
												}
											},
											error:function(err){
											 	console.log('赞赏数据添加失败');
										 	}, 
										});
									} 	     
					    		}
							}else{	//无数据 
								//$('.add_btn_new_article').hide();
								//allowajax= false;
								return false;
							}
						 
						}else{	// 返回400 无数据 数据错误
							//$('.add_btn_new_article').hide();
							return false;
						}
					},
					error:function(e){
						console.log(e);
					}
				}); 
			}
		},
		
		
		
	//	UserLatestPage:function(){  
//			 $(document).on('click','.addarticle',function(){ 
//			 	var lastpagetime = $('#lastpagetime').val();
//			 	var new_artcle_data = 'new_article_'+lastpagetime; 
//			    var count = $(".new_article_"+lastpagetime).length;
//			  	if(allowajax != false){
//			  		if(count > 0 ){
//			  			$(".new_article_"+lastpagetime).show();
//			  		}
//			  		 
//			  		if(count < 9){
//						$('.add_btn_new_article').hide();
//						allowajax = false;  
//					}else{   
//						Articles.UserLatestPageNone(); 
//					}    
//			  	}else{console.log(2);
//			  		$('.add_btn_new_article').hide();
//			  	}
//			  	 
//			 })
//		},
		
		
		UserLatestPage:function(){  
			$(window).scroll(function(){
				//var scrollTop = $(this).scrollTop();
//				var windowHeight = $(this).height();   
//				var scrollHeight = $(document).height();
				var scrollTop = 0;
				var clientHeight = 0;
				var scrollHeight = 0;
				if (document.documentElement && document.documentElement.scrollTop) {
					scrollTop = document.documentElement.scrollTop;
				} else {
					if (document.body) {
						scrollTop = document.body.scrollTop;
					}
				}
				if (document.body.clientHeight && document.documentElement.clientHeight) {
					clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
				} else {
					clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
				}
				scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 10; 
				if(scrollTop + clientHeight >= scrollHeight){
					var lastpagetime = $('#lastpagetime').val();
					var new_artcle_data = 'new_article_'+lastpagetime; 
					var count = $(".new_article_"+lastpagetime).length;
					if(allowajax != false){
				  		if(count > 0 ){
				  			$(".new_article_"+lastpagetime).show();
					  		if(count < 9){
					  			if(!$('p').hasClass('loading-more-no')){
						  			$('.wz_list').after('<p class="loading-more-no"><a class="more-link" href="javascript:;">没有更多了</a></p>'); allowajax= false;
					  			}
								//$('.add_btn_new_article').hide();
								return  false;  
							}else{   
								Articles.UserLatestPageNone(); 
							} 
				  		}else{
				  			setTimeout(function(){
					  			if(count > 0 ){
						  			$(".new_article_"+lastpagetime).show();
							  		if(count < 9){
							  			if(!$('p').hasClass('loading-more-no')){
								  			$('.wz_list').after('<p class="loading-more-no"><a class="more-link" href="javascript:;">没有更多了</a></p>'); allowajax= false;
							  			}
										//$('.add_btn_new_article').hide();
										return  false;  
									}else{   
										Articles.UserLatestPageNone(); 
									} 
						  		}
						  	},1500); 
				  		} 
				  		 
				  	}else{
				  		//$('.add_btn_new_article').hide();
				  	}
					
					
					
				}  
		
		 	})
		},
		
		
		
		
		
		
		//UserLatestPage:function(){ 
//			 $(document).on('click','.addarticle',function(){ 
//			 	if(allowajax != false){
//				 	$.ajax({
//						url: window.location.href,
//						type: 'get', 
//						data: {lastpagetime:$('#lastpagetime').val()},
//						dataType : "jsonp",
//						jsonp: 'callback',
//						beforeSend:function(){  
//							obj.removeClass('addarticle');
//						},
//						success:function(msg) {  
//							obj.addClass('addarticle');
//							var content = '';
//							if(msg.meta.code == 200){ 
//								if(msg.data.count > 0){ //有数据 
//									for(i=0;i<msg.data.lists.length;i++){
//											content+="<li><div class='wz_l'><h3><a href='"+UC_URL+"p/"+msg.data.lists[i].aid+"'>"+msg.data.lists[i].title+"</a></h3><P>"+msg.data.lists[i].summary+"</P><div>"+msg.data.lists[i].gsh_add_time+"</div></div>";
//											if(msg.data.lists[i].pics.length > 0){
//												content+="<div class='wz_r'><a href='"+UC_URL+"p/"+msg.data.lists[i].aid+"'><img src='"+msg.data.lists[i].pics[0]+"' alt=''/></a></div>";
//											}
//											content+="</li>";			
//									} 
//									if(msg.data.count < 10){
//										$('.add_btn_new_article').hide();
//										allowajax = false;  
//									}else{ 
//										var lastlist = msg.data.lists[msg.data.count-1];
//										if(lastlist.add_time == $('#lastpagetime').val()){
//											allowajax = false; 
//										}else{  
//											$('#lastpagetime').val(lastlist.add_time);
//										}
//									}   
//									$('.wz_list').append(content);
//								}else{	//无数据 
//									allowajax = false;return false;
//								}
//							}else{	// 返回400 无数据 数据错误
//								allowajax = false;return false;
//							}
//						},
//						error:function(e){
//							console.log(e);
//						}
//					});  
//			 	} 
//			 })
//		},
		
		
		//RightSildeDown:function(){
//			var sbOffLeft = $('#sidebar').offset().left+11;
//		    var sbWidth = $('.post-info').width();
//		    var sbHeight = $('.post-info').height();
//		    var wdheight =$(window).height();
//		    var b= wdheight+sbHeight+40; 
//		    $(window).resize(function(){
//		        sbOffLeft = $('#sidebar').offset().left+11;
//		        if('fixed' != $('.post-info').css('position')){
//		            $('.post-info').css('left',sbOffLeft-$(window).scrollLeft());
//		
//		        }
//		        if($(window).scrollTop()>b){
//		            $('.post-info').addClass("fixed-book") ;
//		            $('.post-info').css('position', 'fixed');
//		            $('.post-info').css('top', 0);
//		            $('.post-info').css('left',sbOffLeft-$(window).scrollLeft());
//		        }
//		    }) ;
//		    $(window).scroll(function(e){
//		        if($(window).scrollTop()>b){
//		            $('.post-info').addClass("fadeInDownBig animated pop");
//		            $('.post-info').css('position', 'fixed');
//		            $('.post-info').css('top', 0);
//		            $('.post-info').css('width', sbWidth+40);
//		            $('.post-info').css('left',sbOffLeft-$(window).scrollLeft());
//		
//		        } else {
//		            $('.post-info').removeClass("fadeInDownBig animated pop") ;
//		            $('.post-info').css('position', '');
//		            $('.post-info').css('top', '');
//		            $('.post-info').css('left', '');
//		        }
//		        return false;
//		    }); 
//		},
		
		 
		
		
		
		ArchiveSlide:function(){
			$(document).on('click','.ctrl',function(){
		        $(this).toggleClass("ctrl-on");
		        $(this).parents('.dateclass').toggleClass("open");
		        $(this).parents('.dateclass').find('ul li').show();
		        $(".ti").removeClass("on");
		        $(this).parents('.dateclass').find("dl").stop().slideUp(300);
		    });
		    $(document).on('click',".dateclass .bd li .ti",function(){
		        $(this).toggleClass("on");
		        $(".ctrl").addClass("ctrl-on");
		        $(".dateclass").addClass("open");
		        $('.dateclass').find('ul li').show();
		        $(this).siblings("dl").stop().slideToggle(300);
		        $(this).parents("li").siblings("li").children(".ti").removeClass("on");
		        $(this).parents("li").siblings("li").children("dl").stop().slideUp(300);
		    });
		},
		
		
		
		
		
		randerView:function(){ 
		},
	
	
	}
 
	window.Articles = Articles;
	$(function () {
        Articles.init();
    })


 //$(window).resize(function(){ 
//        /* FIXED THD BOOK */
//        var sbOffLeft = $('#sidebar').offset().left+11;
//        var sbWidth = $('.info_list').width()+40;
//        var sbHeight = $('.post-info').height();
//        var wdheight =$(window).height();
//        var b= wdheight+sbHeight+40;
//        $(window).resize(function(){
//            sbOffLeft = $('#sidebar').offset().left+11;
//            if('fixed' != $('.post-info').css('position')){
//                $('.info_list').css('left',sbOffLeft-$(window).scrollLeft()); 
//            }
//            if($(window).scrollTop()>b){
//                $('.post-info').addClass("fixed-book").css({'position': 'fixed','top': 0 ,'left':sbOffLeft-$(window).scrollLeft()});
//                
//                var yearli = $('#yearnum li').length;
//                if(yearli > 7){
//                	$('#yearnum li').eq(6).nextAll().hide();
//                } 
//            }
//        }) ;
//        $(window).scroll(function(e){
//            if($(window).scrollTop()>b){
//                $('.post-info').addClass("fadeInDownBig animated pop").css({'position': 'fixed','top': 0 ,'width':sbWidth ,'left':sbOffLeft-$(window).scrollLeft()});
//            } else {
//                $('.post-info').removeClass("fadeInDownBig animated pop").css({'position': '','top': '' ,'left':''});
//            }
//            return false;
//        });
//    });




}(jQuery,window,document));


$(window).resize(function(){
    /* FIXED THD BOOK */
    var sbOffLeft = $('#sidebar').offset().left+11;
    var sbWidth = $('.info_list').width()+40;
    var sbHeight = $('.post-info').height();
    var wdheight =$(window).height();
    var b= wdheight+sbHeight+40;
    $(window).resize(function(){
        sbOffLeft = $('#sidebar').offset().left+11;
        if('fixed' != $('.post-info').css('position')){
            $('.info_list').css('left',sbOffLeft-$(window).scrollLeft());
        }
        if($(window).scrollTop()>b){
            $('.post-info').addClass("fixed-book").css({'position': 'fixed','top': 0 ,'left':sbOffLeft-$(window).scrollLeft()});
            var yearli = $('#yearnum li').length;
            if(yearli > 7){
            	$('#yearnum li').eq(6).nextAll().hide();
            } 
        }
    }) ;
    $(window).scroll(function(e){
        if($(window).scrollTop()>b){
            $('.post-info').addClass("fadeInDownBig animated pop").css({'position': 'fixed','top': 0 ,'width':sbWidth ,'left':sbOffLeft-$(window).scrollLeft()});
            var yearli = $('#yearnum li').length;
            if(yearli > 7){
            	$('#yearnum li').eq(6).nextAll().hide();
            } 
        } else {
            $('.post-info').removeClass("fadeInDownBig animated pop").css({'position': '','top': '' ,'left':''});
            $('#yearnum li').show();
        }
        return false;
    });
});



 