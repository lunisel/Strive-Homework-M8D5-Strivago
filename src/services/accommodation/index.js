import express from 'express'
import AccommodationModel from '../accommodation/schema.js'

const accommodationRouter = express.Router()

accommodationRouter.post('/' , async (req, res, next ) => {
    try {
        const newAccomodation = new AccommodationModel(req.body)
        const {_id} = await newAccomodation.save()

        res.status(201).send({_id})
    } catch (error) {
        next(error)
        console.log(error);
    }
})

accommodationRouter.get('/', async (req, res, next) => {
    try {
        const accomodations = await AccommodationModel.find()
        res.send(accomodations)
    } catch (error) {
        next(error)
        console.log(error);
    }
})


accommodationRouter.get('/:accommodationId', async (req, res, next)=> {
    try {
        const accommodation = await AccommodationModel.findById(req.params.accommodationId)
        res.send(accommodation)
    } catch (error) {
        next(error)
        console.log(error);
    }
}
)

accommodationRouter.put('/:accommodationId', async (req, res, next)=> {
    
})



export default accommodationRouter