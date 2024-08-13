import {
    EventSeat,
    DirectionsCar,
    AddLocation,
    PersonPinCircle
} from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button ,  useMediaQuery, TextField } from "@mui/material";

import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../state";
import FlexBetween from "../../components/FlexBetween";
import { LocationOn } from "@mui/icons-material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const MyProductWidget = ({picturePath}) => {
    const dispatch = useDispatch();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [name, setName] = useState("");    
    const [ description, setDescription] = useState("");  
    const[price, setPrice] = useState("");
    const [quantity, setQuantity]= useState("");  
    const [minQuantity, setMinQuantity] = useState("");
    const [maxQuantity, setMaxQuantity] = useState("");
    const[reorderPoint, setReorderPoint] = useState("");
    const[category, setCategory] = useState("");
    const [status , setStatus] = useState("");
    const {palette} = useTheme();
    const {_id} = useSelector((state)=> state.user);
    const Role = useSelector((state)=> state.user.role);
    const token = useSelector((state)=> state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
   
   

    const handleSnackbarOpen = () => {
      setOpenSnackbar(true);
    };
    
 

    const handleSnackbarClose = (product, reason) => {
      if (reason === 'clickaway') {
        return;
      }
    
      setOpenSnackbar(false);
    };
    
    const handleProduct = async() =>{
      
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("minQuantity", minQuantity);
        formData.append("reorderPoint", reorderPoint);
        formData.append("maxQuantity", maxQuantity);
        formData.append("category", category);
        formData.append("status", status);


       
        const response = await fetch(`http://localhost:3001/products`,{
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData
        });
        const products = await response.json();
        dispatch(setProducts({products}));
        setPrice("");
        setCategory("");
        setMaxQuantity("");
        setMinQuantity("");
        setName("");
        setDescription("");
        setReorderPoint("");
        setQuantity("");
        setStatus("");
        handleSnackbarOpen();

    }
   
    { Role == "employee" ? (
        setStatus("Registered")
    ) :(
     setStatus("Marketplace")
    )}
  
  return (
    <WidgetWrapper width={isNonMobileScreens? "50%" : "100%"}>
    <Box display={"flex"} justifyContent="center" alignItems="center" gap={5}  >
        <UserImage image={picturePath}></UserImage>
        <Typography  fontSize={"3rem"} color={"#834bff"}>Product Form</Typography>
    </Box>
   
    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <EventSeat  fontSize="large" />
    </Box>
      <InputBase
      multiline
        placeholder="write down name of product"
        onChange={(e) => setName(e.target.value)}
        value={name}
        sx={{
          width: '100%',
          backgroundColor: palette.neutral.light,
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input

        }}
        
      />
    </Box>

    <Box mt={2} display="flex" alignItems="center"  marginBottom="1rem" >
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <DirectionsCar color="#834bff" fontSize="large" />
    </Box>

      <InputBase
      multiline
        placeholder="write down description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        sx={{
          width: '100%',
          backgroundColor: palette.neutral.light,
          borderRadius: '2rem',
          padding: '1rem 2rem',
          marginLeft: '1rem', // Add margin to create space between the icon and the input

        }}
      />
    </Box>
    
        <Box display="flex" alignItems="center" marginBottom="1rem">
        <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >       <AddLocation color="#834bff" fontSize="large" />

    </Box>
      <TextField
      multiline
      fullWidth
      label="Quantity"
        placeholder="write down quantity"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        sx={{ marginLeft: '1rem' }}


      />
    </Box>
    
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
            <LocationOn color="#834bff" fontSize="large" />

    </Box>
      <TextField
      multiline
      fullWidth
      label="Price"
        placeholder="write down Price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        sx={{ marginLeft: '1rem' }}
      />
    </Box>
         

         {Role == 'employee' && (
            <Box display="flex" alignItems="center" marginBottom="1rem">
            <Box
              sx={{
                backgroundColor: '#834bff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                padding: '0.5rem',
              }}
            >
                <PersonPinCircle color="#834bff" fontSize="large" />
        
            </Box>
          <TextField
            fullWidth
            multiline
            label="Minimum Quantity"
            value={minQuantity}
            onChange={(e) => setMinQuantity(e.target.value)}
            sx={{ marginLeft: '1rem' }}
            variant="outlined"
            />
        </Box>
         )}
    

{ Role == 'employee' && (
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
        <PersonPinCircle color="#834bff" fontSize="large" />

    </Box>
  <TextField
    fullWidth
    multiline
    label="Max  Quantity"
    value={maxQuantity}
    onChange={(e) => setMaxQuantity(e.target.value)}
    sx={{ marginLeft: '1rem' }}
    variant="outlined"
    />
</Box>
)}


{ Role == 'employee' && (
    <Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
        <PersonPinCircle color="#834bff" fontSize="large" />

    </Box>
  <TextField
    fullWidth
    multiline
    label="Reorder Point"
    value={reorderPoint}
    onChange={(e) => setReorderPoint(e.target.value)}
    sx={{ marginLeft: '1rem' }}
    variant="outlined"
    />
</Box>
)}



<Box display="flex" alignItems="center" marginBottom="1rem">
    <Box
      sx={{
        backgroundColor: '#834bff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: '0.5rem',
      }}
    >
        <PersonPinCircle color="#834bff" fontSize="large" />

    </Box>
  <TextField
    fullWidth
    multiline
    label="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    sx={{ marginLeft: '1rem' }}
    variant="outlined"
    />
</Box>

   
  
                  

    <Divider sx={{margin: "1.25rem 0"}}></Divider>

    <FlexBetween>
        

       

       
        <Button
          
          onClick={handleProduct}
          sx={{
            color: palette.background.alt,
            backgroundColor: "#834bff",
            borderRadius: "3rem",
          }}
        >
          POST Product
        </Button>
        
    </FlexBetween>
    <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={handleSnackbarClose}
    severity="success"
  >
    Product created successfully go to home page
  </MuiAlert>
</Snackbar>

    </WidgetWrapper>
  )
}

export default MyProductWidget