import mongoose from 'mongoose';

const FavoritesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    data:
        [{
            key: {
                type: String,
                require: true
            },
            data: {
                type: Object,
                require: true
            }
        }]

});

interface Favorite {
    userId: string;
    data: [
        {
            key: string;
            data: Object;
        }
    ];
};

export interface FavoriteDoc extends mongoose.Document {
    userId: string;
    data: [{
        key: string;
        data: Object;
    }];
};

interface FavoriteModel extends mongoose.Model<FavoriteDoc> {
    addFavorite(favorite: Favorite): FavoriteDoc;
};

FavoritesSchema.statics.addFavorite = (data: Favorite) => {
    return new FavoriteDataInstance(data);
};

export const FavoriteDataInstance: FavoriteModel = mongoose.model<FavoriteDoc, FavoriteModel>('favorites', FavoritesSchema);
