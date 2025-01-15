import http from 'k6/http';
import { config } from './config.js';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 200,
    iterations: 10_000
};


export default () => {
    const response = http.get(`${config.url}/main/test/rows?page_size=50`, { headers: {
        'X-API-KEY': config.api_key,
        'Authorization': config.authorization
    }})
}

/*

data_received..................: 127 MB 2.5 MB/s
data_sent......................: 1.5 MB 29 kB/s
http_req_blocked...............: avg=2.69ms   min=0s      med=0s       max=191.63ms p(90)=0s     p(95)=0s
http_req_connecting............: avg=819.82µs min=0s      med=0s       max=54.88ms  p(90)=0s     p(95)=0s
http_req_duration..............: avg=1.01s    min=41.41ms med=776.38ms max=2.57s    p(90)=1.94s  p(95)=2.11s
{ expected_response:true }...: avg=1.01s    min=41.41ms med=776.38ms max=2.57s    p(90)=1.94s  p(95)=2.11s
http_req_failed................: 0.00%  0 out of 10000
http_req_receiving.............: avg=6.1ms    min=0s      med=5.72ms   max=349.85ms p(90)=8.75ms p(95)=10.55ms
http_req_sending...............: avg=22.06µs  min=0s      med=0s       max=1.5ms    p(90)=0s     p(95)=74µs
http_req_tls_handshaking.......: avg=1.76ms   min=0s      med=0s       max=149.21ms p(90)=0s     p(95)=0s
http_req_waiting...............: avg=1.01s    min=36.1ms  med=771.09ms max=2.56s    p(90)=1.94s  p(95)=2.1s
http_reqs......................: 10000  194.119951/s
iteration_duration.............: avg=1.02s    min=41.41ms med=781.72ms max=2.57s    p(90)=1.94s  p(95)=2.11s
iterations.....................: 10000  194.119951/s
vus............................: 131    min=131        max=200
vus_max........................: 200    min=200        max=200

*/