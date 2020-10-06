// import axios from 'axios'
import { setup } from 'axios-cache-adapter'

const api = setup({
    // `axios` options
    //baseURL: '/',

    // `axios-cache-adapter` options
    cache: {
        maxAge: 15 * 60 * 1000
    }
})

const cache = {}

const apis = {
    getMemos: (uid, forceDb = false) => {

        // const {mm, yy} = props.month
        // const uid = props.uid
        // let that = this
        return new Promise((resolve, reject) => {

            if (uid == 0) resolve([]) // clear

            if (cache[uid] && !forceDb) {
                resolve(cache[uid])
            } else {

                api.post('/api/get', {
                    uid: uid || '0',
                    lastName: 'ngonhan2k5'
                })
                    .then(function (response) {
                        console.log(66666, response)
                        // that.memoz = response.data
                        // var memos = Utils.populate(response.data, yy, mm) 
                        // that.setState(Object.assign({}, that.state, {memos: memos}))
                        console.log(7777, response.data);
                        cache[uid] = response.data
                        resolve(response.data)
                        // that.textInput.select()
                    })
                    .catch(function (error) {
                        console.log(error);
                        reject(error)
                    });
            }
        })
    },
    addMemo: (uid, memo) => {
        return new Promise(
            (resolve, reject) => {
                let c = cache[uid] || []
                c.push(memo)
                if (uid > 0){
                    api.post('/api/add', {
                        uid: uid ,
                        memo: memo
                    }).then(function (response) {
                        console.log(66666, response)
                        // that.memoz = response.data
                        // var memos = Utils.populate(response.data, yy, mm) 
                        // that.setState(Object.assign({}, that.state, {memos: memos}))
                        console.log(7777, response.data);
                        //cache[uid] = response.data
                        resolve(response)
                        // that.textInput.select()
                    })
                    .catch(function (error) {
                        console.log(error);
                        reject(error)
                    });
                }
                let items = c
                console.log('Add then Get:', items)
                resolve(items)
            }
        )
    },
    removeMemo: (uid, id) => {
        return new Promise(
            (resolve, reject) => {
                let c = cache[uid] || []
                c = c.filter( (item) => item._id !== id )
                console.log('Remove then Get:', id, c)

                if (uid > 0){
                    api.post('/api/remove', {
                        uid: uid ,
                        id: id
                    }).then(function (response) {
                        console.log(66666, response)
                        // that.memoz = response.data
                        // var memos = Utils.populate(response.data, yy, mm) 
                        // that.setState(Object.assign({}, that.state, {memos: memos}))
                        console.log(7777, response.data);
                        //cache[uid] = response.data
                        resolve(response)
                        // that.textInput.select()
                    })
                    .catch(function (error) {
                        console.log(error);
                        reject(error)
                    });
                }
                resolve(c)
                
            }
        )     
    }

}

export default api
export { apis }