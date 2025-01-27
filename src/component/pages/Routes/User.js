import React from 'react'

import { useSelector } from 'react-redux';
import {RedirectLoading} from './RdirectLoading';

import Wishlist from '../userPages/Wishlist';



const PasswordRout = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Password /> : <RedirectLoading />
}
const ProfileRoute = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Profile /> : <RedirectLoading />
}
const WishlistRout = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Wishlist /> : <RedirectLoading />
}
const PaymentRoute = () => {
    // let navigate=useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    return user && user.token ? <Payment /> : <RedirectLoading />
}

export {  WishlistRout, }