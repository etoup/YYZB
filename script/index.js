//previous page id, current page id
var prevPid = '', curPid = '';
//save opened frame name
var frameArr = [];
//frame whether open
function isOpened(frmName) {
	var i = 0, len = frameArr.length;
	var mark = false;
	for (i; i < len; i++) {
		if (frameArr[i] === frmName) {
			mark = true;
			return mark;
		}
	}
	return mark;
}

//toggle header
function showHeader(type) {
	if (!type) {
		return;
	}
	var header = $api.dom('#header .active');
	$api.removeCls(header, 'active');
	var thisHeader = $api.dom('#header .' + type);
	$api.addCls(thisHeader, 'active');
}
function setBadge(index,badge){
   var obj = api.require('tabBar');
   obj.setBadge({
	    index:index,
	    badge:badge
   });
}
var pageparam = {};
//open tab
function openTab(type, pageparam) {
    uid = $api.getStorage('uid');
	if (type === 'user') {
		//login
		if (!uid) {
			api.openWin({
				name : 'userLogin',
				url : './html/login.html',
				opaque : true,
				vScrollBarEnabled : false
			});
			return;
		}else{
		    api.openWin({
				name : 'user',
				url : './html/user.html',
				opaque : true,
				vScrollBarEnabled : false
			});
			return;
		}
	}

	showHeader(type);
	var width = api.winWidth;
	var header = $api.byId('header');
	var headerPos = $api.offset(header);
	var nav = $api.byId('nav');
	var navPos = $api.offset(nav);
	var height = api.winHeight - headerPos.h - navPos.h;

	type = type || 'main';

	//record page id
	prevPid = curPid;
	curPid = type;
	if (prevPid !== curPid) {
		api.openFrame({
			name : type,
			url : 'html/' + type + '.html',
			bounces : true,
			opaque : true,
			vScrollBarEnabled : false,
			pageParam : pageparam,		
			rect : {
				x : 0,
				y : headerPos.h,
				w : width,
				h : height
			}
		});

//		if (isOpened(type)) {
//			api.setFrameAttr({
//				name : type,
//				hidden : false
//			});
//		} else {
//			api.openFrame({
//				name : type,
//				url : 'html/' + type + '.html',
//				bounces : true,
//				opaque : true,
//				vScrollBarEnabled : false,
//				pageParam : pageparam,			
//				rect : {
//					x : 0,
//					y : headerPos.h,
//					w : width,
//					h : height
//				}
//			});
//		}

		if (prevPid) {
			api.closeFrame({
			    name: prevPid
			});
//			api.setFrameAttr({
//				name : prevPid,
//				hidden : true
//			});

		}
		if (!isOpened(type)) {
			//save frame name
			frameArr.push(type);
		}
	}

}

function changeCityTab(str) {
	if (str) {
		var title = $api.dom('#header .activity .city span');
		$api.text(title, str);
	}
}

function changeTypeTab(str) {
	if (str) {
		var title = $api.dom('#header .activity .hot span');
		$api.text(title, str);
	}
}

//search activity
var searchActOpened = false;

function closeFramGroup() {
	api.closeFrameGroup({
		name : 'searchAct'
	});

	var actLi = $api.dom('#header .activity li.active');
	$api.removeCls(actLi, 'active');
	searchActOpened = false;
}

//search activity
function searchAct(el, type) {
	if (!el || !type) {
		return;
	}

	var header = $api.byId('header');
	var pos = $api.offset(header);

	var index = 0;
	//frame group index
	if (type === "type") {
		index = 1;
	}

	if (!searchActOpened) {
		api.openFrameGroup({
			name : 'searchAct',
			scrollEnabled : false,
			rect : {
				x : 0,
				y : pos.h,
				w : 'auto',
				h : 'auto'
			},
			index : index,
			frames : [{
				name : 'searchActBy-city',
				url : 'html/searchActBy-city.html',
				bounces : false,
				opaque : false,
				bgColor : 'rgba(51,51,51,0.6)',
				vScrollBarEnabled : false
			}, {
				name : 'searchActBy-type',
				url : 'html/searchActBy-type.html',
				bounces : false,
				opaque : false,
				bgColor : 'rgba(51,51,51,0.6)',
				vScrollBarEnabled : false
			}]
		}, function(ret, err) {

		});

		searchActOpened = true;
	} else {
		api.setFrameGroupIndex({
			name : 'searchAct',
			index : index
			// ,scroll: true
		});
		api.setFrameGroupAttr({
			name : 'searchAct',
			hidden : false
		});
	}

	//toggle active style
	var curLi = el.parentNode;
	//close frame group
	if ($api.hasCls(curLi, 'active')) {

		api.setFrameGroupAttr({
			name : 'searchAct',
			hidden : true
		});

	}
	$api.toggleCls(curLi, 'active');

	var lis = $api.domAll('#header .activity li');
	var i = 0, len = lis.length;

	for (i; i < len; i++) {
		var thisLi = lis[i];
		if (thisLi === curLi) {
			continue;
		} else {
			if ($api.hasCls(thisLi, 'active')) {
				$api.removeCls(thisLi, 'active');
			}
		}
	}

}

function setting() {
	api.openWin({
		name : 'setting',
		url : 'html/setting.html',
		opaque : true,
		vScrollBarEnabled : false
	});
}

function filterNews(type) {
	var nav = $api.dom('#header .news .submenu');
	var actNav = $api.dom(nav, '.light');
	$api.removeCls(actNav, 'light');
	$api.addCls(event.target, 'light');
	var id = '548ec1f272c60e937d21c8cf';

	switch (type) {
		case 'hot':
			api.execScript({
				frameName : 'news',
				script : 'initPage(\'' + id + '\');'
			});
			break;
		case 'local':
			api.execScript({
				frameName : 'news',
				script : 'initPage(\'' + id + '\');'
			});
			break;
		case 'topic':
			api.execScript({
				frameName : 'news',
				script : 'initPage(\'' + id + '\');'
			});
			break;
	}
}

function loadcart(){
  var cart = $api.getStorage('cart');
  ajaxRequest('yunbuy/cart', 'POST', {values:{'cart':cart}}, function (ret, err) {
        if (ret.data.num) {
          $("#nav li a.cart").children('em').html(ret.data.num);
        }else{
          $("#nav li a.cart").children('em').html('');
        }
  });
}
function setTab(opentype,param){
   openTab(opentype,param);
   $("#nav li a").removeClass('active');
   $("#nav li ."+opentype).addClass('active');
}
function getlogo(){
   ajaxRequest('home/getsiteconfig', 'GET', {}, function (ret, err) {
	  var data = ret.data;
	  if(data.app_logo){
	    $("#logo").attr('src',data.app_logo);
	  }else{
	    $("#logo").parent('.toptit').html(data.site_name);
	  }
	  
   });
}
var jpush = '';
apiready = function() {
    var showGuide = $api.getStorage('showGuide');
	var header = $api.byId('header');
	loadcart();
	$("#nav li a").click(function(){
	   if(!($(this).hasClass('cart')||$(this).hasClass('user'))){
	      $("#nav li a").removeClass('active');
	      $(this).addClass('active');
	   }
	});
	//$api.fixIos7Bar(header);
	//status bar style
	api.setStatusBarStyle({
		style : 'dark'
	});

	openTab('main');

	jpush = api.require('ajpush');
	jpush.init(function(ret) {
	 if(ret && ret.status){
	 }
	});
	api.addEventListener({name:'appintent'}, function(ret,err){
	    //监听推送返回
	    if(ret.appParam.ajpush){
	      var data = JSON.parse(ret.appParam.ajpush.extra);
	    }else{
	    //监听外部应用打开
	      var data = ret.appParam;
	    }
	    
	    if(data.winpage!=''){
	      openWin(data.winpage,data);
	    }
	})
	api.addEventListener({name:'pause'}, function(ret,err){
		onPause();//监听应用进入后台，通知jpush暂停事件
	})
		
	api.addEventListener({name:'resume'}, function(ret,err) {
		onResume();//监听应用恢复到前台，通知jpush恢复事件
	})
	
//	if(!showGuide){
//    openWin('./html/guide');
//    return false;
//  }

};
//统计-app恢复
function onResume(){
	jpush.onResume();
	console.log('JPush onResume');
}

//统计-app暂停
function onPause(){
	jpush.onPause();
	console.log('JPush onPause');
}