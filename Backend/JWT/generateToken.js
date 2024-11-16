import jwt from 'jsonwebtoken'

export const createTokenAndSaveCookie=(userId,res)=>{
        const token=jwt.sign({userId},process.env.JWT_TOKEN,{
                expiresIn:"10d"
        });
        res.cookie("jwt",token,{
                httpOnly:true,
                secure:'production',
                sameSite:"strict"
        })

}