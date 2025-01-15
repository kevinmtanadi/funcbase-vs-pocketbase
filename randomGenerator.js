const statusList = ["shipped", "completed", "canceled", "refunded"];
const paymentMethodList = ["cash", "credit_card", "debit_card", "paypal"];
const notes = ["Taroh depan pintu", "titip lobby", "jangan dibuka", ""];
const mainStreet = [
    "Antara", "MT. Haryono", "Ahmad Yani", "Pahlawan", "DI Pandjaitan",
    "R. Suprapto", "Tj. Duren", "Mangga Besar", "Mangga", "Kebon Jati",
    "Bina Karya", "Buaran Raya", "Ganggeng Raya", "Tj Morawa",
    "Raya Mastrip Kebraon", "Jend. Sudirman", "Gergaji", "Tanjung Selor",
    "Madrasah", "Gayam", "Bintaro Jaya", "Sunan Giri", "Rawamangun",
    "Budi", "Antara", "Kebon Jeruk"
];
const email_1 = [
    "john", "wok", "wokwok", "awokawok", "awokwokwok", "tester", "admining",
    "mikael", "robuela", "abuela", "granny", "feeding", "frenzy", "jane",
    "jordan", "michael", "mike", "kevin", "will", "william", "buck", "genie",
    "antonella", "valensia", "risa", "metta", "justin", "ivan", "dwi", "darma",
    "vino", "noviandy", "gauri", "paulina", "armani", "lorelei", "shepard", "anaya",
    "richard", "linda", "ayan", "journey", "andres", "logan", "ryder", "isabela",
    "thiago", "imani", "cline", "lucille", "hunter", "hickman", "giana", "wolfe", "otto",
    "mejia", "saoirse", "karter", "stokes", "adelaide", "tate", "maldonado", "emmeline",
    "ware", "cooper", "finley", "gloria", "nixon", "kamden", "franklin", "kiaan",
    "khaleesi", "padulla", "enzo", "zuri", "ira", "haylee", "silva", "keyla", "korbin",
    "alana", "pearson", "maximo", "west", "murphy", "davidson", "jayla", "andrews",
    "eric", "estrada"
];

const middle = [
    ".", "_", "-", "x"
]
const email_2 = [
    "doe", "dae", "papa", "mama", "ama", "razi", "riza", "reski", "rezki", "123",
    "rezky", "asdasd", "1241t", "aofk1", "dea", "65", "12", "23", "1242", "2342",
    "6523", "tan", "lim", "geraldi", "williams", "jack", "spurs", "wow", "mighty",
    "splendid", "awesome", "tor", "bucker", "nill", "maoler", "aitana", "fischer",
    "john", "wok", "wokwok", "awokawok", "awokwokwok", "tester", "admining",
    "mikael", "robuela", "abuela", "granny", "feeding", "frenzy", "jane",
    "jordan", "michael", "mike", "kevin", "will", "william", "buck", "genie",
    "antonella", "valensia", "risa", "metta", "justin", "ivan", "dwi", "darma",
    "vino", "noviandy", "gauri", "paulina", "armani", "lorelei", "shepard", "anaya",
    "richard", "linda", "ayan", "journey", "andres", "logan", "ryder", "isabela",
    "thiago", "imani", "cline", "lucille", "hunter", "hickman", "giana", "wolfe", "otto",
    "mejia", "saoirse", "karter", "stokes", "adelaide", "tate", "maldonado", "emmeline",
    "ware", "cooper", "finley", "gloria", "nixon", "kamden", "franklin", "kiaan",
    "khaleesi", "padulla", "enzo", "zuri", "ira", "haylee", "silva", "keyla", "korbin",
    "alana", "pearson", "maximo", "west", "murphy", "davidson", "jayla", "andrews",
    "eric", "estrada"
];

export const randomAddress = () => {
    const streetNumber = Math.floor(Math.random() * 999);
    return `Jl. ${mainStreet[Math.floor(Math.random() * mainStreet.length)]} ${streetNumber}`;
};

export const randomUserData = () => {
    const email = `${email_1[Math.floor(Math.random() * email_1.length)]}${middle[Math.floor(Math.random() * middle.length)]}${email_2[Math.floor(Math.random() * email_2.length)]}${Math.floor(Math.random() * 999999)}@gmail.com`;
    const name = `${email_1[Math.floor(Math.random() * email_1.length)]}${middle[Math.floor(Math.random() * middle.length)]}${email_2[Math.floor(Math.random() * email_2.length)]}`;
    return { email, password: "password", name };
};

export const randomStatus = () => {
    return statusList[Math.floor(Math.random() * statusList.length)]
}

export const randomPaymentMethod = () => {
    return paymentMethodList[Math.floor(Math.random() * paymentMethodList.length)]
}

export const randomNotes = () => {
    return notes[Math.floor(Math.random() * notes.length)]
}

export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}