import React from 'react'
import { UserProfile } from '../features/user/components/UserProfile'
import {Navbar} from '../features/navigation/components/Navbar'
import { MobileNavbar } from '../features/navigation/components/BottomNavigation' // Import the MobileNavbar


export const UserProfilePage = () => {
  return (
    <>
    <Navbar/>
    <UserProfile/>
    <MobileNavbar />
    </>
  )
}
