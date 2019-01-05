// JavaScript Document
$(function () {
	/*if(
	$.trim($("#pageBreak").html())==""){
		$("#pageBreak").hide();
	}*/
		
	  /*头部导航链接地址更改-针对稿件页点击导航目录多了一级站点目录*/
	  var pageUrl = parent.document.location.href;
	  var indexSplit = pageUrl.lastIndexOf("/");
	  var indexShtml = pageUrl.lastIndexOf(".shtml");
	  if(indexSplit!=-1&&indexShtml!=-1&&indexSplit<indexShtml){
		  var manuscriptId = pageUrl.substring(indexSplit+1,indexShtml);
		  if(manuscriptId.length == 32){
			  $("#HomePage a").each(function() {
				   var oHref = $(this).attr("href");
				   if(oHref.indexOf("../")!=-1){
					  $(this).attr("href","../"+oHref);
				   }		   
			  });
	
			  $("#footer_pub a").each(function() {
				   var oHref = $(this).attr("href");
				   if(oHref.indexOf("../")!=-1){
					  $(this).attr("href","../"+oHref);
				   }		   
			  });	  
		  }
	  }
  
});