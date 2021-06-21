const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
dotenv.config();


class FriendRequest extends Model 
{
    


    async addFriendRequest(idUserOwner,idFriend)
    {
        return await FriendRequest.create(
        {
           id_usuario: idFriend,
           id_friend:idUserOwner

        });

    }


    
    async deleteFriendRequest(idUserOwner,idFriend)
    {
        await FriendRequest.destroy({
            where: {
              id_usuario: idFriend,
              id_friend:idUserOwner
            }
          });
    }

    async deleteFriendRequestAcceptOrReject(idUserOwner,idFriend)
    {
        await FriendRequest.destroy({
            where: {
              id_usuario: idUserOwner,
              id_friend:idFriend
            }
          });
    }


    async getUserFriendRequestInnerJoinByIdUser(id_usuario)
    {
        return await FriendRequest.findAll({
       
           raw: true,
           nest: true ,// unflattens but does not fix problem
           where: {id_usuario: id_usuario},
           include: { all: true }
          /* include: [
            
            {
               
            model: Month,
        
            required: true,
          
            }]*/
                
          });
    }

    async countAllFriendRequests(id_usuario)
    {
        const Op = require('sequelize').Op;

        return await FriendRequest.count(
        {
            where:
            {
                id_usuario: id_usuario 
            }
        }
        );
    }


    async deleteFriendRequest(idUser)
    {
        const Op = require('sequelize').Op;
        await FriendRequest.destroy({
            where: {
                [Op.or]: [{ id_usuario: idUser }, { id_friend: idUser }],  
            }
          });
    }





}



FriendRequest.init(
{
    id: 
    {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    id_usuario:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_friend:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
{ 
    sequelize,
    modelName: 'solicitudesamistades' 
});



module.exports=FriendRequest;






