import "../css/AddRecipe.css";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { FormHelperText, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';
import { AddRecipe } from '../Store/RecipeSlice';

function RecipeForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const [formData, setFormData] = useState({
    image: '',
  });

  const recipes = useSelector((state) => state.RecipeSlice.recipes);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  const addToArray = (field) => {
    if (field === 'ingredients') {
      setIngredients([...ingredients, '']);
    } else if (field === 'instructions') {
      setInstructions([...instructions, '']);
    }
  };

  const removeFromArray = (index, field) => {
    if (field === 'ingredients') {
      const updatedIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(updatedIngredients);
    } else if (field === 'instructions') {
      const updatedInstructions = instructions.filter((_, i) => i !== index);
      setInstructions(updatedInstructions);
    }
  };

  const handleArrayChange = (index, value, field) => {
    if (field === 'ingredients') {
      const updatedIngredients = ingredients.map((ingredient, i) => i === index ? value : ingredient);
      setIngredients(updatedIngredients);
    } else if (field === 'instructions') {
      const updatedInstructions = instructions.map((instruction, i) => i === index ? value : instruction);
      setInstructions(updatedInstructions);
    }
  };

  const onSubmit = (data) => {
    alert('המתכון נוסף בהצלחה!');
    dispatch(AddRecipe({
      id: recipes.length+1,
      favorite: false,
      category: data.category,
      title: data.name,
      image: formData.image, // Use formData.image for image
      time: data.preparationTime,
      level: data.difficulty,
      amount: data.servings,
      products: ingredients,
      instructions: instructions,
    }));
  };

  return (
    <div className="homeImage4">
      <Box sx={{ maxWidth: 600, mx: 'auto', backgroundColor: 'white', width: '50vw', padding: '3.5%', margin: '7%', position: 'relative', right: '20vw' }}>
        <Typography variant="h4" mb={2} color='#813b46'>
          הוסף מתכון
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="שם מתכון"
            name="name"
            {...register("name", { required: "name is required" })}
            margin="normal"
            error={!!errors.name}
          />
          {errors.name && (<FormHelperText sx={{ color: "red" }}>{errors.name.message}</FormHelperText>)}
          
          
          <TextField
            fullWidth
            label="זמן הכנה"
            name="preparationTime"
            {...register("preparationTime", { required: "preparationTime is required" })}
            margin="normal"
            error={!!errors.preparationTime}
          />
          {errors.preparationTime && (<FormHelperText sx={{ color: "red" }}>{errors.preparationTime.message}</FormHelperText>)}

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

          
          <Button type="submit" variant="contained" color="primary" fullWidth backgroundColor="#813b46" sx={{ backgroundColor: '#813b46' }}>
            שלח מתכון
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default RecipeForm;
