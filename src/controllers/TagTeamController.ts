import { Router } from 'express'
const TagTeam = require('../models/tagteam')
const User = require('../models/user')

export const tagteamRouter = Router()

tagteamRouter.get('/', (req, res) => {
    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            TagTeam.find((err, tagteams) => {
                if (err) return res.status(500).send({ message: 'Internal Server error' })
                if (!tagteams) return res.status(404).send({ message: 'tagteams not founded!' })
                return res.status(200).send({ tagteams })
            })
        }
    })
})


tagteamRouter.get('/:id', (req, res) => {
    const tagteamId = req.params.id;
    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
        if(err) return res.status(500).send({message: 'Internal Server error'})
        if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            TagTeam.findById(tagteamId, (err, tagteam) => {
                if (err) return res.status(500).send({ message: 'Internal Server error' })
                if (!tagteam) return res.status(404).send({ message: 'tagteam not founded!' })
                else {
                    let userMorning
                    let userAfternoon
                    User.findOne({ _id: tagteam.userMorning }, (err, user) => {
                        if (err) return res.status(500).send({ message: 'Internal Server error, userMorning doesn´t finded' })
                        if (!user) return res.status(404).send({ message: 'user not finded!' })
                        else {
                            userMorning = user;
                            User.findOne({ _id: tagteam.userAfternoon }, (err, user) => {
                                if (err) return res.status(500).send({ message: 'Internal Server error, userMorning doesn´t finded' })
                                if (!user) return res.status(404).send({ message: 'user not finded!' })
                                else {
                                    userAfternoon = user;
                                    return res.status(200).send({ date: tagteam.date, userMorning, userAfternoon })
                                }
                            })
                        }
                    })
        
                }
            })
        }
    })
    
})

tagteamRouter.get('/date/:dateToSearch', (req, res) => {
    const dateToSearch = new Date(req.params.dateToSearch);
    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            TagTeam.findOne({ date: dateToSearch }, (err, tagteam) => {
                if (err) return res.status(500).send({ message: 'Internal Server error' })
                if (!tagteam) return res.status(404).send({ message: 'tagteam not founded!' })
                else {
                    let userMorning
                    let userAfternoon
                    User.findOne({ _id: tagteam.userMorning }, (err, user) => {
                        if (err) return res.status(500).send({ message: 'Internal Server error, userMorning doesn´t finded' })
                        if (!user) return res.status(404).send({ message: 'user not finded!' })
                        else {
                            userMorning = user;
                            User.findOne({ _id: tagteam.userAfternoon }, (err, user) => {
                                if (err) return res.status(500).send({ message: 'Internal Server error, userMorning doesn´t finded' })
                                if (!user) return res.status(404).send({ message: 'user not finded!' })
                                else {
                                    userAfternoon = user;
                                    return res.status(200).send({ date: tagteam.date, userMorning, userAfternoon })
                                }
                            })
                        }
                    })
        
                }
            })    
        }
    })
    
})


tagteamRouter.get('/getweek/:dateToSearch', (req, res) => {
    const dateToSearch = new Date(req.params.dateToSearch);
    const day = dateToSearch.getDay();

    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            const monday = new Date(dateToSearch);
            monday.setDate(dateToSearch.getDate() - day);
            const friday = new Date(monday);
            friday.setDate(monday.getDate() + 4);


            TagTeam.find({ date: { "$gte": monday, "$lte": friday } }, (err, tagteams) => {
                if (err) return res.status(500).send({ message: 'Internal Server error' })
                if (!tagteams) return res.status(404).send({ message: 'tagteams not founded!' })
                else return res.status(200).send({ tagteams })
            })
        }
    })

})

tagteamRouter.get('/date/:dateStart/:dateEnd', (req, res) => {
    const dateStart = new Date(req.params.dateStart);
    const dateEnd = new Date(req.params.dateEnd);

    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            TagTeam.find({ date: { "$gte": dateStart, "$lte": dateEnd } }, (err, tagteams) => {
                if (err) return res.status(500).send({ message: 'Internal Server error' })
                if (!tagteams) return res.status(404).send({ message: 'tagteams not founded!' })
                else return res.status(200).send({ tagteams })
            })
        }
    })
})

tagteamRouter.delete('/:id', (req, res) => {
    const tagteamId = req.params.id;
    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            TagTeam.findByIdAndRemove(tagteamId, (err, tagteamDeleted) => {
                if (err) return res.status(500).send({ message: 'Internal Server error, tagteam doesn´t Deleted' })
                if (tagteamDeleted) res.status(200).send({ message: 'tagteam Deleted successfully!' })
                else res.status(404).send({ message: 'tagteam not Deleted!' })
            })
        }
    })
})

tagteamRouter.delete('/date/:assign', (req, res) => {
    const assign = req.params.assign;
    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            TagTeam.findAndRemove({ date: assign }, (err, tagteamDeleted) => {
                if (err) return res.status(500).send({ message: 'Internal Server error, tagteam doesn´t Deleted' })
                if (tagteamDeleted) res.status(200).send({ messafe: 'tagteam Deleted successfully!' })
                else res.status(404).send({ message: 'tagteam not Deleted!' })
            })
        }
    })
})

tagteamRouter.delete('/date/:start/:end', (req, res) => {
    const start = new Date(req.params.start);
    const end = new Date(req.params.end);
    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{
            TagTeam.deleteMany({ date: { "$gte": start, "$lte": end } }, (err, tagteamDeleted) => {
                if (err) return res.status(500).send({ message: 'Internal Server error, tagteam doesn´t Deleted' })
                if (tagteamDeleted) res.status(200).send({ messafe: 'tagteam Deleted successfully!' })
                else res.status(404).send({ message: 'tagteam not Deleted!' })
            })
        }
    })
})

tagteamRouter.post('/', (req, res) => {
    const params = req.body;
    let tagteam = new TagTeam();
    const userId = req.headers['userid'];
    User.findById(userId, (err, user) =>{
		if(err) return res.status(500).send({message: 'Internal Server error'})
		if(!user) return res.status(404).send({message: 'user not founded!'})
        if(user.role != "admin") return res.status(401).send({message: 'permission denied!'})
        else{

            if (params.userMorning && params.userAfternoon && params.date) {
                tagteam.date = params.date
                tagteam.userMorning = params.userMorning
                tagteam.userAfternoon = params.userAfternoon

                TagTeam.findOne({ date: params.date }, (err, tagteamR) => {
                    if (err) return res.status(500).send({ message: 'Internal Server error' })
                    if (tagteamR) return res.status(404).send({ message: "tagteam founded in same date, check it!. tagteam desn't saved" })
                    else if (!tagteamR) {
                        tagteam.save((err, tagteam) => {
                            if (err) return res.status(500).send({ message: 'Internal Server error, tagteam doesn´t saved', err })
                            if (tagteam) res.status(200).send({ tagteam })
                            else res.status(404).send({ message: 'tagteam not saved!' })
                        })
                    }
                })
            } else {
                res.status(400).send({ message: 'Send all data please' })
            }
        }
    })
})