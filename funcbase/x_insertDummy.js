import http from 'k6/http';
import { config } from './config.js';
import { items } from '../productDummy';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    iterations: 1,
    vus: 1
};

const items = items

export default () => {
    for (let i = 0; i < items.length; i++) {
        const response = http.post(`${config.url}/main/products/insert`, JSON.stringify(items[i]), { headers: {
            'Content-Type': `application/json`,
            'X-API-KEY': config.api_key,
        } })
        
    }
}

