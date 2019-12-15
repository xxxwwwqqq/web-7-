function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback)
{
	clearInterval(obj.timer);
	obj.timer = setInterval(function()
	{
		var isStop = true;
		for(var attr in json)
		{
			var now = 0;
			if(attr == 'opacity')
			{
				now = parseInt(getStyle(obj,attr)*100);
			}
			else
			{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity')
			{
				obj.style[attr] = cur / 100;
			}else
			{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur)
			{
				isStop = false;
			}
		}
		if(isStop)
		{
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var box=document.getElementById('bigbox');
var slider=document.getElementById('slider');
var left=document.getElementById('leftsign');
var right=document.getElementById('rightsign');
var NavLiList=document.getElementById('circle').children;
var index=1;//定义1200*index
var timer;
var speed=-500;
var titlewords=document.getElementById('words');
//实现标题的滚动
window.onload=function()
{
	setInterval(function(){
		if(speed===1000)
		{
			speed=-500;
		}
		speed+=2;
		titlewords.style.right=speed+"px";
	},20)
}
function prev()
{
	index--;
	changeColor();
	animate(slider,{left:-1200*index},function()
	{
		if(index===0)
		{
			slider.style.left="6000px";
			index=5;
		}
	})
}
//轮播下一张的函数
function next()
{
	index++;
	changeColor();
	animate(slider,{left:-1200*index},function(){
		if(index===6)
		{
			
			slider.style.left="-1200px";
			index=1;
		}
	})
}

var timer=setInterval(next,2000);
//鼠标划入清定时器
box.onmouseover=function()
{
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
//鼠标划出开定时器
box.onmouseout=function()
{
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer=setInterval(next,2000);
}
left.onclick=prev;
right.onclick=next;
for(var i=0;i<NavLiList.length;i++)
{
	NavLiList[i].num=i;
	NavLiList[i].onclick=function()
	{
		index=this.num+1;
		animate(slider,{left:-1200*index});
		changeColor(index-1);
	}
}
/
function navChange()
{
	Navlist[index-1].className='active';
}
//小按钮背景色切换
function changeColor()
{
	for(var i=0;i<NavLiList.length;i++)
	{
		NavLiList[i].className='';
	}	
	if(index===6)
	{
		NavLiList[0].className='active';
	}else if(index===0)
	{
		NavLiList[4].className='active';
	}
	else
	{
		NavLiList[index-1].className='active';
	}
}
