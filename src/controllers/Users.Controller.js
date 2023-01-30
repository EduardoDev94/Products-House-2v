const getInfoFromDatabase = require ('../utils/getInfoFromDatabase')
const {randomUUID} = require ("crypto")
const path = require ('path')
const fs = require ('fs')

const UsersController = {
    listAll: (req,res) =>{
        const users = getInfoFromDatabase("users")
        return res.json(users)
    },
    listOne: (req,res) =>{
        const { id } = req.params
        const users = getInfoFromDatabase("users")
        const userFound = users.find ((user)=> user.id === id)
        if (!userFound){
            res
            .status(404)
            .json ({message: "Não existe usuário com essa id"})
        }
        return res.json(userFound)
    },
    create: (request, response) => {
        const { name, age } = request.body;
    
        const newUser = {
          id: randomUUID(),
          name,
          age,
          status: true,
        };
    
        const users = getInfoFromDatabase("users")
    
        const usersUpdated = [...users, newUser]
    
        const usersUpdatedJSON = JSON.stringify(usersUpdated)
    
        const filePath = path.join(__dirname, "..", "models", "users.json")
    
        fs.writeFileSync(filePath, usersUpdatedJSON)
        return response
        .status(201)
        .json({ message: "O usuário foi criado com sucesso" })
    },
    delete: (req,res)=>{
        const { id } = req.params;
        const users = getInfoFromDatabase("users")
        
        const usersFiltered = users.filter((user) => user.id !== id)
        
        const usersUpdatedJSON = JSON.stringify(usersFiltered)
        
        const filePath = path.join(__dirname, "..", "models", "users.json")

        fs.writeFileSync(filePath, usersUpdatedJSON)
        return res
        .json({message: "O usuário foi deletado com sucesso"})

    }
}

module.exports = UsersController