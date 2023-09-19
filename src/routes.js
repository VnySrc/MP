import { Router }  from "express"
import path  from "path"
// import socketFunctions from "../socket"
import { createCharge, hook }  from "./controllers/mpController.js"

const router = Router()

router.get("/", (req, res) => {
    res.sendFile(path.resolve("src", "static", "index.html"));
})

router.get("/paid", (req, res) => {
    res.sendFile(path.resolve("src", "static", "paid.html"));
})
    
router.post("/webhook/:slug", hook)

// Router.get("/teste", )

// Router.post("/hook/:id", socketFunctions.emitPaid())

export default router
