import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import UserImage from "../../components/UserImage";
import {useMediaQuery} from "@mui/material";

const ProductDetailWidget = ({productId , rideUserId, date, pickupPoint, employeeId, availableSeats, vehicleType, userPicturePath, departureTime, startPoint, endPoint, bookings}) => {
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
  const handleEditRide = () => {
    // Redirect to edit form with event ID as URL parameter
    navigate(`/rides/${rideId}/edit`);
  };
  const patchRide = async () => {
    const response = await fetch(`http://localhost:3001/rides/${rideId}/booking`, {
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
    const updatedRide = await response.json();
    dispatch(setRide({ ride : updatedRide }));
    
  };
  
  return (
    <Box padding={"1.5rem 1.5rem 0.75rem 1.5rem"} gap={"5rem"} display={ isNonMobileScreens ? "flex" : "block"} >
    
    <WidgetWrapper mt={"2rem"} width={isNonMobileScreens? "60%" : "100%"} >
      <Box display={"flex"} justifyContent="center" alignItems="center" gap={isNonMobileScreens ? "2rem" : "1rem"}>
        <UserImage image={userPicturePath}>
          </UserImage>
          <Typography  fontSize={isNonMobileScreens? "3rem" : "2rem"} color={"#834bff"} > Ride Details </Typography>
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
                      Date : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {date}
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
                    Pickup Point : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {pickupPoint}
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
                    Employee ID : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {employeeId}
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
                    Vehicle Type : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {vehicleType}
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
                    Departure Time : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {departureTime}
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
                    Start Point : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {startPoint}
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
                    End Point : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {endPoint}
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
                    Available Seats : 
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {availableSeats}
                  </Typography>
                    </Box>
            </Box>

          </Box> 
          {role === "visitor" && (
            <>
              <FlexBetween gap="0.3rem" mt={"1rem"}>
              <Button  onClick={patchRide} variant={isBooked? "contained": "outlined"} color={isBooked? "error": "primary"}>
          {isBooked ? "Cancel Ride": "Book Ride"}
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
                    Bookings for this ride :
                    </Typography>
                    <Typography ml={"0.5rem"} color={"white"} variant="h9" fontSize={isNonMobileScreens? "1.2rem" : "1rem"} textAlign={"center"} fontWeight={"bold"}>
                      {bookingCount}
                  </Typography>
                    </Box>
            </Box>

         


        </WidgetWrapper>


        <Box>
        {role === "employee" && (
            <>
            <Typography mt={"1rem"} fontSize={isNonMobileScreens? "2rem" : "1.5rem"} color={"#834bff"} > Visitors Booked this Ride : </Typography>
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