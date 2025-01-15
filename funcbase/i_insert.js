import http from 'k6/http';
import { config } from './config.js';
import { randomAddress, randomNotes, randomNumber, randomPaymentMethod, randomStatus } from '../randomGenerator.js';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 200,
    iterations: 10_000,
};

export default () => {
    const data = {
        user_id: parseInt(randomNumber(1, 2000)),
        product_id: parseInt(randomNumber(1, 2000)),
        amount: randomNumber(1, 49) * 100,
        status: randomStatus(),
        payment_method: randomPaymentMethod(),
        shipping_address: randomAddress(),
        notes: randomNotes(),
    }
    
    const response = http.post(`${config.url}/main/test/insert`, JSON.stringify(data), { headers: {
        'Content-Type': `application/json`,
        'X-API-KEY': config.api_key,
        'Authorization': config.authorization
    } })
}

/*

data_received..................: 5.1 MB 327 kB/s
data_sent......................: 2.9 MB 182 kB/s
http_req_blocked...............: avg=2.94ms   min=0s      med=0s       max=203.81ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=841.26µs min=0s      med=0s       max=69.45ms  p(90)=0s       p(95)=0s
http_req_duration..............: avg=304.3ms  min=38.35ms med=300.61ms max=1.98s    p(90)=371.5ms  p(95)=394.49ms
{ expected_response:true }...: avg=304.3ms  min=38.35ms med=300.61ms max=1.98s    p(90)=371.5ms  p(95)=394.49ms
http_req_failed................: 0.00%  0 out of 10000
http_req_receiving.............: avg=218.4µs  min=0s      med=0s       max=13.59ms  p(90)=617.94µs p(95)=829.94µs
http_req_sending...............: avg=46.56µs  min=0s      med=0s       max=2.52ms   p(90)=63.91µs  p(95)=508.7µs
http_req_tls_handshaking.......: avg=1.96ms   min=0s      med=0s       max=135.8ms  p(90)=0s       p(95)=0s
http_req_waiting...............: avg=304.03ms min=37.69ms med=300.34ms max=1.98s    p(90)=371.13ms p(95)=394.43ms
http_reqs......................: 10000  638.569947/s
iteration_duration.............: avg=307.33ms min=38.54ms med=301.01ms max=1.98s    p(90)=374.19ms p(95)=397.77ms
iterations.....................: 10000  638.569947/s
vus............................: 200    min=200        max=200
vus_max........................: 200    min=200        max=200

*/