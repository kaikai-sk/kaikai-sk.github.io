/*
 * Ucap global js for front pages 
 */

 
 //这里需要修改baseurl和
var site_domain = document.location.protocol.toLowerCase() + "//" + document.location.host + "/";

//默认不开启稿件访问记数，就算页面加载了方法，也不计数
var defaultViewCountOpen = false;

//默认支持最新稿件 有new图标
var defaultNewManuscriptOpen = true;

//默认最新稿件与当前时间天数差 1天
var defaultNewNanusctiptDayNum = 1;

var defaultAccountAppUrl = "/FormsServicesPlatform/components/insertLog_statisticsInsert.action?";

var IS_TEST = true;

//when view at location and preview 
if(location.href.indexOf("http://")!=-1)
	IS_TEST = false;



function loadScript(s_Url){
   document.write( '<scr' + 'ipt type="text/javascript" src="' + s_Url + '"><\/scr' + 'ipt>' );
}



function loadNewManuscriptTag(caiTian){
    jQuery(".row .publishedTime").each(function(){
			var s = jQuery(this)[0].innerHTML;
			var s2 = s.replace(/-/g, "/");
			var str = new Date(s2);
 			//var str=new Date(parseInt(s[0]),parseInt(s[1])-1,parseInt(s[2])); 
			//var str = new Date(jQuery(this)[0].innerHTML);
			var dd = new Date();
			var date3=dd.getTime()-str.getTime();
			var days=Math.floor(date3/(24*3600*1000));
			if (days<1){
				jQuery(this).parent(".row").find("img").show();
			}			
		})
}


//对html格式的文本，文本的总长度不能超过len
function reWriteString(str,len){
		var result = str;
        if(str!=""){
			//文本节点
			var sLength = str.length;
			//判断文本值是否超出
			if( sLength > len ){
				result = str.substring(0,len)+"..";
			}
		}
		document.write(result);
}


//解析页面中frame中参数
function parseBodyFrameParams(){
    var framesMap = document.getElementsByTagName("iframe");
	var tempMap=new Array(0);
 	var index=0;
	for(var i = 0 ; i < framesMap.length; i++){
		var obj = framesMap[i];
		var fsrc = obj.src;
		
		if(fsrc.indexOf("${")){
			fsrc = fsrc.replaceAll("${"+key+"}",value);
		}
	}
}

