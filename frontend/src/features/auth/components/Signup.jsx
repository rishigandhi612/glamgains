import { FormHelperText, Stack, TextField, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ecommerceOutlookAnimation } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { selectLoggedInUser, signupAsync, selectSignupStatus, selectSignupError, clearSignupError, resetSignupStatus } from '../AuthSlice';
import { toast } from 'react-toastify';
import { motion, MotionConfig } from 'framer-motion';
import { Logopng } from '../../../assets';

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // Handles user redirection
  useEffect(() => {
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    } else if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  // Handles signup error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === 'fulfilled') {
      toast.success("Welcome! Verify your email to start shopping on GLAM_GAINS.");
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status, dispatch, reset]);

  // Handles signup action and dispatches signup action with credentials
  const handleSignup = (data) => {
    const credentials = { ...data };
    delete credentials.confirmPassword; // Remove confirmPassword for the API call
    dispatch(signupAsync(credentials));
  };

  return (
    <Stack width="100vw" height="100vh" flexDirection="row" sx={{ overflowY: "hidden" }}>
      {/* Lottie Animation (only shown on larger screens) */}
      {!is900 && (
        <Stack bgcolor="black" flex={1} justifyContent="center">
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      )}

      {/* Main Signup Form */}
      <Stack flex={1} justifyContent="center" alignItems="center">
        {/* Title */}
        <Stack rowGap={".4rem"}>
            <img
              src={Logopng}
              alt="GLAM_GAINS logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Stack>

        {/* Form */}
        <Stack mt={4} spacing={2} width={is480 ? "95vw" : "28rem"} component="form" noValidate onSubmit={handleSubmit(handleSignup)}>
          <MotionConfig whileHover={{ y: -5 }}>
            {/* Username */}
            <motion.div>
              <TextField
                fullWidth
                {...register("name", { required: "Username is required" })}
                placeholder="Username"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            </motion.div>

            {/* Email */}
            <motion.div>
              <TextField
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            </motion.div>

            {/* Password */}
            <motion.div>
              <TextField
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message: "Password must be at least 8 characters, contain 1 uppercase, 1 lowercase, and 1 number",
                  },
                })}
                placeholder="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            </motion.div>

            {/* Confirm Password */}
            <motion.div>
              <TextField
                fullWidth
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value, fromValues) => value === fromValues.password || "Passwords don't match",
                })}
                placeholder="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
              />
            </motion.div>
          </MotionConfig>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <LoadingButton sx={{ height: '2.5rem' }} fullWidth loading={status === 'pending'} type="submit" variant="contained">
              Signup
            </LoadingButton>
          </motion.div>

          {/* Links */}
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center" flexWrap="wrap-reverse">
            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
              <motion.div>
                <Typography mr="1.5rem" sx={{ textDecoration: "none", color: "text.primary" }} to="/forgot-password" component={Link}>
                  Forgot password?
                </Typography>
              </motion.div>

              <motion.div>
                <Typography sx={{ textDecoration: "none", color: "text.primary" }} to="/login" component={Link}>
                  Already a member? <span style={{ color: theme.palette.primary.dark }}>Login</span>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
