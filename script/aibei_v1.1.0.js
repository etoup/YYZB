function AiBeiPay() {
	var h5url = 'https://web.iapppay.com/h5';
	var baseRandom = (Math.random() + "").replace(".", "");
	var baseZIndex = 0;

	function createAibeiPop() {
		var _aibeiPop = document.createElement('div');
		_aibeiPop.id = '_aibeiPop' + baseRandom;
		_aibeiPop.style.width = '100%';
		_aibeiPop.style.height = '100%';
		_aibeiPop.style.position = 'fixed';
		_aibeiPop.style.zIndex = baseZIndex + 9999;
		_aibeiPop.style.overflow = 'hidden';
		_aibeiPop.style.left = '0';
		_aibeiPop.style.top = '0';
		try {
			_aibeiPop.style["-webkit-overflow-scrolling"] = "touch";
			_aibeiPop.style["overflow-y"] = "scroll";
		} catch (e) {
		}
		document.getElementsByTagName('body').item(0).appendChild(_aibeiPop);
	}

	function createAibeiIframe(ifrmSrc) {
		var oScript = document.createElement("iframe");
		oScript.id = '_aibeiFrame' + baseRandom;
		oScript.style.zIndex = "9999";
		oScript.style.backgroundColor = '#fff';
		oScript.frameBorder = '0';
		oScript.width = "100%";
		oScript.height = '100%';
		oScript.src = ifrmSrc;
		E("_aibeiPop" + baseRandom).appendChild(oScript);

	}

	function createAibeiClose(transId, retFunc,closeTxt) {
		var tmcloseTxt;
		if(closeTxt== undefined){
			tmcloseTxt="返回游戏"
		}else{
			tmcloseTxt = closeTxt;
		}
		var _aibeiClose = document.createElement('div');
		_aibeiClose.id = '_aibeiClose' + baseRandom;
		_aibeiClose.style.width = '70px';
		_aibeiClose.style.height = '30px';
		_aibeiClose.style.lineHeight = '30px';
		_aibeiClose.style.textAlign = 'center';
		_aibeiClose.style.fontSize = '12px';
		_aibeiClose.style.color = '#fff';
		_aibeiClose.style.backgroundColor = 'rgba(0,0,0,0.4)';
		_aibeiClose.style.position = 'absolute';
		_aibeiClose.style.borderRadius = '2px';
		_aibeiClose.style.right = '20px';
		_aibeiClose.style.bottom = '40px';
		_aibeiClose.onclick = function() {
			closeCallback(transId, retFunc);
		}
		_aibeiClose.style.fontFamily = 'Microsoft YaHei';
		_aibeiClose.appendChild(document.createTextNode(tmcloseTxt));
		E("_aibeiPop" + baseRandom).appendChild(_aibeiClose);
	}

	// 创建遮盖原始页面层
	function createAibeiCover() {
		var _aibeiCover = document.createElement('div');
		// _aibeiCover.style.display = 'none';
		_aibeiCover.id = '_aibeiCover' + baseRandom;
		_aibeiCover.style.position = 'fixed';
		_aibeiCover.style.top = 0;
		_aibeiCover.style.left = 0;
		_aibeiCover.style.width = '100%';
		_aibeiCover.style.height = '100%';
		_aibeiCover.style.backgroundColor = '#ffffff';
		_aibeiCover.style.zIndex = baseZIndex + 8888;
		var first = document.body.firstChild; // 得到第一个元素
		document.body.insertBefore(_aibeiCover, first); // 在第原来的第一个元素之前插入
	}

	// 跟id获取元素
	function E(id) {
		return document.getElementById(id);
	}

	var maskOptions = {
		maskId : "aibei_Mask" + baseRandom,
		textColor : "#eee",
		textFontSize : 16,
		tip : ''
	};

	// aibei_mask({tip : 'loading'});
	function aibei_mask(options) {
		var settings = extendOptions(options);

		var maskHtml = '<div class="mask"></div><div style="text-align:center; height:30px; line-height:30px; position:absolute; padding-right:20px; left:0; right:0; top:50%; margin-top:-15px; z-index:9;"><span class="loading">&nbsp;</span><span style="padding-left:10px; color:'
				+ settings.textColor
				+ '; font-size:'
				+ settings.textFontSize
				+ 'px;">' + settings.tip + '</span></div>';
		var _aibeiMask = document.createElement('div');
		_aibeiMask.id = settings.maskId;
		_aibeiMask.style.position = 'fixed';
		_aibeiMask.style.left = '0';
		_aibeiMask.style.top = '0';
		_aibeiMask.style.right = '0';
		_aibeiMask.style.bottom = '0';
		_aibeiMask.style.zIndex = baseZIndex + 99999;
		_aibeiMask.innerHTML = maskHtml;
		document.getElementsByTagName('body').item(0).appendChild(_aibeiMask);

	}

	// aibei_unmask({});
	function aibei_unmask(options) {
		var settings = extendOptions(options);
		removeElement(E("aibei_Mask" + baseRandom));
	}

	function isExist(id) {
		var tmDoc = E(id);
		if (tmDoc == undefined) {
			return false;
		} else {
			return true;
		}
	}

	function extendOptions(options) {
		if (options == undefined)
			return maskOptions;
		var settings = maskOptions;
		if (options.maskId != undefined) {
			settings.maskId = options.maskId;
		}
		if (options.textColor != undefined) {
			settings.textColor = options.textColor;
		}
		if (options.textFontSize != undefined) {
			settings.textFontSize = options.textFontSize;
		}
		if (options.tip != undefined) {
			settings.tip = options.tip;
		}
		return settings;
	}

	function closeCallback(transId, retFunc) {
		try {
			aibei_mask({
				tip : 'loading'
			});
			removeElement(E("_aibeiCover" + baseRandom));
			removeElement(E("_aibeiPop" + baseRandom));
			if (retFunc != undefined && retFunc != '') {
				var options = {};
				options.url = h5url + "/cpqr?TransId=" + transId;
				options.callback = "callbackHandler";
				options.data = [];
				options.success = function(data) {
					if (typeof (retFunc) == "function") {
						retFunc(data);
					} else {
						eval(retFunc + "(data)");
					}

				};
				jsonp(options);
			}
			aibei_unmask({});
		} catch (e) {
			removeElement(E("_aibeiCover" + baseRandom));
			removeElement(E("_aibeiPop" + baseRandom));
			aibei_unmask({});
		}
	}

	function jsonp(options) {
		options = options || {};
		if (!options.url || !options.callback) {
			throw new Error("参数不合法");
		}

		// 创建 script 标签并加入到页面中
		var callbackName = ('jsonp_' + Math.random()).replace(".", "");
		var oHead = document.getElementsByTagName('head')[0];
		options.data[options.callback] = callbackName;
		var params = formatParams(options.data);
		var oS = document.createElement('script');
		oHead.appendChild(oS);

		// 创建jsonp回调函数
		window[callbackName] = function(json) {
			oHead.removeChild(oS);
			clearTimeout(oS.timer);
			window[callbackName] = null;
			options.success && options.success(json);
		};

		// 发送请求
		if (options.url.indexOf("\?") != -1) {
			oS.src = options.url + '&' + params;
		} else {
			oS.src = options.url + '?' + params;
		}

		// 超时处理
		if (options.time) {
			oS.timer = setTimeout(function() {
				window[callbackName] = null;
				oHead.removeChild(oS);
				options.fail && options.fail({
					message : "超时"
				});
			}, time);
		}
	}

	// 格式化参数
	function formatParams(data) {
		var arr = [];
		for ( var name in data) {
			arr.push(encodeURIComponent(name) + '='
					+ encodeURIComponent(data[name]));
		}
		return arr.join('&');
	}

	function removeElement(_element) {
		if (_element == null || _element == undefined
				|| _element == "undefined")
			return;
		var _parentElement = _element.parentNode;
		if (_parentElement) {
			_parentElement.removeChild(_element);
		}
	}

	// {transId："transId",closeTxt:"返回游戏",retFunc:"callbackGame",baseZIndex:100,"redirecturl":"www.baidu.com","cpurl":"http://www.sina.com.cn","sign":"","signtype":"RSA"}
	this.clickAibei = function(data) {
		try {
			aibei_mask({
				tip : 'loading'
			});
			var transId = data.transId;
			var retFunc = data.retFunc;
			var zIndex = data.baseZIndex;
			var sign = data.sign;
			var closeTxt=data.closeTxt;
			var redirecturl = '';
			var cpurl = '';
			if (transId != undefined && transId != '') {
				var ifrmSrc = '';
				if (sign == undefined || sign == '') {
					ifrmSrc = h5url + '/begpay?TransId=' + transId;
				} else {
					var redirecturl = data.redirecturl;
					if (redirecturl != undefined && redirecturl != '') {
						sign = encodeURIComponent(sign);
						redirecturl = encodeURIComponent(redirecturl);
						cpurl = data.cpurl;
						if (cpurl == undefined || cpurl == '') {
							var ifrmSrc = h5url + '/begpay?TransId=' + transId
									+ '&redirecturl=' + redirecturl + '&sign='
									+ sign;
						} else {
							cpurl = encodeURIComponent(cpurl);
							var ifrmSrc = h5url + '/begpay?TransId=' + transId
									+ '&redirecturl=' + redirecturl + "&cpurl="
									+ cpurl + '&sign=' + sign;
						}
					}
				}
				if (zIndex == "undefined" || isNaN(zIndex)) {
					zIndex = 0;
				} else {
					zIndex = parseInt(zIndex);
				}
				baseZIndex = zIndex;
				createAibeiCover();
				createAibeiPop();
				createAibeiIframe(ifrmSrc);
				createAibeiClose(transId, retFunc,closeTxt);
			}
			aibei_unmask({});
		} catch (e) {
			aibei_unmask({});
		}
	}
}