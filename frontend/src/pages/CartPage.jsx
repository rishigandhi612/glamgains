import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation' // Import the MobileNavbar
import { Cart } from '../features/cart/components/Cart'
import {Footer} from '../features/footer/Footer'

export const CartPage = () => {
  return (
    <>
    <Navbar/>
    <Cart/>
    <MobileNavbar />
    <Footer/>
    
    </>
  )
}
