
 
 
 
 
 
$(window).scroll(function(e){
    if(0 < $(window).scrollTop()){
        $('.go-top').css("visibility","visible");
    }else{
        $('.go-top').css("visibility","hidden");
    }
    return false;
});
// scroll body to 0px on click
$('.go-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});


$(function () {
    /* show more*/
    var slideHeight = parseFloat($('#wrap p').css("line-height"))*2; // px
    var defHeight = $('#wrap p').height();
    if (defHeight >slideHeight) {
        $('#wrap').css('height', slideHeight + 'px');
        $('#wrap').css('-webkit-line-clamp', '2');
        $('#read-more').append('<i class="fa fa-angle-down"></i>');
        $('#read-more').click(function () {
            var curHeight = $('#wrap').height();
            if (curHeight == slideHeight) {
                $('#wrap').animate({height: defHeight}, "normal");
                $('#read-more i').removeClass('fa-angle-down').addClass('fa-angle-up');
                $('#wrap').css('-webkit-line-clamp', '');

            } else {
                $('#wrap').animate({height: slideHeight}, "normal");
                $('#read-more i').removeClass('fa-angle-up').addClass('fa-angle-down');
                $('#wrap').css('-webkit-line-clamp', '2');
            }
            return false;
        });
    }
    /*��ά��*/
    var isFirst = true;
    $("#opencode").click(function () {
        if ($(".qrcode-box").is(":visible")) {
            $(".qrcode-box").hide();
        } else {
            $(".qrcode-box").show();
            if (isFirst) {
                $("#qrcodeCanvas").qrcode({
                    render: "canvas",
                    width: 150, //���
                    height: 150, //�߶�
                    text: "www.baidu.com" //��������
                });
                isFirst = false;
            }
        }
    }) ;
    var flag=true;
    $("#opencode2").hover(function () {
        if ($(".qrcode-box2").is(":visible")) {
            $(".qrcode-box2").hide();
        } else {
            $(".qrcode-box2").show();
            if (flag) {
                $("#qrcodeCanvas2").qrcode({
                    render: "canvas",
                    width: 150, //���
                    height: 150, //�߶�
                    text: "www.baidu.com" //��������
                });
                flag=false;
            }
        }
    });
    var fl=true;
    $("#opencode3").click(function () {
        if ($(".qrcode-box3").is(":visible")) {
            $(".qrcode-box3").hide();
        } else {
            $(".qrcode-box3").show();
            if (fl) {
                $("#qrcodeCanvas3").qrcode({
                    render: "canvas",
                    width: 150, //���
                    height: 150, //�߶�
                    text: "www.baidu.com" //��������
                });
                fl=false;
            }
        }
    });
    return false;
});

$('.userbox  .avatar-photo').on("mouseover mouseout",function(event){
    var $obj=$(".userbox .avatar-photo").find(".c");
    if(event.type == "mouseover"&& $(window).width()>758){
        if($obj.css('display')=='none'){
            $obj.css('display','inline-block');
            var $cH=$obj.height();
            $obj.css({"margin-top":-($cH*0.5),"opacity": 0.7, "filter": "alpha(opacity=70)"});
        }else{
            $obj.css('display','none');
        }
    }else if(event.type == "mouseout"){
        $obj.css('display','none');
    }
});




/*���°�ť���ƶ��й���*/
(function($){
    $.fn.extend({
        Scroll:function(opt,callback){
            //������ʼ��
            if(!opt) var opt={};
            var _btnUp = $("#"+ opt.up);//Shawphy:���ϰ�ť
            var _btnDown = $("#"+ opt.down);//Shawphy:���°�ť
            var timerID;
            var _this=this.eq(0).find("ul:first");
            var lineH=_this.find("li:first").height(), //��ȡ�и�
                line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //ÿ�ι�����������Ĭ��Ϊһ�������������߶�
                speed=opt.speed?parseInt(opt.speed,10):500; //���ٶȣ���ֵԽ���ٶ�Խ�������룩
            timer=opt.timer ;//?parseInt(opt.timer,10):3000; //������ʱ���������룩
            if(line==0) line=1;
            var upHeight=0-line*lineH;
            //��������
            var scrollUp=function(){
                _btnUp.unbind("click",scrollUp); //Shawphy:ȡ�����ϰ�ť�ĺ�����
                _this.animate({
                    marginTop:upHeight
                },speed,function(){
                    for(var i=1;i<=line;i++){
                        _this.find("li:first").appendTo(_this);
                    }
                    _this.css({marginTop:0});
                    _btnUp.bind("click",scrollUp); //Shawphy:�����ϰ�ť�ĵ���¼�
                });
            } ;
            //Shawphy:���·�ҳ����
            var scrollDown=function(){
                _btnDown.unbind("click",scrollDown);
                for(var i=1;i<=line;i++){
                    _this.find("li:last").show().prependTo(_this);
                }
                _this.css({marginTop:upHeight});
                _this.animate({
                    marginTop:0
                },speed,function(){
                    _btnDown.bind("click",scrollDown);
                });
            };
            //Shawphy:�Զ�����
            var autoPlay = function(){
                if(timer)timerID = window.setInterval(scrollUp,timer);
            };
            var autoStop = function(){
                if(timer)window.clearInterval(timerID);
            };
            //����¼���
            _this.hover(autoStop,autoPlay).mouseout();
            _btnUp.css("cursor","pointer").click( scrollUp ).hover(autoStop,autoPlay);//Shawphy:������������¼���
            _btnDown.css("cursor","pointer").click( scrollDown ).hover(autoStop,autoPlay);
        }
    })
})(jQuery);





