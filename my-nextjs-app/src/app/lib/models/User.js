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
    timeInFlow : [{
        perDay: {
            type: Number,
            default: 0,
        },
        perWeek: {
            type: Number,
            default: 0,
        },
        perMonth: {
            type: Number,
            default: 0,
        }
    }],
    timeInRest : [{
        perDay: {
            type: Number,
            default: 0,
        },
        perWeek: {
            type: Number,
            default: 0,
        },
        perMonth: {
            type: Number,
            default: 0,
        }
    }],
    mostRecentlyPlayed: [{
        flow: {
            title: {
                type: String,
                required: true,
            }
        },
        rest: {
            title: {
                type: String,
                required: true,
            }
        }
    }]
}, { timestamps: true });


export default mongoose.models.User || mongoose.model('User', userSchema);