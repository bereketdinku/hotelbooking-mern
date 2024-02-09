import { getHotelById } from "@/actions/getHotelById";
import HotelDetailClient from "@/components/hotel/HotelDetailClient";

interface HotelDetailsProps{
    params:{
        hotelid:string
    }
}
const HotelDetails = async ({params}:HotelDetailsProps) => {
 console.log(params.hotelid)
    const hotel=await getHotelById(params.hotelid)
  if(!hotel) return <div>Oop! hotel with the given Id not found</div>  
  return ( <div>
    <HotelDetailClient hotel={hotel}/>
  </div> );
}
 
export default HotelDetails;