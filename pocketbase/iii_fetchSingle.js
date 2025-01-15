import http from 'k6/http';
import { config } from './config.js';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 200,
    iterations: 10_000
};

export default () => {
    const response = http.get(`${config.url}/collections/test/records/3pfusj3qb8ktanw`, { headers: {
        'Content-Type': `application/json`,
        'Authorization': config.authorization
    }})
}

/*

data_received..................: 6.2 MB 267 kB/s
data_sent......................: 937 kB 40 kB/s
http_req_blocked...............: avg=2.77ms   min=0s      med=0s       max=212.69ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=681.47µs min=0s      med=0s       max=48.93ms  p(90)=0s       p(95)=0s
http_req_duration..............: avg=456.3ms  min=35.26ms med=431.86ms max=1.44s    p(90)=793.9ms  p(95)=922.71ms
{ expected_response:true }...: avg=456.3ms  min=35.26ms med=431.86ms max=1.44s    p(90)=793.9ms  p(95)=922.71ms
http_req_failed................: 0.00%  0 out of 10000
http_req_receiving.............: avg=329.83µs min=0s      med=122.2µs  max=130.01ms p(90)=830.7µs  p(95)=980.31µs
http_req_sending...............: avg=20.8µs   min=0s      med=0s       max=1.55ms   p(90)=0s       p(95)=64µs
http_req_tls_handshaking.......: avg=2.03ms   min=0s      med=0s       max=158.12ms p(90)=0s       p(95)=0s
http_req_waiting...............: avg=455.95ms min=34.26ms med=431.45ms max=1.44s    p(90)=792.77ms p(95)=922.17ms
http_reqs......................: 10000  431.48852/s
iteration_duration.............: avg=459.14ms min=35.26ms med=433.75ms max=1.44s    p(90)=793.9ms  p(95)=922.71ms
iterations.....................: 10000  431.48852/s
vus............................: 93     min=93         max=200
vus_max........................: 200    min=200        max=200

*/