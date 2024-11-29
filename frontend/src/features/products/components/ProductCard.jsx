import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHelperText, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { addToCartAsync, selectCartItems } from '../../cart/CartSlice';
import { motion } from 'framer-motion';

export const ProductCard = ({ id, title, price, thumbnail, brand, stockQuantity, handleAddRemoveFromWishlist, isWishlistCard, isAdminCard }) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const theme = useTheme();
  const is1410 = useMediaQuery(theme.breakpoints.down(1410));
  const is932 = useMediaQuery(theme.breakpoints.down(932));
  const is752 = useMediaQuery(theme.breakpoints.down(752));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is608 = useMediaQuery(theme.breakpoints.down(608));
  const is488 = useMediaQuery(theme.breakpoints.down(488));
  const is408 = useMediaQuery(theme.breakpoints.down(408));

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(thumbnail || '');

  // Default fallback image for testing purposes
  const fallbackImage = 'https://via.placeholder.com/150'; // Test with a placeholder image

  let isProductAlreadyinWishlist = wishlistItems.some((item) => item.product._id === id);
  const isProductAlreadyInCart = cartItems.some((item) => item.product._id === id);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const data = { user: loggedInUser?._id, product: id };
    dispatch(addToCartAsync(data));
  };

  // Image load handler
  const handleImageError = (error) => {
    console.error('Image failed to load:', error);
    setIsImageLoading(false); // Image failed to load, hide loading state
    setImageSrc(fallbackImage); // Fallback to a placeholder image if the original fails
  };
  
  const handleImageLoad = () => {
    console.log('Image loaded successfully!');
    setIsImageLoading(false); // Image loaded, hide loading state
  };
  

  // Debug: Check if the thumbnail URL is valid
  console.log('Image URL:', thumbnail);

  return (
    <>
      {isProductAlreadyinWishlist !== -1 ? (
        <Stack
          component={isAdminCard ? "" : isWishlistCard ? "" : is408 ? '' : Paper}
          mt={is408 ? 2 : 0}
          elevation={1}
          p={2}
          width={is408 ? 'auto' : is488 ? "200px" : is608 ? "240px" : is752 ? "300px" : is932 ? '240px' : is1410 ? '300px' : '340px'}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/product-details/${id}`)}
        >
          {/* Image Section */}
          <Stack>
          <img
  src={thumbnail || fallbackImage}  // Use fallback if thumbnail is unavailable
  alt={`${title} photo`}
  width="100%"
  height="auto"
  style={{ objectFit: "contain" }}
/>

          </Stack>

          {/* Lower Section */}
          <Stack flex={2} justifyContent={'flex-end'} spacing={1} rowGap={2}>
            <Stack>
              <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='h6' fontWeight={400}>{title}</Typography>
                {
                  !isAdminCard &&
                  <motion.div whileHover={{ scale: 1.3, y: -10, zIndex: 100 }} whileTap={{ scale: 1 }} transition={{ duration: .4, type: "spring" }}>
                    <Checkbox onClick={(e) => e.stopPropagation()} checked={isProductAlreadyinWishlist} onChange={(e) => handleAddRemoveFromWishlist(e, id)} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                  </motion.div>
                }
              </Stack>
              <Typography color={"text.secondary"}>{brand}</Typography>
            </Stack>

            <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Typography>₹{price}</Typography>
              {
                !isWishlistCard ? isProductAlreadyInCart ?
                  '' :
                  !isAdminCard &&
                  <motion.button whileHover={{ scale: 1.030 }} whileTap={{ scale: 1 }} onClick={(e) => handleAddToCart(e)} style={{ padding: "10px 15px", borderRadius: "3px", outline: "none", border: "none", cursor: "pointer", backgroundColor: "black", color: "white", fontSize: is408 ? '.9rem' : is488 ? '.7rem' : is500 ? '.8rem' : '.9rem' }}>
                    <div style={{ display: "flex", alignItems: "center", columnGap: ".5rem" }}>
                      <p>Add To Cart</p>
                    </div>
                  </motion.button>
                  : ''
              }
            </Stack>

            {
              stockQuantity <= 20 && (
                <FormHelperText sx={{ fontSize: ".9rem" }} error>{stockQuantity === 1 ? "Only 1 stock is left" : "Only few are left"}</FormHelperText>
              )
            }
          </Stack>
        </Stack>
      ) : ''}
    </>
  );
};
