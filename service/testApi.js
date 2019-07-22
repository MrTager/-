import request from  './request.js'

export function getTest(url) {
    return request({
        url:url,
        method:'get',
        params:{
            name:'zhangsan',
            pwd:'12345',
        }
    })
}