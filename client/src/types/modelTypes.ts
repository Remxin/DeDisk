export type userType = {
    email: string,
    name: string
    password?: string
    plan: string
    usedSpace: number

}

export type recordType = {
    name: string
    rootDir?: string
    size: number
    userId?: string
    timestamps: number
    type: string
}