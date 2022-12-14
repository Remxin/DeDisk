import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../features/user"
import { VERIFYUSERQUERY } from '../graphql/queries/verifyUser'
import { userType } from '../features/user'

const useAuth = () => {
    const dispatch = useDispatch()
    const [userLogged, setUserLogged] = useState(false)
    const [err, setErr] = useState('')
    const user = useSelector((state:any) => state.user.value)
    const [loadingUser, setLoadingUser] = useState(true)

    const { data, loading, error } = useQuery(VERIFYUSERQUERY)

    useEffect(() => {
        if (loading) return
        if (error) {
            setLoadingUser(false)
            return setErr("User not logged")
        }
        
        const user = data.verifyUser
            
        try {
            dispatch(setUser({ name: user.name, email: user.email, id: user.id, plan: user.plan, usedSpace: user.usedSpace}))
            setUserLogged(true)
            setLoadingUser(false)
        } catch (err) {
            //@ts-ignore
            setErr(err)
            setLoadingUser(false)
        }

    }, [data, loading])
    
   
    function login(userData: userType) {
        dispatch(setUser({ name: userData.name, email: userData.email, id: userData.id, plan: userData.plan, usedSpace: userData.usedSpace}))
    }
    

    return { loading: loadingUser, userLogged, error: err, login, user }
}

export default useAuth