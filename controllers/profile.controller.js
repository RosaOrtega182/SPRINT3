const User= require('../models/user')
const user = User.build();
const FriendRequest= require('../models/friendRequests')
const friendRequest = FriendRequest.build(); 

const Friend= require('../models/friends')
const friend = Friend.build(); 



/**
 * user enter his profile
 * friends
 *      user1 is in user2 friends
 * user1 send friend request to user2
 *      user1 is in user2 friendRequests
 * user1 recieved friend request from user2
 *      user1 is in user2 sent requests
 */




 exports.getUserIndexes=async(req,res,next)=>
 {
     usuario=req.user.usuario;
     const listaProfiles= await user.listAllUsers(usuario);
     const numRegistros= await user.countAllUsers(usuario);
     const currentUser= await user.getUserInnerJoinByIdUser(req.user.id)
     const instanceFriendRequest=await friendRequest.getUserFriendRequestInnerJoinByIdUser(req.user.id);
     const instanceFriends=await friend.getUserFriendInnerJoinByIdUser(req.user.id);

     res.render('profile',
     {
         usuarioActual:currentUser,
         todosLosUsuarios:listaProfiles,
         cantidad: numRegistros,
         instanceFriendRequest: instanceFriendRequest,
         instanceFriends: instanceFriends
     });
    
 }



 
exports.getOwnerProfile=async(req,res,next)=>
{
    
    let idUsuario=req.params.id;

    
    instanceUser=await user.findByPrimaryKey(idUsuario)
   
    console.log(instanceUser);
     
        res.render('profileOwner',
        {
           
            instanceUser: instanceUser,
        });

   
   
}



 
exports.getFriendRequests=async(req,res,next)=>
{
    
    let idUsuario=req.params.id;

    
    instanceFriendRequest=await friendRequest.getUserFriendRequestInnerJoinByIdUser(idUsuario);
    cantidad= await friendRequest.countAllFriendRequests(idUsuario)
   
 console.log(instanceFriendRequest);
     
        res.render('friendRequests',
        {
           
            instanceFriendRequest: instanceFriendRequest,
            cantidad: cantidad
        });

   
   
}




exports.getFriends=async(req,res,next)=>
{
    
    let idUsuario=req.params.id;

    
    instanceFriends=await friend.getUserFriendInnerJoinByIdUser(idUsuario);
    cantidad= await friend.countAllFriends(idUsuario)
   
     
        res.render('friends',
        {
           
            instanceFriends: instanceFriends,
            cantidad: cantidad
        });

   
   
}
 
 


/* GET  EDIT USER*/
exports.editProfileGet= async(req,res,next)=>
{
   let idUser= req.params.idUser;
  

   const instanceUser2= await user.findByEdit(idUser);

   // const teclavalores=[1,2,3,4,5]; 
  
    const instanceUser= Object.assign({}, instanceUser2);

   

  res.render('editProfile',
   {
       id: instanceUser[0].id,
       acerca_de_mi:instanceUser[0].acerca_de_mi,
       conocimientos_extras:instanceUser[0].conocimientos_extras,
       pais:instanceUser[0].pais,
       ciudad:instanceUser[0].ciudad,
       edad:instanceUser[0].edad,
       estudios:instanceUser[0].estudios,
       idiomas:instanceUser[0].idiomas,
       linkedin:instanceUser[0].linkedin,
       hobbies:instanceUser[0].hobbies



   });  
   
}




/* POST  EDIT USER*/


exports.editProfilePost=async(req,res,next)=>
{

    let acerca_de_mi= req.body.acerca_de_mi;
    let conocimientos_extras= req.body.conocimientos_extras;
    let pais= req.body.pais;
    let ciudad= req.body.ciudad;
    let edad= req.body.edad;
    let estudios= req.body.estudios;
    let idiomas= req.body.idiomas;
    let linkedin= req.body.linkedin;
    let hobbies= req.body.hobbies;
    var id = req.params.idUser;

   
    
    await  user.editUserProfile(acerca_de_mi,conocimientos_extras,pais,ciudad,edad,estudios,idiomas,linkedin,hobbies,id);
    res.redirect('/profile') 
}
  


