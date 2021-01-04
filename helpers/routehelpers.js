const Joi = require('joi')



module.exports = {
    validateParam:(schema, name)=>{
        return(req, res,next)=>{
            const result = schema.idSchema({userId:req['params'][name]})
            console.log('result',result)
            if(result.error){
               return res.status(400).json(result.error)
            }else{
                 next()
            }
        }
    },
    schemas:{
        idSchema :Joi.object().keys({
         userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}
