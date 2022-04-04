import mongoose from 'mongoose';

const TokensSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

interface Token {
    userId: string;
    refreshToken: string;
    createdAt: Date;
};

export interface TokenDoc extends mongoose.Document {
    userId: string;
    refreshToken: string;
    createdAt: Date;
};

interface TokenModel extends mongoose.Model<TokenDoc> {
    addToken(user: Token): TokenDoc;
};

TokensSchema.statics.addToken = (data: Token) => {
    return new TokenInstance(data);
};

export const TokenInstance: TokenModel = mongoose.model<TokenDoc, TokenModel>('tokens', TokensSchema);
