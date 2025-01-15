import http from 'k6/http';
import { config } from './config.js';
import { randomAddress, randomNotes, randomNumber, randomPaymentMethod, randomStatus, randomUserData } from '../randomGenerator.js';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '60s', target: 50},
        { duration: '60s', target: 100},
        { duration: '60s', target: 200},
        { duration: '120s', target: 200},
        { duration: '60s', target: 100},
        { duration: '60s', target: 0},
    ]
};

const url = config.url

const headers = {
    'Content-Type': `application/json`,
    'X-API-KEY': config.api_key,
/*  */}

export default () => {
    // user registering
    const registerRes = http.post(`${url}/auth/users/register`,
        JSON.stringify({
            data: randomUserData(),
            returns_token: true
        }),
        {headers: headers})
        
        
    if (registerRes.status !== 200) {
        return
    }
    
    const responseBody = JSON.parse(registerRes.body);
    const token = responseBody.data.token;

    headers["Authorization"] = `Bearer ${token}`;
    
    // browsing products
    const products = http.get(`${url}/main/products/rows?page_size=50`, { headers: headers })
    if (products.status !== 200) {
        throw new Error("Failed to get products")
    }
    const productBody = JSON.parse(products.body);
    
    let boughtProducts = []
    const itemsBought = Math.floor(Math.random() * 2) + 1
    for (let i = 0; i < itemsBought; i++) {
        const randomProductId = parseInt(randomNumber(1, 50));
        const product = productBody.data[randomProductId]
        boughtProducts.push(product)
    }
    
    const amount = 1
    const totalPrice = boughtProducts.reduce((acc, product) => acc + (product.price * amount), 0);
    
    // buying product
    http.post(`${url}/transaction`, JSON.stringify({
        data: {
            transaction: {
                status: randomStatus(),
                notes: randomNotes(),
                payment_method: randomPaymentMethod(),
                shipping_address: randomAddress(),
                total_price: totalPrice
            },
            transaction_items: boughtProducts.map((product) => {
                return {
                    products: product.id,
                    amount: product.price * amount
                }
            }),
            products: boughtProducts.map((product) => {
                return {
                    id: product.id,
                    stock: `@stock - ${amount}`
                }
            })
        }
    }), {headers: headers})
}

/*

data_received..................: 51 MB  121 kB/s
data_sent......................: 4.6 MB 11 kB/s
http_req_blocked...............: avg=684.11µs min=0s       med=0s       max=144.47ms p(90)=0s      p(95)=0s
http_req_connecting............: avg=338.2µs  min=0s       med=0s       max=69.72ms  p(90)=0s      p(95)=0s
http_req_duration..............: avg=4.04s    min=37.81ms  med=2.37s    max=1m0s     p(90)=8.48s   p(95)=12.86s
{ expected_response:true }...: avg=3.99s    min=37.81ms  med=2.36s    max=58.09s   p(90)=8.4s    p(95)=12.69s
http_req_failed................: 0.41%  54 out of 12910
http_req_receiving.............: avg=1.8ms    min=0s       med=441.75µs max=175.41ms p(90)=4.02ms  p(95)=5.11ms
http_req_sending...............: avg=44.2µs   min=0s       med=0s       max=1.55ms   p(90)=103.4µs p(95)=506.7µs
http_req_tls_handshaking.......: avg=344.1µs  min=0s       med=0s       max=104.38ms p(90)=0s      p(95)=0s
http_req_waiting...............: avg=4.04s    min=37.37ms  med=2.37s    max=1m0s     p(90)=8.48s   p(95)=12.85s
http_reqs......................: 12910  30.72726/s
iteration_duration.............: avg=12.06s   min=208.59ms med=9.31s    max=1m34s    p(90)=25.33s  p(95)=33.19s
iterations.....................: 4319   10.279708/s
vus............................: 1      min=1           max=200
vus_max........................: 200    min=200         max=200
     
     */