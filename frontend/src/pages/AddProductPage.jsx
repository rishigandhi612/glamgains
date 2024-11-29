import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation' // Import the MobileNavbar
import { AddProduct } from '../features/admin/components/AddProduct'

export const AddProductPage = () => {
  return (
    <>
    <Navbar/>
    <AddProduct/>
    <MobileNavbar />
    </>
  )
}
