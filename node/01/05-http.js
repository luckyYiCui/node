/*
 * @Author: your name
 * @Date: 2019-12-25 15:10:55
 * @LastEditTime : 2019-12-25 16:09:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\01\05-http.js
 */
var fs = require('fs');
var http = require('http');

const server = http.createServer((request, response) => {
    const { url, method, headers } = request;
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/pain;charset=utf-8' })
                response.end('服务器错误')
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ name: 'marrsdsd' }));
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(response);
    }
})
server.listen(3000)