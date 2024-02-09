import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const user =await currentUser()
    if(!user){
        return new NextResponse("Unauthorized",{status:401})
    
    }
    const body=await req.json()
    const {booking,payment_intent_id}=body;
    const bookingData={
        ...booking,
        email:user?.emailAddresses[0].emailAddress,
        userName:user?.firstName,
        userId:user?.id,
        currency:'usd',
        paymentIntentId:payment_intent_id

    }
    let foundBooking;
    if(payment_intent_id){
        foundBooking=await prismadb.booking.findUnique({
            where:{paymentIntentId:payment_intent_id,userId:user.id}
        })
    }
    if(foundBooking && payment_intent_id){
        const res=await prismadb.booking.update({
            where:{paymentIntentId:payment_intent_id,userId:user.id},
            data:bookingData
        })
        if(!res){
            return NextResponse.error()
        }
        return NextResponse.json({res})
    }
    
    else{
        await prismadb.booking.create({
            data:bookingData
        })
    }
    
 return NextResponse.json(bookingData)
}