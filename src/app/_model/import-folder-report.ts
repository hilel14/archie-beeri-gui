export interface ImportFolder {
    id: number;
    folderName: String;
    fileCount: number;
    importTime: number;
    importTimeFormatted: string;
    importDateFormatted: string;
    files: ImportFile[];
}

export interface ImportFile {
    id: string;
    importFolderId: number;
    importTime: number;
    importTimeFormatted: string;
    importDateFormatted: string;
    fileName: string;
    statusCode: number;
    warningMessage: string;
}
