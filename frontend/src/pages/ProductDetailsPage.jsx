import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation' // Import the MobileNavbar
import { ProductDetails } from '../features/products/components/ProductDetails'
import { Footer } from '../features/footer/Footer'

export const ProductDetailsPage = () => {
  return (
    <>
    <Navbar/>
    <ProductDetails/>
    <MobileNavbar />
    <Footer/>
    </>
  )
}
