import {Schema, get, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    FullName: {
        type: "string",
        required: [true, "Name is required"],
        minLength: [4,"Name must be at least 4 characters long"],
        maxLength: [20, "Name must be at most 20 characters long"],
        lowercase: true,
        trim: true
    },
    email:{
        type:"String",
        required: [true, "Email is required"],
        lowercase: true,
        trim:true,
        unique:true
    },
    password:{
        type:"String",
        required: [true, "password is required"],
        minLength: [8, "password must be at least 8 characters long"],
        select: false
    },
    role: {
        type: "String",
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    contact:{
        type: "string",
        required: true,
        unique : true,
        minLength: [10,"Conatct number must be at least 10 characters long"],
        maxLength: [10, "Contact number must be at most 10 characters long"],
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
},{
    timestamps: true
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods={
    generateJWTToken: async function(){
        return await jwt.sign({
            id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        })
    },
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);
    },
    generateResetPasswordToken: async function(){
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken = crypto
            .createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry = Date.now()+15*60*1000;

        return resetToken;
    }
}

const User = model("User", userSchema);

export default User;
