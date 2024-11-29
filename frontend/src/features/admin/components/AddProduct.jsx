import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
  updateProductByIdAsync
} from '../../products/ProductSlice';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { toast } from 'react-toastify';

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    if (productAddStatus === 'fullfilled') {
      reset();
      toast.success('New product added');
      navigate('/admin/dashboard');
    } else if (productAddStatus === 'rejected') {
      toast.error('Error adding product, please try again later');
    }
  }, [productAddStatus, reset, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, [dispatch]);

  const handleAddProduct = (data) => {
    const newProduct = { ...data, images: [data.image0, data.image1, data.image2, data.image3] };
    delete newProduct.image0;
    delete newProduct.image1;
    delete newProduct.image2;
    delete newProduct.image3;

    dispatch(addProductAsync(newProduct));
  };

  return (
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
      <Stack width={is1100 ? '100%' : '60rem'} rowGap={4} mt={is480 ? 4 : 6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}>
        {/* Field Area */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Title
            </Typography>
            <TextField
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ''}
            />
          </Stack>

          <Stack flexDirection={'row'}>
            <FormControl fullWidth>
              <InputLabel id="brand-selection">Brand</InputLabel>
              <Select
                {...register('brand', { required: 'Brand is required' })}
                labelId="brand-selection"
                label="Brand"
                error={!!errors.brand}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.brand && <Typography color="error" variant="body2">{errors.brand.message}</Typography>}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-selection">Category</InputLabel>
              <Select
                {...register('category', { required: 'Category is required' })}
                labelId="category-selection"
                label="Category"
                error={!!errors.category}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && <Typography color="error" variant="body2">{errors.category.message}</Typography>}
            </FormControl>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register('description', { required: 'Description is required' })}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ''}
            />
          </Stack>

          <Stack flexDirection={'row'}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Price
              </Typography>
              <TextField
                type="number"
                {...register('price', { required: 'Price is required' })}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ''}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Discount {is480 ? '%' : 'Percentage'}
              </Typography>
              <TextField
                type="number"
                {...register('discountPercentage', { required: 'Discount percentage is required' })}
                error={!!errors.discountPercentage}
                helperText={errors.discountPercentage ? errors.discountPercentage.message : ''}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Stock Quantity
            </Typography>
            <TextField
              type="number"
              {...register('stockQuantity', { required: 'Stock Quantity is required' })}
              error={!!errors.stockQuantity}
              helperText={errors.stockQuantity ? errors.stockQuantity.message : ''}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Thumbnail
            </Typography>
            <TextField
              {...register('thumbnail', { required: 'Thumbnail is required' })}
              error={!!errors.thumbnail}
              helperText={errors.thumbnail ? errors.thumbnail.message : ''}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Product Images
            </Typography>

            <Stack rowGap={2}>
              <TextField {...register('image0', { required: 'Image is required' })} error={!!errors.image0} />
              <TextField {...register('image1', { required: 'Image is required' })} error={!!errors.image1} />
              <TextField {...register('image2', { required: 'Image is required' })} error={!!errors.image2} />
              <TextField {...register('image3', { required: 'Image is required' })} error={!!errors.image3} />
            </Stack>
          </Stack>
        </Stack>

        {/* Action Area */}
        <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480 ? 1 : 2}>
          <Button size={is480 ? 'medium' : 'large'} variant="contained" type="submit">
            Add Product
          </Button>
          <Button
            size={is480 ? 'medium' : 'large'}
            variant="outlined"
            color="error"
            component={Link}
            to={'/admin/dashboard'}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
