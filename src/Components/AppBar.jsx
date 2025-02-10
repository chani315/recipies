import "../css/AppBar.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

// עיצוב קישורים ללא קו תחתי
const StyledLink = styled(Link)({
    textDecoration: 'none',
});

// מערכים של שמות עמודים וקישורים
const pages = ['בית', 'הרשמה', 'מתכונים', 'מועדפים', 'הוספת מתכון'];
const links = ['/', '/login', '/RecipeList', '/FavoritesRecipes', '/AddRecipe'];

const ResponsiveAppBar=()=> {  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // פותח את תפריט הניווט.
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

   // סוגר את תפריט הניווט.
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

   // סוגר את תפריט המשתמש.
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#813b46' }}>
      <Container maxWidth="0%">
        <Toolbar disableGutters>
          {/* תפריט ניווט נפתח במסכים קטנים */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <StyledLink to={links[index]} key={page}>
                  <MenuItem>
                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                  </MenuItem>
                </StyledLink>
              ))}
            </Menu>
          </Box>         
          {/* תפריט ניווט ראשי במסכים גדולים */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <StyledLink to={links[index]} key={page}>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block', fontSize: '23px', margin: '15px 30px' }}
                >
                  {page}
                </Button>
              </StyledLink>
            ))}
          </Box>
          
          {/* אזור משתמש */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton sx={{ p: 0, display: 'flex', flexDirection: 'row-reverse', marginLeft: '2vw' }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                <Button sx={{ my: 2, color: 'white', display: 'block', fontSize: '23px', margin: '15px 30px' }}>
                  שלום {useSelector(x => x.UserSlice.name)}
                </Button>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
