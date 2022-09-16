class RecordValidator {
    static validateFolderName(folderName: string) {
        const containsSpecialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s]+/.test(folderName)
        return containsSpecialChars
    }

    static validateFileName(fileName: string) {

    }
}

export default RecordValidator