;(function(window,$){
    // var collectionpic_url = 'http://image5.blogcore.cn/upload/collection/';
    // var defaulturl            ='http://uc5.blogcore.cn/public/assets/';
    // var 	UC_URL		     = 'http://uc5.blogcore.cn/';
    var Collectionallowajax = true;
    var notebookajax = true;
    var timeout = 0;
    var uid = $('#uid').val();
    var uname = $('#uname').val();
    var cookie_user_id = $('#cookie_uid').val();
    var rewardallow = $('#rewardallow').val();
    var yuming = window.location.href;
    var yuming1 = yuming.split('//');
    var yuming2 = yuming1[1].split('/');
    var nurlreg = /images.blogchina.com/; 
    var  Articlelist  = {

        init:function(){
            this.Pagearticle();
            if($('#type').val() !== 'notebook'){
                this.getNotebookename();
                this.BtuNotebookename();
                this.Articlelist();
                this.showfenlei();
            }else{
                this.getNotebookename();
                this.BtuNotebookename();
                //this.Pagenotearticle();
                this.showfenlei();
            }
            this.addUrl();
            this.notebookpjax();
            this.Code();
            this.outCode();
            this.IsFollow();//判定用户是否被关注
            this.FollowAdd();//添加关注
            this.FootPrintAdd();//添加脚印
            this.Hover();//鼠标滑过时关注更改样式
            this.FollowDel();////取消关注
            this.scrollpage();
            //this.Allarticle();////全部文章
            //loading 操作

			this.Articlediamond();//加载赞赏
			//初始化图片
			var $Iw=$(".wz_r_box").width();
			$(".wz_r_box").css("height",$Iw);
			//初始化全部文章图片重合
			if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){ 
            	$('.list_title').find('span').eq(0).hide();
                $('.zt_name').children('ul').find('li').eq(0).hide();
            }else{
            	$('.list_title').find('span').eq(0).show();
                $('.zt_name').children('ul').find('li').eq(0).html('——');
            }
        },
        //Allarticle:function(){
        //    $(document).on('click', "#allarticle", function () {
        //        $.pjax.defaults.timeout = 10000;
        //        var url  = UC_URL+'user/'+uid+'/date-article';
        //        alert(url)
        //        $.pjax({url: url, container: '#allartilcelist'});
        //    });
        //},
        notebookpjax:function(){
            $(document).on('click', ".fl_silde li", function () {
                if(($('#type').val() !== 'notebook')){
                    $('.time').hide();
                    $('.new_list').show();
                }
                if(($('#type').val() == 'all')){
                    $('.new_list').hide();
                    $('.all').show();
                }
                var name = $(this).find('span').eq(0).html();
                var namenum = $(this).find('span').eq(1).html();
                
                if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){ 
                	$('.list_title').find('span').eq(0).hide();
	                $('.zt_name').children('ul').find('li').eq(0).hide();
	                
	                if($(this).parents('.fl_silde').is(":hidden")){
	                	$(this).parents('.fl_silde').show();
	                }else{
	                	$(this).parents('.fl_silde').hide();
	                }
                }else{
                	$('.list_title').find('span').eq(0).show();
	                $('.zt_name').children('ul').find('li').eq(0).html('——');
                }
                $('.zt_name').children('ul').find('li').eq(1).html(name);
                $('.zt_name').children('ul').find('li').eq(2).html(namenum);
               // $.pjax.defaults.timeout = 10000;
                var nid =$(this).attr('data-vlue');
                    $('#type').val('notebook');
                   $('#nid').val(nid);
                var spinner = new Spinner({top:'50%',lines:6,length:0,width:33,radius:33,color:'#B30707'});  //loading 图标初始化
                $(document).on('pjax:send', function() {		//加载过程中
                    $("#notebook").text('');
                    if($('p').hasClass('loading-more-no')){
			  			$('.loading-more-no').remove();
		  			}
                    spinner.spin($("#articlelistloading").get(0));//loading 图标开始
                });
                //var url  = UC_URL+'user/'+uid+'/notebook/'+nid;
                var url = 'http://'+$('#uname').val()+BLOG_DOMAIN+nid+'_list_1.html';
                $.pjax({url: url, container: '#notebook'});


                $(document).on('pjax:end', function() {
                    spinner.spin();//loading 图标关闭
                    Articlelist.Articlediamond();//加载赞赏
                    Articlelist.FootPrintAdd();
                    notebookajax = true;
                    var count = $('#notebook > dd').length;
                    if(count < 10 && count>0){
	                    if(!$('p').hasClass('loading-more-no')){
				  			$('#notebook').after('<p class="loading-more-no"><a class="more-link" href="javascript:;">没有更多了</a></p>'); notebookajax= false;
			  			} 
                    }
		  			if(count == 0){
		  				notebookajax= false;
		  			}
                    
                });
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            });
        },
        
        
        
        
        Articlediamond:function(){
        	if(rewardallow == 'y'){ 
				var ids = [];
				$('.num_hot').each(function(i,n){
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
									$('#num_hot_'+i).find('li:last').show().html('<i class="fa fa-diamond"></i>'+n); 
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
        
        
        
        
        
        showfenlei:function(){
            var nid = $('#nid').val();
            var uid = $('#uid').val(); 
            $.ajax({
                type:'get',
                url:UC_URL+'notebook',
                data:{user_id:uid},
                dataType:"jsonp",
                jsonp: 'callback',
                 /*beforeSend:function(){
                    $('.fl_silde').slideDown(500);
                 },*/
                success:function(data){ 
                    if(data.meta.code == '200'){
                        var li ='';
                        var counts = data.data.length;
                        if(counts>0){
                            for(var i=0;i<counts;i++){
                                if(nid){
                                    if(nid ==data.data[i].nid ){
                                        li += '<li class="active" data-vlue="'+data.data[i].nid+'"><a "href="javascript:;"><span>'+data.data[i].name+'</span><span class="r">('+data.data[i].articlenum+')</span></span></li>';
                                    }else{
                                        li += '<li class="" data-vlue="'+data.data[i].nid+'"><a "href="javascript:;"><span>'+data.data[i].name+'</span><span class="r">('+data.data[i].articlenum+')</span></span></li>';
                                    }
                                }else{
                                    li += '<li class="" data-vlue="'+data.data[i].nid+'"><a "href="javascript:;"><span>'+data.data[i].name+'</span><span class="r">('+data.data[i].articlenum+')</span></span></li>';
                                }

                            }
                            $('.fl_silde').html(li);
                        }
                    }

                },
                error:function(){
                    console.log('请求是否关注信息失败');
                },
            });
        },
        
        
        
        
        getNotebookename:function (){
            $(document).on('click', ".zt_control", function () { 
                $('.fl_silde').slideToggle("slow"); 
            });

        },
        Code:function(){
            $(document).on('mouseover', ".opencode3", function () {
                var is_open = $(this).attr('is_open');
                $(this).children('.qrcode-box3').show();
                if (is_open == 'true') {
                    var aid = $(this).find('i').attr('article_aid');
                    $('#qrcodeCanvas'+aid).qrcode({
                        render: "canvas",
                        width: 150,
                        height: 150,
                        text: UC_URL+'p/'+aid
                    });
                    $(this).attr('is_open','false');
                }
            });
        },
        outCode:function()
        {
            $(document).on('mouseout', '.opencode3', function(){
                $(this).children('.qrcode-box3').hide();
            });
        },
        BtuNotebookename:function(){

            /*复杂$$精简模式切换*/
            $(document).on('click', ".fa_fz", function () {
                $('.dateclass').addClass("fz_modal");
                $('.detailnum dd').addClass('img_box') ;
                $(this).removeClass("fa-indent fa_fz").addClass("fa-reorder fa_jj");
            });
            $(document).on('click', ".fa_jj", function () {
                $('.dateclass').removeClass("fz_modal");
                $('.detailnum dd').removeClass('img_box') ;
                $(this).removeClass("fa-reorder fa_jj").addClass("fa-indent fa_fz");
            });
            $(document).on('mouseover', ".wz_l", function () {
                $(this).find('.num_hot').addClass("in");
            });
            $(document).on('mouseout', ".wz_l", function () {
                $(this).find('.num_hot').removeClass("in");
            });
            $('#tipmsm2').tooltip({
                title: '查看分类',
                placement: 'bottom' ,
                trigger:"click"
            });

        },
        Articlelist:function(){
            $(document).on('click', ".mon", function () {
                var obj =  $(this);
                if(obj.hasClass('on')){
                    obj.removeClass('on');
                    obj.siblings("dl").slideUp(500);return false;
                }
                obj.parent('dd').siblings('dd').children('.ti').removeClass('on');
                obj.parent('dd').siblings('dd').children('.ti').siblings("dl").slideUp(500);
                var date = obj.attr('date-data');
             $.ajax({
                    type:'get',
                    url:UC_URL+'userdatearticle',
                    data:{uid:uid,'date':date},
                    dataType:"jsonp",
                    jsonp: 'callback',
                     beforeSend:function(){
                         //obj.siblings(".detailnum").html('加载中...');
                     },
                    success:function(data){ 
                       
                        if(data.meta.code == '200'){
                            var li ='';
                            if(data.data.count>0){
                            	var aids = [];
                                for(var i=0;i<data.data.count;i++){
                                	if(data.data.lists[i].pics.exists == 'y'){
	                                    if(data.data.lists[i].pics.url.length>0){
	                                    	if(nurlreg.test(data.data.lists[i].pics.url[0])){  
		                                        var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'!m240" alt=""></div>';
	                                    	}else{
	                                    		if(data.data.lists[i].pics.url[0] !=null || data.data.lists[i].pics.url[0] !=undefined || data.data.lists[i].pics.url[0]!=''){
	                                    			var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'" alt=""></div>';
	                                    			//var li1 = "<div class='wz_r'><div class='wz_r_box' style='background:url("+data.data.lists[i].pics.url[0]+")center;background-size: 100% auto;-moz-background-size: 100% auto;background-repeat: no-repeat;' ></div></div>";
	                                    		}
	                                    	} 
	                                    }else{
	                                        var li1 ='';
	                                    } 
                                	}else{
                                		var li1 ='';
                                	}
                                    li +='<dd class="img_box"  date ="'+data.data.date+'" lastpagetime="'+data.data.lists[i].add_time+'">'+
                                        '<a target="_blank" href="'+data.data.lists[i].article_url+'"><div class="wz_l">';
                                    if(data.data.lists[i].is_recommend == 'y'){
                                    	li += "<img src='"+UC_PUBLIC_DEFAULT+"/images/jian.png' alt='2'/>";
                                    };
                                    li +='<h3>'+data.data.lists[i].title+
                                    '<div class="opencode3" is_open="true"><i article_aid="'+data.data.lists[i].aid+'"><img src="'+UC_PUBLIC_DEFAULT+'images/erweima.png" alt=""></i>'+
                                    '<div class="qrcode-box3">'+
                                    '<div class="qrcode-bd3" id="qrcodeCanvas'+data.data.lists[i].aid+'"></div>'+
                                    '</div>'+
                                    '</div>'+
                                    '</h3>'+
                                    '<p>'+data.data.lists[i].summary+'</p>'+

                                    '<div class="t_wz">'+
                                    '<ul class="num_hot"  id="num_hot_'+data.data.lists[i].aid+'"  aid="'+data.data.lists[i].aid+'">'+
                                    '<li><i class="icon-eye"><img src="'+UC_URL+'public/assets/default/images/shu.png" alt=""></i>'+data.data.lists[i].nums.click+'</li>'+
                                    '<li><i class="fa fa-comment-o"></i>'+data.data.lists[i].nums.comment+'</li>'+
                                    '<li><i class="fa fa-thumbs-o-up"></i>'+data.data.lists[i].nums.support+'</li>'+
                                    '<li style="display:none"><i class="fa fa-diamond"></i>0</li>'+
                                    '</ul><span class="pull-left">'+data.data.lists[i].gsh_add_time+'</span>'+
                                    '</div>'+
                                    '</div>'+
                                        '</div>'+li1+
                                    '</a></dd>';
                                    
                                    aids[i] = data.data.lists[i].aid;
                                }
                                obj.siblings(".detailnum").html('');
                                obj.siblings(".detailnum").append(li);
                                
                                
                                var $Iw=$(".wz_r_box").width();
					    		$(".wz_r_box").css("height",$Iw);
					    		
					    		//加载赞赏数 
					    		if(rewardallow == 'y'){ 
									if(aids.length > 0 ){ 
										$.ajax({
											type:'get',
											url:UC_URL+'artice/diamond',
											data:{'ids':aids},
											dataType:'jsonp',
											jsonp:'callback',
											success:function(msg) { 
												if(msg.code == 200){   
													$.each(msg.msg, function(i, n){
														$('#num_hot_'+i).find('li:last').show().html('<i class="fa fa-diamond"></i>'+n); 
													});  
												}
											},
											error:function(err){
											 	console.log('赞赏数据添加失败');
										 	}, 
										});
									}
					    		}
					    		
					    		
					    		
                                if(data.data.count >= 10){
	                                obj.siblings(".detailnum").append('<div class="effect-oscar"><span class="add_btn"><p> +</p><a href="javascript:;">点击加载更多</a> </span></div>');
                                }
                                obj.addClass("on");
                                $(".dateclass").addClass("open");
                                obj.siblings("dl").slideDown(500);

                            }
                        }

                    },
                    error:function(){
                        console.log('请求是否信息失败');
                    },
                });
            });
            /*展开关闭*/
            $(document).on('click', ".year", function () {
                $(this).toggleClass("on");
                $(".dateclass").addClass("open");
                $(this).siblings("dl").stop().slideToggle(500); 
            });
        },
        
        
        
        scrollpage:function(){
        	$(window).scroll(function(){ 
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
				if($('#type').val() == 'notebook'){ 
					if(scrollTop + clientHeight >= scrollHeight){ 
						if(notebookajax == true){
							notebookajax = false;
							var nid = $('#nid').val();
							//var lastpagetime = $('.add_btn').parent().prev('dd').attr('lastpagetime');console.log(lastpagetime);
							var lastpagetime = $('#notebook').find('dd').last().attr('lastpagetime'); 
							$.ajax({
		                        type:'get',
		                        url:UC_URL+'usernotebook',
		                        data:{uid:uid,nid:nid,'lastpagetime':lastpagetime,'limit':10},
		                        dataType:"jsonp",
		                        jsonp: 'callback',
		                        beforeSend:function(){
		                            //obj.siblings(".detailnum").html('加载中...');
		                        },
		                        success:function(data){  
		                        	notebookajax = true;
		                            if(data.meta.code == '200'){
		                                var li ='';
		                                if(data.data.count>0){
		                                	var aids = [];
		                                    for(var i=0;i<data.data.count;i++){ 
		                                    	if(data.data.lists[i].pics.exists == 'y'){ 
			                                        if(data.data.lists[i].pics.url.length>0){ 
			                                        	if(nurlreg.test(data.data.lists[i].pics.url[0])){  
					                                        var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'!m240" alt=""></div>';
				                                    	}else{
				                                    		if(data.data.lists[i].pics.url[0] !=null || data.data.lists[i].pics.url[0] !=undefined || data.data.lists[i].pics.url[0]!=''){
				                                    			var li1 = "<div class='wz_r'><div class='wz_r_box' style='background:url("+data.data.lists[i].pics.url[0]+")center;background-size: 100% auto;-moz-background-size: 100% auto;background-repeat: no-repeat;' ></div></div>";
				                                    			//var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'" alt=""></div>';
				                                    		}
				                                    	} 
			                                        }else{
			                                            var li1 ='';
			                                        }
		                                    	}else{
		                                    		var li1 = '';
		                                    	}
		                                        li +='<dd class="img_box" date ="'+data.data.date+'" lastpagetime="'+data.data.lists[i].add_time+'">'+
		                                            '<a target="_blank" href="'+data.data.lists[i].article_url+'"><div class="wz_l">';
				                                    if(data.data.lists[i].is_recommend == 'y'){
				                                    	li += "<img src='"+UC_PUBLIC_DEFAULT+"/images/jian.png' alt='2'/>";
				                                    };
				                                    li +='<h3>'+data.data.lists[i].title+
		                                            '<div class="opencode3" is_open="true"><i article_aid="'+data.data.lists[i].aid+'"><img src="'+UC_PUBLIC_DEFAULT+'images/erweima.png" alt=""></i>'+
		                                            '<div class="qrcode-box3">'+
		                                            '<div class="qrcode-bd3" id="qrcodeCanvas'+data.data.lists[i].aid+'"></div>'+
		                                            '</div>'+
		                                            '</div>'+
		                                            '</h3>'+
		                                            '<p>'+data.data.lists[i].summary+'</p>'+
		                                            '<div class="t_wz">'+
		                                            '<ul class="num_hot"   id="num_hot_'+data.data.lists[i].aid+'"  aid="'+data.data.lists[i].aid+'">'+
		                                            '<li><i class="icon-eye"><img src="'+UC_URL+'public/assets/default/images/shu.png" alt=""></i>'+data.data.lists[i].nums.click+'</li>'+
		                                            '<li><i class="fa fa-comment-o"></i>'+data.data.lists[i].nums.comment+'</li>'+
		                                            '<li><i class="fa fa-heart-o"></i>'+data.data.lists[i].nums.support+'</li>'+
		                                            '<li style="display:none"><i class="fa fa-diamond"></i>0</li>'+
		                                            '</ul><span class="pull-left">'+data.data.lists[i].gsh_add_time+'</span>'+
		                                            '</div>'+
		                                            '</div>'+li1+
		                                            '</a></dd>';
		                                            aids[i] = data.data.lists[i].aid;
		                                    }
		                                    //$('.add_btn').parent().before(li);
		                                    $('#notebook').append(li);
		                                    
		                                    var $Iw=$(".wz_r_box").width();
							    			$(".wz_r_box").css("height",$Iw);
							    			
							    			//加载赞赏数 
							    			if(rewardallow == 'y'){ 
												if(aids.length > 0 ){ 
													$.ajax({
														type:'get',
														url:UC_URL+'artice/diamond',
														data:{'ids':aids},
														dataType:'jsonp',
														jsonp:'callback',
														success:function(msg) { 
															if(msg.code == 200){   
																$.each(msg.msg, function(i, n){
																	$('#num_hot_'+i).find('li:last').show().html('<i class="fa fa-diamond"></i>'+n); 
																});  
															}
														},
														error:function(err){
														 	console.log('赞赏数据添加失败');
													 	}, 
													});
												}
							    			}
											
											
		                                    if(data.data.count < 10){
		                                    	$('.add_btn').parent().hide();
		                                    	if(!$('p').hasClass('loading-more-no')){
										  			$('#notebook').after('<p class="loading-more-no"><a class="more-link" href="javascript:;">没有更多了</a></p>'); notebookajax= false;
									  			}
		                                    }
		                                }else{
		                                    $('.add_btn').parent().hide();
		                                    if(!$('p').hasClass('loading-more-no')){
									  			$('#notebook').after('<p class="loading-more-no"><a class="more-link" href="javascript:;">没有更多了</a></p>'); notebookajax= false;
								  			}
		                                }
		                            }
		
		                        },
		                        error:function(){
		                            console.log('请求是否关注信息失败');
		                        },
		                    }); 
		                    ////////////////////////////
						}  
					
					}
					
					
				}
		
		 	})
        },
        
        
        
        
        
        
        
        Pagearticle:function(){
            $(document).on('click', ".add_btn", function () {  
                //if($('#type').val() == 'notebook'){ 
//                    var obj =  $(this);
//                    var nid = $('#nid').val();
//                    var lastpagetime = obj.parent().prev('dd').attr('lastpagetime');
//                    $.ajax({
//                        type:'get',
//                        url:UC_URL+'usernotebook',
//                        data:{uid:uid,nid:nid,'lastpagetime':lastpagetime,'limit':10},
//                        dataType:"jsonp",
//                        jsonp: 'callback',
//                        beforeSend:function(){
//                            //obj.siblings(".detailnum").html('加载中...');
//                        },
//                        success:function(data){  
//                            if(data.meta.code == '200'){
//                                var li ='';
//                                if(data.data.count>0){
//                                	var aids = [];
//                                    for(var i=0;i<data.data.count;i++){ 
//                                    	if(data.data.lists[i].pics.exists == 'y'){ 
//	                                        if(data.data.lists[i].pics.url.length>0){ 
//	                                        	if(nurlreg.test(data.data.lists[i].pics.url[0])){  
//			                                        var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'!m240" alt=""></div>';
//		                                    	}else{
//		                                    		if(data.data.lists[i].pics.url[0] !=null || data.data.lists[i].pics.url[0] !=undefined || data.data.lists[i].pics.url[0]!=''){
//		                                    			var li1 = "<div class='wz_r'><div class='wz_r_box' style='background:url("+data.data.lists[i].pics.url[0]+")center;background-size: 100% auto;-moz-background-size: 100% auto;background-repeat: no-repeat;' ></div></div>";
//		                                    			//var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'" alt=""></div>';
//		                                    		}
//		                                    	} 
//	                                        }else{
//	                                            var li1 ='';
//	                                        }
//                                    	}else{
//                                    		var li1 = '';
//                                    	}
//                                        li +='<dd class="img_box" date ="'+data.data.date+'" lastpagetime="'+data.data.lists[i].add_time+'">'+
//                                            '<a target="_blank" href="'+data.data.lists[i].article_url+'"><div class="wz_l">'+
//                                            '<h3>'+data.data.lists[i].title+
//                                            '<div class="opencode3" is_open="true"><i article_aid="'+data.data.lists[i].aid+'"><img src="'+UC_PUBLIC_DEFAULT+'images/erweima.png" alt=""></i>'+
//                                            '<div class="qrcode-box3">'+
//                                            '<div class="qrcode-bd3" id="qrcodeCanvas'+data.data.lists[i].aid+'"></div>'+
//                                            '</div>'+
//                                            '</div>'+
//                                            '</h3>'+
//                                            '<p>'+data.data.lists[i].summary+'</p>'+
//                                            '<div class="t_wz">'+
//                                            '<ul class="num_hot"   id="num_hot_'+data.data.lists[i].aid+'"  aid="'+data.data.lists[i].aid+'">'+
//                                            '<li><i class="icon-eye"><img src="'+UC_URL+'public/assets/default/images/shu.png" alt=""></i>'+data.data.lists[i].nums.click+'</li>'+
//                                            '<li><i class="fa fa-comment-o"></i>'+data.data.lists[i].nums.comment+'</li>'+
//                                            '<li><i class="fa fa-heart-o"></i>'+data.data.lists[i].nums.support+'</li>'+
//                                            '<li style="display:none"><i class="fa fa-diamond"></i>0</li>'+
//                                            '</ul><span class="pull-left">'+data.data.lists[i].gsh_add_time+'</span>'+
//                                            '</div>'+
//                                            '</div>'+li1+
//                                            '</a></dd>';
//                                            aids[i] = data.data.lists[i].aid;
//                                    }
//                                    obj.parent().before(li);
//                                    
//                                    var $Iw=$(".wz_r_box").width();
//					    			$(".wz_r_box").css("height",$Iw);
//					    			
//					    			//加载赞赏数 
//					    			if(rewardallow == 'y'){ 
//										if(aids.length > 0 ){ 
//											$.ajax({
//												type:'get',
//												url:UC_URL+'artice/diamond',
//												data:{'ids':aids},
//												dataType:'jsonp',
//												jsonp:'callback',
//												success:function(msg) { 
//													if(msg.code == 200){   
//														$.each(msg.msg, function(i, n){
//															$('#num_hot_'+i).find('li:last').show().html('<i class="fa fa-diamond"></i>'+n); 
//														});  
//													}
//												},
//												error:function(err){
//												 	console.log('赞赏数据添加失败');
//											 	}, 
//											});
//										}
//					    			}
//									
//									
//                                    if(data.data.count < 10){
//                                    	obj.parent().hide();
//                                    }
//                                }else{
//                                    obj.parent().hide();
//                                }
//                            }
//
//                        },
//                        error:function(){
//                            console.log('请求是否关注信息失败');
//                        },
//                    });
//                    return false;
//                }
                
                
                 
                
                var obj =  $(this);
                var lastpagetime = obj.parent().prev('.img_box').attr('lastpagetime');
                var date = obj.parent().prev('.img_box').attr('date');
                if(!date){
                    date ='';
                }
                $.ajax({
                    type:'get',
                    url:UC_URL+'userdatearticle',
                    data:{uid:uid,'date':date,'lastpagetime':lastpagetime,'limit':10},
                    dataType:"jsonp",
                    jsonp: 'callback',
                    beforeSend:function(){
                        //obj.siblings(".detailnum").html('加载中...');
                    },
                    success:function(data){ 
                        if(data.meta.code == '200'){
                            var li ='';
                            if(data.data.count>0){
                            	var aids = [];
                                for(var i=0;i<data.data.count;i++){ 
                                	if(data.data.lists[i].pics.exists == 'y'){
	                                    if(data.data.lists[i].pics.url.length>0){ 
	                                        if(nurlreg.test(data.data.lists[i].pics.url[0])){  
		                                        var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'!m240" alt=""></div>';
	                                    	}else{
	                                    		if(data.data.lists[i].pics.url[0] !=null || data.data.lists[i].pics.url[0] !=undefined || data.data.lists[i].pics.url[0]!=''){
	                                    			var li1 = "<div class='wz_r'><div class='wz_r_box' style='background:url("+data.data.lists[i].pics.url[0]+")center;background-size: 100% auto;-moz-background-size: 100% auto;background-repeat: no-repeat;' ></div></div>";
	                                    			//var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'" alt=""></div>';
	                                    		}
	                                    	} 
	                                    }else{
	                                        var li1 ='';
	                                    }
                                	}else{
                                		var li1 = '';
                                	}
                                    li +='<dd class="img_box" date ="'+data.data.date+'" lastpagetime="'+data.data.lists[i].add_time+'">'+
                                        '<a target="_blank" href="'+data.data.lists[i].article_url+'"><div class="wz_l">';
	                                    if(data.data.lists[i].is_recommend == 'y'){
	                                    	li += "<img src='"+UC_PUBLIC_DEFAULT+"/images/jian.png' alt='2'/>";
	                                    };
	                                    li +='<h3>'+data.data.lists[i].title+
                                        '<div class="opencode3" is_open="true"><i article_aid="'+data.data.lists[i].aid+'"><img src="'+UC_PUBLIC_DEFAULT+'images/erweima.png" alt=""></i>'+
                                        '<div class="qrcode-box3">'+
                                        '<div class="qrcode-bd3" id="qrcodeCanvas'+data.data.lists[i].aid+'"></div>'+
                                        '</div>'+
                                        '</div>'+
                                        '</h3>'+
                                        '<p>'+data.data.lists[i].summary+'</p>'+
                                        '<div class="t_wz">'+
                                        '<ul class="num_hot"   id="num_hot_'+data.data.lists[i].aid+'"  aid="'+data.data.lists[i].aid+'">'+
                                        '<li><i class="icon-eye"><img src="'+UC_URL+'public/assets/default/images/shu.png" alt=""></i>'+data.data.lists[i].nums.click+'</li>'+
                                        '<li><i class="fa fa-comment-o"></i>'+data.data.lists[i].nums.comment+'</li>'+
                                        '<li><i class="fa fa-heart-o"></i>'+data.data.lists[i].nums.support+'</li>'+
                                        '<li style="display:none"><i class="fa fa-diamond"></i>0</li>'+
                                        '</ul><span class="pull-left">'+data.data.lists[i].gsh_add_time+'</span>'+
                                        '</div>'+
                                        '</div>'+li1+
                                        '</a></dd>';

										aids[i] = data.data.lists[i].aid;
                                }
                                obj.parent().before(li);
                                
                                var $Iw=$(".wz_r_box").width();
					    		$(".wz_r_box").css("height",$Iw);
					    		
					    		
					    		//加载赞赏数 
					    		if(rewardallow == 'y'){ 
									if(aids.length > 0 ){ 
										$.ajax({
											type:'get',
											url:UC_URL+'artice/diamond',
											data:{'ids':aids},
											dataType:'jsonp',
											jsonp:'callback',
											success:function(msg) { 
												if(msg.code == 200){   
													$.each(msg.msg, function(i, n){
														$('#num_hot_'+i).find('li:last').show().html('<i class="fa fa-diamond"></i>'+n); 
													});  
												}
											},
											error:function(err){
											 	console.log('赞赏数据添加失败');
										 	}, 
										});
									}
					    		}
									
                                if(data.data.count < 10){
                                	obj.parent().hide();
                                }
                            }else{
                                obj.parent().hide();
                            }
                        }

                    },
                    error:function(){
                        console.log('请求是否关注信息失败');
                    },
                });
            });
        },
       // Pagenotearticle:function(){
//            $(document).on('click', ".add_btn", function () { 
//                var obj =  $(this);
//                var nid = $('#nid').val();
//                var lastpagetime = obj.parent().prev('.img_box').attr('lastpagetime'); 
//                $.ajax({
//                    type:'get',
//                    url:UC_URL+'usernotebook',
//                    data:{uid:uid,nid:nid,'lastpagetime':lastpagetime,'limit':10},
//                    //url:UC_URL+'user/'+uid+'/notebook/'+nid,
//                    //data:{'lastpagetime':lastpagetime,'limit':10},
//                    dataType:"jsonp",
//                    jsonp: 'callback',
//                    beforeSend:function(){
//                        //obj.siblings(".detailnum").html('加载中...');
//                    },
//                    success:function(data){console.log(33);
//                        if(data.meta.code == '200'){
//                            var li ='';
//                            if(data.data.count>0){
//                                for(var i=0;i<data.data.count;i++){
//                                    if(data.data.lists[i].pics.url.length>0){
//                                        if(nurlreg.test(data.data.lists[i].pics.url[0])){  
//	                                        var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'!m240" alt=""></div>';
//                                    	}else{
//                                    		if(data.data.lists[i].pics.url[0] !=null || data.data.lists[i].pics.url[0] !=undefined || data.data.lists[i].pics.url[0]!=''){
//                                    			var li1 = "<div class='wz_r'><div class='wz_r_box' style='background:url("+data.data.lists[i].pics.url[0]+")center;background-size: 100% auto;-moz-background-size: 100% auto;background-repeat: no-repeat;' ></div></div>";
//                                    			//var li1 = '<div class="wz_r"><img src="'+data.data.lists[i].pics.url[0]+'" alt=""></div>';
//                                    		}
//                                    	} 
//                                    }else{
//                                        var li1 ='';
//                                    }
//                                    li +='<dd class="img_box" date ="'+data.data.date+'" lastpagetime="'+data.data.lists[i].add_time+'">'+
//                                        '<a target="_blank" href="'+data.data.lists[i].article_url+'"><div class="wz_l">'+
//                                        '<h3>'+data.data.lists[i].title+
//                                        '<div class="opencode3" is_open="true"><i article_aid="'+data.data.lists[i].aid+'"><img src="'+UC_PUBLIC_DEFAULT+'images/erweima.png" alt=""></i>'+
//                                        '<div class="qrcode-box3">'+
//                                        '<div class="qrcode-bd3" id="qrcodeCanvas'+data.data.lists[i].aid+'"></div>'+
//                                        '</div>'+
//                                        '</div>'+
//                                        '</h3>'+
//                                        '<p>'+data.data.lists[i].summary+'</p>'+
//                                        '<div class="t_wz">'+
//                                        '<ul class="num_hot">'+
//                                        '<li><i class="icon-eye"><img src="'+UC_URL+'public/assets/default/images/shu.png" alt=""></i>'+data.data.lists[i].nums.click+'</li>'+
//                                        '<li><i class="fa fa-comment-o"></i>'+data.data.lists[i].nums.comment+'</li>'+
//                                        '<li><i class="fa fa-heart-o"></i>'+data.data.lists[i].nums.support+'</li>'+
//                                        '</ul><span class="pull-left">'+data.data.lists[i].gsh_add_time+'</span>'+
//                                        '</div>'+
//                                        '</div>'+li1+
//                                        '</a></dd>';
//                                }
//                                obj.parent().before(li);
//                                
//                              //  var $Iw=$(".wz_r_box").width();
////					    		$(".wz_r_box").css("height",$Iw);
//                                if(data.data.count < 10){
//                                	obj.parent().hide();
//                                }
//                            }else{
//                                obj.parent().hide();
//                            }
//                        }
//
//                    },
//                    error:function(){
//                        console.log('请求是否关注信息失败');
//                    },
//                });
//            });
//        },
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
                            window.location.href = UC_URL+'sign/in';

                        },
                    });
                }else{

                    window.location.href = UC_URL+'sign/in';
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
                            window.location.href = UC_URL+'sign/in';
                        },
                    });
                }else{
                    window.location.href = UC_URL+'sign/in';
                }
            });
        },

		
		FootPrintAdd:function(){ 
			var which = $('#type').val(); 
			if(uid != cookie_user_id){ 
				var uuid = new Fingerprint({canvas: true}).get();  
				if(which == 'date'){
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
				}else{
					$.ajax({
						type:'get',
						url:UC_URL+'footprint/add', 
						data:{user_id:uid,which:which,cookie_user_id:cookie_user_id,uuid:uuid,nid:$.trim($('#nid').val())},
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
                       // $('#allarticle').attr('href',UC_URL+'user/'+msg.data.user_id+'/date-article?date='+msg.data.year_lists[0].year+msg.data.year_lists[0].month_lists[0].month);
                    }
                }
            });
        }


    };
    window.Articlelist = Articlelist;
    $(function () {
        Articlelist.init();
    });
}(window,jQuery));