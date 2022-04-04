import { OpenLibraryDataInstance, OpenLibraryDoc } from '../../../models/openLibrary';
import { findPathInOLDatabaseError } from '../../../constants/errorsTexts';
import { getCustomError } from '../../../utils/getCustomError';

export const findPathInOLDatabase = async (key: string): Promise<OpenLibraryDoc | null> => {
    try {
        const search: OpenLibraryDoc | null = await OpenLibraryDataInstance.findOne({ key });
        return search;
    } catch(e) {
        throw getCustomError(e, findPathInOLDatabaseError, 500);
    }
};