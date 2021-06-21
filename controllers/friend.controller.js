const User= require('../models/user')
const user = User.build();

exports.add=async(req,res,next)=>
{
    idUserOwner= req.user.id;
    idFriend=req.params.id;
    await user.sendFriendRequest(idUserOwner,idFriend);
    res.redirect('/profile')
}


exports.cancel=async(req,res,next)=>
{
    idUserOwner= req.user.id;
    idFriend=req.params.id;
    await user.cancelFriendRequest(idUserOwner,idFriend);
    res.redirect('/profile')
}



exports.accept=async(req,res,next)=>
{
    idUserOwner= req.user.id;
    idFriend=req.params.id;
    await user.acceptFriendRequest(idUserOwner,idFriend);
    res.redirect('/profile')
    
}

exports.reject=async(req,res,next)=>
{
    idUserOwner= req.user.id;
    idFriend=req.params.id;
    await user.rejectFriendRequest(idUserOwner,idFriend);
    res.redirect('/profile')
   
};


exports.delete=async(req,res,next)=>
{
    idUserOwner= req.user.id;
    idFriend=req.params.id;
    await user.deleteFriend(idUserOwner,idFriend);
    res.redirect('/profile')
   
};