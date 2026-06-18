import User from "../Models/user.model.js"

export const getAssistantConfig = async (req,res)=>{
    try {
        const {userId} = req.params

        const user =await User.findById(userId).select("-geminiApiKey")

        if(!user){
            return res
            .status(404)
            .json({message:"User Not Found"})
        }

        return res
        .status(200)
        .json({message:"Assistant config data",user})
    } catch (error) {
        return res.status(500).json({message:`Assistant config failed ${error}`})
    }
}