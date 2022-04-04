import mongoose from 'mongoose';

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    createdAt: {
        type: Object,
        required: true
    },
    bookId: {
        type: String,
        required: true
    }
});

interface Comment {
    userId: string;
    data: string;
    createdAt: Date,
    bookId: string
};

export interface CommentDoc extends mongoose.Document {
    userId: string;
    data: string;
    createdAt: Date,
    bookId: string
};

interface CommentModel extends mongoose.Model<CommentDoc> {
    addComment(comment: Comment): CommentDoc;
};

CommentsSchema.statics.addComment = (data: Comment) => {
    return new CommentInstance(data);
};

export const CommentInstance: CommentModel = mongoose.model<CommentDoc, CommentModel>('comments', CommentsSchema);