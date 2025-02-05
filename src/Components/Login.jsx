import "../css/Login.css";
import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { updateUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const providers = [{ id: "credentials", name: "Email and Name" }];

const Login = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  // שימוש ב-react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // פונקציה לטיפול בהגשת הטופס
  const onSubmit = (data) => {
    dispatch(updateUser(data));
    navigate("/RecipeList");
  };

  return (
    <AppProvider theme={theme}>
      <div className="homeImage2">
        <SignInPage
          signIn={handleSubmit(onSubmit)}
          slotProps={{
            emailField: {
              label: "שם",
              variant: "standard",
              autoFocus: false,
              name: "username",
              type: "text",
              placeholder: "your name",
              ...register("name", { required: "Name is required" }),
              error: !!errors.name,
              helperText: errors.name?.message,
            },
            passwordField: {
              label: "מייל",
              variant: "standard",
              name: "email",
              type: "email",
              placeholder: "your@gmail.com",
              ...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              }),
              error: !!errors.email,
              helperText: errors.email?.message,
            },
            submitButton: {
              variant: "outlined",
            },
          }}
          providers={providers}
        />
      </div>
    </AppProvider>
  );
};

export default Login;
