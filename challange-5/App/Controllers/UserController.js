module.exports = {
    async user(req, res){
        try {
            const user =  req.user
            res.status(200).json({
                "status": "200 OK",
                "data": user
            });
        } catch (error) {
            res.status(500).json({
                "status": "Internal Server Error",
                "message": error.message
            })
        }
    }
}