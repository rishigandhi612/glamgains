import React from 'react'
import { ProductUpdate } from '../features/admin/components/ProductUpdate'
import {Navbar} from '../features/navigation/components/Navbar'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation' // Import the MobileNavbar


export const ProductUpdatePage = () => {
  return (
    <>
    <Navbar/>
    <ProductUpdate/>
    <MobileNavbar />
    </>
  )
}
