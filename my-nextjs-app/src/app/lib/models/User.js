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
            },
            lastUpdated: {
                type: Date,
                default: Date.now,
            }
        },
        rest: {
            title: {
                type: String,
            },
            lastUpdated: {
                type: Date,
                default: Date.now,
            },
        },
    }],
    favorites: [{
        title: String,
    }]
}, { timestamps: true });


export default mongoose.models.User || mongoose.model('User', userSchema);