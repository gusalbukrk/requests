import { readFileSync } from 'node:fs';
import jsdom, { JSDOM } from 'jsdom';
import sha256 from 'crypto-js/sha256.js';

const savedCookies = '{"version":"tough-cookie@4.1.3","storeType":"MemoryCookieStore","rejectPublicSuffixes":false,"enableLooseMode":true,"allowSpecialUseDomain":true,"prefixSecurity":"silent","cookies":[{"key":"PHPSESSID","value":"q6dbmsrfpcb0rmilhvj1mbcd5q","domain":"161.35.239.203","path":"/","hostOnly":true,"creation":"2024-02-13T16:49:12.412Z","lastAccessed":"2024-02-13T16:49:12.412Z"},{"key":"biscoitobocabombonera","value":"1707842952-d912544e9311f24ab0f37e7bbb388277e876f3f1b9eb88ddef600272ff0a9720","expires":"2024-02-23T16:49:12.000Z","maxAge":864000,"domain":"161.35.239.203","path":"/boca","hostOnly":true,"pathIsDefault":true,"creation":"2024-02-13T16:49:12.414Z","lastAccessed":"2024-02-13T16:49:12.414Z"}]}';

// if not logged: create new cookie jar, print it to console (it must then be pasted savedCookies variable)
// if already logged: generate cookie jar from savedCookies variable
async function getCookieJar() {
  let cookieJar;

  if (savedCookies === '') { // if not logged in

    // cookieJar is useful if you want to share the same cookie jar among multiple jsdoms
    // or prime the cookie jar with certain values ahead of time
    cookieJar = (await JSDOM.fromURL("http://161.35.239.203/boca")).cookieJar;
    //
    // jsdom's cookie jars are provided by the `tough-cookie`
    // https://www.npmjs.com/package/tough-cookie#cookiejar
    //
    // get all cookies from a specific domain
    // console.log(cookieJar.getCookiesSync("http://161.35.239.203", {
    //   // do not scope cookies by path
    //   // needed because PHPSESSID is scoped to `/`, biscoitobocabombonera is scoped to `/boca`
    //   allPaths: true,
    // }));
    //
    const cookies = cookieJar.toJSON(); // all cookies from a jar in JSON format
    const getCookie = (key) => cookies.cookies.find(cookie => cookie.key === key).value;
    console.log('====== COPY THE FOLLOWING JSON STRING IN THE savedCookies VARIABLE ======');
    console.log(JSON.stringify(cookies));
    console.log('==========');
    //
    // const cookies = Object.fromEntries(
    //   cookieJar.toJSON().cookies.map(cookie => [ cookie.key, cookie.value ])
    // );
    // console.log(cookies);

    const hashedPassword = sha256(sha256('pass').toString() + getCookie('PHPSESSID')).toString();
    //
    const loginPage = await JSDOM.fromURL(`http://161.35.239.203/boca/index.php?name=team1&password=${hashedPassword}`, { cookieJar });
    // console.log(loginPage.window.document.documentElement.outerHTML);

  } else { // already logged in

    // if you want to use tough-cookie's utilities and classes yourself, you can use the jsdom's
    // toughCookie module export to get access to the tough-cookie module instance packaged with jsdom
    cookieJar = jsdom.toughCookie.CookieJar.fromJSON(savedCookies);
  }

  return cookieJar;
}

const cookieJar = await getCookieJar();
const cookieStr = cookieJar.getCookieStringSync('http://161.35.239.203', { allPaths: true });

// const problemPage = await JSDOM.fromURL(`http://161.35.239.203/boca/team/problem.php`, { cookieJar });
// console.log(problemPage.window.document.documentElement.outerHTML);

const headers = new Headers();
headers.append("Cookie", cookieStr);
//
// NOTE: mustn't set `Content-Type` header
// (e.g. `headers.append("Content-Type", "multipart/form-data")`)
// FormData will include it automatically together with an appropriate boundary
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects
// https://flaviocopes.com/fix-formdata-multipart-fetch/
// https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/

const body = new FormData();
body.append('confirmation', 'confirm');
body.append('problem', '1');
body.append('language', '1');
body.append('sourcefile', new Blob([ readFileSync('./A.c', { encoding: 'utf8', flag: 'r' }) ], { type: 'text/x-csrc' }), 'A.c');
body.append('Submit', 'Send');

const res = await fetch('http://161.35.239.203/boca/team/run.php', {
  method: 'POST',
  body,
  headers,
});

console.log("RAW BODY:", await res.text());