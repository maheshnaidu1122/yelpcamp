module.exports = fun => {
    return (req, res, next) => {
        // Run the function and catch any errors to pass to the next middleware
        fun(req, res, next).catch(next);
    }
}
