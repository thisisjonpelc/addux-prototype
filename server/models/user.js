const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
    },
    firstName:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    company:{
        type:String,
        trim:true
    },
    customerId:{
        type:String,
    },
    lastLogin:{
        type:Number
    },
    tokens: [{
        access: {
            type:String,
            required:true
        },
        token: {
            type: String,
            required: true
        }
    }],
    masterUser:{
        type:Boolean,
        required:true,
        default:false
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false
    },
    passwordReset:{
        type:String,
        default: ""
    },
    resetExpire:{
        type:Number,
        default: 0
    }
});

UserSchema.methods.generateAuthToken = function(oldToken) {
    console.log('Creating new auth token');

    var user = this;
    var access = 'auth';

    if(oldToken){
        console.log('There is an old token');
        //console.log('User Tokens: ', user.tokens);
        user.tokens = user.tokens.filter((token) => {
            if(token.token === oldToken){
                return false;
            }
            else{
                return true;
            }
        });
        console.log('User Tokens after removal of old token: ', user.tokens);
        //user.removeToken(oldToken);
    }

    user.removeExpiredTokens();

    const options = {
        expiresIn: '12h'
    };

    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, options).toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function(token){
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

UserSchema.methods.removeExpiredTokens = function(){
    var user = this;
    //console.log("---IN removeExpiredTokens---");

    user.tokens = user.tokens.filter((token) => {
        tokenValue = token.token;

        //console.log("Token: ", token);
        //console.log("Token Value:", tokenValue);

        try{
            jwt.verify(tokenValue, process.env.JWT_SECRET);
            //console.log("Token is valid");
        }
        catch(e){
            //console.log("Token is not valid");
            return false;
        }

        return true;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(e){
        //console.log("TOKEN UNABLE TO BE VERIFIED");
        //console.log(e);
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password){
    var User = this;

    return User.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {

                if(res){
                    resolve(user);
                }
                else{
                    reject();
                }

            });
        });
    });
};

UserSchema.pre("save", function(next){
    var user = this;

    if(user.isModified("password")){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else{
        next();
    }
});

UserSchema.pre("findOneAndUpdate", function(next){
        
    const updates = this._update;

    if(updates.password){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(updates.password, salt, (err, hash) => {
                updates.password = hash;
                next();
            });
        });
    }
    else{
        next();
    }
});

var User = mongoose.model("User", UserSchema);

module.exports = {User};