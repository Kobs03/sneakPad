import axios from 'axios'

// FILTER DUPLICATES USING SETS METHOD

const fetchApi = async (reqType, endpoint, datas, callback) => {
    return await axios({
        method: reqType,
        url: endpoint,
        data: datas,
    })
        .then(callback)
        .catch(err => console.log(err))
}

const removeDuplicate = (data) => {
    return [...new Set(data)]
}

export { removeDuplicate, fetchApi }