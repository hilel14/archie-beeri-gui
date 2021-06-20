export interface ImportFolder {
    id: number;
    folderName: String;
    fileCount: number;
    importTime: number;
    files: ImportFile[];
}

export interface ImportFile {
    id: string;
    importFolderId: number;
    importTime: number;
    fileName: string;
    statusCode: number;
    warningMessage: string;
}
