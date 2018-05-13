/*
* url:请求的地址，包含数据。例如：'test.php'
* data:[object],可选参数，请求的带入的数据。如{a:1,b:2},若不带数据则
* callBack：请求成功后的回调函数，参数data是响应的数据
*
* 调用示例：
*   ajaxGet('test.php',{a:1},function(data){})
* */

function ajaxGet(url,data,callBack){
    var xhr = new XMLHttpRequest();
    if(arguments.length===3){
        var str = '';
        for (var key in data){
            str += key + '=' + data[key] + '&'
        }
        if(str){
            url = url + '?' + str.slice(0,str.length-1);
        }
    }
    xhr.open('get',url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
                callBack&&callBack(xhr.responseText);
            }else{
                console.log('请求的数据存在错误。');
            }

        }else{
            console.log('请求正在执行');
        }
    };
    xhr.send(null);
}