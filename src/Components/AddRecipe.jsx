// ייבוא מודולים ורכיבים דרושים
import "../css/AddRecipe.css"; // ייבוא קובץ ה-CSS עבור הרכיב
import React, { useState } from 'react'; // ייבוא React ושימוש ב-useState לניהול מצב
import { useDispatch } from "react-redux"; // ייבוא פונקציה לדחיפת פעולות ל-Redux
import { useSelector } from 'react-redux'; // ייבוא פונקציה לבחירת נתונים מ-Redux
import { useForm, Controller } from "react-hook-form"; // ייבוא React Hook Form לניהול ואימות טפסים
import { FormHelperText, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material'; // ייבוא רכיבי חומרי מ-MUI
import { AddRecipe } from '../Store/RecipeSlice'; // ייבוא פעולה להוספת מתכון ל-Redux

// הגדרת רכיב ה-RecipeForm
function RecipeForm() {
  // פונקציה לדחיפת פעולות ל-Redux
  const dispatch = useDispatch();
  
  // אתחול ה-hooks של הטופס
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  // מצב לניהול נתוני הטופס
  const [formData, setFormData] = useState({
    image: '', // URL של התמונה שהוזנה
  });

  // מצב לקבלת המתכונים הקיימים מ-Redux
  const recipes = useSelector((state) => state.RecipeSlice.recipes);

  // פונקציה לטיפול בהעלאת קובץ תמונה
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // עדכון מצב התמונה המוצגת
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  // אתחול מצבים עבור שדות דינמיים (רכיבים והוראות הכנה)
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  // פונקציה להוספת רכיב או הוראת הכנה חדשה
  const addToArray = (field) => {
    if (field === 'ingredients') {
      setIngredients([...ingredients, '']);
    } else if (field === 'instructions') {
      setInstructions([...instructions, '']);
    }
  };

  // פונקציה להסרת רכיב או הוראת הכנה לפי אינדקס
  const removeFromArray = (index, field) => {
    if (field === 'ingredients') {
      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(updatedIngredients);
    } else if (field === 'instructions') {
      const updatedInstructions = instructions.filter((_, i) => i !== index);
      setInstructions(updatedInstructions);
    }
  };

  // פונקציה לטיפול בשינויים ברכיבים והוראות הכנה
  const handleArrayChange = (index, value, field) => {
    if (field === 'ingredients') {
      const updatedIngredients = ingredients.map((ingredient, i) => i === index ? value : ingredient);
      setIngredients(updatedIngredients);
    } else if (field === 'instructions') {
      const updatedInstructions = instructions.map((instruction, i) => i === index ? value : instruction);
      setInstructions(updatedInstructions);
    }
  };

  // פונקציה לשליחה של הטופס
  const onSubmit = (data) => {
    alert('המתכון נוסף בהצלחה!'); // הודעה למשתמש לאחר שליחה מוצלחת
    dispatch(AddRecipe({
      id: recipes.length+1, // יצירת מזהה ייחודי עבור המתכון החדש
      favorite: false, // המתכון לא מועדף בהתחלה
      category: data.category, // קטגוריית המתכון (חלבי, בשרי, פרווה)
      title: data.name, // שם המתכון
      image: formData.image, // התמונה שהוזנה
      time: data.preparationTime, // זמן ההכנה
      level: data.difficulty, // רמת הקושי
      amount: data.servings, // כמות מנות
      products: ingredients, // רשימת רכיבים
      instructions: instructions, // רשימת הוראות הכנה
    }));
  };

  return (
    <div className="homeImage4">
      {/* קונטיינר של הטופס עם עיצוב */}
      <Box sx={{ maxWidth: 600, mx: 'auto', backgroundColor: 'white', width: '50vw', padding: '3.5%', margin: '7%', position: 'relative', right: '20vw' }}>
        <Typography variant="h4" mb={2} color='#813b46'>
          הוסף מתכון {/* כותרת של הטופס */}
        </Typography>
        {/* טופס המתכון */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* שדה שם המתכון */}
          <TextField
            fullWidth
            label="שם מתכון"
            name="name"
            {...register("name", { required: "name is required" })}
            margin="normal"
            error={!!errors.name}
          />
          {errors.name && (<FormHelperText sx={{ color: "red" }}>{errors.name.message}</FormHelperText>)}

          {/* שדה זמן הכנה */}
          <TextField
            fullWidth
            label="זמן הכנה"
            name="preparationTime"
            {...register("preparationTime", { required: "preparationTime is required" })}
            margin="normal"
            error={!!errors.preparationTime}
          />
          {errors.preparationTime && (<FormHelperText sx={{ color: "red" }}>{errors.preparationTime.message}</FormHelperText>)}

          {/* שדה כמות מנות באמצעות Controller */}
          <Controller
            name="servings"
            control={control}
            rules={{ required: "שדה חובה" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="כמות"
                margin="normal"
                error={!!errors.servings}
                helperText={errors.servings?.message}
              />
            )}
          />

          {/* שדה קטגוריה */}
          <FormControl fullWidth margin="normal">
            <InputLabel>קטגוריה</InputLabel>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "שדה חובה" }}
              render={({ field }) => (
                <Select {...field} onChange={(e) => field.onChange(e.target.value)}>
                  <MenuItem value="חלבי">חלבי</MenuItem>
                  <MenuItem value="בשרי">בשרי</MenuItem>
                  <MenuItem value="פרווה">פרווה</MenuItem>
                </Select>
              )}
            />
            {errors.category && <FormHelperText sx={{ color: "red" }}>{errors.category.message}</FormHelperText>}
          </FormControl>

          {/* שדה רמת קושי */}
          <FormControl fullWidth margin="normal">
            <InputLabel>רמת קושי</InputLabel>
            <Controller
              name="difficulty"
              control={control}
              defaultValue=""
              rules={{ required: "שדה חובה" }}
              render={({ field }) => (
                <Select {...field} onChange={(e) => field.onChange(e.target.value)}>
                  <MenuItem value="קל">קל</MenuItem>
                  <MenuItem value="בינוני">בינוני</MenuItem>
                  <MenuItem value="קשה">קשה</MenuItem>
                </Select>
              )}
            />
            {errors.difficulty && <FormHelperText sx={{ color: "red" }}>{errors.difficulty.message}</FormHelperText>}
          </FormControl>

          {/* שדה העלאת תמונה */}
          <Box margin="normal">
            <InputLabel color='#813b46'>תמונה</InputLabel>
            <TextField
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'block', margin: '8px', position: 'relative', width: '100' }}
            />
            {formData.image && <img src={formData.image} alt="Preview" style={{ width: '100%', marginTop: '8px' }} />}
          </Box>

          {/* רכיבים */}
          <Typography variant="h6" mt={2} color='#813b46'>
            רכיבים
          </Typography>
          {ingredients.map((ingredient, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <TextField
                fullWidth
                value={ingredient}
                onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
              />
              <Button
                onClick={() => removeFromArray(index, 'ingredients')}
                disabled={ingredients.length === 1}
                color='#813b46'
              >
                הסר
              </Button>
            </Box>
          ))}
          <Button color='#813b46' onClick={() => addToArray('ingredients')}>הוסף רכיב</Button>

          {/* הוראות הכנה */}
          <Typography variant="h6" mt={2} color='#813b46'>
            הוראות הכנה
          </Typography>
          {instructions.map((instruction, index) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <TextField
                fullWidth
                value={instruction}
                onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
              />
              <Button
                onClick={() => removeFromArray(index, 'instructions')}
                disabled={instructions.length === 1}
                color='#813b46'
              >
                הסר
              </Button>
            </Box>
          ))}
          <Button color='#813b46' onClick={() => addToArray('instructions')}>הוסף הוראות</Button>

          {/* כפתור שליחה */}
          <Button type="submit" variant="contained" color="primary" fullWidth backgroundColor="#813b46" sx={{ backgroundColor: '#813b46' }}>
            שלח מתכון
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default RecipeForm;
