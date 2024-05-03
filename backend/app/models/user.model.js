// module.exports = (mongoose) => {
//     const user = new mongoose.Schema (
//         { 
//             username: { type: String, require: true },
//             email: { type: String, require: true, unique: true },
//             password: { type: String, require: true },
//             loginAt: { type: Date, default: null },
//             logoutAt: { type: Date, default: null}
//         }, {
//             collection: 'user-data'
//         }
//     )

//     user.method("toJSON", function() {
//         const {__v, _id, ...object} = this.toObject()
//         object.id = _id
//         return object
//     })

//     const User = mongoose.model("UserData", user)
//     return User
// }


// user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loginAt: { type: Date, default: null },
    logoutAt: { type: Date, default: null }    
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
