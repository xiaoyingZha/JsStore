/*
* 参数：
*   url:请求地址
*   data:(对象)请求带入的数据 格式：{name:'abc',pwd:'123456'}
*   callBack：请求成功后的回调函数，有一个参数是返回的数据
*
* 调用示例：
*   ajaxPost('test.php',{a:1},function(data){})
* */
function ajaxPost(url,data,callBack){
    var xhr = new XMLHttpRequest();
    xhr.open('post',url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if((xhr.status>=200&&xhr.status<=300)||xhr.status==304){
                callBack&&callBack(xhr.responseText);
            }else{
                console.log('请求的数据存在错误。');
            }
        }else{
            console.log('请求正在执行');
        }
    };
    var form = new FormData();
    for(var key in data){
        form.set(key,content[key]);
    }
    xhr.send(form);
}