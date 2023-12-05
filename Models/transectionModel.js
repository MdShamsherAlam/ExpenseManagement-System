// import mongoose from "mongoose";
// const transectionSchema = new mongoose.Schema({

//     amount: {
//         type: Number,
//         required: [true, 'amount is required']
//     },
//     category: {
//         type: String,
//         required: [true, 'category is required']
//     },
//     refrence: {
//         type: String
//     },
//     description: {
//         type: String,
//         required: [true, 'description is required']
//     },
//     date: {
//         type: String,
//         required: [true, 'date is required']
//     }


// }, {
//     timestamps: true
// })
// const transection = mongoose.model('transection', transectionSchema)
// export default transection;
import mongoose from "mongoose";

const transectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Replace 'User' with the actual name of your user model
        required: [true, 'user is required']
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    reference: {
        type: String
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    date: {
        type: String,
        required: [true, 'date is required']
    }
}, {
    timestamps: true
});

const transection = mongoose.model('transection', transectionSchema);

export default transection;
