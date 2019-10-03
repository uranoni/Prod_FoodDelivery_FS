const { Router } = require("express");
const _ = require("lodash");
const storeRouter = Router();
storeRouter.post("/open", async (req, res) => {
    if (!req.user) {
        res.status(401).send("User not found")
    }
    
    const body = _.pick(req.body, [
        "name", "phone", "address", "businesshours",'location'
    ]);
    body.owner = req.user._id
    try {
        const newStore = new req.db.Store(body)
        const result = await newStore.save()
        return res.send(result)
    } catch (error) {
        return res.status(401).send(error)
    }
});

storeRouter.delete('/remove/:_id', async (req, res) => {
    const { _id } = req.params
    console.log(_id)
    try {
        const result = await req.db.Store.findOne({ _id })
        if (!result) {
            return res.status(404).send('can not find anything')
        }
        // console.log(req.user._id)
        // console.log(result.owner)
        // console.log(req.user._id.toString() == result.owner.toString())
        if (req.user._id.toString() != result.owner.toString()) {
            return res.status(402).send('It is not your store')
        }
            const data = await req.db.Store.findOneAndRemove({ _id })
            if (!data) {
                return res.status(404).send('can not find anything')
            }
            return res.send(data)
  
    } catch (error) {
        return res.status(404).send('can not find anything')
    }

    
})

module.exports = storeRouter;
