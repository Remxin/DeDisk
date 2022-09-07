export class BytesHelper {
    static planGBtoBytes = (planGB: string) => {
        return +planGB * 1000* 1000 * 8
    }

    static spaceBytesToGB = (bytes: number) => {
        return Math.ceil((bytes / 1000/1000/8) * 100)/100
    }
}