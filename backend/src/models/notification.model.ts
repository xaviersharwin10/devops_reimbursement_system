import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
	heading: string;
    text: string;
    isRead: boolean;
    userId: string;
    expenseId: string;
}

const notificationSchema: Schema = new Schema({
	heading: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    expenseId: {
        type: String,
        required: true,
        ref: "Expense"
    },
}, {timestamps: true});

const NotificationModel = mongoose.model<INotification>("Notification", notificationSchema);

export default NotificationModel;
