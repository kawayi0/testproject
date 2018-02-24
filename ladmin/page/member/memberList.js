


		
layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;





var pagesize=10;//每页条数
var memberlist = new Vue({
el: '#memberlist',
data:{"success":true,"total":10,"page":1,"totalpage":1,"data":[]},
updated: function () {


//layui.layer.msg('Hello World');
layui.laypage({
cont : "page",
pages : this.totalpage,
curr:this.page,
jump : function(obj,first){
if(!first){
httpx.get("/app/user/list/",{"page":obj.curr,"pagesize":pagesize}, function(res) {
vmup(memberlist,JSON.parse(res));
});
}
}
});


form.render();

}
});

httpx.get("/app/user/list/",{"page":1,"pagesize":pagesize}, function(res) {
vmup(memberlist,JSON.parse(res));
});



	//批量删除
	$(".batchDel").click(function(){
		//var $checkbox = $('input[type="checkbox"][name="checked"]');
		var $checked = $('input[type="checkbox"][name="checked"]:checked');

var che=[];
for(var j=0;j<$checked.length;j++){
//alert($checked[j].value);
che[j]=$checked[j].value;

}
alert(JSON.stringify(che));		

	})

	//全选
	form.on('checkbox(allChoose)', function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function(index, item){
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断文章是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)",function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		if(childChecked.length == child.length){
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		}else{
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})





})