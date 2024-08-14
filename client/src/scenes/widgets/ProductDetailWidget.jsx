import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import UserImage from "../../components/UserImage";
import {useMediaQuery} from "@mui/material";
import { setProduct } from "../../state";
import BookedUserWidget from "./BookedUserWidget";

const ProductDetailWidget = ({
  productId,
  productUserId,
  name,
  description,
  price,
  quantity,
  minQuantity,
  reorderPoint,
  maxQuantity,
  status,
  category,
  bookings
}) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const token = useSelector((state)=> state.token);
  const role = useSelector((state)=> state.user.role);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isBooked = Boolean(bookings[loggedInUserId]);
  const bookingCount = Object.keys(bookings).length;
  const userIds = Object.keys(bookings);
  
  // Function to handle edit button click
  const handleEditProduct = () => {
    // Redirect to edit form with event ID as URL parameter
    navigate(`/products/${productId}/edit`);
  };

console.log(productId);
  const patchProduct = async () => {
    const response = await fetch(`http://localhost:3001/products/${productId}/booking`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    if (response.status === 400) {
      // Backend returned a "No available seats" message
      const data = await response.json();
      alert(data.message);
      return;
    }
    const updatedProduct= await response.json();
    dispatch(setProduct({ product : updatedProduct }));
    
  };
  
  return (
    <Box padding={"1.5rem 1.5rem 0.75rem 1.5rem"} gap={"5rem"} display={ isNonMobileScreens ? "flex" : "block"} >
    
    <WidgetWrapper mt={"2rem"} width={isNonMobileScreens? "60%" : "100%"} >
      <Box display={"flex"} justifyContent="center" alignItems="center" gap={isNonMobileScreens ? "2rem" : "1rem"}>
          <Typography  fontSize={isNonMobileScreens? "3rem" : "2rem"} color= {role=='employee' ? 'primary' : "#834bff"} > Product Details </Typography>
      </Box>
          <Box mt={"1rem"} >
          <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Box display={isNonMobileScreens? "flex" : "block"}>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                      Product Name : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {name}
                  </Typography>
                    </Box>
            </Box>

            <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Box display={isNonMobileScreens? "flex" : "block"}>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                    Description : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {description}
                  </Typography>
                    </Box>
            </Box>

            <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Box display={isNonMobileScreens? "flex" : "block"}>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                    Price: 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {price}
                  </Typography>
                    </Box>
            </Box>

            <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Box display={isNonMobileScreens? "flex" : "block"}>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                    Quantity : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {quantity}
                  </Typography>
                    </Box>
            </Box>

           

                { minQuantity != null && (
                <>

                <Box style={{
                  borderRadius: "2rem",
                  padding: "0.5rem 1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }} >
                  <Box display={isNonMobileScreens? "flex" : "block"}>
                  <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                  minQuantity : 
                  </Typography>
                  <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                    {minQuantity}
                </Typography>
                  </Box>
                </Box>

                <Box style={{
                  borderRadius: "2rem",
                  padding: "0.5rem 1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }} >
                  <Box display={isNonMobileScreens? "flex" : "block"}>
                  <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                  reorderPoint : 
                  </Typography>
                  <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                    {reorderPoint}
                </Typography>
                  </Box>
                </Box>
                  <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Box display={isNonMobileScreens? "flex" : "block"}>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                    maxQuantity : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {maxQuantity}
                  </Typography>
                    </Box>
                </Box>
                </>
                )}
            
            <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Box display={isNonMobileScreens? "flex" : "block"}>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                    category: 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {category}
                  </Typography>
                    </Box>
            </Box>

          </Box>
         
          {role === "employee" && (
            <>
              <FlexBetween gap="0.3rem" mt={"1rem"}>
              <Button  onClick={patchProduct} variant={isBooked? "contained": "outlined"} color={isBooked? "error": "primary"}>
          {isBooked ? "Cancel Product": "Order Product"}
        </Button>
              </FlexBetween>
            </>  
          )}

      <Box style={{
                    borderRadius: "2rem",
                    padding: "0.5rem 1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }} >
                    <Box display={isNonMobileScreens? "flex" : "block"}>
                    <Typography color="white" variant="subtitle1" ml={"0.3rem"}  >
                    Orders for this Product :
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {bookingCount}
                  </Typography>
                    </Box>
            </Box>


        </WidgetWrapper>
         
        <Box>
        {role === "supplier" && (
            <>
            <Typography mt={"1rem"} fontSize={isNonMobileScreens? "2rem" : "1.5rem"} color={"#834bff"} > Ordered this Product : </Typography>
            {userIds.map((userId) => (
              <Box key={userId} mt={"1rem"}>
               <BookedUserWidget key={userId} userId={userId}  ></BookedUserWidget>
              </Box> 
            ))}
            </>
          )}
        </Box>
         
    </Box>
        
              
  )
}

export default ProductDetailWidget