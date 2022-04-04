import { getOpenLibraryUrl } from './getOpenLibraryUrl';
import { saveToOLDatabase } from './OLDatabase/saveToOLDatabase';
import axios, { AxiosResponse } from 'axios';
import { sendRequestToOLAndSaveDataError } from '../../constants/errorsTexts';
import { getCustomError } from '../../utils/getCustomError';

export const sendRequestToOLAndSaveData = async (path: string): Promise<Object| undefined> => {
    const url: string = getOpenLibraryUrl(path);
    try {
        const response: AxiosResponse<Object> = await axios.get(url);
        const data: Object = response.data ?? {};
        await saveToOLDatabase(path, data);
        return data;
    } catch(e) {
        throw getCustomError(e, sendRequestToOLAndSaveDataError, 500);
    }
};