// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const router = express.Router();
const { checkAction, checkId} = require('./actions-middlware')

router.get('/',  (req, res,next) =>{
    Actions.get()
    .then(actions =>{
        res.json(actions)
    })
    .catch(next)
})

router.get('/:id', checkId, (req, res, next) =>{
    res.json(req.action)
})

router.post('/', checkAction,(req, res, next) =>{
    Actions.insert(req.body)
    .then(action =>{
        res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id',[checkAction,checkId], (req, res, next) =>{
    Actions.update(req.params.id, req.body)
    .then(()=>{
        return Actions.get(req.params.id)
    })
    .then(action =>{
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', [checkId], async(req, res, next) =>{
    try{
        await Actions.remove(req.params.id)
        res.json({message: 'action removed'})
    }catch(err){
        next(err)
    }
})


router.use((err, req, res, next) =>{
    res.status(req.status || 500).json({
        message: req.message

    })
})


module.exports = router;
