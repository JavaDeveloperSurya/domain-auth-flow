const dashboard = async (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to dashboard",
        user:req.user
    })
}

const dashboardAdmin = async (req,res)=>{
    res.json({
        success:true,
        message:"Welcome Admin"
    })
 }
module.exports = {
    dashboard,
    dashboardAdmin
}