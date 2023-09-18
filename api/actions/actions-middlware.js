const Actions = require('./actions-model')

async function checkId (req,res,next) {
    try{
        const valId = await Actions.get(req.params.id)
        if(!valId){
           res.status(404).json('action not found')
        }else{
            req.action = valId
            next()
        }
        }catch(err){
            res.status(500).json({
                message: 'error finding action'
            })
        }
}

function checkAction (req,res,next){
    const { project_id, description, notes } = req.body
    if (project_id && description && notes)
        next()
    else
        res.status(400).json({message: 'action must have project id, description, and notes'})
}
module.exports = {
    checkId,
    checkAction
}