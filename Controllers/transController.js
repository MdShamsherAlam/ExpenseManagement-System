import Transection from "../Models/transectionModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import isAuth from '../middleware/isAuthMiddleware.js'; // Import the isAuth middleware

const allTransection = async (req, res, next) => {
    try {
        const userId = req.user.userId; // Assuming the user ID is stored in req.user.userId
        const transactions = await Transection.find({ user: userId });

        res.status(200).json({
            success: true,
            data: transactions,
        });
    } catch (error) {
        next(new ErrorResponse(`Error fetching transactions: ${error.message}`, 500));
    }
};

const addTransection = async (req, res, next) => {
    try {
        const userId = req.user.userId; // Assuming the user ID is stored in req.user.userId
        const { amount, category, reference, description, date } = req.body;

        // Create a new transaction
        const newTransaction = new Transection({
            user: userId,
            amount,
            category,
            reference,
            description,
            date,
        });

        // Save the transaction to the database
        const transaction = await newTransaction.save();

        res.status(201).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        next(new ErrorResponse(`Error adding transaction: ${error.message}`, 500));
    }
};

export default {
    allTransection,// Apply isAuth middleware to allTransection
    addTransection // Apply isAuth middleware to addTransection
};
