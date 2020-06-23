const axios = require('axios');
const qs = require('qs');


const service = axios.create({
    // baseURL: 'http://www.creprice.cn',
    timeout: 40000 //请求超时时间
});
// request拦截器1
service.interceptors.request.use(
    config => {
        if (
            config.method == "post" ||
            config.method == "put" ||
            config.method == "patch"
        ) {
            if (config.data) {
                let data = JSON.parse(JSON.stringify(config.data));
                for (let k in data) {
                    if (data[k] === "") {
                        delete config.data[k];
                    }
                }
                config.data = qs.stringify(config.data)
            }
        } else {
            config.params = config.params ? config.params : {};
            let params = JSON.parse(JSON.stringify(config.params));
            for (let k in params) {
                if (params[k] === "") {
                    delete config.params[k];
                }
            }
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
    error => {
       
        return Promise.reject(error);
    }
);

module.exports = {
    service
}