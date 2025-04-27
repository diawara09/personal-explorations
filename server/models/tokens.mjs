import mongoose, {Schema} from 'mongoose'

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    }
},{timestamps: true})

export default mongoose.model('Token', tokenSchema)