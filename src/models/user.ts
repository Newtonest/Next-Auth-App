import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    email : {
        type: String,
        unique: true ,
        required: [true,'Email is required']
    },
    password : {
        type: String,
        required: [true,'Password is required'],
        select:false
    },
    fullname : {
        type: String,
        required: [true,'Fullname is required'],
        minLength : [3,'Fullname must be at least 3 characters'],
        maxLength : [50,'Fullname must be at least 50 characters']
    }
})
const User = models.User || model('User', UserSchema)
export default User