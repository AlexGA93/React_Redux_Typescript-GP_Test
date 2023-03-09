import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { CustomDialog } from '../CustomDialog';
import { FavoriteTable } from './FavoriteTable';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { dialogOpenSubject$ } from '../CustomDialog/CustomDialog';
import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';

const Navbar = () => {

  // extract information from reduxstate
  useSelector((store: AppStore ) => store.favorites);

  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  };

  return (
     <>
     <CustomDialog>
      <FavoriteTable />
     </CustomDialog>

      <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gentleman Programming React App
            </Typography>

            <Button 
              variant="contained" 
              color="success"
              startIcon={ <FavoriteIcon /> }  
              onClick={handleClick}
            >
              Open Favorites
            </Button>

          </Toolbar>
        </AppBar>
     </>
  )
}

export default Navbar