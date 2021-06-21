const express= require('express');
const app= express();
const path= require('path');
const indexRouter=require('./routes/index.route');
const userRoute=require('./routes/user.route');
const profileRouter = require("./routes/profile.route");
const friendRouter= require("./routes/friend.route");
const adminCMSRouter= require('./routes/adminCMS.route');
const adminUserRouter= require('./routes/admin.users.route');
const adminSkillsRouter=require('./routes/admin.skills.route');


const session= require('express-session');
const flash=require('connect-flash');
const expressValidator = require('express-validator');
const passport= require('passport');
const bodyParser=require('body-parser');
const corsMiddleware= require('./middlewares/middleware.cors');
const limitMiddleware= require('./middlewares/middleware.limit');
const sequelize= require('./models/conexion');
const User= require('./models/user');
const FriendRequest= require('./models/friendRequests');
const SendRequest= require('./models/sentRequests');
const Friends= require('./models/friends');


const socketIO = require("socket.io");


const server = require("http").createServer(app);
const io = socketIO(server);
 
const dotenv=require ('dotenv');
const { sync } = require('./models/user');
dotenv.config();

/*SERVICIO DE ARCHIVOS ESTATICOS
Para el servicio de archivos estáticos como, por ejemplo, imágenes, 
archivos CSS y archivos JavaScript, utilice la función de middleware incorporado express.static de Express. 
*/

app.use(express.static(path.join(__dirname,'assets')));
//app.use(express.static(path.join(__dirname,'img')));



/* MOTORES DE PLANTILLA
views: el directorio donde se encuentran los archivos de plantilla
view engine, el motor de plantilla que se utiliza*/

app.set ('view engine','ejs');
app.set('views','views');



/*MIDDLEWARES GLOBALES*/
app.use(express.json());//Leer o decodificar todos los json que lleguen en los request por medio de param o body


app.use(bodyParser.urlencoded({extended: false}));

//CORS
app.use(corsMiddleware);
//app.use(limitMiddleware.limiter);


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));




/*MIDDLEWARE PARA CAPTURA DE ERRORES GLOBALES*/

app.use((err,req,res,next)=>
{
    console.log(err)
    if(!err)
    {
        return next();
    }

    return res.status(500).json(`Se produjo un error inesperado`)
});





// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
   
}));


//config passport
require('./middlewares/middleware.passport')(passport);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Express Messages middleware
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


//SET GLOBAL ERRORS VALIDATOR
app.locals.errors=null;


app.get('/*',function(req,res,next)
{
 res.locals.token= req.session.token;
 res.locals.cart=req.session.cart;
 res.locals.user=req.user || null;
 next();
});


app.use('/',indexRouter);
app.use('/users',userRoute);
app.use("/profile", profileRouter);
app.use("/friends",friendRouter);
app.use('/admin',adminCMSRouter);
app.use('/admin/users',adminUserRouter);
app.use('/admin/skills',adminSkillsRouter);








app.get('/error',(req,res,next)=>
{
    res.status(500);
    res.render('error.ejs',
    {
        pageTitle: "Error narf!"
    })

});




//app.get('/prueba',cors(middleware.corsOptions),(req,res)=>
app.get('/prueba',(req,res)=>
{
    let respuesta=
    {
        "estatus": "OK",
        "message": "Hola mundo NARF"
    }
    res.json(respuesta)
});


/*LEVANTAMOS SERVIDOR
app.listen(process.env.PORT,()=>{
    console.log(`Server started to listener on http://${process.env.HOST}:${process.env.PORT} yupi`);
});*/




async function inicioServidor()
{
    try
    {
        /* User.sync({ alter: true }): Esto verifica cuál es el estado actual de la tabla en la base de datos (qué columnas tiene, 
         cuáles son sus tipos de datos, etc.), y luego realiza los cambios necesarios en la tabla para que coincida con
          el modelo.*/

    
        User.hasMany(FriendRequest, {foreignKey: 'id_usuario', sourceKey: 'id'});
        FriendRequest.belongsTo(User, {foreignKey: 'id_usuario', targetKey: 'id'});

        //FriendRequest.belongsTo(User, {foreignKey: 'id_friend'});

        User.hasMany(FriendRequest, {foreignKey: 'id_friend', sourceKey: 'id'});
        FriendRequest.belongsTo(User, {foreignKey: 'id_friend', targetKey: 'id'});
        

        User.hasMany(SendRequest, {foreignKey: 'id_usuario', sourceKey: 'id'});
        SendRequest.belongsTo(User, {foreignKey: 'id_usuario', targetKey: 'id'});


        User.hasMany(Friends, {foreignKey: 'id_usuario', sourceKey: 'id'});
        Friends.belongsTo(User, {foreignKey: 'id_usuario', targetKey: 'id'});

        //FriendRequest.belongsTo(User, {foreignKey: 'id_friend'});

        User.hasMany(Friends, {foreignKey: 'id_friend', sourceKey: 'id'});
        Friends.belongsTo(User, {foreignKey: 'id_friend', targetKey: 'id'});
        

       
       

     
        await User.sync({alter:true});
        await FriendRequest.sync({alter:true});
        await SendRequest.sync({alter:true});
        await Friends.sync({alter:true});
      
     
       
       
        await sequelize.authenticate();
        console.log("Se ha conectado a la Base de datos yujuuu");
        server.listen(process.env.PORT,()=>{
            console.log(`Server started to listener on http://${process.env.HOST}:${process.env.PORT} yupi`);
        })
    }
    catch(err)
    {
        console.log(err);
        console.log("No se pudo conectar con la base de datos");
    }
}



inicioServidor();