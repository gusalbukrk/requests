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
  'PHPSESSID': 'spn4jtf3mpkkcom1k4halki7u1',
  'biscoitobocabombonera': '1707651530-db4cec617d2c504445f75bbfba71ebf1d59819d2e539c82f4c8656b1c09d1e7c',
};
//
const html = await (await fetch('http://161.35.239.203/boca/team/problem.php', {
  headers: {
    cookie: `PHPSESSID=${cookies['PHPSESSID']}; biscoitobocabombonera=${cookies['biscoitobocabombonera']}`,
  },
})).text();
console.log(html);
