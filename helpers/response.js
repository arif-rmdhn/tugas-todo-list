class _response {
    sendResponse = async (res,data) => {
        try{
            if(data.code){
                res.status(data.code)

                delete data.code

                res.send(data)
                return true
            }

            res.status(data && data.status ? 200: 400)
            res.send(data)

            return true
        } catch(error){
            console.error('sendResponse respon helper Error: ',error)

            res.status(400).send({
                status: false,
                error
            })

            return false
        }
    }

    errorHandler = (err, req, res, next) => {
        console.log(err.code)
        res.status(500).send({
            status: false,
            error: err.message
        })
    }
}

module.exports = new _response()
