/***
@author  tangqiyin 
date  2016.3.14
****/

if(document.domain.split('.')[1] == 'blogchina') {
	var UC_HOSTNAME = 'post.blogchina.com';
    var UC_URL = "http://post.blogchina.com/";
    var UPLOAD_IMG = "http://image5.blogchina.com/upload/avatar/";
    var COLLECTIONPIC_URL = "http://image5.blogchina.com/upload/collection/";
    var UPLOAD_URL = "http://image5.blogchina.com/v5_image/";
    var UC_IMG = "http://post.blogchina.com/public/assets/img/";
    var UC_PUBLIC_DEFAULT = "http://post.blogchina.com/public/assets/default/"; 
    var BLOG_DOMAIN = '.blogchina.com/';
    
    var preg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogchina.com\/\d{1,}\.html/;
	var homereg = /(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogchina.com/;
	
	var f1reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogchina.com\/user\/\d{1,}\/date-article/;
	var f2reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogchina.com\/\d{1,}_list_1.html$/;
	var rqreg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogchina.com\/archive\/\d{1,}_1.html$/;
	
	var follow1reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9_]{1,}\.blogchina.com\/follow\/\d{1,}\/fans$/;
	var follow2reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9_]{1,}\.blogchina.com\/follow\/\d{1,}\/friends$/;
} else {
	var UC_HOSTNAME = 'javascript:;';
    var UC_URL = "javascript:;";
    var UPLOAD_IMG = "http://image5.blogcore.cn/upload/avatar/";
    var COLLECTIONPIC_URL = "http://image5.blogcore.cn/upload/collection/";
    var UPLOAD_URL = "http://image5.blogcore.cn/v5_image/";
    var UC_IMG = "javascript:;/public/assets/img/";
    var UC_PUBLIC_DEFAULT = "javascript:;/public/assets/default/";
    var BLOG_DOMAIN = '.blogcore.cn/';
    
    var preg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogcore.cn\/\d{1,}\.html/;
	var homereg = /(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogcore.cn/;
	
	var f1reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogcore.cn\/user\/\d{1,}\/date-article/;
	var f2reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogcore.cn\/\d{1,}_list_1.html$/;
	var rqreg = /^(https?|ftp|http):\/\/[a-zA-Z0-9-_]{1,}\.blogcore.cn\/archive\/\d{1,}_1.html$/;
	
	var follow1reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9_]{1,}\.blogcore.cn\/follow\/\d{1,}\/fans$/;
	var follow2reg = /^(https?|ftp|http):\/\/[a-zA-Z0-9_]{1,}\.blogcore.cn\/follow\/\d{1,}\/friends$/;
}

var UPLOAD_IMG_AVATAR_URL = 'http://avatar.blogchina.com/';
var confinenum = 3;

/***
 @author  wangpeng
 date  2016.3.17
 ****/
;(function($,window){
    //var urltype =  (location.href).split('/')[4];
    var yuming = window.location.href;
    var yuming1 = yuming.split('//');
    var yuming2 = yuming1[1].split('/');
    var user_id = $('#uid').val();
    var uname = $('#uname').val();
    var Commom = {
        init:function(){
            this.IsLogin();//判断用户是否登录 显示头部 左侧条信息
            this.Clicksignup();
            this.CodeArticle();//二维码
			this.Share();//分享
			this.eventmaopao();//冒泡 
			this.active();//高亮
			this.setCookie();
			$('#daohangclick').click(function(){	//mobile端设置高度 
				$("html,body").animate({scrollTop:$(this).offset().top},1000);
			});  
			
			
			$("img").error(function(){
			    $(this).attr('src',UC_PUBLIC_DEFAULT+"images/fail.jpg");
			});
			
			 
			
			/*获取焦点placeholder消失*/
		    $('.txtfocus').each(function(){
		        var txt = $(this).attr("placeholder");
		        $(this).bind("focus", function() {
		            if ( $(this).val()=="" && $(this).is("input") || $(this).val()=="" && $(this).is("textarea")) {
		                $(this).attr("placeholder","");
		            }
		        }).bind('blur', function() {
		            if ( $(this).val()=="" && $(this).is("input") || $(this).val()=="" && $(this).is("textarea")) {
		                $(this).attr("placeholder",txt );
		            }
		        })
		    });
		    
		     
	        $('.sign_in').attr('href',UC_URL+'sign/in?from='+window.location.href);
        },
        
        
        
        active:function(){ 
        	if(homereg.test(yuming)){ 
            	if(preg.test(yuming) || f1reg.test(yuming) || f2reg.test(yuming) || rqreg.test(yuming)){ 
            		$('#bs-example-navbar-collapse-6 >ul >li').removeClass('active colorpc');
        			$('#bs-example-navbar-collapse-6 >ul >li').eq(1).addClass('active colorpc');
        			$('.navbar-brand').text('全部文章');
            	}else if(follow1reg.test(yuming) || follow2reg.test(yuming)){ 
            		$('#bs-example-navbar-collapse-6 >ul >li').removeClass('active colorpc');
            		$('#bs-example-navbar-collapse-6 >ul >li').eq(2).addClass('active colorpc');
            		$('.navbar-brand').text('粉丝关注');
            	}else{
            		$('#bs-example-navbar-collapse-6 >ul >li').removeClass('active colorpc'); 
        			$('#bs-example-navbar-collapse-6 >ul >li').eq(0).addClass('active colorpc');
        			$('.navbar-brand').text('专栏首页');
            	}
            } 
        }, 
        
        
        
        
        
        eventmaopao:function(){
	        if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){ 
	        	 $('.btnsearch').on('click',function(e){
		             if(e.stopPropagation) {
		                 e.stopPropagation();
		             }else{
		                 e.cancelBubble = true;
		             }
		             $(this).hide();
		             $('.search-form').show();
		             $('.t_y').hide();
		             var $m=$(".search").find(".bootstrap-tagsinput").width();
		             $('#sl_input').on('itemRemoved', function(event) {
		                 $(".search").find(".twitter-typeahead").width($m-15).find(".tt-input").width($m-41);
		             });
		         });
		         $(document).bind('click', function(event){
		             var target = $(event.target);
		             if(target.closest('.search-form,.bdsug').length <= 0 ){
		                 $('.search-form').hide();
		                 $('.t_y').show();
		                 $('.btnsearch').show();
		             }
		         });

			} 
        },
        
        
        
        
        CodeArticle:function(){
			var flag=true;
			$(".opencode").hover(function () {
				if ($(".qrcode-box2").is(":visible")) {
					//$(".qrcode-box2").hide(); 
				} else {
					$(".qrcode-box2").show();
					if (flag) {
						//$(".qrcodeCanvas").qrcode({
//							render: "canvas",
//							width: 150,
//							height: 150,
//							text: window.location.href
//						});
						 
						var qrcode= $('.qrcodeCanvas').qrcode({  
						        render: 'canvas',  
						        width: 150,  
						        height: 150,  
						        text: window.location.href  
						    }).hide();   
						 var canvas=qrcode.find('canvas').get(0);  
						 $('#imgOne').attr('src',canvas.toDataURL('image/jpg'));  
						
						
						flag=false;
					}
				}
				 
			})
		},
		
		
		
		Share:function(){ 
			$(document).on('mouseover','.go-share',function(){
				$('.jiathis_style_32x32').show();
			}).on('mouseout','.go-share',function(){
				$('.jiathis_style_32x32').hide();
			}); 
            $(document).on('mouseover','.go-edit',function(){
                $('.jiathis_style_32x32').hide();
            }).on('mouseout','.go-edit',function(){
				$('.jiathis_style_32x32').hide();
			});

			$(document).on("mouseover", ".jiathis_style_32x32", function(){
				$(this).show();
			}).on('mouseout','.jiathis_style_32x32',function(){
				$(this).hide();
			});
			$(document).on("mouseover", ".qrcode-box2", function(){ 
				 $(this).show();   
			}).on('mouseout','.qrcode-box2',function(){   
				$(this).hide();   
			});
			 
            $(document).on('click','.jiathis_style_32x32 >ul li',function(){
                var  type= $(this).attr('class');
                switch(type)
                {
                    case 'weibo':
                        window.open('http://www.jiathis.com/send/?webid=tsina&url='+window.location.href+'&title='+document.title);
                        break;
                    case 'qq':
                        window.open( 'http://www.jiathis.com/send/?webid=qzone&url='+window.location.href+'&title='+document.title);
                        break;
                    //case 'google':
                    //    window.open( 'http://www.jiathis.com/send/?webid=googleplus&url='+window.location.href+'&title='+document.title);
                    //    break;
                    case 'wechat':
                        window.open('http://www.jiathis.com/send/?webid=weixin&url='+window.location.href+'&title='+document.title);
                        break;
                    case 'douban':
                        window.open('http://www.jiathis.com/send/?webid=douban&url='+window.location.href+'&title='+document.title);
                        break;
                    default:

                }


            });
		},
        
        
        
        
        
        
        

        IsLogin:function(){ 
            $.ajax({
                url:UC_URL+'user/islogin',
                type:'get',
                dataType : "JSONP", 
                jsonpCallback: '_GroupMember_Callback',
                beforeSend:function(){

                },
                success:function(data) {  
                    if(data.meta.code == 200) {
                    	$('.my2016').show();
                    	$('.my2016').attr('href', UC_URL+'summary/'+data.data.uid);
                   		document.cookie = "click"+data.data.uid + "=true";
                        $('.pull-rights').removeClass('not_signed');
                        $('.pull-rights').addClass('signed');
                        
						//右上角头像判断
                        if(data.data.avatar == ''){ 
                        	if(data.data.group_id == 200){
                        		$('#topavatar').html("<span class='s'>"+data.data.nickname.substring(0,1)+"</span><span  title='专栏作家' class='V_king V_king_s V_king_sx'><img src='"+UC_PUBLIC_DEFAULT+"images/kings.png' alt=''/></span>"); 
                        	}else{
                        		$('#topavatar').html("<span class='s'>"+data.data.nickname.substring(0,1)+"</span>"); 
                        	} 
                        	$('.nav_per').addClass('color_'+data.data.avatar_color);
                        }else{ 
                        	if(data.data.group_id ==100){	//data.data.service !='blogchina' && data.data.bind.is_mainuser == 'y'//data.data.group_id ==100
                        		if(data.data.avatar.indexOf(BLOG_DOMAIN) > -1){
                        			$('#topavatar').html("<img class='avatar'  src='"+data.data.avatar+"!small'  alt=''/><s class='s'></s>"); 
                        		}else{
	                        		$('#topavatar').html("<img class='avatar'  src='"+data.data.avatar+"'  alt=''/><s class='s'></s>"); 
                        		}
                        	}else{
                        		if(data.data.group_id == 200){
                        			if(data.data.avatar.indexOf(BLOG_DOMAIN) > -1){ 
			                        	$('#topavatar').html("<img class='avatar'  src='"+data.data.avatar+"!small'  alt=''/><s class='s'></s><span  title='专栏作家' class='V_king V_king_s V_king_sx'><img src='"+UC_PUBLIC_DEFAULT+"images/kings.png' alt=''/></span>"); 
	                        		}else{
			                        	$('#topavatar').html("<img class='avatar'  src='"+data.data.avatar+"'  alt=''/><s class='s'></s><span  title='专栏作家' class='V_king V_king_s V_king_sx'><img src='"+UC_PUBLIC_DEFAULT+"images/kings.png' alt=''/></span>"); 
	                        		}
                        		}else{
	                        		if(data.data.avatar.indexOf(BLOG_DOMAIN) > -1){ 
			                        	$('#topavatar').html("<img class='avatar'  src='"+data.data.avatar+"!small'  alt=''/><s class='s'></s>"); 
	                        		}else{
			                        	$('#topavatar').html("<img class='avatar'  src='"+data.data.avatar+"'  alt=''/><s class='s'></s>"); 
	                        		}
                        		}
                        	}
                        } 
						//$('.avatar').attr('src',data.data.avatar+'!small'); 
						 
                        
                         
                        if(data.data.group_id !==200){//第三方主账号设置 data.data.bind.service !='blogchina' && data.data.bind.is_mainuser == 'y'---data.data.group_id !==200
	                        $('.search').show(); 
	                      	$('.commentfa').hide();    
                        	//$('#followtrends').hide();
							$('.mine').find('a').hide(); 
	                        $('.userathlets').find('a').hide(); 
	                       // $('.setting').find('a').show();
	                        $('.rightzlgl').find('a').hide(); 
	                        $('.pull-rights').show(); 
	                        $('.columnupgrade').show();
                        }else{
	                        if(preg.test(yuming)){ 
	                        	//$('.addzt').hide();//加入专题模块
	                        	if(user_id == data.data.uid){
		                        	$('.search').hide();
		                        	
	                        		var aid = $("#aid").val();
	                                $('.commentfa').show();
	                                $('.commentfa').children('a').attr('href',UC_URL+'writer/'+aid+'/edit'); 
	                            }else{
	                                $('.commentfa').hide();
	                                $('.search').show();//头部搜索隐藏 
	                            } 
	                        }else{ 
	                            $('.search').show();//头部搜索隐藏 
	                        	$('.commentfa').hide(); //编辑
	                            //$('.addzt').hide();//加入专题模块
	                        }  
	                      
                        
							$('.mine').find('a').attr('href','http://'+data.data.name+BLOG_DOMAIN); 
	                        $('.userathlets').find('a').attr('href',UC_URL+"writer/create");
	                        $('.pull-rights').show(); 
	                        $('.columnupgrade').hide();
                        } 
	                        $('.setting').find('a').attr('href',UC_URL+'setting/index');
                        //$('.notice').find('a').attr('href', UC_URL+'notification?unread=y');
                      	//通知消息数
                        if(data.data.notice == 0){
                            $('.nav_tx').removeClass('news');
                            $('.messages-amount').remove();
                        }else{
                            $('.nav_tx').children('a').children('.out_box').children('.back_box').find('span').html(data.data.notice);
							$('.messages-amount').html(data.data.notice);
                        } 
                    }else{ 
                    	$('.my2016').attr('href', UC_URL+'sign/in?from='+UC_URL+'summary');
                        $('.pull-rights').removeClass('signed');
                        $('.pull-rights').addClass('not_signed');  
                        
                    	$('.search').show(); 
                        $('.commentfa').hide();
                        //$('.ver_l').show(); 
                        //if(preg.test(yuming)){
//                            //$('.commentfa').children('a').attr('href',UC_URL+'sign/in');
//	                    	
//	                    }else{
//	                        //$('.search').show();//头部搜索隐藏 
//	                    	$('.commentfa').hide(); //编辑
//	                        //$('.addzt').hide();//加入专题模块
//	                    } 
                        
                        $('.pull-rights').show();
						if(yuming.indexOf('setting') > -1){
							window.location.href=UC_URL+'sign/in';
						}
                    } 
                    
                    //导航
                    //$('.daohang_shouye').find('a').attr('href',UC_URL+'user/'+user_id+'/latest-article'); 
                    //$('.daohang_all_article').find('a').attr('href',UC_URL+'user/'+user_id+'/date-article'); 
                    //$('.user_follow').find('a').attr('href',UC_URL+'follow/'+user_id+'/fans'); 
                },
                error:function(err){
                	console.log(err);
                }
            });
             
            
        },
        
        
        getCookie:function(objName)
        {
        	var arrStr = document.cookie.split("; ");
        	for(var i = 0;i < arrStr.length;i ++)
        	{			 
        		var temp = arrStr[i].split("=");	
        		if(temp[0] == objName){
        		 	return unescape(temp[1]);
        		}		 
        	}
        	return null	 
        },

      setCookie:function(name, value) {  
	    var Days = 30;  
	    var exp = new Date();  
	    exp.setTime(exp.getTime() + 1000 * 60 * 24);//过期时间 2分钟   60 * 1000*60 1小时
	    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},  
        
        
        //删除cookies
		delCookie:function(objName)
		{ 
		    var exp = new Date();
		    exp.setTime(exp.getTime() - 1000);
		    var cval=Commom.getCookie(objName);
		    if(cval!=null)
		        document.cookie= objName + "="+cval+";expires="+exp.toGMTString();
		},
        //Clicksign:function(){
        //    $(document).on('click','.sign_in',function(){
        //       //var  url = window.location.href;
        //       // var from = url.split('javascript:;/');
        //       // window.location.href = UC_URL+'sign/in?fromurl='+from[1];
        //        window.location.href = UC_URL+'sign/in';
        //    });
        //},
        Clicksignup:function(){
            $(document).on('click','.signup',function(){ 
                $.ajax({
                    type:'get',
                    url:UC_URL+'sign/out', 
                    dataType : "jsonp",
                    jsonp:'callback',
                    beforeSend:function(){
                    },
                    success:function(data) { 
                        if (data.meta.code == 200)
                        {
                        	//window.history.go(-1); 
                        	Commom.delCookie('click'+$.trim($('#cookie_uid').val()));
                            window.location.reload();
                        }else{
                        	 window.location.reload();
                        }
                    },
                    error:function(e){
                    	console.log(e);
                    }
                });
            });
        }
    }
    
    
    

    window.Commom = Commom;
    $(function () {
        Commom.init();
    })


}(jQuery,window,document));



$.fn.extend({
            focusEnd:function(){
                var editor = $(this);
//不是可编辑元素,则直接退出
                if (!editor.attr("contenteditable") || editor.attr("contenteditable") == "false") return;
                editor.focus();
                editor = editor[0];
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
            }
        });