const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
dotenv.config();

const FriendRequest= require('../models/friendRequests')
const friendRequest = FriendRequest.build(); 

const SendRequest= require('../models/sentRequests')
const sendRequest = SendRequest.build(); 


const Friend= require('../models/friends');
const friend=Friend.build();


class User extends Model 
{

    async listAll()
    {
        return await User.findAll();
    }


    async countAll()
    {
        return await User.count();
    }

    async listAllUsers(usuario)
    {
        const Op = require('sequelize').Op;
        return await User.findAll(
        {
            where:
            {
                usuario:  { [Op.ne]: usuario }
            }

        });
    }


    async countAllUsers()
    {
        const Op = require('sequelize').Op;

        return await User.count(
        {
            where:
            {
                usuario:  { [Op.ne]: usuario }
            }
        }
        );
    }

  

/*FUNCTION ADDUSERCREATE
Sequelize proporciona el método create, que combina los métodos build y save en un solo método:
*/

    async addUserCreate(nombre,apellido, email, usuario, password,tipo)
    {
        return await User.create(
        {
            nombre: nombre,
            apellido:apellido,
            email: email,
            usuario:usuario,
            password: password,
            administrador: tipo,
            imagen: 'user.png',
        });

    }



/*FUNCION FINDFIRSTMATCH
Aquí el findOne método obtiene la primera entrada que encuentra (que cumple con las opciones de consulta opcionales, 
si se proporcionan).*/

    async  findFirstMatch(usuario)
    {
        return await User.findOne(
        { 
            where: 
            { 
                usuario: usuario 
            } 
        });
        
    }

/*FUNCION FINDBYPRIMARYKEY
Aquí el findByPk método obtiene solo una entrada de la tabla, utilizando la clave primaria proporcionada. 
*/
    async findByPrimaryKey(id)
    {
        return await User.findByPk(id);
    }



    async findByEdit(idUser)
    {
        return await User.findAll(
        {
            where: 
            {
              id: idUser
            }
        });
    }



    async editUser(nombre,apellido,email,usuario,password,administrador,id)
    {
        await User.update({ nombre: nombre, apellido: apellido,email: email,usuario:usuario,password:password,administrador:administrador }, {
            where: {
              id:  id
            }
          });
    }


    async countAllUsersByUsername(usuario,id)
    {

        const Op = require('sequelize').Op;
       


        return await User.count(
        {
            where:
            {
                usuario: usuario,
                id:  { [Op.ne]: id }
            }
        });

      
    }




    async deleteUser(idUser)
    {
        await User.destroy({
            where: {
              id: idUser
            }
          });
    }



    async editUserSkills(base_datos,apis,testing,seguridad,teoria_objetos,nodejs,frontend,swagger,javascript,calidad_codigo,velocidad_entrega,performance_codigo,enfocado,trabajo_equipo,comprometido,comunicacion,capacidad_aprendizaje,resolucion_problema,versionado_git,trello,slack,metodologias_agiles,id)
    {
        await User.update(
            { 
            base_datos:base_datos,
            apis:apis,
            testing:testing,
            seguridad:seguridad,
            teoria_objetos:teoria_objetos,
            nodejs:nodejs,
            frontend:frontend,
            swagger:swagger,
            javascript:javascript,
            calidad_codigo:calidad_codigo,
            velocidad_entrega:velocidad_entrega,
            performance_codigo:performance_codigo,
            enfocado:enfocado,
            trabajo_equipo:trabajo_equipo,
            comprometido:comprometido,
            comunicacion:comunicacion,
            capacidad_aprendizaje:capacidad_aprendizaje,
            resolucion_problema:resolucion_problema,
            versionado_git:versionado_git,
            trello:trello,
            slack:slack,
            metodologias_agiles:metodologias_agiles

            }, {
            where: {
              id:  id
            }
          });
    }




    async editUserProfile(acerca_de_mi,conocimientos_extras,pais,ciudad,edad,estudios,idiomas,linkedin,hobbies,id)
    {
        await User.update(
            { 
            acerca_de_mi: acerca_de_mi,
            conocimientos_extras:conocimientos_extras,
            pais:pais,
            ciudad:ciudad,
            edad:edad,
            estudios:estudios,
            idiomas:idiomas,
            linkedin:linkedin,
            hobbies:hobbies


            }, {
            where: {
              id:  id
            }
          });
    }

    

    compareAsync(param1, param2) 
    {
        return new Promise(function(resolve, reject) 
        {
            bcrypt.compare(param1, param2, function(err, res) 
            {
                if (err) 
                {
                     reject(err);
                } else 
                {
                     resolve(res);
                }
            });
        });
    }



    async generaToken (data)
    {
        try {
            let resultado = jwt.sign({
                data}, process.env.SECRET_KEY
            )
            return resultado
        }catch (err){
            console.log(err)
            throw new Error (err)
        }
    }


    async getUserInnerJoinByIdUser(id_usuario)
    {
        return await User.findAll({
       
           raw: true,
           nest: true ,// unflattens but does not fix problem
           where: {id: id_usuario},
           include: { all: true }
          /* include: [
            
            {
               
            model: Month,
        
            required: true,
          
            }]*/
                
          });
    }


    


    async sendFriendRequest(idUserOwner,idFriend)
    {     // add my data to friend friendRequests
        // add friend data to my sentRequests
      
        await friendRequest.addFriendRequest(idUserOwner,idFriend);
        await sendRequest.addSendRequest(idUserOwner,idFriend);
    }


    async cancelFriendRequest(idUserOwner,idFriend)
    {     
         // remove me from friend friendRequests
        // remove friend from my sentRequests
      
        await friendRequest.deleteFriendRequest(idUserOwner,idFriend);
        await sendRequest.deleteSendRequest(idUserOwner,idFriend);
    }


    async acceptFriendRequest(idUserOwner,idFriend)
    {     
         
      
        await friendRequest.deleteFriendRequestAcceptOrReject(idUserOwner,idFriend);
        await sendRequest.deleteSendRequestAcceptOrReject(idUserOwner,idFriend);
        await friend.addFriendInOwner(idUserOwner,idFriend);
        await friend.addOwnerInFriend(idUserOwner,idFriend);
    }


    
    async rejectFriendRequest(idUserOwner,idFriend)
    {     
         
      
        await friendRequest.deleteFriendRequestAcceptOrReject(idUserOwner,idFriend);
        await sendRequest.deleteSendRequestAcceptOrReject(idUserOwner,idFriend);
    }


    async deleteFriend(idUserOwner,idFriend)
    {     
        await friend.deleteFriendinOwner(idUserOwner,idFriend);
        await friend.deleteOwnerInFriend(idUserOwner,idFriend);
    }



}

User.init(
{
    id: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nombre:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    usuario:
    {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password:
    {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    administrador:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    acerca_de_mi:
    {
        type: DataTypes.STRING(800),
      
    },
    conocimientos_extras:
    {
        type: DataTypes.STRING(800),
      
    },
    pais:
    {
        type: DataTypes.STRING(50),
      
    },
    ciudad:
    {
        type: DataTypes.STRING(50),
        
    },
  
    edad:
    {
        type: DataTypes.INTEGER,
       
    },
    estudios:
    {
        type: DataTypes.STRING(300),
      
    },
    idiomas:
    {
        type: DataTypes.STRING(300),
      
    },
    linkedin:
    {
        type: DataTypes.STRING(300),
      
    },
    hobbies:
    {
        type: DataTypes.STRING(300),
      
    },
    imagen :
    {
        type: DataTypes.STRING(50),
     
    },
    base_datos:
    {
        type: DataTypes.INTEGER,  
       
    },
    apis:
    {
        type: DataTypes.INTEGER,  
    },
    testing:
    {
        type: DataTypes.INTEGER,  
    },
    seguridad:
    {
        type: DataTypes.INTEGER,  
    },
    teoria_objetos:
    {
        type: DataTypes.INTEGER,  
    },
    nodejs:
    {
        type: DataTypes.INTEGER,  
    },
    frontend:
    {
        type: DataTypes.INTEGER,  
    },
    swagger:
    {
        type: DataTypes.INTEGER,  
    },
    javascript:
    {
        type: DataTypes.INTEGER,  
    },
    calidad_codigo:
    {
        type: DataTypes.INTEGER,  
    },
    velocidad_entrega:
    {
        type: DataTypes.INTEGER,  
    },
    performance_codigo:
    {
        type: DataTypes.INTEGER,  
    },
    enfocado:
    {
        type: DataTypes.INTEGER,  
    },
    trabajo_equipo:
    {
        type: DataTypes.INTEGER,  
    },
    comprometido:
    {
        type: DataTypes.INTEGER,  
    },
    comunicacion:
    {
        type: DataTypes.INTEGER,  
    },
    capacidad_aprendizaje:
    {
        type: DataTypes.INTEGER,  
    },
    resolucion_problema:
    {
        type: DataTypes.INTEGER,  
    },
    versionado_git:
    {
        type: DataTypes.INTEGER,  
    },
    trello:
    {
        type: DataTypes.INTEGER,  
    },
    slack:
    {
        type: DataTypes.INTEGER,  
    },
    metodologias_agiles:
    {
        type: DataTypes.INTEGER,  
    }
}, 
{ 
    sequelize,
    modelName: 'usuarios' 
});



module.exports=User;






