// import React from "react";
// import App from './../../js/com/App'
import db from '../db'
// import utils from '../utils'

// import { renderToString } from 'react-dom/server';
// import Html from '../Html'
// var fs = require("fs");

const routes = {
    add: (req, res, next) => {
        console.log('Add', req.body.memo)
        let {uid, memo} = req.body
        
        db.addMemo(uid, memo)

        let shortUrl = (process.env.NODE_ENV=="production"?"http://idbi.me/":"http://localhost:5000/" )+ url

        res.json({ shortedUrl: shortUrl })
        // res.send('OK')
        res.end()
    },
    remove: (req, res, next) => {
        console.log('Add', req.body.id)
        let {uid, id} = req.body
        
        db.removeMemo(uid, id)

        let shortUrl = (process.env.NODE_ENV=="production"?"http://idbi.me/":"http://localhost:5000/" )+ url

        res.json({ shortedUrl: shortUrl })
        // res.send('OK')
        res.end()
    },
    fetch: (req, res, next) => {
        console.log("Fetch", req.body)
        // let url = codenamize(req.body.url)
        //let slug = `${req.params.url}-${req.params.lru}`
        if (!req.body.uid || req.body.uid == 0)
            res.end()
        else
            db.fetchMemos(req.body.uid).then(
                (data)=>{
                    try{
                        console.log("Fetched: ", data)
                        if (!data)
                            next(new Error('Link not found in db, please shorten once'))
                        // else if (!utils.isSafeUrl(data.url, slug))
                        //     next(new Error('Link is not safe to redirect'))
                        else
                            res.send(data)
                    }catch(e){
                        res.end()
                    }
        
                }),
                (err) => {
                    console.log("Fetch fail",err)
                    res.send({errMsg:'Fetch Link error'})
                    res.end()
                }
    },
    errorPage: function (compiler, errorFile){
        
        return function (err, req, res, next) {

            
            console.error('AAA', err.message, errorFile)
            if (res.headersSent) {
                return next(err)
            }
            // res.status(500)
            //res.render('error', { error: err })

            // const body = renderToString(<App />);

            // compiler.outputFileSystem.readFile(htmlFile, (err, result) => {
                // fs.readFile(errorFile, "utf8", (err1, result) => {
                //         if (err1) {
                //             return next(err1)
                //         }
                //         res.status(500)
                //         res.set('content-type', 'text/html')
                //         res.send(result.replace('$ERROR$', err.message))
                //         res.end()
                //     })
            // // console.log(body)
            // const title = 'Server side Rendering with Styled Components';

            // res.send(Html(body, title))
        }
    }
}


export default routes