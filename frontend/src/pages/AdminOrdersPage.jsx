import React from 'react'
import { AdminOrders } from '../features/admin/components/AdminOrders'
import {Navbar} from '../features/navigation/components/Navbar'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation' // Import the MobileNavbar


export const AdminOrdersPage = () => {
  return (
    <>
    <Navbar/>
    <AdminOrders/>
    <MobileNavbar />
    </>
  )
}
