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

const headers = {
    'Content-Type': `application/json`,
}

export default () => {
    const userData = randomUserData()
    const registerRes = http.post(`${config.url}/collections/users/records`,
        JSON.stringify({
            email: userData.email,
            password: userData.password,
            passwordConfirm: userData.password,
            name: userData.name 
        }),
        {headers: headers})
        
    if (registerRes.status !== 200) {
        console.log(registerRes.body)
        return
    }
        
    const loginRes = http.post(`${config.url}/collections/users/auth-with-password`,
        JSON.stringify({
            identity: userData.email,
            password: userData.password
        }),
        {headers: headers}
    )
         
        
    if (loginRes.status !== 200) {
        return
    }
    
    const responseBody = JSON.parse(loginRes.body);
    const token = responseBody.token;

    headers["Authorization"] = `${token}`;
    
    // browsing products
    const products = http.get(`${config.url}/collections/products/records?perPage=50`, { headers: headers })
    const productBody = JSON.parse(products.body);
    
    if (products.status !== 200) {
        return
    }
    
    let boughtProducts = []
    const itemsBought = Math.floor(Math.random() * 2) + 1
    for (let i = 0; i < itemsBought; i++) {
        const randomProductId = parseInt(randomNumber(1, 50));
        const product = productBody.items[randomProductId]
        boughtProducts.push(product)
    }
    
    const amount = 1
    const totalPrice = boughtProducts.reduce((acc, product) => acc + (product.price * amount), 0);
    
    // buying product
    const body = JSON.stringify({
        data: {
            transaction: {
                status: randomStatus(),
                notes: randomNotes(),
                payment_method: randomPaymentMethod(),
                shipping_address: randomAddress(),
                amount: totalPrice
            },
            items: boughtProducts.map((product) => {
                return {
                    products: product.id,
                    amount: product.price * amount
                }
            }),
        }
    })
    
    const transaction = http.post(`${config.url}/transaction`, body, {headers: headers})

    if (transaction.status !== 200) {
        return
    }
}

/*

data_received..................: 20 MB  47 kB/s
data_sent......................: 20 MB  46 kB/s
http_req_blocked...............: avg=97.02µs  min=0s      med=0s      max=117.69ms p(90)=0s       p(95)=0s
http_req_connecting............: avg=47.75µs  min=0s      med=0s      max=55.76ms  p(90)=0s       p(95)=0s
http_req_duration..............: avg=592.34ms min=30.46ms med=38.21ms max=13.48s   p(90)=46.82ms  p(95)=10.06s
{ expected_response:true }...: avg=9.73s    min=46.6ms  med=10.8s   max=13.48s   p(90)=11.18s   p(95)=11.27s
http_req_failed................: 99.17% 86914 out of 87636
http_req_receiving.............: avg=182.91µs min=0s      med=0s      max=43.2ms   p(90)=585.04µs p(95)=800.9µs
http_req_sending...............: avg=64.34µs  min=0s      med=0s      max=5.45ms   p(90)=504.85µs p(95)=529.8µs
http_req_tls_handshaking.......: avg=48.77µs  min=0s      med=0s      max=96.97ms  p(90)=0s       p(95)=0s
http_req_waiting...............: avg=592.09ms min=30.46ms med=37.97ms max=13.48s   p(90)=46.59ms  p(95)=10.06s
http_reqs......................: 87636  206.578591/s
iteration_duration.............: avg=598.32ms min=31.66ms med=39.05ms max=41.45s   p(90)=48.35ms  p(95)=10.06s
iterations.....................: 86914  204.876668/s
vus............................: 2      min=1              max=200
vus_max........................: 200    min=200            max=200

*/