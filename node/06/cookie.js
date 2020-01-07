const http = require('http')
const session = {}
http.createServer((req, res) => {
    const sessionKey = 'sid'

    if (req.url === '/favicon.ico') {
        return
    } else {
        const cookie = req.headers.cookie;
        console.log(cookie)
        if (cookie && cookie.indexOf(sessionKey) > -1) {
            res.end('come back!');
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
            const sid = pattern.exec(cookie)[1];
            console.log('session:', sid, session, session[sid])
        } else {
            const sid = (Math.random() * 999999).toFixed();
            res.setHeader('Set-Cookie', `${sessionKey}=${sid}`);
            session[sid] = { name: 'bobo!' };
            res.end('hellow world!');
        }
    }

}).listen(3000)