const {
	CreateNewUser,
} = require("../services/users-svc");

async function seeding(){
	//Adding Admin user
	try{
	console.log(await CreateNewUser({email:'admin@iicdcrustm.com',username:'admin',phone:"1234567890",password:process.env.adminUserPass,firstName:'admin'}))
	}catch(err){
		console.log(err)
	}
} 

module.exports = {seeding}