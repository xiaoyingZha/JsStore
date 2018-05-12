function getStyle(){
    var obj = arguments[0];
    var attrObj = {};
    for(var i=1;i<arguments.length;i++){
        attrObj[arguments[i]] = !obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
    }
    return attrObj;
}
/*
*   shake(opt)
*   目的：实现抖动效果
*   基于：getStyle()函数
*   参数：opt [object]
*       shake({
*           obj:抖动目标对象
*           attr:[string] 属性(left/right/top/bottom/marginLeft/marginRight/marginTop/marginBottom)
*           max:[number] 最大偏移量
*           weak:[number] 衰减量
*           callback:[function] 抖动结束的回调（可选）
*       })
*
*   示例：
*       shake({
*           obj:div
*           attr:marginLeft
*           max:200
*           weak:10
*           callback:function(){}
*       })
* */
function shake(opt){
    var {obj,attr,max,weak,callBack} = opt;
    if(obj.isShake) return;
    obj.isShake = true;
    var arr_shake = [];
    for(i=max; i>0; i-=weak){
        arr_shake.push(-i,i);
    }
    arr_shake.push(0);
    var oldAttr = parseFloat(getStyle(obj,attr)[attr]);
    var num = 0;
    clearInterval(timer);
    var timer = setInterval(function(){
        obj.style[attr] = oldAttr + arr_shake[num] + 'px';
        if(arr_shake[num]==0){
            clearInterval(timer);
            obj.isShake = false;
            callBack&&callBack();
        }
        num++;
    },30);
}


