/*
*   参数：
*       url:[string] 跨域请求地址
*       opt:[object] 请求带入的数据
*       fn:[function] 回调函数，函数的唯一参数data是响应的数据
*
*   调用示例：
*       ajaxJSONP('https://api.douban.com/v2/book/search',{
*           q:'javascript',
*           start:0
*       },function (data) {});
* */
function ajaxJSONP(url,opt,fn){
    window.callBack = fn;
    opt.callback = 'callBack';
    var str = '?';
    for(var key in opt){
        str+= key+'='+opt[key]+'&'
    }
    url = url+str.slice(0,-1);
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}
