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

export const saveAssistant = async(req,res)=>{
    try {
        const {
            assistantName,
            businessName, // Fixed spelling
            businessType, // Fixed spelling
            businessDescription, // Fixed spelling
            tone,
            theme,
            geminiApiKey,
            pages,
        } = req.body

        const user = await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        
        user.assistantName = assistantName;
        user.businessName = businessName; // Fixed spelling
        user.businessType = businessType; // Fixed spelling
        user.businessDescription = businessDescription; // Fixed spelling
        user.tone = tone;
        user.theme = theme;

        if(geminiApiKey){
            user.geminiApiKey = geminiApiKey
        }

        user.geminiStatus = "active";
        user.pages = pages || [];

        user.isSetupComplete = true; // Fixed typo here

        await user.save()

        return res
        .status(200)
        .json({message:"Assistant saved successfully", user})

    } catch (error) {
        return res.status(500).json({message:`Failed to save assistant ${error}`})
    }
}