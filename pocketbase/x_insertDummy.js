import http from 'k6/http';
import { items } from '../productDummy.js';
import { config } from './config.js';


export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    iterations: 1,
    vus: 1
};

export default () => {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        item["stock"] = 1000
        const response = http.post(`${config.url}/collections/products/records`, JSON.stringify(items[i]), { headers: {
            'Content-Type': `application/json`,
            'Authorization': config.authorization
        } })
    }
}

