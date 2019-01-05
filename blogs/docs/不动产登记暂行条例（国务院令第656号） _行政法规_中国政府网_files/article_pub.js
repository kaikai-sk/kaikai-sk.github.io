//字体大中小
$(".index_switchsize span").click(function(){
	//获取para的字体大小
	var thisEle = $(".pages_content").css("font-size"); 
	//parseFloat的第二个参数表示转化的进制，10就表示转为10进制
	var textFontSize = parseFloat(thisEle , 10);
	//javascript自带方法
	var unit = thisEle.slice(-2); //获取单位
	var cName = $(this).attr("class");
	if(cName == "bigger"){
			if( textFontSize <= 22 ){ 
				textFontSize += 2; 
			} 
	}else if(cName == "smaller"){
			textFontSize -= 2;
	}
	//设置para的字体大小
	$(".pages_content").css("font-size",  textFontSize + unit );
});
$(".index_switchsize .medium").click(function(){
	$(".pages_content").css("font-size","14px");
})
//打印
$("#btnPrint").click(function(){ 
	$("#printContent").printArea();
});

var list01li = $('.list01 li');
	  var li_len = list01li.length;
	  if(li_len == 0)
	  $('.xg-link').hide();

$(function(){
	$('.pages_content img').parent('span').css('text-indent',0)		
})