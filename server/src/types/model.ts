export type userType = {
    id: string
    name: string
    email: string
    password: string
    plan: string
    usedSpace: number
    records?: recordType[]
    shares?: shareType[]
}

export type recordType = {
    id: string
    name: string
    size: number
    rootDir: string
    timestamps: number
    type: string
    user?: userType
    userId: string
    shares?: shareType[]
}

export type shareType = {
    id: string
    access: string
    token: string
    expires: number
    fileName: string
    user?: userType
    userId: string
    record?: recordType
    recordId: string
}