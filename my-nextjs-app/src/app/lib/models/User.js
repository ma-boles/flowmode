import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    spotifyId: {
        type: String,
        required: true,
    },
    spotifyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    timePerDay: {
        type: Number,
        default: 0,
    },
    timePerWeek: {
        type: Number,
        default: 0,
    },
    timePerMonth: {
        type: Number,
        default: 0,
    },
    mostRecentlyPlayed: [{
        title: {
            type: String,
            required: true,
        }
    }]
}, { timestamps: true });

/*
let User;
if(mongoose.models.User) {
    User = mongoose.model('User');
} else {
    User = mongoose.model('User', userSchema);
}


export default User;*/

export default mongoose.models.User || mongoose.model('User', userSchema);