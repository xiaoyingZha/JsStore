/*
* 目的：树深度复制实现根据对象的key、value操作增删改对象
* 参数：
*   type string -操作类型add、update、delete
*   obj object -目标对象
*   key string -对象的唯一键名
*   value string -对象的唯一键值
*   tempobj object -添加和修改的对象
* 返回：
*   result object
* 示例：
*   在目标对象A的节点唯一值id且值为'32'的地方添加子对象B  ObjectByKey('add', A, 'id', '32', B)
*   在目标对象A上修改节点唯一值id且值为'32'的对象为对象B  ObjectByKey('update', A, 'id', '32', B)
*   在目标对象A上删除节点唯一值id且值为'32'的对象 ObjectByKey('delete', A, 'id', '32')
*/
const ObjectByKey = function (type, obj, tempKey, value, tempobj) {
    let result
    let tempKeyNum = 0
    let oClass = isClass(obj)
    if (oClass === 'Object') {
        result = {}
    } else if (oClass === 'Array') {
        result = []
    } else {
        return obj
    }

    // 添加对象
    if (type === 'add') {
        for (let key in obj) {
            let copy = obj[key]
            if (isClass(copy) === 'Object') {
                result[key] = ObjectByKey(type, copy, tempKey, value, tempobj)
            } else if (isClass(copy) === 'Array') {
                result[key] = ObjectByKey(type, copy, tempKey, value, tempobj)
                if (obj[tempKey] === value) {
                    result[key].push(tempobj)
                }
            } else {
                result[key] = obj[key]
            }
        }
    }

    // 修改对象
    if (type === 'update') {
        for (let key in obj) {
            let copy = obj[key]
            if (isClass(copy) === 'Object') {
                if (copy[tempKey] === value) {
                    result[key] = ObjectByKey(type, tempobj, tempKey, value, tempobj)
                } else {
                    result[key] = ObjectByKey(type, copy, tempKey, value, tempobj)
                }
            } else if (isClass(copy) === 'Array') {
                result[key] = ObjectByKey(type, copy, tempKey, value, tempobj)
            } else {
                result[key] = obj[key]
            }
        }
    }

    // 删除对象
    if (type === 'delete') {
        for (let key in obj) {
            let copy = obj[key]
            if (isClass(copy) === 'Object') {
                if (copy[tempKey] !== value) {
                    if (/^\d{1,}$/g.test(key)) {
                        result[key - tempKeyNum] = ObjectByKey(type, copy, tempKey, value, tempobj)
                    } else {
                        result[key] = ObjectByKey(type, copy, tempKey, value, tempobj)
                    }
                } else {
                    tempKeyNum++
                }
            } else if (isClass(copy) === 'Array') {
                result[key] = ObjectByKey(type, copy, tempKey, value, tempobj)
            } else {
                result[key] = obj[key]
            }
        }
    }
    return result
}

// 判断对象的数据类型
function isClass (o) {
    if (o === null) return 'Null'
    if (o === undefined) return 'Undefined'
    return Object.prototype.toString.call(o).slice(8, -1)
}