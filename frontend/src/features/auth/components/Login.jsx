import {
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Logopng } from "../../../assets";
import { ecommerceOutlookAnimation } from "../../../assets"; // Ensure the animation is available
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { MotionConfig, motion } from "framer-motion";

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "demo@gmail.com", // Default email value
      password: "helloWorld@123", // Default password value
    },
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900)); // Breakpoint for tablet and below
  const is480 = useMediaQuery(theme.breakpoints.down(480)); // Breakpoint for mobile (phones)
  const is600to480 = useMediaQuery("(min-width: 480px) and (max-width: 600px)"); // Target screens between 480px and 600px

  // handles user redirection
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser]);

  // handles login error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred during login.");
    }
  }, [error]);

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(() => {
    if (status === "fulfilled" && loggedInUser?.isVerified === true) {
      toast.success(`Welcome!`);
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const handleLogin = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword; // Ensure there's no extra field
    dispatch(loginAsync(cred));
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      flexDirection={is480 ? "column" : "row"}  // Adjust flex direction for mobile
      sx={{ overflowY: "hidden" }}
    >
      {/* Display animation only for larger screens (not mobile) */}
      {!is480 && (
        <Stack bgcolor={"black"} flex={1} justifyContent={"center"}>
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      )}

      <Stack
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ padding: is480 ? "0 1rem" : "0" }}  // Add padding on mobile
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Stack rowGap={".4rem"}>
            <img
              src={Logopng}
              alt="GLAM_GAINS logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Stack>
        </Stack>

        <Stack
          mt={4}
          spacing={2}
          width={is480 ? "95vw" : "28rem"}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          <motion.div whileHover={{ y: -5 }}>
            <TextField
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Email"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          </motion.div>

          <motion.div whileHover={{ y: -5 }}>
            <TextField
              type="password"
              fullWidth
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
          </motion.div>

          {/* Display Login Error if Available */}
          {error && (
            <FormHelperText sx={{ mt: 1 }} error>
              {error.message || "Invalid credentials. Please try again."}
            </FormHelperText>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <LoadingButton
              fullWidth
              sx={{ height: "2.5rem" }}
              loading={status === "pending"}
              type="submit"
              variant="contained"
            >
              Login
            </LoadingButton>
          </motion.div>

          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexWrap={"wrap-reverse"}
          >
            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
              <motion.div>
                <Typography
                  mr={"1.5rem"}
                  sx={{ textDecoration: "none", color: "text.primary" }}
                  to={"/forgot-password"}
                  component={Link}
                >
                  Forgot password
                </Typography>
              </motion.div>

              <motion.div>
                <Typography
                  sx={{ textDecoration: "none", color: "text.primary" }}
                  to={"/signup"}
                  component={Link}
                >
                  Don't have an account?{" "}
                  <span style={{ color: theme.palette.primary.dark }}>
                    Register
                  </span>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack>
        </Stack>

        {/* Display Admin credentials below the login form */}
        <Stack mt={4} spacing={1} alignItems="center">
          <Typography variant="body2" color="textSecondary">
            <strong>Admin Credentials:</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: <strong>rishigandhi021@gmail.com</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Password: <strong>Rishi@123</strong>
          </Typography>
        </Stack>

        {/* Display the animation at the bottom for mobile and side-by-side for 480px-600px */}
        {is600to480 && (
          <Stack
            mt={4}
            justifyContent="center"
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Lottie
              animationData={ecommerceOutlookAnimation}
              style={{
                width: "40%", // Set the side animation size
                height: "auto",
              }}
            />
            <Lottie
              animationData={ecommerceOutlookAnimation}
              style={{
                width: "40%", // Set the bottom animation size
                height: "auto",
              }}
            />
          </Stack>
        )}

        {/* Display the animation only for mobile at the bottom */}
        {is480 && (
          <Stack
            mt={4}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              position: "relative",
            }}
          >
            <Lottie
              animationData={ecommerceOutlookAnimation}
              style={{
                width: "80%", // Make sure it doesn't overflow
                height: "250px",
              }}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
