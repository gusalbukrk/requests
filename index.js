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
  'PHPSESSID': 's3l7k5qh5pasbqn1gcqardrkh9',
  'biscoitobocabombonera': '1707746500-538f2c14128106c7a28d16ef66d8f86a191557c9b59f234293eb5c752c2d6a48',
};
//
const html = await (await fetch('http://161.35.239.203/boca/team/problem.php', {
  headers: {
    cookie: `PHPSESSID=${cookies['PHPSESSID']}; biscoitobocabombonera=${cookies['biscoitobocabombonera']}`,
  },
})).text();
// console.log(html);

const { document } = (new JSDOM(html)).window;
console.log(document.querySelector("table:nth-of-type(3)").outerHTML);
