import { Request, Response } from "express"

export type reqResObjType = {
    req: Request,
    res: Response
}

export type signupProps = {
    name: string,
    email: string,
    password: string
}

export type loginProps = {
    email: string,
    password: string
}