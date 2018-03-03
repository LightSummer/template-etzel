;(function(window,$){
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

			var Collectionallowajax = true;
			var timeout = 0;
			var uid = $('#uid').val();
			var aid = $("#aid").val();
			var uname = $('#uname').val();
			var issub = false;
			var cookie_user_id = $('#cookie_uid').val();
			var  Article  = {
			  init:function(){

		           this.newArticle();//最新文章
		           this.Support();//支持
		           this.Oppose();//反对
		           this.addUrl();
		           this.Collectionlist();//专题列表
		           this.Follow();//添加关注
		           this.FootPrintAdd();//添加脚印
		           this.Following();// 取消关注
		           //this.is_fowllow();//用户登录之后是否关注
		           this.Mouseover();//鼠标滑过时关注更改样式
		           this.IsFollow();//判定用户是否被关注
		           this.FollowAdd();//添加关注 
		           this.Hover();//鼠标滑过时关注更改样式
		           this.FollowDel();////取消关注
		           this.Lasttext();//获取上一篇文章
		           this.Hotarticle();//热门文章
		           this.Articlenums();//文章数量
		           this.ArticleCollecitonAdd();//文章加入专题
		           this.AddCollectionArticle();//文章加入专题
		           this.CollectionSearch();//搜索专题
				  this.CollectionMore();//加载更多专题
		        //   this.CodeArticle();//二维码生成
		       //    this.Share();//二维码生成
				  this.DeleteCollectionArticle();
		           //this.CodeUser();//二维码生成 
		          this.imghandle();  //图片弹出层
		          this.addBrowseCount();
		         
		        },
		        
		        
		        
		        
		        addBrowseCount:function(){
					$.ajax({
						url:UC_URL+'addBrowseCount',
						data:{aid:aid,user_id:uid,type:'click',incr:'y'},
						dataType:'jsonp',
						type:'get',
						beforeSend:function(){
							 //$('#browse_record').html(parseInt($('#browse_record').html())+1);
						},
						success:function(msg){
							if(msg.meta.code == 200){
								$('#browse_record').html(msg.data.num);
							}
						}
					})
				},  
		        
		        imghandle:function(){ 
		        	$('.editable img').each(function(i,n){ 
		        		$(this).wrap("<a href='"+$(this).attr('src')+"' data-lightbox='example-set'></a>"); 
		        	}) 
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
		        IsFollow:function(){	
					if(cookie_user_id !='' && cookie_user_id !=undefined &&　uid != cookie_user_id){
						$.ajax({
							type:'get',
							url:UC_URL+'follow/'+uid, 
							data:{fans_uid:cookie_user_id},
							dataType:"jsonp",
							jsonp: 'callback',
							success:function(msg){   
								if(msg.meta.code == '200'){
									$('#followtrends').prepend('<div class="btn btn-success following" style="display: block">'+
									'<a href="javascript:;"><i class="fa fa-fw fa-check"></i><span>正在关注</span></a>'+
									'<a style="display: none" href="javascript:;" class="delfollow"><i class="fa fa-fw fa-times"></i>'+
									'<span class="">取消关注</span></a></div>');
                       			}else{
									$('#followtrends').prepend(
											'<div class="btn btn-success fow"  style="display: block"><a href="javascript:;" class="addfollow">'+
											'<i class="fa fa-fw fa-plus"></i><span class="">添加关注</span></a></div>');
								}
							},
							error:function(){
						 		console.log('请求是否关注信息失败'); 
						 	}, 
						}); 
					}else if(cookie_user_id == uid){
						$('#followtrends').hide();
					}else{
						$('#followtrends').prepend(
								'<div class="btn btn-success fow"  style="display: block"><a href="javascript:;"class="addfollow">'+
								'<i class="fa fa-fw fa-plus"></i><span class="">添加关注</span></a></div>');
					} 
				},
				
				
				addUrl:function()
		        {
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
		                        $('.daohang_all_article').children('a').attr('href','http://'+uname+BLOG_DOMAIN+'archive/'+msg.data.year_lists[0].year+msg.data.year_lists[0].month_lists[0].month+'_1.html');
		                        //$('#allarticle').attr('href',UC_URL+'user/'+msg.data.user_id+'/date-article?date='+msg.data.year_lists[0].year+msg.data.year_lists[0].month_lists[0].month);
		                    }
		                }
		            });
		        },
				
				
				Hover :function(){
			    	   $(document).on('mouseover','.following',function(){
			      			$(this).find('a').eq(0).hide();
			      			$(this).find('a').eq(1).show();
			   		   });
			   		   $(document).on('mouseout','.following',function(){
			   				$(this).find('a').eq(0).show();
			   				$(this).find('a').eq(1).hide();
			   		  });
			       },	
			       
				FollowAdd:function(){
					$(document).on('click','.addfollow',function(){
						var obj = $(this);
						if(cookie_user_id !='' && cookie_user_id !=undefined &&　uid != cookie_user_id){ 
							$.ajax({
								type:'get',
								url:UC_URL+'follow/followadd', 
								data:{friend_uid:uid},
								dataType:"jsonp",
								jsonp: 'callback',
								success:function(msg){  
									if(msg.meta.code == '200'){
										$('#followtrends').children('.fow').remove(); 
										$('#followtrends').prepend('<div class="btn btn-success following" style="display: block">'+
												'<a href="javascript:;"><i class="fa fa-fw fa-check"></i><span>正在关注</span></a>'+
												'<a style="display: none" class="delfollow" href="javascript:;"><i class="fa fa-fw fa-times"></i>'+
												'<span class="">取消关注</span></a></div>')
				  					}
								},
								error:function(error){
							 		console.log('请求是否关注信息失败'+error);
									window.location.href = UC_URL+'sign/in?from='+window.location.href;
							 		
							 	}, 
							});  
						}else{

							window.location.href = UC_URL+'sign/in?from='+window.location.href;
						}
					})   
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
								success:function(msg){    
								if(msg.meta.code == '200'){
									$('.delfollow').parent('.following').remove()
									$('#followtrends').prepend(
											'<div class="btn btn-success fow"  style="display: block"><a href="javascript:;" class="addfollow">'+
											'<i class="fa fa-fw fa-plus"></i><span class="">添加关注</span></a></div>');
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
				
				
			FootPrintAdd:function(){
				var which = 'article'; 
				if(uid != cookie_user_id){ 
					var uuid = new Fingerprint({canvas: true}).get();  
					$.ajax({
						type:'get',
						url:UC_URL+'footprint/add', 
						data:{user_id:uid,which:which,cookie_user_id:cookie_user_id,uuid:uuid,aid:aid},
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
				
				
				
				
	          newArticle:function(){
	        	  var user_id = $("#user_id").val();
		        	$.ajax({
		        		type:'get',
		        		url:UC_URL+'articelnewlatest',
						data:{user_id:user_id,'limit':5},
		        		dataType:'jsonp',
		        		jsonp:'callback',
		        		success:function(data) {
		        			var newact ='';
		        		 	if(data.data.lists == ''){
		        				newact = '暂无最新文章！';
 							}else{
		        				var num = data.data.count;
		        				for(var i=0;i<num;i++){
		        					if(i<5){
		        				 		newact += '<li><a href="'+data.data.lists[i].article_url+'" target="_blank" title="'+data.data.lists[i].title.substring(0,22)+'">'+data.data.lists[i].title.substring(0,22)+'</a></li>';
		        					}
 								}
		        			}
		        	 		$("#newarticle").html(newact);
		        	 	}
		        	});
	        },
			Articlenums:function(){
				$.ajax({
					type:'get',
					url:UC_URL+'article/'+aid+'/num',
					dataType:'jsonp',
					jsonp:'callback',
					success:function(data) {
						if(data.meta.code == 200){
							var list = '<a class="hand_up active sup_zan" href="javascript:;"><i class="fa fa-thumbs-o-up "></i><span class="sup_zan_num">'+data.data.num.support+'</span></>'+
										'<a class="hand_down sup_nozan" href="javascript:;"> <span class="sup_nozan_num">'+data.data.num.oppose+'</span><i class="fa fa-thumbs-o-down "></i></a>';

							$('.absolute_btn').prepend(list);
						}else{
							var list = '<a class="hand_up active sup_zan" href="javascript:;"><i class="fa fa-thumbs-o-up "></i><span class="sup_zan_num">0</span></>'+
									'<a class="hand_down sup_nozan" href="javascript:;"> <span class="sup_nozan_num">0</span><i class="fa fa-thumbs-o-down "></i></a>';
							$('.absolute_btn').prepend(list);
						}
						Article.Btu();
					}
				});
			},
	        Support:function(){
				 var result = false;
	        	 $(document).on('click','.sup_zan',function(){
					 if(!$('.sup_zan').hasClass('active')){
						 $('.sup_nozan').removeClass('active')
						 $('.sup_zan').addClass('active')
					 }
	 	        	var cookie_uid = $('#cookie_uid').val();
	 	        	var aid = $("#aid").val();
	 	        	var user_id = $("#user_id").val();
	 	        	var valid=Article.getCookie(cookie_user_id+'support'+aid);
	 	        	var $this = $(this);
	 	        	if(valid!='true'){
	 	        		if(issub){
	 	        			clearTimeout(timeout);
							timeout = setTimeout(function(){
								$(".notybox").noty({
									layout: 'topCenter',
									text: '禁止重复提交',
									type: "confirm",
									animation: {
										open: {height: 'toggle'}, // jQuery animate function property object
										close: {height: 'toggle'}, // jQuery animate function property object
										easing: 'swing', // easing
										speed: 200 // opening & closing animation speed
									},
									timeout: 300,
								});
							},500) 
	 	        		}else{
	 	        			issub = true;
	 	        			$.ajax({
		 	        			type:'get',
		 	        			url:UC_URL+'p/nums/support',
		 	        			data:{
		 	        				user_id:user_id,
		 	        				aid:aid,
		 	        			},
		 	        			dataType:'jsonp',
		 	        			jsonp:'callback',
								beforeSend:function(){
									if(valid!='true'){
										var op=parseInt($(".sup_zan_num").html())+1;
										$(".sup_zan_num").html(op);
										$(".sup_zan2").html(op);
										document.cookie = cookie_user_id+"support"+aid + "=true";
									}
								},
		 	        			success:function(data){
		 	        				issub = false;
		 	        		        document.cookie = cookie_user_id+"support"+aid + "=true";
		 	        			}
		 	        		});
	 	        		} 
	 	            }else{
						clearTimeout(timeout);
						timeout = setTimeout(function(){
							$(".notybox").noty({
								layout: 'topCenter',
								text: '已经支持了',
								type: "confirm",
								animation: {
									open: {height: 'toggle'}, // jQuery animate function property object
									close: {height: 'toggle'}, // jQuery animate function property object
									easing: 'swing', // easing
									speed: 200 // opening & closing animation speed
								},
								timeout: 300,
							});
						},500)

	 	        	}
	 	        })
	        },
	       
	        Oppose:function(){
	        	 //反对
				var result = true;
		        $(document).on('click','.sup_nozan',function(){
					if(!$('.sup_nozan').hasClass('active')){
						$('.sup_zan').removeClass('active')
						$('.sup_nozan').addClass('active')
					}
		        	var cookie_uid = $('#cookie_uid').val();
		        	var aid = $("#aid").val();
		        	var user_id = $("#user_id").val();
		        	var valid=Article.getCookie(cookie_user_id+'oppose'+aid);
		        	if(valid!='true'){
		        		$.ajax({
		        			type:'get',
		        			url:UC_URL+'p/nums/oppose',
		        			data:{
		        				user_id:user_id,
		        				aid:aid,
		        			},
		        			dataType:'jsonp',
		        			jsonp:'callback',
							beforeSend:function(){
								if(valid!='true'){
									var fu=parseInt($(".sup_nozan_num").html())+1;
									$(".sup_nozan_num").html(fu);
									document.cookie = cookie_user_id+"oppose"+aid + "=true";
								}

							},
		        			success:function(data){
		        		        document.cookie = cookie_user_id+"oppose"+aid + "=true";
		        			}
		        			});
		        	}else{

						clearTimeout(timeout);
						timeout = setTimeout(function(){
							$(".notybox").noty({
								layout: 'topCenter',
								text: '已经反对了',
								type: "confirm",
								animation: {
									open: {height: 'toggle'}, // jQuery animate function property object
									close: {height: 'toggle'}, // jQuery animate function property object
									easing: 'swing', // easing
									speed: 200 // opening & closing animation speed
								},
								timeout: 300,
							});
						},500)
		        	}
		         })
	        },
			Btu:function(){
				var sbOffLeft = $('.absolute_btn').offset().left + 11;
				var wdheight = $(".post-field").height();
				var wzspace=$('#wzHeight').height()+wdheight-(wdheight*0.25);                  +
						$(window).resize(function(){
							sbOffLeft = $('.absolute_btn').offset().left+11;
							if('fixed' != $('.absolute_btn').css('position')){
								$('.info_list').css('left',sbOffLeft-$(window).scrollLeft());
							}
							if($(window).scrollTop()>wdheight && $(window).scrollTop()<wzspace){
								$('.absolute_btn').css('position', 'fixed');
								$('.absolute_btn').css('top', '40%');
								$('.absolute_btn').css('left',sbOffLeft-$(window).scrollLeft()-8);
							}
						}) ;
					$(window).scroll(function(e) {
						if ($(window).scrollTop() > wdheight && $(window).scrollTop() < wzspace) {
							$('.absolute_btn').addClass("fade in");
							$('.absolute_btn').css('position', 'fixed');
							$('.absolute_btn').css('top', '40%');
							$('.absolute_btn').css('left', sbOffLeft - $(window).scrollLeft() - 8);

						} else {
							$('.absolute_btn').removeClass("fade in");
							$('.absolute_btn').css('position', '');
							$('.absolute_btn').css('top', '');
							$('.absolute_btn').css('left', '');
						}
						return false;
					});
			},

	       Collectionlist:function(){
	    	   $obj = $(this);
	    	   $.ajax({
	       			type:'get',
	       			//data:{'limit':2},
	       			url:UC_URL+'article/'+aid+'/collection',
				   	data:{'limit':2},
	       			dataType:'jsonp',
	       			//async: false,
	       			jsonp:'callback',
	       			success:function(data){
	       				if(data.meta.code == 200){
	       					var counts = data.data.length;
	       					var li =''; var lis ='';
							if(counts>0){
								for(var i=0;i<counts;i++){
											li +='<li>'+
												'<a class="avatar" href=""><img src="'+COLLECTIONPIC_URL+data.data[i].cover+'" alt="180"/></a>'+
											'<div class="collections-info">'+
												'<div class="p_name">'+
													'<a href="'+UC_URL+'collection/'+data.data[i].cid+'">'+data.data[i].name.substring(0,70)+'</a>'+
											'</div>'+
											'<ul class="num_hot_list">'+
												'<li>文章数：<a class="blue-link" href="'+UC_URL+'collection/'+data.data[i].cid+'">'+data.data[i].collection_nums.c_article+'</a></li>'+
												'<li>关注数：<a class="blue-link" href="'+UC_URL+'collection/'+data.data[i].cid+'">'+data.data[i].collection_nums.c_fans+'</a></li>'+
											'</ul>'+
										   ' <div class="btn btn-success follow" style="display: block">'+
													'<a href="javascript:;">'+
														'<i class="fa fa-fw fa-plus"></i> <span class="postfollwer" data-value="'+data.data[i].cid+'">添加关注</span>'+
														'<input type="hidden" value="'+data.data[i].user_id+'" />'+
													'</a>'+
											'</div>'+
												'<div class="btn btn-success following" style="display: none">'+
													'<a href="javascript:;">'+
														'<i class="fa fa-fw fa-check"></i> <span>正在关注</span>'+
														'<input type="hidden" value="'+data.data[i].user_id+'" />'+
													'</a>'+
													'<a style="display: none" href="javascript:;">'+
														'<i class="fa fa-fw fa-times"></i> <span class="updatefollwer" data-value="'+data.data[i].cid+'">取消关注</span>'+
													'</a>'+
												'</div>'+
											'</div>'+
											'<p class="description">'+data.data[i].summary+'</p>'+
										'</li>';
									}

								if(counts < 2){
									Collectionallowajax = false;

								}else{
									var collectionlastlist = data.data[data.data.length-1];
									if(collectionlastlist.follower_addtime == $('#collectiontime').val()){
										Collectionallowajax = false;
									}else{
										$('#collectiontime').val(collectionlastlist.follower_addtime);

									}
								}
								$("#all-collections").html(li);
								Article.is_fowllow()
	        				}else{
								$(".include-collection").hide();
								$('.article_collection').hide();
							}

	        			}else{
	        				$(".include-collection").hide();
							$('.article_collection').hide();
	        			}
	       				
		       			},
	       				error:function(){
	       					console.log('系统错误，联系管理员')
	       				}
	       			});
	       },
	       
	       Mouseover :function(){
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
	    	   var c_u_id  = $('#cookie_uid').val();
	   			if(!c_u_id){
					window.location.href = UC_URL+'sign/in';
				}else{
					return true;
				}	
	       },
	       Follow:function(){
	    	   var aid = $("#aid").val();
	    	   var url = 'p/'+aid;
	    		   $(document).on('click','.follow',function(){
	    			   if(Article.is_sign()){
		       		   var obj = $(this);
		   	    		var  cid = $(this).find('span').attr('data-value');
		   	    		var  c_u_id = $(this).find('span').next().val();
		   	    		var  name =$(this). parents('.collections-info').children('.p_name').find('a').html();
		   	    	 	var data ={
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
//				    			var data = eval('('+data+')'); 
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
	       Following:function(){
	    	   var aid = $("#aid").val();
	    	   var url = 'p/'+aid;
	    	   $(document).on('click','.following',function(){
	    		   if(Article.is_sign()){
	    			   var obj = $(this);
		    			var  cid = $(this).find('a').eq(1).find('span').attr('data-value');
		    			var  c_u_id = $(this).find('a').eq(1).find('span').next().val();
		    			var  name =$(this). parents('.collections-info').children('.p_name').find('a').html();
		    		 	var data ={
		    			   			'cid':cid,
		    		   	};
		    		 	$.ajax({
		    				type:'put',
		    				url:UC_URL+'collection/'+data.cid+'/user',
		    				data:data,
		    				dataType:'jsonp',
		    				jsonp:'callback',
		    				success:function(data) {
		    				//var data = eval('('+data+')'); 
		    					if(data.meta.code == 200){
		    						obj.hide();
		    						obj.prev().show();
		    						
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
	       is_fowllow:function(){
	    	   var c_u_id  = $('#cookie_uid').val();
	    		var c_id = '';
	   			if(c_u_id){
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
	   					error:function(msg){
	   						console.log('删除失败 服务器错误'+msg);
	   						}, 
	   						  
	   				});
	   				
	             }
	       },
		Lasttext:function(){
			var add_time = $('#add_time').val();
			var visiablep = $('#visiablep').val();
			$.ajax({
				type:'get',
				url:UC_URL+'article/last',
				data:{'aid':aid,'user_id':uid,'add_time':add_time,visiablep:visiablep},
				dataType : "jsonp", 
                jsonp: 'callback',
				success:function(data) {  
					if(data.meta.code == 200){ 
						switch (data.data.type)
						{
							case 'pre':
								if(visiablep == 'private'){
									$('.prev_atc').find('span').html('阅读后一篇'+'<em style="color:red">[隐]</em>');
								}else{
									$('.prev_atc').find('span').html('阅读后一篇');
								}
								$('.prev_t').append('<h2><a target="_blank" href="'+data.data.article_url+'">'+data.data.title+'</a></h2>');
								break;
							case 'next':
								if(visiablep == 'private'){
									$('.prev_atc').find('span').html('阅读前一篇'+'<em style="color:red">[隐]</em>');
								}else{
									$('.prev_atc').find('span').html('阅读前一篇');
								}
								$('.prev_t').append('<h2><a target="_blank" href="'+data.data.article_url+'">'+data.data.title+'</a></h2>');
								break;
							default:
								$('.prev').hide();

						}   
					}else if(data.meta.code == 404){
						var userurl = document.URL;
						$('.prev_atc').find('span').html('当前专栏只有一篇文章');
						$('.prev_t').append('<h2><a target="_blank" href="'+userurl+'">'+$('.d_testbox').html()+'</a></h2>');
					}
				},
				error:function(msg){
					console.log('删除失败 服务器错误'+msg);
				},

			});
		},
		Hotarticle:function(){
			$.ajax({
				type:'get',
				url:UC_URL+'rank',
				data:{user_id:uid,show_summary:'n'},
				dataType:'jsonp',
				jsonp:'callback',
				success:function(data) { 
					var newact ='';
					if(data.data.click == '' || data.data.click == undefined || data.data.click == null){
						newact = '暂无相关阅读！';
					}else{
						var num = data.data.click.length;
						for(var i=0;i<num;i++){
							if(i<5){
								newact += '<li><a href="'+data.data.click[i].article_url+'" target="_blank" title="'+data.data.click[i].title.substring(0,22)+'">'+data.data.click[i].title.substring(0,22)+'</a></li>';
							}
						}
					}
					$("#hotarticle").html(newact);
				},
				error:function(msg){
					console.log('删除失败 服务器错误'+msg);
				},

			});
		},

		ArticleCollecitonAdd:function(){
			var aid = $("#aid").val();
			var url = 'p/'+aid;
			$(document).on('click','.fa_plus',function(){
				if(Article.is_sign()){
					$.ajax({
						type:'get',
						url:UC_URL+'collection/mine',
						dataType:'jsonp',
						jsonp:'callback',
						success:function(data) {
							//console.log(data);return false;
							if(data.meta.code == 200){
								var num = data.data.length;
								var li = '';
								for(var i=0;i<num;i++){
									 li += '<li class="">'+
									'<a href="javascript:void(null)" class="add">'+
									'<div class="avatar">'+
									'<img alt="" src="'+COLLECTIONPIC_URL+data.data[i].cover+'">'+
									'</div>'+
									'<h5 data-value-cid="'+data.data[i].cid+'">'+data.data[i].name.substring(0,10)+' </h5>'+
									'<small>'+data.data[i].nickname+' 编</small> </a>'+
									'</li>';
								}
								$('#recommended-collections').html(li);
								$('#followers').modal('show');
								Article.IsaddConllection();

							}
						},
						error:function(msg){
							console.log('删除失败 服务器错误'+msg);
						},

					});
				}

			});

		},
		AddCollectionArticle:function(){
			$(document).on('click','.recommended-list > li',function(){
				var  obj  = $(this);
				if(!obj.hasClass('approved')){
					var cid = obj.find('h5').attr('data-value-cid');
					var data  ={
						'c_id':cid,
						'a_id':aid,
					}
					$.ajax({
						type:'post',
						url:UC_URL+'collection/'+cid+'/article',
						data:data,
						dataType:'jsonp',
						jsonp:'callback',
						success:function(data){
							if(data.meta.code == 200){
								obj.find('h5').append('<i>（已收入）</i>');
								obj.append('<a href="javascript:;" class="delete" data-method="delete" data-remote="true" rel="nofollow">移除</a>');
								obj.addClass('approved');
							}

						},
						error:function(msg){

						}
					});
				}


			});
		},
		DeleteCollectionArticle:function() {
			$(document).on('click', '.delete', function () {
				var obj = $(this);
				var cid = obj.siblings('a').find('h5').attr('data-value-cid');
				var aid = $('#aid').val();
				var data = {
					'c_id': cid,
					'a_id': aid,
				}
				$.ajax({
					type: 'put',
					url: UC_URL+'collection/' + cid + '/article',
					data: data,
					dataType: 'jsonp',
					jsonp: 'callback',
					success: function (data) {
						if (data.meta.code == 200) {
							obj.siblings('a').find('h5').children('i').remove();
							obj.parent('li').removeClass('approved')
							obj.remove();
						}

					},
					error: function (msg) {

					}
				});
			});
		},
		IsaddConllection:function(){
			$.ajax({
				type:'get',
				url:UC_URL+'articled',
				data:{'a_id':aid},
				dataType:'jsonp',
				jsonp:'callback',
				success:function(data){
					if(data.meta.code == 200){
						var num = data.data.length;
						$('#recommended-collections>li').each(function(i) {
							for(var i=0;i<num;i++){
								if($(this).find('h5').attr('data-value-cid')==data.data[i].c_id){
									$(this).find('h5').append('<i>（已收入）</i>');
									$(this).append('<a href="javascript:;" class="delete" data-method="delete" data-remote="true" rel="nofollow">移除</a>');
									$(this).addClass('approved');
								}
							}
						});
					}

				},
				error:function(msg){

				}
			});
		},
		CodeUser:function(){
			var isFirst = true;
			$("#opencode").click(function () {
				if ($(".qrcode-box").is(":visible")) {
					$(".qrcode-box").hide();
				} else {
					$(".qrcode-box").show();
					if (isFirst) {
						$("#qrcodeCanvas").qrcode({
							render: "canvas",
							width: 150,
							height: 150,
							text:UC_URL+'user/'+uid+'/latest-article',
						});
						isFirst = false;
					}
				}
			})

		},
//		CodeArticle:function(){
//			var flag=true;
//			$(".opencode").hover(function () {
//				if ($(".qrcode-box2").is(":visible")) {
//					$(".qrcode-box2").hide();
//				} else {
//					$(".qrcode-box2").show();
//					if (flag) {
//						$(".qrcodeCanvas").qrcode({
//							render: "canvas",
//							width: 150,
//							height: 150,
//							text: window.location.href
//						});
//						flag=false;
//					}
//				}
//			})
//		},
		CollectionSearch:function(){
			var aid = $("#aid").val();
			var url = 'p/'+aid;
			 var timeout = 0;
			$(document).on('keyup','.searchcolleciton',function(){

				var name = $(this).val();
				if(Article.is_sign()){
					if(name.length<=0 && name ==''){
						return false;
					}
					clearTimeout(timeout);
					timeout = setTimeout(function(){
						$.ajax({
							type:'get',
							url:UC_URL+'collection/search',
							data:{'name':name},
							dataType:'jsonp',
							jsonp:'callback',
							success:function(data) {
								//console.log(data);return false;
								if(data.meta.code == 200){
									var num = data.data.length;
									var li = '';
									for(var i=0;i<num;i++){
										li += '<li class="">'+
												'<a href="javascript:void(null)" class="add">'+
												'<div class="avatar">'+
												'<img alt="" src="'+COLLECTIONPIC_URL+data.data[i].cover+'">'+
												'</div>'+
												'<h5 data-value-cid="'+data.data[i].cid+'">'+data.data[i].name+' </h5>'+
												'<small>'+data.data[i].nickname+' 编</small> </a>'+
												'</li>';
									}
									$('#recommended-collections').html(li);
									Article.IsaddConllection();

								}
							},
							error:function(msg){
								console.log('删除失败 服务器错误'+msg);
							},

						});
					},1000);
				}

			});
		},
		CollectionMore:function(){
			var that = this;
			$(document).on('click','.CollectionMore',function(){
				var obj = $(this);
				if(Collectionallowajax != false){
					$.ajax({
						url:UC_URL+'article/'+aid+'/collection',
						type: 'get',
						data: {lastpagetime:$('#collectiontime').val(),limit:2},
						dataType : "jsonp",
						jsonp: 'callback',
						beforeSend:function(){
							obj.removeClass('CollectionMore');
						},
						success:function(data) {
 							obj.addClass('CollectionMore');
							if(data.meta.code == 200){
								var counts = data.data.length;
								var li =''; var lis ='';
								if(counts>0) {
									for (var i = 0; i < counts; i++) {
										li += '<li>' +
												'<a class="avatar" href=""><img src="' + COLLECTIONPIC_URL + data.data[i].cover + '" alt="180"/></a>' +
												'<div class="collections-info">' +
												'<div class="p_name">' +
												'<a href="' + UC_URL + 'collection/' + data.data[i].cid + '">' + data.data[i].name.substring(0,70) + '</a>' +
												'</div>' +
												'<ul class="num_hot_list">' +
												'<li>文章数：<a class="blue-link" href="' + UC_URL + 'collection/' + data.data[i].cid + '">' + data.data[i].collection_nums.c_article + '</a></li>' +
												'<li>关注数：<a class="blue-link" href="' + UC_URL + 'collection/' + data.data[i].cid + '">' + data.data[i].collection_nums.c_fans + '</a></li>' +
												'</ul>' +
												' <div class="btn btn-success follow" style="display: block">' +
												'<a href="javascript:;">' +
												'<i class="fa fa-fw fa-plus"></i> <span class="postfollwer" data-value="' + data.data[i].cid + '">添加关注</span>' +
												'<input type="hidden" value="' + data.data[i].user_id + '" />' +
												'</a>' +
												'</div>' +
												'<div class="btn btn-success following" style="display: none">' +
												'<a href="javascript:;">' +
												'<i class="fa fa-fw fa-check"></i> <span>正在关注</span>' +
												'<input type="hidden" value="' + data.data[i].user_id + '" />' +
												'</a>' +
												'<a style="display: none" href="javascript:;">' +
												'<i class="fa fa-fw fa-times"></i> <span class="updatefollwer" data-value="' + data.data[i].cid + '">取消关注</span>' +
												'</a>' +
												'</div>' +
												'</div>' +
												'<p class="description">' + data.data[i].summary + '</p>' +
												'</li>';
									}
									if (counts < 2) {
										Collectionallowajax = false;
										$('.article_collection').hide();
									} else {
										var collectionlastlist = data.data[data.data.length - 1];
										if (collectionlastlist.follower_addtime == $('#collectiontime').val()) {
											Collectionallowajax = false;
										} else {
											$('#collectiontime').val(collectionlastlist.follower_addtime);

										}
									}
									$("#all-collections").append(li);
									Article.is_fowllow()
								}else{
									$('.article_collection').hide();
								}
							}else{
								$('.article_collection').hide();
								$(".include-collection").hide();
							}
						},
						error:function(e){
							console.log(e);
						}
					});
				}else{
					$('.article_collection').hide();
				}
			})
		},
	//	Share:function(){
//
//			/*$(".go-share").hover(
//					function () {
//						$('.jiathis_style_32x32').show();
//					},
//					function () {
//						$('.jiathis_style_32x32').hide();
//					}*/
//			//);
//
//			$(document).on('mouseover','.go-share',function(){
//				$('.jiathis_style_32x32').show();
//			}).on('mouseout','.go-share',function(){
//				$('.jiathis_style_32x32').hide();
//			});
//			$(document).on("mouseover", ".jiathis_style_32x32", function(){
//				$(this).show();
//			}).on('mouseout','.jiathis_style_32x32',function(){
//				$(this).hide();
//			});
//		}

	};
	window.Article = Article;
    $(function () {
    	Article.init();
    })
}(window,jQuery));