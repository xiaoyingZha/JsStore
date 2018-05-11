
/*  getStyle(el, name1[, name2[, name3 ...)
* 目的：获取指定元素的最终计算样式
* 参数：
*   el DOM元素(必须) -目标对象
*   name1 string(必须) -样式名
*   name2 string -样式名
*   name3 string -样式名
* 返回：
*   result object
* 示例(example)：
*   对目标对象A的节点获取color样式  getStyle(A, 'color')    result ==>  {color:'rgb(255,255,66)'}
*   对目标对象A的节点获取color样式  getStyle(A, 'color')['color']    result ==>  'rgb(255,255,66)'
*   对目标对象A的节点获取color样式  getStyle(A, 'color', 'width')    result ==>  {color: 'rgb(255,255,66)' , width: '200px'}
*/
function getStyle(){
    var obj = arguments[0];
    var attrObj = {};
    for(var i=1;i<arguments.length;i++){
        attrObj[arguments[i]] = !obj.currentStyle?getComputedStyle(obj)[arguments[i]]:obj.currentStyle[arguments[i]];
    }
    return attrObj;
}