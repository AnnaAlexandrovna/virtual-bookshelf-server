import { OpenLibraryDataInstance, OpenLibraryDoc } from '../../../models/openLibrary';
import { saveToOLDatabaseError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const saveToOLDatabase = async (path: string, data: Object): Promise<void> => {
    try {
        const book: OpenLibraryDoc = OpenLibraryDataInstance.addOpenLibraryData({ key: path, data, createdAt: new Date() });
        await book.save();
    } catch(e) {
        throw getCustomError(e, saveToOLDatabaseError, 500);
    }
};