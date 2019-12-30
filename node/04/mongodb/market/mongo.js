/*
 * @Author: your name
 * @Date: 2019-12-27 14:28:01
 * @LastEditTime : 2019-12-27 15:40:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\04\mongodb\mongo.js
 */
(async() => {
    // 引入mongodb
    const { MongoClient: MongoDB } = require('mongodb');
    // 创建客户端
    const client = new MongoDB(
        'mongodb://localhost:27017', {
            // 防止新老版本出现问题
            useNewUrlParser: true
        }
    )

    let ret;
    // 创建连接
    ret = await client.connect();
    // console.log('ret', ret);
    const db = client.db('test');
    const fruits = db.collection('fruits');

    // 添加文档
    ret = await fruits.insertOne({
        name: '香蕉',
        price: 2.5
    })

    // 查询文档
    ret = await fruits.findOne();
    console.log(ret)

    //更新文档
    ret = await fruits.updateOne({ name: '香蕉' }, {
        $set: { name: '橙子' }
    })

    // 删除文档
    ret = await fruits.deleteOne({ name: '橙子' })

    await fruits.deleteMany();
    client.close();
})()