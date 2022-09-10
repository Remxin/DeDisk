import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../features/user"
import { verifyUserQuery } from '../graphql/queries/verifyUser'
import { userType } from '../features/user'

const useAuth = () => {
    const dispatch = useDispatch()
    const [userLogged, setUserLogged] = useState(false)
    const [err, setErr] = useState('')
    const user = useSelector((state:any) => state.user.value)

    const { data, loading, error } = useQuery(verifyUserQuery)

    useEffect(() => {
        if (loading) return
        if (error) return setErr("User not logged")
        
        const user = data.verifyUser
        console.log(user);
            
        try {
            dispatch(setUser({ name: user.name, email: user.email, id: user.id, plan: user.plan, usedSpace: user.usedSpace}))
            setUserLogged(true)
        } catch (err) {
            //@ts-ignore
            setErr(err)
        }

    }, [data, loading])
    
   
    function login(userData: userType) {
        dispatch(setUser({ name: userData.name, email: userData.email, id: userData.id, plan: userData.plan, usedSpace: userData.usedSpace}))
    }
    

    return { userLogged, error: err, login, user }
}

export default useAuth