import { getBookingByHotelOwnerId } from "@/actions/getBookingsByHotelOwnerId";
import { getBookingByHotelUserId } from "@/actions/getBookingsByUserId";
import MyBookingClient from "@/components/booking/MyBookingsClient";

const MyBooking =async () => {
    const bookingsFromVisitors=await getBookingByHotelOwnerId()
    const bookingsIHaveMade=await getBookingByHotelUserId()
    if(!bookingsFromVisitors && !bookingsIHaveMade) return <div>No bookings found</div>
    return ( <div className="flex flex-col gap-10">
{!!bookingsIHaveMade?.length && <div>
    <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">Here are bookings you have made</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
{bookingsIHaveMade.map(booking=><MyBookingClient key={booking.id} booking={booking}/>)}
   </div>
   </div>}

   {!!bookingsFromVisitors?.length && <div>
    <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">Here are bookings visitors have made</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
{bookingsFromVisitors.map(booking=><MyBookingClient key={booking.id} booking={booking}/>)}
   </div>
   </div>}
    </div>
    );
}
 
export default MyBooking;