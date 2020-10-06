import Memcached from 'memcached'
var memcached = new Memcached('127.0.0.1:11211')

import memos from '../../db'

const db = {
    saveUrl : (slug, url) => {
        console.log(222,slug,url)
        memcached.set(slug, url, 604800, function (err, data) { 
            console.log("Save error", err, data) 
        });
    },
    fetchUrl : (slug) => {
        return new Promise((resolve, reject) => {
            memcached.get(slug, function (err, data) {
                if (err){
                    console.log("Read error", err)
                    reject(err)
                }else{
                    if (data){
                        resolve({memos:data})
                    }else{
                        resolve({memos: memos})
                    }
                }
            });
        })
    }
}
export default db