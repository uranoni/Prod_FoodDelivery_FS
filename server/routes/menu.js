const { Router } = require("express");
const _ = require("lodash");
const menuRouter = Router();
menuRouter.post("/create", async (req, res) => {
    if (!req.user) {
        res.status(401).send("User not found")
    }
    const { name } = req.body
    try {
        const newMenu = new req.db.Menu({name})
        const result = await newMenu.save()
        return res.send(result)
    } catch (error) {
        return res.status(401).send(error)
    }
});

menuRouter.delete('/remove/:id', async (req, res) => {
    const { _id } = req.params
    if(!req.user){
        res.status(404).send('user not found')
    }

    try {
       const result = await req.db.Menu.findOneAndRemove({_id})
       if(!result){
           res.status(404).send("can not find this menu")
       }
       res.send(reslut)
        
    } catch (error) {
        
    }

    
})

module.exports = menuRouter;
