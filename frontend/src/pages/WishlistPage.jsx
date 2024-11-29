import React from 'react'
import { Wishlist } from '../features/wishlist/components/Wishlist'
import {Navbar} from '../features/navigation/components/Navbar'
import { Footer } from '../features/footer/Footer'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation' // Import the MobileNavbar

export const WishlistPage = () => {
  return (
    <>
    <Navbar/>
    <Wishlist/>
    <MobileNavbar />
    <Footer/>
    </>
  )
}
