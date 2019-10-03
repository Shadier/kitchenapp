import { Router } from 'express'
const theUser  =    require('../models/user')

export const userRouter = Router()
userRouter.get('/', (req, res) => {
	theUser.find({status:true,userIA:false},(err1, users) =>{
		if(err1) return res.status(500).send({message: 'Internal Server error'})
		if(!users) return res.status(404).send({message: 'users not founded!'})
		if(users) return res.status(200).send({users})

		
		
	})
})

userRouter.get('/total', (req, res) => {
	theUser.find((err1, users) =>{
		if(err1) return res.status(500).send({message: 'Internal Server error'})
		if(!users) return res.status(404).send({message: 'users not founded!'})
		if(users) return res.status(200).send({users})

		
		
	})
})

userRouter.get('/:id', (req, res) => {
	const userId = req.params.id;
	if(req.params.id!=null){
		theUser.findById(userId, (err, user) =>{
			const temp=user.last_partner 
			if(temp!=null){
				theUser.findById(temp, (err, partner) =>{
					if(err) return res.status(500).send({message: 'Internal Server error'})
					if(!partner) return res.status(404).send({message: 'user not founded!'})
					return res.status(200).send({user,partner})
				})

			}
			else{
				if(err) return res.status(500).send({message: 'Internal Server error'})
				if(!user) return res.status(404).send({message: 'user not founded!'})
				return res.status(200).send({user})
	}

		})
	}


})


userRouter.post('/create',(req,res)=>{
	const params= req.body;
	let usuario = new theUser();
	usuario.last_partner=null;
	usuario.name= params.name;
	usuario.status= true;
	usuario.lastname=params.lastname;
	usuario.email=params.email;
	usuario.password= params.password;
	usuario.role=params.role;
	usuario.userIA= params.userIA;
	usuario.monday=params.monday;
	usuario.tuesday=params.tuesday;
	usuario.wednesday=params.wednesday;
	usuario.thursday=params.thursday;
	usuario.friday=params.friday;
	usuario.remoteDays=params.remoteDays;
	usuario.last_day=params.last_day;
	usuario.report=params.report;
	usuario.save((err,usrsave)=>{
		if(err) return res.status(500).send({message: 'Internal Server error, User doesn´t saved'})
		if(usrsave) res.status(200).send({client: usrsave})
		else res.status(404).send({message: 'Usuario not saved!'})
	})

})

userRouter.delete('/:id', (req, res) => {
	const userId = req.params.id;
	if(req.params.id!=null){
		theUser.update({_id:userId},{$set: {status:false}},(err,upday)       =>{
				if(err) return res.status(500).send({message: 'Internal Server error'})
				if(!upday) return res.status(404).send({message: 'user not founded!'})
				return res.status(200).send({upday})
	

		})
	}


})


userRouter.patch('/update',(req,result)=>{
	const params= req.body;
	const leId=params.id;
	theUser.update({_id:leId},{$set: params},(err,res)=>{
		if(err) return result.status(500).send({message: 'Internal Server error, User doesn´t saved'})
		if(res) result.status(200).send({client: res})
		else result.status(404).send({message: 'Usuario not saved!'})
	})
})





