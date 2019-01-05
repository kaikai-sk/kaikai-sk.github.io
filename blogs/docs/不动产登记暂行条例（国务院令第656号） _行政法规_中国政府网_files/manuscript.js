/*
 * UCAP Manuscript scripts for page
 * http://www.ucap.com.cn
 */

//默认稿件页字体大小
var defaultPageFontSize = 12;

//默认稿件页面大中小容器编号
var defaultPageZoomId = "contentzoom";

//默认稿件页面相关附件容器编号
var defaultAppendixsObjId = "cmspro_appendixs";

//默认稿件页面相关连接容器编号
var defaultReldocumentsObjId = "cmspro_reldocuments";


var IMAGE_PRE = "../../xhtml/";

//when view at location and preview 
if(location.href.indexOf("http://")==-1)
	IMAGE_PRE = "";
else if(location.href.indexOf("/preview/")!=-1)
	IMAGE_PRE = "";

/*
 * scrolltotop 
 */
var scrolltotop={
	//startline: Integer. Number of pixels from top of doc scrollbar is scrolled before showing control
	//scrollto: Keyword (Integer, or "Scroll_to_Element_ID"). How far to scroll document up when control is clicked on (0=top).
	setting: {startline:100, scrollto: 0, scrollduration:1000, fadeduration:[500, 100]},
	controlHTML: '', //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
	controlattrs: {offsetx:5, offsety:30}, //offset of control relative to right/ bottom of window corner
	anchorkeyword: '#top', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links

	state: {isvisible:false, shouldvisible:false},

	scrollup:function(){
		if (!this.cssfixedsupport) //if control is positioned using JavaScript
			this.$control.css({opacity:0}) //hide control immediately after clicking it
		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
		if (typeof dest=="string" && jQuery('#'+dest).length==1) //check element set by string exists
			dest=jQuery('#'+dest).offset().top
		else
			dest=0
		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
	},

	keepfixed:function(){
		var $window=jQuery(window)
		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
		this.$control.css({left:controlx+'px', top:controly+'px'})
	},

	togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop()
		if (!this.cssfixedsupport)
			this.keepfixed()
		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false
		if (this.state.shouldvisible && !this.state.isvisible){
			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
			this.state.isvisible=true
		}
		else if (this.state.shouldvisible==false && this.state.isvisible){
			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
			this.state.isvisible=false
		}
	},
	
	init:function(){
		jQuery(document).ready(function($){
			var mainobj=scrolltotop
			var iebrws=document.all
			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')

			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
				.attr({title:'Scroll Back to Top'})
				.click(function(){mainobj.scrollup(); return false})
				.appendTo('body')

			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') //loose check for IE6 and below, plus whether control contains any text
				mainobj.$control.css({width:mainobj.$control.width()}) //IE6- seems to require an explicit width on a DIV containing text
			mainobj.togglecontrol()

			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
				mainobj.scrollup()
				return false
			})

			$(window).bind('scroll resize', function(e){
				mainobj.togglecontrol()
			})
		})
	}
}

/*
 * cmspro_appendixs
 */
var cmspro_appendixs={

	setting: {startline:0, scrollto: 0, scrollduration:1000, fadeduration:[500, 100]},
	controlHTML: '<img src="'+IMAGE_PRE+'images/cmspro_appendixs.jpg"/>', //HTML for control, which is auto wrapped in DIV w/ ID="topcontrol"
	controlattrs: {offsetx:5, offsety:450}, //offset of control relative to right/ bottom of window corner
	anchorkeyword: '#cmspro_appendixs', //Enter href value of HTML anchors on the page that should also act as "Scroll Up" links
	state: {isvisible:false, shouldvisible:false},
	scrollup:function(){
		if (!this.cssfixedsupport) //if control is positioned using JavaScript
			this.$control.css({opacity:0}) //hide control immediately after clicking it
		var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
		if (typeof dest=="string" && jQuery('#'+dest).length==1) //check element set by string exists
			dest=jQuery('#'+dest).offset().top
		else
			dest=0
        dest = jQuery('#cmspro_appendixs').offset().top;
		this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
	},

	keepfixed:function(){
		var $window=jQuery(window)
		var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
		var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
		this.$control.css({left:controlx+'px', top:controly+'px'})
	},

	togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop()
		if (!this.cssfixedsupport)
			this.keepfixed()
		this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false
		if (this.state.shouldvisible && !this.state.isvisible){
			this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
			this.state.isvisible=true
		}
		else if (this.state.shouldvisible==false && this.state.isvisible){
			this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
			this.state.isvisible=false
		}
	},
	init:function(){
		jQuery(document).ready(function($){

			var mainobj=cmspro_appendixs
			var iebrws=document.all
			mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
			mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')

			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
				.css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
				.attr({title:'Scroll Back to Top'})
				.click(function(){mainobj.scrollup(); return false})
				.appendTo('body')

			if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='') //loose check for IE6 and below, plus whether control contains any text
				mainobj.$control.css({width:mainobj.$control.width()}) //IE6- seems to require an explicit width on a DIV containing text
			mainobj.togglecontrol()

			$('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
				mainobj.scrollup()
				return false
			})

			$(window).bind('scroll resize', function(e){
				mainobj.togglecontrol()
			})
		})
	}
}






/*
 * 改变页面字体大小
 */
function doZoom(pcontentId,size){ 
	if(typeof size == undefined){
		size = defaultPageFontSize;
	}

	if(typeof pcontentId == undefined){
		pcontentId = defaultPageZoomId;
	}
	jQuery('#'+pcontentId).css({fontSize:size+'px'});
}

function doZoom(size){ 
	if(typeof size == undefined){
		size = defaultPageFontSize;
	}
	jQuery('#'+defaultPageZoomId).css({fontSize:size+'px'});
}





/*
 * 稿件访问记数
 */
function addViewRecord(websiteId,channelId,manuscriptId,userId){

	//配置了开启访问记数功能时
	if(defaultViewCountOpen){
		var url = defaultAccountAppUrl ;
		if(typeof websiteId == undefined){
			websiteId = "";
		}
		if(typeof channelId == undefined){
			channelId = "";
		}
		if(typeof manuscriptId == undefined){
			manuscriptId = "";
		}
		if(typeof userId == undefined){
			userId = "";
		}
		url += "website_id=" + websiteId + "&channel_id=" + channelId + "&manuscript_id=" + manuscriptId + "&user_id=" + userId ;
		loadScript(url);
	}
}

function hiddenPageObject(objectId){
   jQuery('#'+objectId).css('display','none');
}


/*
 * 分享地址JSON串
 * titlePre 标题参数名
 * urlPre 地址参数名
 * istop 是否在更多中显示
 */
var WShareAddress = {"address": [  
   {"id": "sina", "title": "新浪微博", "logimg": "sina.jpg","istop":"true","posturl":"http://v.t.sina.com.cn/share/share.php?i=1","titlePre":"title","urlPre":"url"},  
   {"id": "tenlcent", "title": "腾讯微博", "logimg": "tenlcent.jpg","istop":"true","posturl":"http://share.v.t.qq.com/index.php?c=share&a=index","titlePre":"title","urlPre":"url"},    
   {"id": "sohu", "title": "搜狐微博", "logimg": "sohu.jpg","istop":"true","posturl":"http://t.sohu.com/third/post.jsp?i=1","titlePre":"title","urlPre":"url"},
   {"id": "163", "title": "网易微博", "logimg": "163.jpg","istop":"true","posturl":"http://t.163.com/article/user/checkLogin.do?i=1","titlePre":"title","urlPre":"url"},

   {"id": "renren", "title": "人人网", "logimg": "renren.jpg","istop":"false","posturl":"http://share.renren.com/share/buttonshare.do?i=1","titlePre":"title","urlPre":"link"},
   {"id": "qzone", "title": "QQ空间", "logimg": "qzone.jpg","istop":"false","posturl":"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?i=1","titlePre":"title","urlPre":"link"}
    ]  
};

var WORDS_SHARE_TO = "分享";
var WORDS_SHARE_MORE = "更多";

function WShare(){


   WShare.prototype.loadBox = function(){
         var boxString = "";

		boxString +="<div class=\"wshare\"><div><font class=\"f14\">"+WORDS_SHARE_TO+"</font>";

		for(var i=0; i< WShareAddress.address.length; i++){
			 var ads = WShareAddress.address[i];
			  if(ads.istop=="true")
			     boxString +="<a onClick=\"WShare.goShare('"+ads.id+"')\" title=\""+WORDS_SHARE_TO+ads.title+"\" valign=\"middle\" ><img class=\"f145\" src=\""+IMAGE_PRE+"images/wshare/"
						      +ads.logimg+"\" alt=\""+WORDS_SHARE_TO+ads.title+"\"/></a>";
		}
		boxString +="<a  onclick=\"WShare.showMoreDiv()\" class=\"f12\" title=\""+WORDS_SHARE_MORE+"\"><img class=\"f145\" src=\""+IMAGE_PRE+"images/wshare/more.jpg\" alt=\""+WORDS_SHARE_MORE+"\"/>&nbsp;<font class=\"f14\">"+WORDS_SHARE_MORE+"</font></a>";
		boxString +="</div><div id=\"more\" class=\"fen\"><table class=\"fen1\"><th colspan=\"2\" class=\"fen2\" align=\"left\">"+WORDS_SHARE_TO+"...</th>";

        var moreSize = 0;
		for(var i=0; i< WShareAddress.address.length; i++){
			 var ads = WShareAddress.address[i];
			  //更多分享区
			  if(ads.istop=="false"){

				if((moreSize%2)==0)
					  boxString +="<tr align=\"center\">";

				boxString +="<td align=\"left\"> <a onClick=\"WShare.goShare('"+ads.id+"')\" title=\""+WORDS_SHARE_TO+ads.title+"\" valign=\"middle\" class=\"f14\"><img src=\""+IMAGE_PRE+"images/wshare/"+ads.logimg+"\" class=\"ver\" alt=\""+WORDS_SHARE_TO+ads.title+"\"/>&nbsp;"+ads.title+"</a></td>";

				if((moreSize%1)==0&&moreSize!=0)
				      boxString +="</tr>";
				moreSize++;
			  }
		}

		  boxString +="</table></div>";
         // alert(boxString);
		  document.write(boxString);
   }

   //分享提交
   WShare.prototype.goShare = function(addressId){

	var postURL;

	var url=location.href;

	var infoTitle=document.getElementsByTagName("title")[0].innerHTML;

	var address = this.getAddressById(addressId);

	if(address){
	   postURL = address.posturl + "&" + address.titlePre + "=" + infoTitle +"&" + address.urlPre + "=" + url;
	   window.open(postURL);
	   //location.href=postURL;
	}
   }



   WShare.prototype.getAddressById = function(addressId){
	   if(!addressId){
	      return "sina";
	   }
		for(var i=0; i< WShareAddress.address.length; i++){
			 var ads = WShareAddress.address[i];
			  if(ads.id==addressId)
			     return ads;
		}
   }
   
//分享更多
WShare.prototype.showMoreDiv = function(){
  var more =document.getElementById("more");
  if(more.style.display=="")
		more.style.display="block";
   else
		more.style.display="";
}



}

var WShare = new WShare();



//////内容分页方法，sumpage总页数
function page_content(sumpage){
	var hrefstr="";
	for(var i=0;i<sumpage;i++){
     if(sumpage>1){
         hrefstr +="<a href='javascript:void(0);' onclick='javascript:viewpage("+i+","+sumpage+");'>"+(i+1)+"</a>";
     }
  }
  if(sumpage>1){
      document.write("<div align=center>"+hrefstr+"</div>");
  }
}
///////显示内容分页,el 页码；snum总页数
function viewpage(el,snum){
  for(var i=0;i<snum;i++){
    obj = document.all("pagediv" + i);
    if (i==el) {
       obj.style.display = "block";
    }else {
      obj.style.display = "none";
    }
  }
}


///稿件内容分页
function manuscriptPageBreak(manuscript_pageBreak_url){
	 if(manuscript_pageBreak_url!=""){
	   var tst = manuscript_pageBreak_url.split(","); 
	   var urls ="";
	   for(var i=0;i<tst.length;i++){
	      	urls +="<a href='"+tst[i]+"'>"+(i+1)+"</a>&nbsp;&nbsp;&nbsp;&nbsp;";
	      }
	  
	   document.getElementById("pageBreak").innerHTML=urls;
	 }
}

var num="";
//静态预览分页
function manuscriptPage(){
	//稿件置顶window.focus()
	var statisView = document.location.href.toString().indexOf("htm");
	var url = document.location.href.toString();
	var flag = url.substring(url.indexOf("#")+1,url.length);
	//
	if(statisView>0){
		var ctx = document.getElementById("UCAP-CONTENT");
		if(ctx){
			var ctx_str = ctx.innerHTML;
			//ctx_str 内容
				var ctx_strs;
				if(ctx_str.indexOf("#PAGE_BREAK#")!=-1){//兼容历史分页符
				     ctx_strs = ctx_str.split("#PAGE_BREAK#");
				}else if(ctx_str.indexOf("<pagebreak>")!=-1){//兼容历史分页符
				     ctx_strs = ctx_str.split("<pagebreak></pagebreak>");
				}else {//兼容历史分页符
				     ctx_strs = ctx_str.split("<PAGEBREAK></PAGEBREAK>");
				}

			//ctx_strs 页数
			num = ctx_strs.length;
			if(ctx_strs.length>1){
				var pageBreakDiv = document.getElementById("pageBreak");
				var pageBreakA;
				pageBreakDiv = $(pageBreakDiv);
				for(var i in ctx_strs){
					if((i+1) == 1){
						pageBreakA = document.createElement("A");
						pageBreakA.setAttribute("href","#1");
						pageBreakA.innerHTML="首页";
						pageBreakA.setAttribute("dd",ctx_strs[i]);
						pageBreakA.setAttribute("onClick","pageBreakAEvent(this,"+1+")");
						pageBreakDiv.append(pageBreakA);
						pageBreakDiv.append('<a href="javascript:void(0);" onClick=per()><<上一页 </a>');
						$("#pageBreak a").eq(2).addClass('hover')

					}
					pageBreakA = document.createElement("A");
					pageBreakA.setAttribute("href","#"+(i*1 +1));
					pageBreakA.innerHTML=i*1 +1;
					pageBreakA.setAttribute("dd",ctx_strs[i]);
					pageBreakA.setAttribute("onClick","pageBreakAEvent(this)");
					pageBreakDiv.append(pageBreakA);
					if((i*1 +1) == ctx_strs.length){
						pageBreakDiv.append("<a href='javascript:void(0);' onClick='next()'>下一页>>   </a>");
						pageBreakA = document.createElement("A");
						pageBreakA.setAttribute("href","#"+(i*1 +1));
						pageBreakA.innerHTML=i*1 +1;
						pageBreakA.setAttribute("dd",ctx_strs[i]);
						pageBreakA.setAttribute("onClick","pageBreakAEvent(this)");
						pageBreakDiv.append(pageBreakA);
						ppageBreakA = document.createElement("A");
						pageBreakA.setAttribute("href","#"+(i*1 +1));
						pageBreakA.innerHTML="尾页";
						pageBreakA.setAttribute("dd",ctx_strs[i]);
						pageBreakA.setAttribute("onClick","pageBreakAEvent(this,"+(parseInt(i)+1)+")");
						pageBreakDiv.append(pageBreakA);
						
					}
				}
				if(flag>=2){
					var pageBreakA = document.createElement("A");
					pageBreakA.setAttribute("dd",ctx_strs[flag-1]);
					pageBreakAEvent(pageBreakA);
				}else{
					ctx.innerHTML = ctx_strs[0];
				}
				
				if($.trim($("#pageBreak").html())==""){
					$("#pageBreak").hide();
				}else{
					$("#pageBreak").show();
				}

			}
		}
	}
	$("#pageBreak a").eq(parseInt(flag)+1).addClass('hover');
	if(!flag){
		$("#pageBreak a").eq(2).addClass('hover');
	}
}
function per(){
	var url = document.location.href.toString();
	var flag = url.substring(url.indexOf("#")+1,url.length);
	if(flag!=1){
		var temp = flag -1;
		url = url.replace("#"+flag,"#"+temp);
		location.href = url;
		location.reload();
	}
	
}
function next(){
	var url = document.location.href.toString();
	if(url.indexOf("#")<0){
		location.href = url+"#2";
		location.reload();	
	}else{
		var flag = url.substring(url.indexOf("#")+1,url.length);
		if(flag!=num){
			var temp =parseInt(flag) + 1;
			url = url.replace("#"+flag,"#"+temp);
			location.href = url;
			location.reload();
		}
	}
	
	
}

function pageBreakAEvent(obj,num){
	var ctx = document.getElementById("UCAP-CONTENT");
	//var objIndex = obj.index();
	ctx.innerHTML = obj.getAttribute("dd");
	$("#pageBreak a").removeClass("hover");
	if(num){
		$("#pageBreak a").eq(parseInt(num)+1).addClass("hover");
	}else{
		obj.className="hover";
	}
	document.documentElement.scrollTop = document.body.scrollTop =0;
}





/*
 * 页面加载
 */
window.onload = function(){

	//处理相关资源
    var appendixsContentObj = document.getElementById(defaultAppendixsObjId);
	if(appendixsContentObj){
		var appendixsContent = document.getElementById(defaultAppendixsObjId).innerHTML;
		if(appendixsContent!=""){    
		  cmspro_appendixs.init();
		}else {
			hiddenPageObject('cmspro_appendixs_title');
		}
	}

	//处理关联稿件
	var reldocumentsContentObj = document.getElementById(defaultReldocumentsObjId);
	if(reldocumentsContentObj){
		var reldocumentsContent = document.getElementById(defaultReldocumentsObjId).innerHTML;
		if(reldocumentsContent==""||reldocumentsContent=="<TBODY></TBODY>")  
		  hiddenPageObject('cmspro_reldocuments_title');	
	}

	//加载滚动页签
	scrolltotop.init();
	
	loadOthers();
}


/*
 * 加载其它数据
 */
function loadOthers(){
	manuscriptPage();//正文分页

}
