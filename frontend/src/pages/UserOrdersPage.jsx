import React from 'react'
import { UserOrders } from '../features/order/components/UserOrders'
import {Navbar} from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation'

export const UserOrdersPage = () => {
  return (
    <>
    <Navbar/>
    <UserOrders/>
    <MobileNavbar />
    <Footer/>
    </>
  )
}
