import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'password size must be 6 characters  or larger  ']
    },
}, {
    timestamps: true, // Add timestamps to the schema
}
)
userSchema.pre('save', async function (next) {
    //update
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})
//match password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//jwt token
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
userSchema.methods.setRefreshTokenCookie = function (res) {
    const { refreshToken } = this.getSignedToken(); // Use the correct method here
    res.cookie("refreshToken", `${refreshToken}`, {
        maxAge: 86400 * 7000,
        httpOnly: true,
    });
};

const User = mongoose.model('user', userSchema)

export default User;