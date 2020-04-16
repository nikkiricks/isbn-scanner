var request = require('request-promise');
require('dotenv').config();

let options = {
    method: 'GET',
    uri: `https://www.goodreads.com/search/index.xml?${process.env.key}&q=document.${getElementById("result").textContent}`,
    qs: {
        key: process.env.KEY,
        v: process.env.VERSION,
        shelf: process.env.SHELF,
        per_page: process.env.PER_PAGE
    }
}
console.log(options.uri)

request(options).then((shelf) => {
    console.log(shelf);
}).catch(err => console.error(err));
