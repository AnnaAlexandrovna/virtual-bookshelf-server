import { Response, Request, NextFunction } from 'express';
import { findPathInOLDatabase } from './OLDatabase/findPathInOLDatabase';
import { sendRequestToOLAndSaveData } from './sendRequestToOLAndSaveData';

export const getOpenLibraryData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const path: string = req.url.replace('/openlibrary', '');
    try {
        let result: Object | undefined = (await findPathInOLDatabase(path))?.data;
        if(!result) {
            result = await sendRequestToOLAndSaveData(path);
        }
        res.status(200).json(result);
        res.end();
    } catch(error) {
        next(error);
    }
};