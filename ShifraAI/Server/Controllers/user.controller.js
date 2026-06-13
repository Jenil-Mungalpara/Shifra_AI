import User from "../Models/user.model.js"


export const getCurrentUser = async (req,res) =>{
    try {
        const user  = await User.findById(req.userId)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message:`getCurrentUser error ${error}`})
    }
}