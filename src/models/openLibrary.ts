import mongoose from 'mongoose';

interface OpenLibraryData {
    key: string;
    data: Object;
    createdAt: Date;
};
interface OpenLibraryModel extends mongoose.Model<OpenLibraryDoc> {
    addOpenLibraryData(item: OpenLibraryData): OpenLibraryDoc;
};
export interface OpenLibraryDoc extends mongoose.Document {
    key: string;
    data: Object;
    createdAt: Date;
};
const openLibraryDataSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }

});
openLibraryDataSchema.statics.addOpenLibraryData = (data: OpenLibraryData) => {
    return new OpenLibraryDataInstance(data);
};
export const OpenLibraryDataInstance: OpenLibraryModel = mongoose.model<OpenLibraryDoc, OpenLibraryModel>('openlibraries', openLibraryDataSchema);