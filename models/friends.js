const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
dotenv.config();


class Friends extends Model 
{
    


    async addFriendInOwner(idUserOwner,idFriend)
    {
        return await Friends.create(
        {
           id_usuario: idUserOwner,
           id_friend:idFriend

        });

    }

    async addOwnerInFriend(idUserOwner,idFriend)
    {
        return await Friends.create(
        {
           id_usuario: idFriend,
           id_friend:idUserOwner

        });

    }


    
    async deleteOwnerInFriend(idUserOwner,idFriend)
    {
        await Friends.destroy({
            where: {
              id_usuario: idFriend,
              id_friend:idUserOwner
            }
          });
    }

    async deleteFriendinOwner(idUserOwner,idFriend)
    {
        await Friends.destroy({
            where: {
              id_usuario: idUserOwner,
              id_friend:idFriend
            }
          });
    }


    async getUserFriendInnerJoinByIdUser(id_usuario)
    {
        return await Friends.findAll({
       
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

    async countAllFriends(id_usuario)
    {
        const Op = require('sequelize').Op;

        return await Friends.count(
        {
            where:
            {
                id_usuario: id_usuario 
            }
        }
        );
    }




    async deleteFriend(idUser)
    {
        const Op = require('sequelize').Op;
        await Friends.destroy({
            where: {
                [Op.or]: [{ id_usuario: idUser }, { id_friend: idUser }],  
            }
          });
    }



}



Friends.init(
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
    modelName: 'amigos' 
});



module.exports=Friends;






