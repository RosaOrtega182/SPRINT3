const {DataTypes, Model}= require ('sequelize');
const sequelize= require('./conexion');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
dotenv.config();


class SendRequest extends Model 
{
    async addSendRequest(idUserOwner,idFriend)
    {
        return await  SendRequest.create(
        {
           id_usuario: idUserOwner,
           id_friend:idFriend

        });

    }

    async deleteSendRequest(idUserOwner,idFriend)
    {
        await SendRequest.destroy({
            where: {
                id_usuario: idUserOwner,
                id_friend:idFriend
            }
          });
    }


    
    async deleteSendRequestAcceptOrReject(idUserOwner,idFriend)
    {
        await SendRequest.destroy({
            where: {
                id_usuario: idFriend,
                id_friend:idUserOwner
            }
          });
    }

    async deleteSendRequest(idUser)
    {
        const Op = require('sequelize').Op;
        await SendRequest.destroy({
            where: {
                [Op.or]: [{ id_usuario: idUser }, { id_friend: idUser }],  
            }
          });
    }









}






SendRequest.init(
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
    modelName: 'solicitudesenviadas' 
});



module.exports=SendRequest;






