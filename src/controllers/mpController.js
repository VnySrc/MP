import mpServices from "../services/mpServices.js"

async function createCharge (socketID) {
    try {
        const response = await mpServices.createCharge(socketID)

        if (response instanceof Error) {
            return("Error no createCharge") 
        }else {
            return(response)
        }
    }catch (err) {
        console.log(err)
        return(err)
    }
}


async function hook (req, res) {
    const { slug } = req.params

    try {
        const response = await mpServices.hook(req.body, slug)

        if (response instanceof Error) {
            res.json({status: true}) 
        }else {
            res.json({status: true}) 
        }
    }catch (err) {
        console.log(err)
        res.json({status: true}) 
    }
}
export { createCharge, hook }