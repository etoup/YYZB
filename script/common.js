var pageParam = {};
var uid = $api.getStorage('uid') ? $api.getStorage('uid') : '';
var RootUrl = 'http://www.1y988.com/';
function openWin(name,pageParam) {
    if(name && name.indexOf("member_")>=0 && $api.getStorage('uid')=='') name = 'login';
    api.openWin({
        name: name,
        url: name + '.html',
        pageParam:pageParam,
        opaque: true,
        vScrollBarEnabled: false,
        reload: true,
        animation:{type:'fade'}
    });
}

function getData(url,tempid){
    ajaxRequest(url, 'GET', {}, function (ret, err) {
        if (ret) {
            var content = $api.byId(tempid+'-content');
            var tpl = $api.byId(tempid+'-template').text;
            var tempFn = doT.template(tpl);
            content.innerHTML = tempFn(ret.data);
        } else {
            toast(err.msg);
        }
    });
}
function opentoTab(type,pageparam) {
    pageparam = typeof(pageparam) != "undefined" ? JSON.stringify(pageparam) : '{}';
	api.execScript({
       name : 'root',
       script : "setTab('"+type+"',"+pageparam+")"
    });   
}
function temp(data,tempid){
	var content = $api.byId(tempid+'-content');
	var tpl = $api.byId(tempid+'-template').text;
	var tempFn = doT.template(tpl);
	content.innerHTML = tempFn(data);
}
function back(){
   api.historyBack(
	   function(ret, err){
	   if(!ret.status){
	     toast('无路可退了,亲!');
	   }
   });
}
function toast(msg){
  api.toast({msg:msg,duration:1000})
}
function closetoWin(name){
  var name = name ? name : 'root';
  api.closeToWin({
	    name: name,
	    animation: {
	        type: 'flip',
	        subType: 'from_bottom',
	        duration: 500
	    }
  });
}
function backhome(){
  closetoWin();
  opentoTab('main');
}
function addToCart(id,type,obj){
	var qty = ($('#qty_'+id).length>0) ? $('#qty_'+id).val() : 1;
	var cart = $api.getStorage('cart') ? $api.getStorage('cart') : '';
	
	ajaxRequest('yunbuy/addtocart', 'POST', {values:{id:id,qty:qty,cart:cart}}, function (ret, err) {
		    if (ret.data) {
		       $api.setStorage('cart', ret.data.cart);
		       api.execScript({
			       name : 'root',
			       script : "loadcart()"
			   });
			   MoveBox(id);
			   if(type){
				   var cartpageParam = {}
				   if(type=='free') cartpageParam = {'free':1}
				   openWin('cart',cartpageParam);
			   }
		    }else{
		       toast(ret.msg);
		    }
	});
}
function MoveBox(id) {
    var divTop = $('#buy_img_'+id).offset().top;
    var divLeft = $('#buy_img_'+id).offset().left;
    var cartBox = $(".cartNum").last();
    var src = $('#buy_img_'+id).attr('src');
    $('body').append('<div class="ui-cart-move"><img src="'+src+'" /></div>');
    var obj = $('.ui-cart-move').last();
    var scrollheight = $("body").scrollTop()*1;
    obj.css({
        "position": "absolute",
        "z-index": "1000",
        "left": divLeft + "px",
        "top": divTop + "px"
    }).animate({
        "left": api.winWidth*0.8+"px",
        "top": api.winHeight*1+scrollheight-50+"px"
    },1000).fadeTo(0, 0.1, function(){
        obj.remove();
    });
}
/**
 * Created by Administrator on 2014/12/17.
 */
/**
 *
 *  Secure Hash Algorithm (SHA1)
 *  http://www.webtoolkit.info/
 *
 **/

function SHA1(msg) {

    function rotate_left(n, s) {
        var t4 = ( n << s ) | (n >>> (32 - s));
        return t4;
    };

    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;

        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;

        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) word_array.push(0);

    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);


    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

}
function ajaxRequest(url, method, bodyParam, callBack) {
    var common_url = RootUrl+'/api/';
    var appKey = '0fd1ff545d0df8cc9e464370c5b2eddd';
    var minfo = $api.getStorage('minfo');
    var upsw = minfo ? minfo.password : '';
    api.ajax({
        url: common_url + url,
        method: method,
        cache: false,
        timeout: 20,
        headers: {
            "AppKey": appKey,
            "UID": $api.getStorage('uid'),
            "UNAME": $api.getStorage('uname'),
            "UPSW": upsw,
        },
        dataType: 'json',
        data: bodyParam
    }, function (ret, err) {
        if (ret) {
          callBack(ret, err);
        }else{
          toast(err.msg);
        }
    });
}
function ajaxcloudRequest(url, method, bodyParam, callBack) {
    var common_url = 'https://d.apicloud.com/mcm/api';
    var appId = 'A6963429484030';
    var key = '7F836F04-CAAC-52C8-2332-CF337134FA6F';
    var now = Date.now();
    var appKey = SHA1(appId + "UZ" + key + "UZ" + now) + "." + now;
    api.ajax({
        url: common_url + url,
        method: method,
        cache: false,
        timeout: 20,
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "X-APICloud-AppId": appId,
            "X-APICloud-AppKey": appKey
        },
        data: {
            body: bodyParam
        }
    }, function (ret, err) {
        callBack(ret, err);
    });
}
function showprog(){
//  api.showProgress({
//      title: '加载中...',
//      modal: true
//  });
    if($("#spinner").length>0) return true;
    var html = '<div id="spinner" class="spinner"></div>';
    $('body').append(html);
    var loader = $api.byId('spinner');
    var loaderHerder = $api.offset(loader);
    var top = (api.winHeight - loaderHerder.h)/2;
    var left = (api.winWidth - loaderHerder.w)/2;
    $("#spinner").css({'top':top+'px','left':left+'px'});
}
function hideprog(){
    //api.hideProgress();
    $('#spinner').remove();
}

//获取验证码 act操作类型
function getSmsVerify(act,btn,mobile){
    mobile = mobile?mobile:$('#mobile').val();
    btn = btn?btn:'#btnSms';
    act = act?act:'sms_register';
    scode = $('#scode').val() ? $('#scode').val() : '';
    var D = {act:act, mobile:mobile, scode:scode};
    RemainTime(btn);
    ajaxRequest('welcome/sms', 'POST', {values:D}, function (ret, err) {
        if(ret.error==0){
            toast(ret.msg);
        }else{
            toast(ret.msg);
        }
    });
}
//短信验证码按钮倒计时
var iTime = zTime = 60;
var Account;
function RemainTime(btn){
    $(btn).attr('disabled',true);
    var iSecond,sSecond="",sTime="";
    if (iTime >= 0){
        iSecond = parseInt(iTime%60);
        iMinute = parseInt(iTime/60);
        if (iSecond >= 0){
            if(iMinute>0){
                sSecond = iMinute + "分" + iSecond + "秒";
            }else{
                sSecond = iSecond + "秒";
            }
        }
        sTime=sSecond;
        if(iTime==0){
            clearTimeout(Account);
            sTime='获取短信验证码';
            $(btn).attr('disabled',false);
            iTime = zTime;
        }else{
            Account = setTimeout(function(){ RemainTime(btn); },1000);
            iTime=iTime-1;
        }
    }
    $(btn).val(sTime);
}



Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function act_login(user){
	$api.setStorage('uid',user.mid);
	$api.setStorage('uname',user.username);
	$api.setStorage('minfo',user);
	uid = user.mid;
	$api.setStorage('cart','');
	api.historyBack({
	},function(ret,err){
	    if(!ret.status){
	        api.closeWin();
	    }
	});
	//绑定别名推送
	var jpush = api.require('ajpush');
	var param = {
	alias : user.username
	};
	jpush.bindAliasAndTags(param, function(ret) { 
	});
}
window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);