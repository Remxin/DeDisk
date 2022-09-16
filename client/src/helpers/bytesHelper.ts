export class BytesHelper {
    static bytesUnits = ["b", "B", "KB", "MB", "GB", "TB"]
    
    static planGBtoBytes = (planGB: string) => {
        return +planGB * 1000* 1000 * 8
    }

    static spaceBytesToGB = (bytes: number) => {
        return Math.ceil((bytes / 1000/1000/8) * 100)/100
    }

    // @ts-ignore
    static presentInCorrectUnit = (bytes: number, unitIndex: number = 0): string => {
        let unit = this.bytesUnits[unitIndex]

        if (unitIndex === 0) { // /8 to convert to bytes
            if (bytes / 8 > 0.1) return this.presentInCorrectUnit(bytes/8, unitIndex + 1) 
            
        } else { // /1000 to convert to higher unit
            if (bytes / 1000 > 0.1) return this.presentInCorrectUnit(bytes / 1000, unitIndex + 1)

        }
        return Math.floor(bytes * 100) / 100 + unit
    }
}