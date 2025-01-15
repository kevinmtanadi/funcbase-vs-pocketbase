import http from 'k6/http';
import { config } from './config.js';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 200,
    iterations: 10_000
};


export default () => {
    const response = http.get(`${config.url}/main/test/1`, { headers: {
        'X-API-KEY': config.api_key,
        'Authorization': config.authorization
    }})
}

/*

data_received..................: 5.4 MB 246 kB/s
data_sent......................: 950 kB 44 kB/s
http_req_blocked...............: avg=2.58ms   min=0s      med=0s       max=182.97ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=688.44µs min=0s      med=0s       max=49.81ms  p(90)=0s       p(95)=0s
http_req_duration..............: avg=431.58ms min=35.68ms med=212.14ms max=1.51s    p(90)=1.18s    p(95)=1.22s
{ expected_response:true }...: avg=431.58ms min=35.68ms med=212.14ms max=1.51s    p(90)=1.18s    p(95)=1.22s
http_req_failed................: 0.00%  0 out of 10000
http_req_receiving.............: avg=228.25µs min=0s      med=0s       max=14.51ms  p(90)=608.81µs p(95)=771.2µs
http_req_sending...............: avg=27.86µs  min=0s      med=0s       max=1.52ms   p(90)=0s       p(95)=184.75µs
http_req_tls_handshaking.......: avg=1.74ms   min=0s      med=0s       max=125.12ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=431.32ms min=35.17ms med=211.89ms max=1.51s    p(90)=1.18s    p(95)=1.22s
http_reqs......................: 10000  458.501937/s
iteration_duration.............: avg=434.22ms min=35.68ms med=214.44ms max=1.51s    p(90)=1.18s    p(95)=1.22s
iterations.....................: 10000  458.501937/s
vus............................: 200    min=200        max=200
vus_max........................: 200    min=200        max=200

*/