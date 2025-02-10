import "../css/Login.css"; // ייבוא קובץ עיצוב CSS
import * as React from "react"; // ייבוא React
import { AppProvider } from "@toolpad/core/AppProvider"; // ספק האפליקציה של Toolpad
import { SignInPage } from "@toolpad/core/SignInPage"; // עמוד ההתחברות של Toolpad
import { useTheme } from "@mui/material/styles"; // שימוש ב-theme של MUI
import { useDispatch } from "react-redux"; // שימוש ב-dispatch לניהול state עם Redux
import { updateUser } from "../Store/UserSlice"; // פעולה לעדכון המשתמש ב-Redux store
import { useNavigate } from "react-router-dom"; // שימוש בנווט לניווט בין דפים
import { useForm } from "react-hook-form"; // שימוש ב-react-hook-form לניהול טפסים

const providers = [{ id: "credentials", name: "Email and Name" }];

const Login = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); 
  const navigate = useNavigate(); // שימוש בנווט לניווט בדפים

  // שימוש ב-react-hook-form לניהול השדות והטופס
  const {
    register, // רישום שדות הטופס
    handleSubmit, // פונקציה לטיפול בשליחת הטופס
    formState: { errors }, // אחזור שגיאות מהטופס
  } = useForm();

  // פונקציה לטיפול בהגשת הטופס
  const onSubmit = (data) => {
    dispatch(updateUser(data)); // עדכון המשתמש ב-Redux store
    navigate("/RecipeList"); // ניווט לרשימת המתכונים לאחר התחברות מוצלחת
  };

  return (
    <AppProvider theme={theme}> {/* עטיפת האפליקציה בספק עם ה-theme */}
      <div className="homeImage2"> {/* רכיב עיצובי */}
        <SignInPage
          signIn={handleSubmit(onSubmit)} // הפעלת פונקציית שליחת הטופס בעת התחברות
          slotProps={{
            emailField: {
              label: "שם",
              variant: "standard",
              autoFocus: false,
              name: "username",
              type: "text",
              placeholder: "your name",
              ...register("name", { required: "Name is required" }), // רישום השדה ב-react-hook-form
              error: !!errors.name, // הצגת שגיאות במידה וקיימות
              helperText: errors.name?.message, // הודעת עזרה במקרה של שגיאה
            },
            passwordField: {
              label: "מייל",
              variant: "standard",
              name: "email",
              type: "email",
              placeholder: "your@gmail.com",
              ...register("email", {
                required: "Email is required", // אימות שהשדה חובה
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, // תבנית אימות למייל תקין
                  message: "Invalid email address", // הודעת שגיאה במקרה של מייל לא תקין
                },
              }),
              error: !!errors.email, // הצגת שגיאה אם יש
              helperText: errors.email?.message, // הודעת עזרה במקרה של שגיאה
            },
            submitButton: {
              variant: "outlined", // סגנון כפתור השליחה
            },
          }}
          providers={providers} // ספקי התחברות זמינים
        />
      </div>
    </AppProvider>
  );
};

export default Login; // ייצוא הקומפוננטה
