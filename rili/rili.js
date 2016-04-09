

window.onload = function(){

// 定义变量
var _self=this;

_self.yearBox=document.getElementsByClassName("year")[0];
_self.monthBox=document.getElementsByClassName("month")[0];
_self.prevy=document.getElementsByClassName("prev_y")[0];
_self.prevm=document.getElementsByClassName("prev_m")[0];
_self.nexty=document.getElementsByClassName("next_y")[0];
_self.nextm=document.getElementsByClassName("next_m")[0];
_self.yr=0;
_self.mth=0;
_self.days=0;

// yearBox指向输入year的input,更改值时，正确年份存入year变量，year为“”表示错误年份
_self.yearBox.onchange=function(){
	var year=parseInt(this.value);
	if (year < 1901 || year > 2100 || isNaN(year)){
		alert("请输入正确年份！");
		this.focus();
		this.value="输入年份";
		year="";
	}else{
		_self.yr=year;
		_self.mth=parseInt(_self.monthBox.value);
		if(!isNaN(_self.mth)){
		_self.days=dayNums(year,_self.mth);
		fillall();
		}
	}
}
// monthBox指向输入month的input,更改值时，正确月份存入month变量，month为“”表示错误年份
_self.monthBox.onchange=function(){
	var month=parseInt(this.value);
    if (month < 1 || month > 12 || isNaN(month)) {
        alert("请输入正确月份！");
        this.focus();
        this.value="输入月份";
        month="";
    }else{
    	_self.mth=month;
    	_self.yr=parseInt(_self.yearBox.value);
    	if(!isNaN(_self.yr)){
		_self.days=dayNums(_self.yr,month);
		fillall();
		}
	}

}

// 点击>>或<<改变年份
_self.nexty.onclick=function(){
	changey(1);
}
_self.prevy.onclick=function(){
	changey(-1);
}
function changey(flag){
var year=_self.yr+flag;
if (year < 1901 || year > 2100 ) {
	alert("超出日历范围！");
}else{
	_self.yr=year;
	_self.yearBox.value=year;
	_self.days=dayNums(_self.yr,_self.mth);
	fillall();
}
}

// 点击>或<改变月份
_self.nextm.onclick=function(){
	changem(1);
} 
_self.prevm.onclick=function(){
	changem(-1);
} 
function changem(flag){
var month=_self.mth+flag;
var year=_self.yr+flag;
if (month < 1 &&year>=1901&&year<=2100){
	_self.mth=12;
	_self.yr=_self.yr+flag;
}else 
{if(month > 12 &&year>1900&&year<=2100){
	_self.mth=1;
	_self.yr=_self.yr+flag;
}
else{
if (month<13&&month>0) {
	_self.mth=month;
	};
	
}
}

_self.yearBox.value=_self.yr;
_self.monthBox.value=_self.mth;
_self.days=dayNums(_self.yr,_self.mth);
	fillall();
}

// 判断函数是否是闰年，是返回true，不是返回false
function isRunYear(year){
	year=parseInt(year);
	if (((year%4)==0 && ((year%100)!=0 ||(year%400)==0))) {
			return true;
		}
	else
		return false;
}

// 返回该年该月的天数,若有一个为空返回0
function dayNums(year,month){
	
	if((!isNaN(year))&&(!isNaN(month))&&(year!=0)){  //year!=""&&month!=""&&
		year=parseInt(year);
		month=parseInt(month);
		var mydate=new Date(year,month,0);
		return mydate.getDate();
	}
	else 
		return 0;
}

// 返回某年某月某日的星期数
function firstweek(year,month,day){
	var compmth=month-1;
	var mydate=new Date(year,compmth,day);
	return mydate.getDay();
}

//农历处理：
// 农历数据信息
var lunarInfo = new Array(0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
 0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
 0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
 0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
 0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
 0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
 0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
 0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
 0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
 0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
 0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
 0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
 0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
 0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
 0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
 0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
 0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
 0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
 0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
 0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
 0x0d520);

//太阳历每月天数
var solarMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
//天干
var Gan = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
//地支
var Zhi = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
//属相
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
//节气
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
//节气日期速查表 ,用偏移法算出来的不准确
var sTermInfo=new Array('9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
 '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
 'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
 '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
 '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
 '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
 '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
 '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
 '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
 '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
 '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
 '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
 '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
 '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
 '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
 '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
 '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
 '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
 '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
 '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
 '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
 '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
 '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
 '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
 '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
 '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
 '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
 '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
 '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
 '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
 '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
 '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
 '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
 '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
 '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
 '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722');

// var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
//月份转换
var nStr1 = new Array('正','一','二','三','四','五','六','七','八','九','十','冬','腊');
//
var nStr2 = new Array('初','十','廿','卅','　');

// 返回农历y年一整年的总天数
function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
   return(sum+leapDays(y));
};
// 返回哪一年是闰月，没有返回0
function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf);
};

// y年闰月的天数 若该年没有闰月则返回0
function leapDays(y) {
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
   else return(0);
};

// 返回农历y年m月（非闰月）的总天数
 function monthDays(y,m) {
 return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
 };

 // 传入offset偏移量返回干支
 function toGanZhi(offset) {
 return(Gan[offset%10]+Zhi[offset%12]);
 };

// 传入公历(!)y年获得该年第n个节气的公历日期,从n=1(小寒)算起
function getTerm(y,n) {
	 if(y<1901 || y>2100) {return -1;}
	 if(n<1 || n>24) {return -1;}
		 var table = sTermInfo[y-1900];
		 var info = [
		 parseInt('0x'+table.substr(0,5)).toString() ,
		 parseInt('0x'+table.substr(5,5)).toString(),
		 parseInt('0x'+table.substr(10,5)).toString(),
		 parseInt('0x'+table.substr(15,5)).toString(),
		 parseInt('0x'+table.substr(20,5)).toString(),
		 parseInt('0x'+table.substr(25,5)).toString()
		 ];
		 var calday = [
		 info[0].substr(0,1),
		 info[0].substr(1,2),
		 info[0].substr(3,1),
		 info[0].substr(4,2),
		 
		 info[1].substr(0,1),
		 info[1].substr(1,2),
		 info[1].substr(3,1),
		 info[1].substr(4,2),
		 
		 info[2].substr(0,1),
		 info[2].substr(1,2),
		 info[2].substr(3,1),
		 info[2].substr(4,2),
		 
		 info[3].substr(0,1),
		 info[3].substr(1,2),
		 info[3].substr(3,1),
		 info[3].substr(4,2),
		 
		 info[4].substr(0,1),
		 info[4].substr(1,2),
		 info[4].substr(3,1),
		 info[4].substr(4,2),
		 
		 info[5].substr(0,1),
		 info[5].substr(1,2),
		 info[5].substr(3,1),
		 info[5].substr(4,2),
		 ];
		 return parseInt(calday[n-1]);
 };
  // 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
 function getAnimal(y) {
 return Animals[(y - 4) % 12]
 };

// 计算传入年的农历属性，包含属性：.year .month .day .isLeap .yearCyl .dayCyl .monCyl
function toLunar(y,m,d){
	 var sm = m-1;
	var baseDate= new Date(1900,0,31); //以这一天为基础计算农历
	var objDate=new Date(y,sm,d);//传入的时间
	var offset = Math.floor((objDate.getTime()+ 2206425600000 )/86400000);//两个时间的偏移量- baseDate.getTime(1900,0,31)
	var tmp=0;
	_self.dayCyl=offset+40; //相差天数
	_self.monCyl=14; //相差月数

// 累加天数到objDate
	for(i=1900;(i<2100)&&(offset>0);i++){
		tmp = lYearDays(i);
		offset =offset-tmp;
		_self.monCyl +=12;
	}
	if(offset<0){
		offset+=tmp;   //减多了！还回去一年
		i--;
		_self.monCyl-=12;
	}

	_self.year= i;   //找到农历的年
	_self.yearCyl=i-1864;  //1864年为甲子年
	var leap=leapMonth(i);//obj年哪个月是闰月
	_self.isLeap=false;//初始化

	// 下面计算多减的那一年的月偏移
	for(i=1;i<13&&offset>0;i++){
		if(leap>0 && i==(leap+1)&&_self.isLeap==false){//第i月为闰月
			i--;
			_self.isLeap=true;
			tmp=leapDays(_self.year);     //计算这一年的天数（闰年）
		}
		else{
			tmp=monthDays(_self.year,i);   //计算该月天数
		}

		if(_self.isLeap==true&&i==(leap+1)){
			_self.isLeap=false;
		}

		offset-=tmp;
		if(_self.isLeap==false){
			_self.monCyl++;
		}
	}

	if(offset==0&&leap>0&&i==leap+1){  //偏移时间为0是闰月
		if(_self.isLeap==true){
			_self.isLeap=false;
		}else{
			_self.isLeap=true;
			i--;
			_self.monCyl--;
		}
	}

	if(offset<0){
		offset+=tmp;
		i--;
		_self.monCyl--;
	}
	_self.month=i;
	_self.day=offset+1;


	//天干地支处理

 var term3 = getTerm(year,3); //该农历年立春日期
 _self.gzY = toGanZhi(year-4);//普通按年份计算，下方尚需按立春节气来修正
 
 //依据立春日进行修正gzY
 if(sm<2 && d<term3) {
 _self.gzY = toGanZhi(year-5);
 }else {
 _self.gzY = toGanZhi(year-4);
 }
 
 //月柱 1900年1月小寒以前为 丙子月(60进制12)
 var firstNode = getTerm(y,(m*2-1));//返回当月「节」为几日开始
 var secondNode = getTerm(y,(m*2));//返回当月「节」为几日开始
 
 //依据12节气修正干支月
 _self.gzM = toGanZhi((y-1900)*12+m+11);
 if(d>=firstNode) {
 _self.gzM = toGanZhi((y-1900)*12+m+12);
 }
 
 //传入的日期的节气与否
  _self.isTerm = false;
  _self.Term = "";
 if(firstNode==d) {
 _self.isTerm = true;
 _self.Term = solarTerm[m*2-2];
 }
 if(secondNode==d) {
 _self.isTerm = true;
 _self.Term = solarTerm[m*2-1];
 }
 //日柱 当月一日与 1900/1/1 相差天数
 var dayCyclical = Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;
  _self.gzD = toGanZhi(dayCyclical+d-1);


}

function cnDay(m,d){//传入农历月日，输出中文表示
	var str=" ";
	// 转换月份
	if(d==1){
		if(m==1){
			str+=nStr1[0];
		}else{
			str+=nStr1[m];
		}
		str+="月";  //每月第一天才显示
	}else{
		// 转换日
			if(d>0&&d<32){
				switch(d){
					case 10:str+="初十";break;
					case 20:str+="二十";break;
					case 30:str+="三十";break;
					default:str=str+nStr2[Math.floor(d/10)]+nStr1[d%10];break;
			}
		}
		// else{
		// 		str+="母鸡T^T";
		// 	}
	}
	
	return str;
}

function cnFullDay(m, d)
{
  var str=" ";
  if (m > 10)
  {
    str = '十' + nStr1[m-10];
  }
  else
  {
    str = nStr1[m];
  }
  str += '月';
  switch (d)
  {
    case 10:str += '初十'; break;
    case 20:str += '二十'; break;
    case 30:str += '三十'; break;
    default:str += nStr2[Math.floor(d/10)]; str += nStr1[d%10];
  }
  return str;
}

function week(y,m,d){
	var mydate=new Date(y,m-1,d);
	var w=new Array("日","一","二","三","四","五","六");
	return ("星期"+w[mydate.getDay()]);
}

//填充日历内容
function fillall(){
for(var k=0;k<42;k++){    
	for(var l=0;l<7;l++){   
	Infos[k][l]="";    //清空Infos
 }
}
var infocnt=0;//info的计数器
var rows=document.getElementsByClassName("row");
var i;
var cnt=1;
var firstday=firstweek(_self.yr,_self.mth,1);//该月第一天的星期数

// 确定前一个月的年份和月份
if  (_self.mth==1){
	var prey=((_self.yr-1)<1901)?"":(_self.yr-1);
	var prem=12;
}else{
	var prey=_self.yr;
	var prem=_self.mth-1;
}
// 确定后一个月的年份和月份
if  (_self.mth==12){
	var nxty=((_self.yr+1)>2100)?"":(_self.yr+1);
	var nxtm=1;
}else{
	var nxty=_self.yr;
	var nxtm=_self.mth+1;
}
// 前一个月的天数
var predays=dayNums(prey,prem);
// 后一个月的天数
var nxtdays=dayNums(nxty,nxtm);
// 清空背景
var rowsele=document.getElementsByClassName("day");
for(i=0;i<rowsele.length;i++){
rowsele[i].style.background="none";
rowsele[i].getElementsByClassName("daynum")[0].style.color="black";
rowsele[i].getElementsByClassName("nongli")[0].style.color="#878787";
}
	// 为第一行填入日期
	for(i=0;i<7;i++){
		if(i<firstday){	 
			//公历日期   #8B1A1A
			var rele=rows[0].getElementsByClassName("daynum")[i];
			rele.innerHTML=(predays==0)?"":(predays-firstday+1+i);
			rele.parentNode.style.backgroundColor="#EEE8CD";
			if(isToday(prey,prem,predays-firstday+1+i)){
                rele.parentNode.style.backgroundColor="#FFCC99";
                rele.style.color="red"; 
            }
			//农历
			rele=rows[0].getElementsByClassName("nongli")[i];
			if(rele.innerHTML!=""){
				toLunar(prey,prem,predays-firstday+1+i);
				if(_self.isTerm==true){
					rele.innerHTML=_self.Term;
					rele.style.color="#0099CC"; //节气
				}else{
					rele.innerHTML=(cnFullDay(_self.month,_self.day)!=undefined)?cnDay(_self.month,_self.day):"";
				}
			}
		
			//国际节假日
			var intervac=isIntervacation(prem,(predays-firstday+1+i));
			if(intervac!=""){
				rele.innerHTML=intervac;
				rele.style.color="#66CC00";
			}
			//农历节日
			var lunarvac=isLunarvac(_self.month,_self.day);
			if(lunarvac){
				rele.innerHTML=lunarvac;
				rele.style.color="#ff6633";
			}
			
			Infos[infocnt]["sdate"]=prey+"年"+prem+"月"+(predays-firstday+1+i)+"日";
			Infos[infocnt]["week"]=week(prey,prem,(predays-firstday+1+i));
			Infos[infocnt]["ldate"]="农历"+cnFullDay(_self.month,_self.day);
			Infos[infocnt]["gzdate"]=_self.gzY+"年 "+_self.gzM+"月 "+_self.gzD+"日";
			Infos[infocnt]["Term"]=_self.Term;
			Infos[infocnt]["interv"]=intervac;
			Infos[infocnt]["lunarv"]=lunarvac;
			infocnt++;

		}else{
			//公历日期
			rele=rows[0].getElementsByClassName("daynum")[i];
			rele.innerHTML=cnt;
			rele.parentNode.style.backgroundColor="#FFF0AC";
			if(isToday(_self.yr,_self.mth,cnt)){
                rele.parentNode.style.backgroundColor="#FFCC99";
                rele.style.color="red"; 
            }
			//农历
			rele=rows[0].getElementsByClassName("nongli")[i];
			toLunar(_self.yr,_self.mth,cnt);
			if(_self.isTerm==true){
				rele.innerHTML=_self.Term;
				rele.style.color="#0099CC";
			}else{
				rele.innerHTML=cnDay(_self.month,_self.day);
			}
			//国际节假日
			var intervac=isIntervacation(_self.mth,cnt);
			if(intervac!=""){
				rele.innerHTML=intervac;
				rele.style.color="#66CC00";
			}
			//农历节日
			var lunarvac=isLunarvac(_self.month,_self.day);
			if(lunarvac){
				rele.innerHTML=lunarvac;
				rele.style.color="#ff6633";
			}
			
			Infos[infocnt]["sdate"]=_self.yr+"年"+_self.mth+"月"+cnt+"日";
			Infos[infocnt]["week"]=week(_self.yr,_self.mth,cnt);
			Infos[infocnt]["ldate"]="农历"+cnFullDay(_self.month,_self.day);
			Infos[infocnt]["gzdate"]=_self.gzY+"年 "+_self.gzM+"月 "+_self.gzD+"日";
			Infos[infocnt]["Term"]=_self.Term;
			Infos[infocnt]["interv"]=intervac;
			Infos[infocnt]["lunarv"]=lunarvac;
			infocnt++;

			cnt++;
		}
	}
	//为后面的行填入
	var cnt2=1;
	for(i=1;i<rows.length;i++){
		for(j=0;j<7;j++){
			if(cnt<=_self.days){
				//公历日期
				rele=rows[i].getElementsByClassName("daynum")[j];
				rele.innerHTML=cnt;
				rele.parentNode.style.backgroundColor="#FFF0AC";
                if(isToday(_self.yr,_self.mth,cnt)){
                    rele.parentNode.style.backgroundColor="#FFCC99";
                    rele.style.color="red"; 
                }
				//农历
				rele=rows[i].getElementsByClassName("nongli")[j];
				toLunar(_self.yr,_self.mth,cnt);
				if(_self.isTerm==true){
					rele.innerHTML=_self.Term;
					rele.style.color="#0099CC";
				}else{
					rele.innerHTML=cnDay(_self.month,_self.day);
				}				
				//国际节假日
				var intervac=isIntervacation(_self.mth,cnt);
				if(intervac!=""){
					rele.innerHTML=intervac;
					rele.style.color="#66CC00";
				}
				//农历节日
				var lunarvac=isLunarvac(_self.month,_self.day);
				if(lunarvac){
					rele.innerHTML=lunarvac;
					rele.style.color="#ff6633";
				}
				
				Infos[infocnt]["sdate"]=_self.yr+"年"+_self.mth+"月"+cnt+"日";
				Infos[infocnt]["week"]=week(_self.yr,_self.mth,cnt);
				Infos[infocnt]["ldate"]="农历"+cnFullDay(_self.month,_self.day);
				Infos[infocnt]["gzdate"]=_self.gzY+"年 "+_self.gzM+"月 "+_self.gzD+"日";
				Infos[infocnt]["Term"]=_self.Term;
				Infos[infocnt]["interv"]=intervac;
				Infos[infocnt]["lunarv"]=lunarvac;
				infocnt++;
				cnt++;
			}else{
				//公历日期
				rele=rows[i].getElementsByClassName("daynum")[j];
				rele.innerHTML=(nxtdays==0)?"":(cnt2);
				rele.parentNode.style.backgroundColor="#EEE8CD";
                if(isToday(nxty,nxtm,cnt2)){
                    rele.parentNode.style.backgroundColor="#FFCC99";
                    rele.style.color="red"; 
                }
				//农历
				rele=rows[i].getElementsByClassName("nongli")[j];
				toLunar(nxty,nxtm,cnt2);
				if(_self.isTerm==true){
					rele.innerHTML=_self.Term;
					rele.style.color="#0099CC";
				}else{
					rele.innerHTML=cnDay(_self.month,_self.day);
				}
				// rele.style.color="#878787";
				//国际节假日
				var intervac=isIntervacation(nxtm,cnt2);
				if(intervac!=""){
					rele.innerHTML=intervac;
					rele.style.color="#66CC00";
				}
				//农历节日
				var lunarvac=isLunarvac(_self.month,_self.day);
				if(lunarvac){
					rele.innerHTML=lunarvac;
					rele.style.color="#ff6633";
				}
				
				Infos[infocnt]["sdate"]=nxty+"年"+nxtm+"月"+cnt2+"日";
				Infos[infocnt]["week"]=week(nxty,nxtm,cnt2);
				Infos[infocnt]["ldate"]="农历"+cnFullDay(_self.month,_self.day);
				Infos[infocnt]["gzdate"]=_self.gzY+"年 "+_self.gzM+"月 "+_self.gzD+"日";
				Infos[infocnt]["Term"]=_self.Term;
				Infos[infocnt]["interv"]=intervac;
				Infos[infocnt]["lunarv"]=lunarvac;
				infocnt++;
				cnt2++;
				
			}
		}
	}
// alert(prey+","+nxty+","+prem+","+nxtm);	
var yearInfo=document.getElementsByClassName("yearInfo")[0];
_self.Animal=getAnimal(_self.yr);
yearInfo.innerHTML=_self.gzY+"年【"+_self.Animal+"】";

}

// 判断国际节假日
function isIntervacation(month,date){
	if ((month == 1) && (date == 1)) return("元旦节");
	if ((month == 2) && (date ==14 )) return("情人节");
	if ((month == 3) && (date == 8)) return("妇女节");
	if ((month == 3) && (date == 12)) return("植树节");
	if ((month == 3) && (date == 15)) return("消费者权益日");
	if ((month == 4) && (date == 1)) return("愚人节");
	if ((month == 5) && (date == 1)) return("劳动节");
	if ((month == 5) && (date == 4)) return("青年节");

	if ((month == 6) && (date == 1)) return("儿童节");
	if ((month == 7) && (date == 1)) return("共产党诞辰");

	if ((month == 8) && (date == 1)) return("建军节");
	if ((month == 9) && (date == 10)) return("教师节");
	if ((month == 10) && (date == 1)) return("国庆节");

	if ((month == 12) && (date == 24)) return("平安夜"); 
	if ((month == 12) && (date == 25)) return("圣诞节");

	else return("");
}

// 判断农历节日
function isLunarvac(month,date){
	if ((month==1) && (date == 1)) return("春节");
	if ((month==1) && (date == 15)) return("元宵节");
	if ((month==5) && (date == 5)) return("端午节");
	if ((month==7) && (date == 7)) return("七夕节");
	if ((month==8) && (date == 15)) return("中秋节");
	if ((month==9) && (date == 9)) return("重阳节");
	if ((month==12) && (date == 8)) return("腊八节");
	if ((month==12) && (date == 23)) return("小年");
	else return("");
}
    
//判断是不是今天
function isToday(y,m,d){
    var objDate=new Date(y,m-1,d);
    var curDate=new Date();
    if((objDate.getFullYear()==curDate.getFullYear())&&(objDate.getMonth()==curDate.getMonth())&&(objDate.getDate()==curDate.getDate()))
        return true;
    else
        return false;
    
}

//声明一个存储日历每格信息的二维数组
var Infos = new Array();  //先声明一维
for(var k=0;k<42;k++){    
	Infos[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
	for(var j=0;j<7;j++){   
	Infos[k][j]="";    //这里将变量初始化
 }
}

var list=document.getElementsByClassName("day");
//点击显示所指日期详细信息
var clickfunc=function(i){
	list[i].onclick=function(ev){   //点击鼠标时创建div
    var oEvent=ev||event;
    var oDiv=document.createElement('div');
    oDiv.id="details";
    oDiv.style.left=oEvent.clientX+'px';  // 指定创建的DIV在文档中距离左侧的位置
    oDiv.style.top=oEvent.clientY+'px';  // 指定创建的DIV在文档中距离顶部的位置
    oDiv.style.border='1px solid #FFD700'; // 设置边框
    oDiv.style.position='absolute'; // 为新创建的DIV指定绝对定位
    oDiv.style.width='125px'; // 指定宽度
    oDiv.style.height='90px'; // 指定高度
    oDiv.style.backgroundColor="#FFEC8B";
    oDiv.style.padding="10px";
    oDiv.style.opacity="0.9";
    oDiv.style.fontSize="13px";
    oDiv.style.borderRadius="30px";
    var basestr="";
    basestr+=Infos[i]["sdate"]+"<br/>"+Infos[i]["week"]+"<br/>"+Infos[i]["ldate"]+"<br>"+Infos[i]["gzdate"];
    if(Infos[i]["Term"]){basestr+="<br/>"+Infos[i]["Term"]};
    if(Infos[i]["interv"]){basestr+="<br/>"+Infos[i]["interv"]};
    if(Infos[i]["lunarv"]){basestr+="<br/>"+Infos[i]["lunarv"]};
    // +"<br>"+Infos[i]["Term"]+"<br>"+Infos[i]["interv"]+"<br>"+Infos[7]["lunarv"];

    oDiv.innerHTML=basestr;
    document.body.appendChild(oDiv); 
    
	}

	list[i].onmouseout=function(){  //鼠标移开时删除div
	var node=document.getElementById("details");
	if(node)
	document.body.removeChild(node);
	}
}
for (var i=0;i<list.length;i++){
	var e;
	clickfunc(i);
}
	



// 初始化日历
function init(){
	var mydate=new Date();
	_self.yr=mydate.getFullYear();
	_self.mth=mydate.getMonth()+1;
	_self.days=dayNums(_self.yr,_self.mth);
	_self.yearBox.value=_self.yr;
	_self.monthBox.value=_self.mth;
	fillall();

}
    

init();

var returnToday=document.getElementsByClassName("today")[0];
returnToday.onclick=function(){init()};
    
// toLunar(1900,1,1)
// console.log(_self.month,_self.day);
 // console.log(_self.gzY,_self.gzM,_self.gzD,_self.Term);
// x = parseInt(12,10)+1;
// var temp = new Date(2016,x,0);
// console.log(temp.getDate());
// console.log(dayNums(2016,12));
console.log(Infos[7]["sdate"],Infos[7]["week"],Infos[7]["ldate"],Infos[7]["Term"],Infos[7]["gzdate"],Infos[7]["interv"],Infos[7]["lunarv"]);

}

