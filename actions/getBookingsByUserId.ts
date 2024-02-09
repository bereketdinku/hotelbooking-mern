import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"

export const getBookingByHotelUserId=async()=>{
    try {
        const {userId}=auth()
        if(!userId){
            throw new Error('Unauthorized')
        }
        const bookings=await prismadb.booking.findMany({
            where:{
                userId:userId
            },
            include:{
                Room:true,
                hotel:true
            },
            orderBy:{
               bookedAt:'desc' 
            }
        })
        if(!bookings) return null
        return bookings
    } catch (error:any) {
        throw new Error(error)
    }
}