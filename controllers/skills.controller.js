const passport= require('passport');
const bcrypt= require('bcryptjs');
const User= require('../models/user')
const user = User.build();
const FriendRequest= require('../models/friendRequests');
const friendRequest = FriendRequest.build();
const SendRequests=require('../models/sentRequests'); 
const sendRequests=SendRequests.build();
const Friend= require('../models/friends')
const friend = Friend.build(); 
const jwt = require('jsonwebtoken')
const dotenv=require ('dotenv');
const SendRequest = require('../models/sentRequests');
dotenv.config();

/* GET LISTAR USUARIOS*/

exports.getUserIndexes=async(req,res,next)=>
{
    const listaProductos = await user.listAll();
    const numRegistros= await user.countAll();
 
    //res.send('admin area narf');
    res.render('admin/skills',
    {
        todosLosUsuarios:listaProductos,
        cantidad: numRegistros
    });
   
}





/* GET  EDIT USER*/
exports.editSkillsGet= async(req,res,next)=>
{
   let idUser= req.params.idUser;
  

   const instanceUser2= await user.findByEdit(idUser);

    const teclavalores=[1,2,3,4,5]; 
  
    const instanceUser= Object.assign({}, instanceUser2);

   

  res.render('admin/editSkill',
   {
       teclavalores:teclavalores,
       id: instanceUser[0].id,
       base_datos:instanceUser[0].base_datos,
       apis: instanceUser[0].apis,
       testing:instanceUser[0].testing,
       seguridad:instanceUser[0].seguridad,
       teoria_objetos:instanceUser[0].teoria_objetos,
       nodejs: instanceUser[0].nodejs,
       frontend: instanceUser[0].frontend,
       swagger: instanceUser[0].swagger,
       javascript: instanceUser[0].javascript,
       calidad_codigo: instanceUser[0].calidad_codigo,
       velocidad_entrega:instanceUser[0].velocidad_entrega,
       performance_codigo:instanceUser[0].performance_codigo,
       enfocado: instanceUser[0].enfocado,
       trabajo_equipo:instanceUser[0].trabajo_equipo,
       comprometido: instanceUser[0].comprometido,
       comunicacion:instanceUser[0].comunicacion,
       capacidad_aprendizaje:instanceUser[0].capacidad_aprendizaje,
       resolucion_problema:instanceUser[0].resolucion_problema,
       versionado_git:instanceUser[0].versionado_git,
       trello:instanceUser[0].trello,
       slack:instanceUser[0].slack,
       metodologias_agiles: instanceUser[0].metodologias_agiles



   });  
   
}




/* POST  EDIT USER*/


exports.editSkillsPost=async(req,res,next)=>
{

    let base_datos= req.body.base_datos;
    let apis= req.body.apis;
    let testing= req.body.testing;
    let seguridad= req.body.seguridad;
    let teoria_objetos= req.body.teoria_objetos;
    let nodejs = req.body.nodejs;
    let frontend= req.body.frontend;
    let swagger= req.body.swagger;
    let javascript= req.body.javascript;
    let calidad_codigo= req.body.calidad_codigo;
    let velocidad_entrega= req.body.velocidad_entrega;
    let performance_codigo= req.body.performance_codigo;
    let enfocado= req.body.enfocado;
    let trabajo_equipo= req.body.trabajo_equipo;
    let comprometido= req.body.comprometido;
    let comunicacion= req.body.comunicacion;
    let capacidad_aprendizaje= req.body.capacidad_aprendizaje;
    let resolucion_problema= req.body.resolucion_problema;
    let versionado_git= req.body.versionado_git;
    let trello= req.body.trello;
    let slack= req.body.slack;
    let metodologias_agiles= req.body.metodologias_agiles;
    var id = req.params.idUser;

   
    
    await  user.editUserSkills(base_datos,apis,testing,seguridad,teoria_objetos,nodejs,frontend,swagger,javascript,calidad_codigo,velocidad_entrega,performance_codigo,enfocado,trabajo_equipo,comprometido,comunicacion,capacidad_aprendizaje,resolucion_problema,versionado_git,trello,slack,metodologias_agiles,id);
    res.redirect('/admin/skills') 
}
  

