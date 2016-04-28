function wxpay(back_info,type){
  var weiXin = api.require('wxPay');
  weiXin.registerApp
  (
        function(ret,err)
        {
            if (ret.status)
            {
                    weiXin.payOrder({
                        apiKey:back_info.appid,
                        mchId:back_info.mch_id,
	                    orderId:back_info.prepayid,
	                    partnerId:back_info.partnerid,
	                    nonceStr:back_info.noncestr,
	                    timeStamp:back_info.timestamp,
	                    package:back_info.package,        
	                    sign:back_info.sign
                    },function(ret,err){
                         if(ret.status)
                         {
                                 if(type==1){
                                 openWin('respon',{result:1});
                                 }else{
                                 api.alert({
                                 	title: '系统提示',
								    msg: '支付成功',
								    buttons: ['确定']
                                 },function(ret,err){
                                 	if(ret.buttonIndex){
					             	  openWin('user');
					             	}
                                 });
                                 }
                         }
                         else
                         {
                                 toast(err.msg);
                         }
                    });
              }else{
                     toast(err.msg);
              }
        }
   );
}
/*爱贝支付*/
function aibei(back_info){
  var aibeiPay = new AiBeiPay();
  var transId = back_info.transid;
  if (transId == undefined){
    alert(JSON.stringify(back_info.msg));
    return false;
  }
  var data = {};
  data.transId = transId;
  data.retFunc = "callbackData";
  data.baseZIndex = 88;
  data.closeTxt="返回应用"
  data.redirecturl = back_info.redirecturl;
  data.sign = back_info.sign;
  aibeiPay.clickAibei(data);
}
function callbackData(data){
  if(data.OrderStatus=='0'){
     openWin('respon',{result:1});
  }else if(data.OrderStatus==1){
     toast('支付失败');
  }else if(data.OrderStatus==2){
     toast('待支付');
  }else if(data.OrderStatus==3){
     toast('正在处理');
  }else{
     toast('系统异常');
  }
}
/*现在支付*/
function ipaynow(back_info){
  function generatePresignMessage(channel_type){
	var param = {appId:back_info.app_id,
				mhtCharset:"UTF-8",
				mhtCurrencyType:"156",
				mhtOrderAmt:back_info.order_amount*100,
				mhtOrderDetail:"充值",
				mhtOrderName:"充值",
				mhtOrderNo:order_sn+'_'+back_info.log_id,
				mhtorderStartTime:no,
				mhtOrderType:"01",
				notifyUrl:back_info.notify_url};
	if(channel_type!=null&&!channel_type==""){
		param["payChannelType"]=channel_type;
	}
	uzmoduledemo.generatePresignMessage(param, doSignature);
  }
  function doSignature(ret, err){
	if(ret.result=="fail"){
        alert(ret.msg);
    }
    var preSignStr=ret.preSignStr;
    var param = {preSignStr:preSignStr,post_content:"paydata="+preSignStr,post_url:ipayurl};
    uzmoduledemo.doSignature(param, pay);
}

function pay(ret, err){
    if(ret.result=="fail"){
        alert(ret.msg);
    }
    var paydata=ret.preSignStr+"&"+ret.resultStr;
    var param = {data:paydata};
    uzmoduledemo.pay(param, callBack);
}

function callBack(ret, err){
    //alert("响应吗:"+ret.respCode+"\n"+"错误码:"+ret.errorCode+"错误信息:"+ret.errorMsg);
    if(ret.respCode=='00'){
      openWin('respon',{result:1});
    }
    if(ret.errorMsg){
      toast("错误码:"+ret.errorCode+"错误信息:"+ret.errorMsg);
    }
}
  generatePresignMessage('');
}
