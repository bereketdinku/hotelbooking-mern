import { getBookings } from "@/actions/getBooking";
import { getHotelById } from "@/actions/getHotelById";
import HotelDetailClient from "@/components/hotel/HotelDetailClient";

interface HotelDetailsProps{
    params:{
        hotelId:string
    }
}
const HotelDetails = async ({params}:HotelDetailsProps) => {
 console.log(params.hotelId)
    const hotel=await getHotelById(params.hotelId)
  if(!hotel) return <div>Oop! hotel with the given Id not found</div>  
  const bookings=await getBookings(hotel.id)
 return ( <div>
    <HotelDetailClient hotel={hotel} bookings={bookings}/>
  </div> );
}
 
export default HotelDetails;