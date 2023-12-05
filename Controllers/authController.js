import User from "../Models/userModels.js"
import errorResponse from "../utils/errorResponse.js"



//User registerController
const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return next(new errorResponse("Email is already used", 500))         //we created errorRespons in utils folder where we have to this first message second response
        }
        const user = await User.create({ name, email, password })
        const token = user.createJWT()
        res.status(200).json({
            userId: user._id,
            userEmail: user.email,
            userName: user.name,
            token
        })
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}
//for login
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new errorResponse("Please provide email and password",))
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(new errorResponse("Invalid Credentials", 401))
        }
        const isMatched = await user.matchPassword(password)
        if (!isMatched) {
            return next(new errorResponse("Invalid Credentials", 401))
        }
        console.log(user.name)
        const token = user.createJWT()
        res.status(200).json({
            userId: user._id,
            userEmail: user.email,
            userName: user.name,
            token
        })
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}
const logoutController = async (req, res, next) => {
    res.clearCookie('refresToken')
    return res.status(200).json({
        success: true,
        message: "Logout Successfully"

    })
}

export default { registerController, loginController, logoutController }