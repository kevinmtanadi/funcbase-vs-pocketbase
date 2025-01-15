import http from 'k6/http';
import { config } from './config.js';
import { randomAddress, randomNotes, randomNumber, randomPaymentMethod, randomStatus } from '../randomGenerator.js';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 200,
    iterations: 10_000
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
    
    const response = http.post(`${config.url}/collections/test/records`, JSON.stringify(data), { headers: {
        'Content-Type': `application/json`,
        'Authorization': config.authorization
    }})
}

/*

data_received..................: 6.0 MB 292 kB/s
data_sent......................: 2.8 MB 137 kB/s
http_req_blocked...............: avg=2.95ms   min=0s      med=0s       max=347.27ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=770.23µs min=0s      med=0s       max=321.69ms p(90)=0s       p(95)=0s
http_req_duration..............: avg=404.76ms min=32.95ms med=536.37ms max=1.55s    p(90)=556.49ms p(95)=565.04ms
{ expected_response:true }...: avg=421.2ms  min=33.03ms med=537.66ms max=1.55s    p(90)=557.08ms p(95)=565.64ms
http_req_failed................: 4.51%  452 out of 10000
http_req_receiving.............: avg=315.94µs min=0s      med=152.79µs max=69.05ms  p(90)=807.41µs p(95)=953.6µs
http_req_sending...............: avg=34.86µs  min=0s      med=0s       max=1.52ms   p(90)=0s       p(95)=504.9µs
http_req_tls_handshaking.......: avg=2.05ms   min=0s      med=0s       max=183.18ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=404.41ms min=32.18ms med=536.05ms max=1.54s    p(90)=556.06ms p(95)=564.8ms
http_reqs......................: 10000  484.775866/s
iteration_duration.............: avg=407.8ms  min=32.99ms med=536.5ms  max=1.55s    p(90)=556.65ms p(95)=565.14ms
iterations.....................: 10000  484.775866/s
vus............................: 183    min=183          max=200
vus_max........................: 200    min=200          max=200

*/