import { JSDOM } from 'jsdom';

// import cookie from 'cookie';
// import sha256 from 'crypto-js/sha256.js';
// //
// const r = await fetch('http://161.35.239.203/boca');
// const cookies = cookie.parse(
//   r.headers.getSetCookie().map(str => str.replace(/;.*$/, '')).join('; ')
// );
// console.log(cookies);
// //
// const hashedPassword = sha256(sha256('pass').toString() + cookies['PHPSESSID']).toString();
// //
// const login = await fetch(`http://161.35.239.203/boca/index.php?name=team1&password=${hashedPassword}`, {
//   headers: {
//     cookie: `PHPSESSID=${cookies['PHPSESSID']}; biscoitobocabombonera=${cookies['biscoitobocabombonera']}`,
//   },
// });

// run code above once to get the cookies and paste them in the object below
// then comment the code above and uncomment the code below
// in the future, will store the cookies in a file and read from it
const cookies = {
  'PHPSESSID': '1r97j20f88jg4103tltm50aang',
  'biscoitobocabombonera': '1707764131-d791d93d486a9cb13b6a8c88dd2b579b16cfc17cd4b49cb4e9b7bdf36b7e7fdb',
};
//
const html = await (await fetch('http://161.35.239.203/boca/team/problem.php', {
  headers: {
    cookie: `PHPSESSID=${cookies['PHPSESSID']}; biscoitobocabombonera=${cookies['biscoitobocabombonera']}`,
  },
})).text();
// console.log(html);

const { document } = (new JSDOM(html, { url: 'http://161.35.239.203' })).window;

document.querySelectorAll("table:nth-of-type(3) img").forEach(img => {
  img.src = img.src;
});

console.log(document.querySelector("table:nth-of-type(3)").outerHTML);
