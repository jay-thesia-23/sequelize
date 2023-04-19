var Sequelize=require("sequelize")

var sequelize=new Sequelize('ormDB',"root","root",{
        host:"localhost",
        dialect:"mysql"
    }
);

sequelize.authenticate().then(()=>{
    console.log("Connection with orm is done")
}).catch((err)=>{
    console.error("unable to connect: ",err)
})

module.exports=sequelize