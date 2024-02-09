"use client";

import { Booking, Hotel,  Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import moment from 'moment'
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import {
  AirVent,
  Bath,
  Bed,
  BedDouble,
  Castle,
  Home,
  Loader2,
  MapPin,
  MountainSnow,
  Pencil,
  Plus,
  Ship,
  Trash,
  Trees,
  Tv,
  Users,
  UtensilsCrossed,
  VolumeX,
  Wand2,
  Wifi,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { auth, useAuth } from "@clerk/nextjs";
import useBookRoom from "@/hooks/useBookRoom";
import useLocation from "@/hooks/useLocation";

interface MyBookingProps {
  booking:Booking &{Room:Room | null}&{hotel:Hotel | null}
}
const MyBookingClient:React.FC<MyBookingProps> = ({  booking }) => {
  const pathname = usePathname();
  const {setRoomData,paymentIntent,setClientSecret,setPaymentIntent}=useBookRoom()
  const isHotelDetailsPage = pathname.includes("hotel-details");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingIsLoading, setBookingIsLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [date,setDate]=useState<DateRange | undefined>()
  const [includeBreakFast,setIncludeBreakFast]=useState(false)
  const[days,setDays]=useState(0)
  const{userId}=useAuth()
  const router=useRouter()
  const {toast}=useToast()
const {getCountryByCode,getStateByCode}=useLocation()
const{hotel,Room}=booking
if(!hotel || !Room ) return <div>Missing Data</div>
const country=getCountryByCode(hotel.country)
const state=getStateByCode(hotel.country,hotel.state)
const startDate=moment(booking.startDate).format('MMMM Do YYYY')
const endDate=moment(booking.endDate).format('MMMM Do YYYY')
const dayCount=differenceInCalendarDays(
    booking.endDate,booking.startDate
)
  
  const handleDalogueOpen = () => {
    setopen((prev) => !prev);
  };
  
  const handleRoomDelete = (room: Room) => {
    setIsLoading(true);
    const imageKey = room.image.substring(room.image.lastIndexOf("/" + 1));
    axios.post("/api/uploadthing/delete", { imageKey }).then(() => {
      axios.delete(`/api/room/${room.id}`).then(() => {});
  router.refresh()
  toast({
    variant:'success',
    description:'Room Deleted!'
  })
  setIsLoading(false)
    }).catch(()=>{
        setIsLoading(false)
        toast({
            variant:'destructive',
            description:'Something went wrong'
        })
    }).catch(()=>{
        setIsLoading(false)
        toast({
            variant:'destructive',
            description:'Something went wrong'
        })
    })
  };
  const handleBookRoom=()=>{
    if(!userId) return toast({
      variant:'destructive',
      description:'Oops! make sure you are logged in'
    })
    if(!hotel?.userId) return toast({
      variant:'destructive',
      description:'Something went wrong,refresh the page and try again'
    })
    if(date?.from && date.to){
      setBookingIsLoading(true)
      const bookingRoomData={
       room: Room,
        totalPrice:booking.totalPrice,
        breakFastIncluded:booking.breakFastIncluded,
        startDate:booking.startDate,
        endDate:booking.endDate
      }
      setRoomData(bookingRoomData)
      fetch('/api/create-payment-intent',{
        method:'POST',
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({
          booking:{
            hotelOwnerId:hotel.userId,
            hotelId:hotel.id,
            roomId:Room.id,
            startDate:date.from,
            endDate:date.to,
            breakFastIncluded:includeBreakFast,
            totalPrice:booking.totalPrice
          },
          payment_intent_id:'1'
        })
      }).then((res)=>{
        setBookingIsLoading(false)
        if(res.status===401){
          return router.push('/login')
        }
        return res.json()
      }).then(()=>{
        router.push('/book-room')
      }).catch((error:any)=>{
        toast({
          variant:'destructive',
          description:`ERROR! ${error.message}`
        })
      })
    }else{
      toast({
        variant:'destructive',
        description:'Oops! Select Date'
      })
    }
  }
  return (
    <Card>
      <CardHeader>
      <CardTitle>{hotel.title}</CardTitle>
        <CardDescription>
            <div className="font-semibold mt-4">
<AmenityItem>
    <MapPin className="h-4 w-4"/> {country?.name} ,{state?.name},{hotel.city}
</AmenityItem>
            </div>
            <p className="pb-2">{hotel.locationDescription}</p>
        </CardDescription>
        <CardTitle>{Room.title}</CardTitle>
        <CardDescription>{Room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={Room.image}
            alt={Room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" /> {Room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Users className="h-4 w-4" /> {Room.guestCount} Geust{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" /> {Room.bathroomCount} Bath{"(s)"}
          </AmenityItem>
          {Room.kingBed > 0 && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" /> {Room.kingBed} king Bed{"(s)"}
            </AmenityItem>
          )}
          {!!Room.queenBed && (
            <AmenityItem>
              <Bed className="h-4 w-4" />
              {Room.queenBed} Queen Bed{"(s)"}
            </AmenityItem>
          )}
          {Room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" />
              Room Services
            </AmenityItem>
          )}
          {Room.Tv && (
            <AmenityItem>
              <Tv className="h-4 w-4" />
              TV
            </AmenityItem>
          )}
          {Room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" />
              Balcony
            </AmenityItem>
          )}
          {Room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" /> Free Wifi
            </AmenityItem>
          )}
          {Room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" />
              City View
            </AmenityItem>
          )}
          {Room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" /> Ocean View
            </AmenityItem>
          )}
          {Room.forestView && (
            <AmenityItem>
              <Trees className="w-4 h-4" /> Forest View
            </AmenityItem>
          )}
          {Room.mountainView && (
            <AmenityItem>
              <MountainSnow className="w-4 h-4" />
              Mountain View
            </AmenityItem>
          )}

          {Room.airCondition && (
            <AmenityItem>
              <AirVent className="h-4 w-4" /> Air Condition
            </AmenityItem>
          )}
          {Room.soundProofed && (
            <AmenityItem>
              <VolumeX className="h-4 w-4" />
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>
            Room Price: <span className="font-bold">${Room.roomPrice}</span>
            <span className="text-xs">/24hrs</span>
          </div>
          {!!Room.breakFastPrice && (
            <div>
              {" "}
              Break Fast Price:{" "}
              <span className="font-bold">${Room.breakFastPrice}</span>
            </div>
          )}
        </div>
        <Separator/>
        <div className="flex gap-4 justify-between">
<CardTitle>Booking Details</CardTitle>
<div className="text-primary/90">
<div>
    Room booked by {booking.userName} for {dayCount} days at {moment(booking.bookedAt).fromNow()}
  <div>Check-in {startDate}  </div>
  <div>Check-out {endDate}</div>
  {booking.breakFastIncluded && <div>
    Breakfast will be served
    </div>}
    {booking.paymentStatus?<div className="text-teal-500"> Paid ${booking.totalPrice} - Room Reserved

    </div>:<div className="text-rose-500">
        Not paid ${booking.totalPrice} - Room Not Reserved
        
        </div>}
</div>
</div>
        </div>
      </CardContent>
       <CardFooter className="flex items-center justify-between">
        <Button disabled={bookingIsLoading} variant={'outline'} onClick={()=>router.push(`/hotel-details/${hotel.id}`)}>View Hotel</Button>
       </CardFooter>
    </Card>
  );
};

export default MyBookingClient;
