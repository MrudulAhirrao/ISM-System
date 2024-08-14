import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import UserImage from "../../components/UserImage";
import {useMediaQuery} from "@mui/material";

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
  category}) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const navigate = useNavigate();
  const token = useSelector((state)=> state.token);
  const role = useSelector((state)=> state.user.role);
  const loggedInUserId = useSelector((state) => state.user._id);

  // Function to handle edit button click
  const handleEditProduct = () => {
    // Redirect to edit form with event ID as URL parameter
    navigate(`/products/${productId}/edit`);
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
         


        </WidgetWrapper>
         
          
    </Box>
        
              
  )
}

export default ProductDetailWidget