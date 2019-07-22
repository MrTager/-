import  axios from 'axios'

const service =axios.create({
    baseURL:'http://127.0.0.1:3005',
    timeout:1500
});

service.interceptors.response.use(function (response) {
    return Promise.resolve(response)
},function (err) {
    return Promise.reject(err)
});

export  default service