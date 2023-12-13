
const lowercaseMiddleware = (req, res, next) => {

    if (req.body) {

        for (let key in req.body) {

            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                const value = req.body[key]
                const lowercaseValue = value.toLowerCase()
                req.body[key] = lowercaseValue;
            }

        }
    }

    next()

}

module.exports = {
    lowercaseMiddleware
}