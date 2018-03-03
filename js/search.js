;(function(window, $){
    var Search = {
        init:function()
        {
            var type = $('#so_type').val();
            $('#search_ul > li').each(function(i, e){
                if($(e).data('type') == type){
                    $(e).addClass('active');
                }
            });
            this.changeMode();
            this.soClick();
            this.chooseType();
            this.thinkWord();
            this.addAuthor();
            this.changeWidth();
            this.clearBlur();
            this.removeUsername();
            this.showMore();
            this.clickLoadMore();
            this.resizeChange();
        },

        soClick:function(){
            var self = this;
            $(document).on('click', '#so_so', function(){
                setTimeout(function(){
                    $('.bdsug').hide();
                }, 10);
                self.soSo();
            });
        },

        soSo:function()
        {
            var self = this;
            var that = $(this);
            var key = $.trim($('#lx_input').val());
            var id = $('#key_id').val();
            var author_id = '';
            if($('#input_search #username_tab').length > 0){
                author_id = $('#uid').val();
            }
            var nickname = $('#username').html();
            var type = '';
            setTimeout(function(){
                $('.bdsug').hide();
            }, 10);
            $('#search_ul li').each(function(i, ele){
                if($(ele).hasClass('active')){
                    type = $(ele).data('type');
                }
            });
            if(key === ''){
                $(".notybox").noty({
                    layout: 'topCenter',
                    text: '输入搜索内容',
                    type: "confirm",
                    animation: {
                        open: {height: 'toggle'}, // jQuery animate function property object
                        close: {height: 'toggle'}, // jQuery animate function property object
                        easing: 'swing', // easing
                        speed: 1000 // opening & closing animation speed
                    },
                    timeout: 1000
                });
                return false;
            }
            var url = '';
            if(id === ''){
                if(type == 'author'){
                    author_id = '';
                    url = UC_URL+'search?key='+key+'&type='+type;
                }else if(author_id !== '' && author_id != 'undefined'){
                    url = UC_URL+'search?key='+key+'&type='+type+'&user_id='+author_id;;
                }else{
                    url = UC_URL+'search?key='+key+'&type='+type
                }
            }else{
                if(type == 'author'){
                    author_id = '';
                    url = UC_URL+'search?key='+key+'&type='+type+'&id='+id;
                }else if(author_id !== '' && author_id != 'undefined'){
                    url = UC_URL+'search?key='+key+'&type='+type+'&id='+id+'&user_id='+author_id;
                }else{
                    url = UC_URL+'search?key='+key+'&type='+type+'&id='+id;
                }
            }
            $.pjax.defaults.timeout = 10000;
            $(document).on('pjax:timeout', function(event) {
                    // Prevent default timeout redirection behavior
                event.preventDefault();
            });
            var spinner = new Spinner({top:'50%',lines:6,length:0,width:52,radius:52,color:'#483d8b'});  //loading 图标初始化
            $(document).on('pjax:send', function() {        //加载过程中
                $("#so_article").html('');
                $("#so_author").html('');
                spinner.spin($("#so_article").get(0));//loading 图标开始
            });
            if(type == 'article'){
                $.pjax({url: url, container: '#so_article'});
            }
            if(type == 'author'){
                $.pjax({url: url, container: '#so_author'});
            }
            $(document).on('pjax:end', function(a, b) {
                spinner.spin();//loading 图标关闭

            });
        },

        chooseType:function()
        {
            var self = this;
            $('#search_ul li').on('click', function(){
                $('#lx_input').attr('placeholder', '');
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                if($(this).data('type') == 'author'){
                    $('#input_search #username_tab').remove();
                    // $('#lx_input').focus();
                    self.soSo();
                }
                if($(this).data('type') == 'article'){
                    // $('#lx_input').focus();
                    self.soSo();
                }
            });
        },
        timeFormat: function(time)
        {
            var date = new Date(time);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var timeValue = date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate()+' ';
            timeValue += hours;
            timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
            // timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
            return timeValue;
        },

        thinkWord:function()
        {
            var self = this;
            var last;
            $(document).on('keyup', '#lx_input', function(event){
                if(event.keyCode == 13){
                    return false;
                }
                last = event.timeStamp;
                var that = $(this);
                setTimeout(function(){
                    if(last === event.timeStamp){
                        var key = $.trim(that.val());
                        if(key === ''){
                            $('#thinkWord').hide();
                            return false;
                        }
                        var type = '';
                        $('#search_ul li').each(function(i, ele){
                            if($(ele).hasClass('active')){
                                type = $(ele).data('type');
                            }
                        });
                        var user_id = '';
                        if($('#input_search #username_tab').length > 0){
                            user_id = $('#uid').val();
                        }
                        $.ajax({
                            type: 'post',
                            url: UC_URL+'search',
                            data: {key: key, type: type, user_id: user_id},
                            dataType: 'json',
                            success:function(result){
                                if(result.meta.code == 200){
                                    if(result.data.length > 0){
                                        $('#thinkWord').find('li').eq(0).nextAll('li').remove();
                                        var li_clone = $('#thinkWord').find('li').eq(0);
                                        if(type == 'article'){
                                            $.each(result.data, function(j, k){
                                                $('#thinkWord').find('li').eq(j).attr('data-key', k._source.title);
                                                $('#thinkWord').find('li').eq(j).attr('data-id', k._source.aid);
                                                if(k.highlight.title.length > 0){
                                                    var title = k.highlight.title[0];
                                                }else{
                                                    var title = k._source.title.replace(key, '<b>'+key+'</b>');
                                                    title = title.replace(key.toUpperCase(), '<em class="search_word">'+key.toUpperCase()+'</em>');
                                                }
                                                $('#thinkWord').find('li').eq(j).html(title);
                                                $('#thinkWord').children('.unlist').append(li_clone.clone());
                                            });
                                        }else if(type == 'author'){
                                            $.each(result.data, function(j, k){
                                                $('#thinkWord').find('li').eq(j).attr('data-key', k.nickname);
                                                $('#thinkWord').find('li').eq(j).attr('data-id', k.uid);
                                                var nick_name = k.nickname.replace(key, '<b>'+key+'</b>');
                                                nick_name = nick_name.replace(key.toUpperCase(), '<em class="search_word">'+key.toUpperCase()+'</em>');
                                                $('#thinkWord').find('li').eq(j).html(nick_name);
                                                $('#thinkWord').children('.unlist').append(li_clone.clone());
                                            });
                                        }
                                        $('#thinkWord').find('li').eq(result.data.length-1).remove();
                                        $('#thinkWord').show();
                                    }else{
                                        $('#thinkWord').hide();
                                    }
                                }else{
                                    $('#thinkWord').hide();
                                }
                            }
                        });
                    }
                },1);
            });
            
            $(document).on('click', '.bdsug-overflow', function(){
                var title = $(this).data('key');
                if($(this).closest('#thinkWord').prev('#input_search').length > 0){
                    $('#lx_input').val(title);
                    var id = $(this).data('id');
                    $('#key_id').val(id);
                    self.soSo();
                }
                if($(this).closest('#header_think').siblings('#search_form').length > 0){
                    $('#search_key').val(title);
                    var user_id = $('#search_form #username_tab').data('uid');
                    var id = $(this).data('id');
                    $('#so_userid').val(user_id);
                    $('#key_id').val(id);
                    $('#search_form').submit();
                }
                $('.bdsug').hide();
            });

            $(document).on('click', '#header_to_search', function(){
                var key = $.trim($('#search_key').val());
                $('.bdsug').hide();
                if(key === ''){
                    $(".notybox").noty({
                        layout: 'topCenter',
                        text: '输入搜索内容',
                        type: "confirm",
                        animation: {
                            open: {height: 'toggle'}, // jQuery animate function property object
                            close: {height: 'toggle'}, // jQuery animate function property object
                            easing: 'swing', // easing
                            speed: 1000 // opening & closing animation speed
                        },
                        timeout: 1000
                    });
                    return false;
                }
                var user_id = $('#search_form #username_tab').data('uid');
                $('#so_userid').val(user_id);
                $('#search_form').submit();
            });

            $(document).on('keypress', '#lx_input', function(event){
                if(event.keyCode == 13){
                    if(event && event.preventDefault){
                        event.preventDefault();
                    }else{
                        window.event.returnValue = false;
                    }
                   // var key = $.trim($('#input_search #lx_input').val());
                    self.soSo();
                    // setTimeout(function(){
                    //     $('.bdsug').hide();
                    // }, 1000);
                }
            });

            $(document).on('keypress', '#search_key', function(event){
                if(event.keyCode == 13){
                    var url = window.location.href;
                    if(url.indexOf('search') != -1){
                        return false;
                    }
                   var key = $.trim($('#search_key').val());
                    if(key === ''){
                        $(".notybox").noty({
                            layout: 'topCenter',
                            text: '输入搜索内容',
                            type: "confirm",
                            animation: {
                                open: {height: 'toggle'}, // jQuery animate function property object
                                close: {height: 'toggle'}, // jQuery animate function property object
                                easing: 'swing', // easing
                                speed: 1000 // opening & closing animation speed
                            },
                            timeout: 1000
                        });
                        return false;
                    }
                    setTimeout(function(){
                        $('#header_think').hide();
                    }, 1000);
                    $('#so_userid').val($('#search_form #username_tab').data('uid'));
                    $('#search_form').submit();
                    return false;
                }
            });

            $(document).on('keyup', '#search_key', function(event){
                if(event.keyCode == 13){
                    return false;
                }
                last = event.timeStamp;
                var that = $(this);
                setTimeout(function(){
                    if(last - event.timeStamp === 0){
                        var user_id = $('#search_form #username_tab').data('uid');
                        var key = $.trim(that.val());
                        if(key === ''){
                            $('#header_think').hide();
                            return false;
                        }
                        var type = 'article';
                        $.ajax({
                            type: 'post',
                            url: UC_URL+'search',
                            data: {key: key, type: type, user_id: user_id},
                            dataType: 'json',
                            success:function(result){
                                if(result.meta.code == 200){
                                    if(result.data.length > 0){
                                        $('#header_think').find('li').eq(0).nextAll('li').remove();
                                        var li_clone = $('#header_think').find('li').eq(0);
                                        $.each(result.data, function(j, k){
                                            $('#header_think').find('li').eq(j).attr('data-key', k._source.title);
                                            $('#header_think').find('li').eq(j).attr('data-id', k._source.aid);
                                            if(k.highlight.title.length > 0){
                                                var title = k.highlight.title[0];
                                            }else{
                                                var title = k._source.title.replace(key, '<b>'+key+'</b>');
                                                title = title.replace(key.toUpperCase(), '<em class="search_word">'+key.toUpperCase()+'</em>');
                                            }
                                            $('#header_think').find('li').eq(j).html(title);
                                            $('#header_think').children('.unlist').append(li_clone.clone());
                                        });
                                        $('#header_think').find('li').eq(result.data.length-1).remove();
                                        $('#header_think').show();
                                    }else{
                                        $('#header_think').hide();
                                    }
                                }else{
                                    $('#header_think').hide();
                                }
                            }
                        });
                    }
                },1);
            });
        },

        addAuthor:function()
        {
            var so_key = $('#so_key').val();
            var username = $('#username').html();
            var user_id = $('#uid').val();
            if(user_id !== ''){
                if($('#input_search > .bootstrap-tagsinput').children('#username_tab').length <= 0){
                    $('#input_search > .bootstrap-tagsinput').prepend('<span class="tag label label-info" id="username_tab" data-uid="'+user_id+'"></span>');
                }
                if($('#search_form > .bootstrap-tagsinput').children('#username_tab').length <= 0){
                    $('#search_form > .bootstrap-tagsinput').prepend('<span class="tag label label-info" id="username_tab" data-uid="'+user_id+'"></span>');
                }
                $('#input_search #username_tab').html(username+'<span data-role="remove" id="remove_user"></span>');
                $('#search_form #username_tab').html(username+'<span data-role="remove" id="remove_user"></span>');
                if(so_key !== '' && typeof so_key != 'undefined'){
                    $('#lx_input').val(so_key);
                    $('#search_key').val(so_key);
                }else{
                    $('#lx_input').attr('placeholder', '专栏内搜索');
                    $('#search_key').attr('placeholder', '专栏内搜索');
                }
            }else{
                $('#input_search #username_tab').remove();
                if(so_key !== '' && typeof so_key != 'undefined'){
                    $('#lx_input').val(so_key);
                    $('#search_key').val(so_key);
                }else{
                    $('#lx_input').attr('placeholder', '全站搜索');
                    $('#search_key').attr('placeholder', '全站搜索');
                }
            }
        },

        changeWidth:function()
        {
            var $f=$('.search_head .input-group').width();
            var $b=$('.search_head .input-group-addon').width();
            var $z=$f-$b;
            $(".search_head .bootstrap-tagsinput").width($z-3);
            var $x = $(".search_head .tag").width()+30;
            $(".search_head .twitter-typeahead").width($z -$x-9);

        },

        clearBlur:function()
        {
            $(document).on('click', '.tt-input', function(){
                $(this).attr('placeholder', '');
            });

            $(document).bind('click', function(event){
                var target = $(event.target);
                if(target.closest('.bdsug').length <= 0 && target.closest('#input_search').length <= 0 && target.closest('#search_form').length <= 0){
                    $('.bdsug').hide();
                    if(target.closest('#search_ul').length <= 0){
                        if($('#lx_input').val() === ''){
                            if($('#input_search #username_tab').length > 0){
                                $('#lx_input').attr('placeholder', '专栏内搜索');
                            }else{
                                $('#lx_input').attr('placeholder', '全站搜索');
                            }
                        }
                        if($('#search_key').val() === ''){
                            if($('#search_form #username_tab').length > 0){
                                $('#search_key').attr('placeholder', '专栏内搜索');
                            }else{
                                $('#search_key').attr('placeholder', '全站搜索');
                            }
                        }
                    }
                }
            });
        
            
        },

        removeUsername:function()
        {
            $(document).on('click', '#remove_user', function(){
                var $m=$(".search").find(".bootstrap-tagsinput").width();
                $(this).parent('#username_tab').remove();
                $(this).parent('#username_tab').next('.twitter-typeahead').css('width', '100%');
                $(".search").find(".twitter-typeahead").width($m-15).find(".tt-input").width($m-41);
            });

            $(document).on('keydown', '#lx_input', function(event){
                if(event.keyCode == 8 ){
                    if($('#lx_input').val() === ''){
                        $('#input_search #username_tab').remove();
                        $('.twitter-typeahead').css('width', '100%');
                    }
                }
            });
        },

        showMore:function()
        {
            $(document).on('mouseover', '#showLoad', function(){
                $('#showLoad').hide();
                $('#loadMore').show();
            });
            $(document).on('mouseout', '#loadMore', function(){
                $('#loadMore').hide();
                $('#showLoad').show();
            });
        },

        clickLoadMore:function()
        {
            var self = this;
            $(document).on('click', '#loadMore', function(){
                var num = 0;
                var type = '';
                $('#search_ul > li').each(function(i, e){
                    if($(e).hasClass('active')){
                        type = $(e).data('type');
                    }
                });
                if(type == 'article'){
                    num = $('.wz_search_ul > li').length;
                }
                if(type == 'author'){
                    num = $('.zz_search_ul > li').length;
                }
                // var sum = parseInt($('#so_count').html());
                var page = num/10 + 1;
                var key = $('#lx_input').val();
                var author_id = '';
                if($('#input_search #username_tab').length > 0){
                    author_id = $('#uid').val();
                }
                $.ajax({
                    type: 'get',
                    url: UC_URL+'search/'+key,
                    data: {type: type, author_id: author_id, page: page},
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    beforeSend: function(){
                        $('.effect-oscar').hide();
                    },
                    success:function(result){
                        if(result.meta.code == 200){
                            $.each(result.data.res, function(i, e){
                                if(type == 'article'){
                                    var li_clone = $('.wz_search_ul > li').eq(0).clone();
                                    $('.wz_search_ul').append(li_clone);
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').attr('href', e.article_url);
                                    if(e.highlight_title.length > 0){
                                        var title = e.highlight_title;
                                    }else{
                                        var title = e.title.replace(key, '<em class="search_word">'+key+'</em>');
                                        title = title.replace(key.toUpperCase(), '<em class="search_word">'+key.toUpperCase()+'</em>');
                                    }
                                    var update_time = self.timeFormat(e.add_time*1000);
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').children('h3').html(title);
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').children('.t_wz.up').empty();
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').children('.t_wz.up').append(e.nickname);
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').children('.t_wz.up').append('<span class="time">'+update_time+'</span>');
                                    if(e.highlight_summary.length > 0){
                                        $('.wz_search_ul').children('li').eq(num+i).children('a').children('p').html(e.highlight_summary);
                                    }else{
                                        $('.wz_search_ul').children('li').eq(num+i).children('a').children('p').html(e.summary);
                                    }
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').find('.num_hot').children('li').eq(0).html('<i class="icon-eye"><img src="'+UC_URL+'public/assets/default/images/shu.png" alt=""></i>'+e.click);
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').find('.num_hot').children('li').eq(1).html('<i class="fa fa-comment-o"></i>'+e.comment);
                                    $('.wz_search_ul').children('li').eq(num+i).children('a').find('.num_hot').children('li').eq(2).html('<i class="fa fa-heart-o"></i>'+e.support);
                                }
                                if(type == 'author'){ 
                                    var li_clone = $('.zz_search_ul > li').eq(0).clone();
                                    $('.zz_search_ul').append(li_clone);
                                    $('.zz_search_ul').children('li').eq(num+i).children('.zz_head').children('a').attr('href', e.user_url);
                                    if(e.avatar !== ''){
                                        if($('.zz_search_ul').children('li').eq(num+i).children('.zz_head').find('span').length > 0){
                                            $('.zz_search_ul').children('li').eq(num+i).children('.zz_head').find('span').remove();
                                            $('.zz_search_ul').children('li').eq(num+i).children('.zz_head').children('a').html('<img src="" alt="180">');
                                            $('.zz_search_ul').children('li').eq(num+i).children('div').eq(0).attr('class', 'zz_head');

                                        }
                                        $('.zz_search_ul').children('li').eq(num+i).children('.zz_head').find('img').attr('src', e.avatar+'!m160');
                                    }else if(e.avatar_by_editor !== ''){
                                        $('.zz_search_ul').children('li').eq(num+i).children('.zz_head').find('img').attr('src', avatar_by_editor+'!m160');
                                    }else{
                                        $('.zz_search_ul').children('li').eq(num+i).children('.zz_head').children('.avatar').html('<span class="s">'+e.nickname.substring(0, 1)+'</span>');
                                        $('.zz_search_ul').children('li').eq(num+i).children('.zz_head').addClass('color_'+e.avatar_color);
                                    }
                                    var nick_name = e.nickname.replace(key, '<em class="search_word">'+key+'</em>');
                                    nick_name = nick_name.replace(key.toUpperCase(), '<em class="search_word">'+key.toUpperCase()+'</em>');
                                    $('.zz_search_ul').children('li').eq(num+i).children('.zz_detail').children('h3').html(nick_name);
                                    $('.zz_search_ul').children('li').eq(num+i).children('.zz_detail').find('a').attr('href', e.user_url);
                                    $('.zz_search_ul').children('li').eq(num+i).children('.zz_detail').find('a').html(e.user_url);
                                    $('.zz_search_ul').children('li').eq(num+i).children('.num_hot_list').children('li').eq(0).children('span').eq(1).html('<i class="short">文章</i>'+e.articles);
                                    $('.zz_search_ul').children('li').eq(num+i).children('.num_hot_list').children('li').eq(1).children('span').eq(1).html('<i class="short">阅读</i>'+e.click);
                                    $('.zz_search_ul').children('li').eq(num+i).children('.num_hot_list').children('li').eq(2).children('span').eq(1).html('<i class="short">支持</i>'+e.support);
                                }
                            });
                            if(type == 'article'){
                                if(result.data.res.length == 10){
                                    $('.effect-oscar').show();
                                }
                            }
                            if(type == 'author'){
                                if(result.data.res.length == 10){
                                    $('.effect-oscar').show();
                                }
                            }
                        }
                    }
                });
            });
        },


        resizeChange: function()
        {
            $(window).resize();
            $(window).resize(function(){
                var $f=$('.search_head .input-group').width();
                var $b=$('.search_head .input-group-addon').width();
                var $z=$f-$b;
                $(".search_head .bootstrap-tagsinput").width($z-3);
                var $x = $(".search_head .tag").width()+30;
                $(".search_head .twitter-typeahead").width($z -$x-9);
            });
        },

        changeMode: function()
        {
            var browser = {
                versions: function() {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {//移动终端浏览器版本信息 
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1, //|| u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        // webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }(),
                    language: (navigator.browserLanguage || navigator.language).toLowerCase()
            };
             
            if (browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
                $('.absolute_nav_ul').remove();
            }else{
                $('.phone_nav_ul').remove();
            }
        }




    };
    window.Search = Search;
    $(function () {
        Search.init();
    });
}(window,jQuery,document));