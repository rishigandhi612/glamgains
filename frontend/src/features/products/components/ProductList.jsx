import {
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React, { useEffect, useState, useCallback } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters } from "../ProductSlice";
  import { ProductCard } from "./ProductCard";
  import Accordion from "@mui/material/Accordion";
  import AccordionSummary from "@mui/material/AccordionSummary";
  import AccordionDetails from "@mui/material/AccordionDetails";
  import AddIcon from "@mui/icons-material/Add";
  import { selectBrands } from "../../brands/BrandSlice";
  import FormGroup from "@mui/material/FormGroup";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import Checkbox from "@mui/material/Checkbox";
  import { selectCategories } from "../../categories/CategoriesSlice";
  import Pagination from "@mui/material/Pagination";
  import { ITEMS_PER_PAGE } from "../../../constants";
  import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems } from "../../wishlist/WishlistSlice";
  import { selectLoggedInUser } from "../../auth/AuthSlice";
  import { toast } from "react-toastify";
  import { banner1, banner2, banner3, banner4, loadingAnimation } from "../../../assets/index";
  import { resetCartItemAddStatus, selectCartItemAddStatus } from "../../cart/CartSlice";
  import { motion } from "framer-motion";
  import { ProductBanner } from "./ProductBanner";
  import ClearIcon from "@mui/icons-material/Clear";
  import Lottie from "lottie-react";
  
  const sortOptions = [
    { name: "Price: low to high", sort: "price", order: "asc" },
    { name: "Price: high to low", sort: "price", order: "desc" },
  ];
  
  export const ProductList = () => {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(null);
    const [bannerImages, setBannerImages] = useState([]); // Define the state for banner images
    const theme = useTheme();
    const is1200 = useMediaQuery(theme.breakpoints.down(1200));
    const is800 = useMediaQuery(theme.breakpoints.down(800));
    const is600 = useMediaQuery(theme.breakpoints.down(600));
    const is500 = useMediaQuery(theme.breakpoints.down(500));
    const is700 = useMediaQuery(theme.breakpoints.down(700)); // Define is700 media query
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const products = useSelector(selectProducts);
    const totalResults = useSelector(selectProductTotalResults);
    const loggedInUser = useSelector(selectLoggedInUser);
    const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE) || 1;
    const productFetchStatus = useSelector(selectProductFetchStatus);
    const wishlistItems = useSelector(selectWishlistItems);
    const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
    const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);
    const cartItemAddStatus = useSelector(selectCartItemAddStatus);
    const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
  
    const handleBrandFilters = (e) => {
      const { value, checked } = e.target;
      setFilters((prevFilters) => {
        const updatedBrands = checked
          ? [...prevFilters.brand, value]
          : prevFilters.brand.filter((brand) => brand !== value);
        return { ...prevFilters, brand: updatedBrands };
      });
    };
  
    const handleCategoryFilters = useCallback((e) => {
      const { value, checked } = e.target;
      setFilters((prevFilters) => {
        const updatedCategories = Array.isArray(prevFilters.category)
          ? checked
            ? [...prevFilters.category, value]
            : prevFilters.category.filter((category) => category !== value)
          : [value];
        return { ...prevFilters, category: updatedCategories };
      });
    }, []);
  
    const loadBannerImages = async () => {
      setIsLoading(true);
      try {
        const loadedImages = [banner1, banner2, banner3, banner4];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBannerImages(loadedImages); // Correctly set the banner images
      } catch (error) {
        console.error("Error loading banner images:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      loadBannerImages();
    }, []);
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, []);
  
    useEffect(() => {
      setPage(1);
    }, [totalResults]);
  
    useEffect(() => {
      const finalFilters = { ...filters };
      finalFilters["pagination"] = { page: page, limit: ITEMS_PER_PAGE };
      finalFilters["sort"] = sort;
      if (!loggedInUser?.isAdmin) {
        finalFilters["user"] = true;
      }
      dispatch(fetchProductsAsync(finalFilters));
    }, [filters, page, sort, loggedInUser]);
  
    const handleAddRemoveFromWishlist = (e, productId) => {
      if (e.target.checked) {
        const data = { user: loggedInUser?._id, product: productId };
        dispatch(createWishlistItemAsync(data));
      } else if (!e.target.checked) {
        const index = wishlistItems.findIndex(
          (item) => item.product._id === productId
        );
        dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
      }
    };
  
    useEffect(() => {
      if (wishlistItemAddStatus === "fulfilled") {
        toast.success("Product added to wishlist");
      } else if (wishlistItemAddStatus === "rejected") {
        toast.error("Error adding product to wishlist, please try again later");
      }
  
      if (wishlistItemDeleteStatus === "fulfilled") {
        toast.success("Product removed from wishlist");
      } else if (wishlistItemDeleteStatus === "rejected") {
        toast.error(
          "Error removing product from wishlist, please try again later"
        );
      }
  
      if (cartItemAddStatus === "fulfilled") {
        toast.success("Product added to cart");
      } else if (cartItemAddStatus === "rejected") {
        toast.error("Error adding product to cart, please try again later");
      }
    }, [wishlistItemAddStatus, wishlistItemDeleteStatus, cartItemAddStatus]);
  
    useEffect(() => {
      if (productFetchStatus === "rejected") {
        toast.error("Error fetching products, please try again later");
      }
    }, [productFetchStatus]);
  
    useEffect(() => {
      return () => {
        dispatch(resetProductFetchStatus());
        dispatch(resetWishlistItemAddStatus());
        dispatch(resetWishlistItemDeleteStatus());
        dispatch(resetCartItemAddStatus());
      };
    }, []);
  
    const handleFilterClose = () => {
      dispatch(toggleFilters());
    };
  
    return (
      <>
        {/* filters side bar */}
        {productFetchStatus === "pending" ? (
          <Stack
            width={is500 ? "35vh" : "25rem"}
            height={"calc(100vh - 4rem)"}
            justifyContent={"center"}
            marginRight={"auto"}
            marginLeft={"auto"}
          >
            <Lottie animationData={loadingAnimation} />
          </Stack>
        ) : (
          <>
            <motion.div
              style={{
                position: "fixed",
                backgroundColor: "white",
                height: "100vh",
                padding: "1rem",
                overflowY: "scroll",
                width: is500 ? "100vw" : "30rem",
                zIndex: 500,
              }}
              variants={{ show: { left: 0 }, hide: { left: -500 } }}
              initial={"hide"}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              <Typography variant="h4" fontSize={is600 ? "1.5rem" : "2rem"}>
                New Arrivals
              </Typography>
              <IconButton
                onClick={handleFilterClose}
                aria-label="Close filter"
                style={{ position: "absolute", top: 15, right: 15 }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ClearIcon fontSize="medium" />
                </motion.div>
              </IconButton>
  
              {/* Filters section */}
              <Stack rowGap={2} mt={4}>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Totes
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Backpacks
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Travel Bags
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Hip Bags
                </Typography>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Laptop Sleeves
                </Typography>
              </Stack>
  
              {/* Brand Filters */}
              <Stack mt={2}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="brand-filters"
                    id="brand-filters"
                  >
                    <Typography fontSize={is600 ? "1rem" : "1.2rem"}>Brands</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <FormGroup onChange={handleBrandFilters}>
                      {brands?.map((brand) => (
                        <motion.div
                          key={brand._id}
                          style={{ width: "fit-content" }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FormControlLabel
                            sx={{ ml: 1 }}
                            control={<Checkbox />}
                            label={brand.name}
                            value={brand._id}
                          />
                        </motion.div>
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Stack>
  
              {/* Category Filters */}
              <Stack mt={2}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="category-filters"
                    id="category-filters"
                  >
                    <Typography fontSize={is600 ? "1rem" : "1.2rem"}>Category</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <FormGroup onChange={handleCategoryFilters}>
                      {categories?.map((category) => (
                        <motion.div
                          key={category._id}
                          style={{ width: "fit-content" }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FormControlLabel
                            sx={{ ml: 1 }}
                            control={<Checkbox />}
                            label={category.name}
                            value={category._id}
                          />
                        </motion.div>
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </motion.div>
  
            {/* Main content section */}
            <Stack mb={"3rem"}>
              {/* Banners */}
              <div>
                <ProductBanner images={bannerImages} />
              </div>
  
              {/* Product Section */}
              <Stack
                rowGap={5}
                mt={is600 ? 0 : -1}
                sx={{ position: "relative", zIndex: 2 }}
              >
                {/* Sort Options */}
                <Stack
                  flexDirection={"row"}
                  mr={"2rem"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  columnGap={5}
                >
                  <Stack alignSelf={"flex-end"} width={is500 ? "9rem" : "12rem"}>
                    <FormControl fullWidth>
                      <InputLabel id="sort-dropdown">Sort</InputLabel>
                      <Select
                        variant="standard"
                        labelId="sort-dropdown"
                        label="Sort"
                        onChange={(e) => setSort(e.target.value)}
                        value={sort}
                      >
                        <MenuItem bgcolor="text.secondary" value={null}>
                          Reset
                        </MenuItem>
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name} value={option}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
  
                {/* Product Grid */}
                <Grid container spacing={is700 ? 1 : 2} justifyContent={"center"} alignContent={"center"}>
  {products.map((product) => (
    <Grid item xs={6} sm={2} md={4} lg={3} key={product._id}>
      <ProductCard
        id={product._id}
        title={product.title}
        thumbnail={product.thumbnail}
        brand={product.brand.name}
        price={product.price}
        handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
      />
    </Grid>
  ))}
</Grid>

                {/* Pagination */}
                <Stack
                  alignSelf={is500 ? "center" : "flex-end"}
                  mr={is500 ? 0 : 5}
                  rowGap={2}
                  p={is500 ? 1 : 0}
                >
                  <Pagination
                    size={is500 ? "medium" : "large"}
                    page={page}
                    onChange={(e, page) => setPage(page)}
                    count={totalPages}
                    variant="outlined"
                    shape="rounded"
                  />
                  <Typography textAlign={"center"}>
                    Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {page * ITEMS_PER_PAGE > totalResults
                      ? totalResults
                      : page * ITEMS_PER_PAGE}{" "}
                    of {totalResults} results
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
      </>
    );
  };
  