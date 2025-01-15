import http from 'k6/http';
import { config } from './config.js';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    vus: 200,
    iterations: 10_000
};

export default () => {
    
    const response = http.get(`${config.url}/collections/test/records?perPage=50`, { headers: {
        'Content-Type': `application/json`,
        'Authorization': config.authorization
    }})
}

/*

data_received..................: 163 MB 2.3 MB/s
data_sent......................: 1.5 MB 22 kB/s
http_req_blocked...............: avg=2.96ms   min=0s      med=0s     max=238.89ms p(90)=0s     p(95)=0s
http_req_connecting............: avg=655.97µs min=0s      med=0s     max=48.64ms  p(90)=0s     p(95)=0s
http_req_duration..............: avg=1.37s    min=44.52ms med=1.13s  max=4.05s    p(90)=2.11s  p(95)=2.24s
{ expected_response:true }...: avg=1.37s    min=44.52ms med=1.13s  max=4.05s    p(90)=2.11s  p(95)=2.24s
http_req_failed................: 0.00%  0 out of 10000
http_req_receiving.............: avg=6.34ms   min=0s      med=6.13ms max=100.57ms p(90)=9.29ms p(95)=11.72ms
http_req_sending...............: avg=15.27µs  min=0s      med=0s     max=1.51ms   p(90)=0s     p(95)=55.4µs
http_req_tls_handshaking.......: avg=2.16ms   min=0s      med=0s     max=184.97ms p(90)=0s     p(95)=0s
http_req_waiting...............: avg=1.36s    min=39.62ms med=1.12s  max=4.05s    p(90)=2.1s   p(95)=2.24s
http_reqs......................: 10000  143.76266/s
iteration_duration.............: avg=1.37s    min=44.52ms med=1.13s  max=4.05s    p(90)=2.11s  p(95)=2.24s
iterations.....................: 10000  143.76266/s
vus............................: 97     min=97         max=200
vus_max........................: 200    min=200        max=200

*/