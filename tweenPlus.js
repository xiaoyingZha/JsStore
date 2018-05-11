/*
* t : time 已运动时间  当前时间-初始时间
* b : begin 起始值
* c : count 总的运动值  总运动路程
* d : duration 持续时间 总运动时间
* */
//调用方式如：Tween.linear(t,b,c,d);
var Tween = {	// t：已运动时间	b：起始值	 c：运动路程	d:运动持续时间
    linear: function (t, b, c, d){  //匀速
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){//*
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}

function getStyle(){
    var obj = arguments[0];
    var attrObj = {};
    for(var i=1;i<arguments.length;i++){
        attrObj[arguments[i]] = !obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
    }
    return attrObj;
}

/*  tweenPlus(opt)
*
*   参数：
*       opt：[object]
*
*   示例说明：
*   tweenPlus({
*      obj:div, 目标元素
*      begins:{ 对需要指定初始值的样式属性指定初始值
*           'transform.scale':1	（关于transform的使用，需指定初始值 'transform.rotateZ':45）
*           opacity':0.2    （关于透明度的使用，需指定初始值）
*        },
*      attrs:{  运动的样式值
*           'top':'500px',
*           'height':'50px',
*           'transform.scale':'2',
*           'left':'500px'
*        },
*        duration:2000, 运动时间
*        callBack:function(){   运动结束的回调
*            tweenPlus({   在回调中再次调用tweenPlus时，当前运动的初始值依旧是以最开始的为准，并不会以上次运动的终点作为开始
*               obj:div,
*                attrs:{
*                    'left':'1000px',
*                    'top':'0px',
*                   'height':'100px',
*                    'opacity':0.2		（关于透明度的使用）
*                },
*                duration:800
*            });
*        }
*   });
*/
//基于Tween、getStyle
function  tweenPlus(opt){

    var option = {
        obj:'',
        begins:{},
        attrs:{},
        duration:0,
        way:'linear',
        callBack:function(){}
    };

    for(var key in option){
        if(opt[key]){
            option[key] = opt[key];
        }
    }

    var obj = option.obj,
        attrs = option.attrs,
        duration = option.duration,
        way = option.way,
        callBack = option.callBack,
        begins = option.begins;

    if(obj.isAnim) return;

    obj.isAnim = true;

    var starts = {};

    for(var key in attrs){
        starts[key] = parseFloat(begins[key])||parseFloat(getStyle(obj,key))||0;
    }

    var uintes = {};
    for(var key in attrs){

        if(typeof attrs[key]!='string') continue;

        var num = parseFloat(attrs[key]);
        var arr = attrs[key].split(num);

        uintes[key] = arr[1];
    }

    var startTime = Date.now();

    var allS = {};
    for(var key in attrs){
        if(key=='transform.scale'){
            console.log(attrs[key]);
        }
        allS[key] = parseFloat(attrs[key])-starts[key]||0;
    }

    clearInterval(timer);
    var timer = 0;
    timer = setInterval(function(){

        var endTime = Date.now();
        var t = endTime-startTime;

        if(t>=duration){
            t = duration;
            clearInterval(timer);
        }

        for(var key in attrs){

            obj.style[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            if(key=='opacity'){
                obj.style.filter = 'Alpha(opacity='+Tween[way](t,starts[key],allS[key],duration)*100+')';
            }

            if(key=='scrollTop'||key=='scrollLeft'){
                obj[key] = Tween[way](t,starts[key],allS[key],duration)+(uintes[key]||'');
            }

            var attr1 = key.split('.');
            if(attr1.length>1&&attr1[0]=='transform'){
                if(attr1[1]=='scale'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+')';
                }else if(attr1[1]=='rotateZ'){
                    obj.style[attr1[0]] = attr1[1]+'('+Tween[way](t,starts[key],allS[key],duration)+'deg)';
                }
            }
        }

        if(t==duration){
            obj.isAnim = false;
            if(callBack){
                callBack();
            }
        }
    },20);

    return timer;
}
