"use client"

import { usePathname, useRouter } from "next/navigation";
import { HotelWithRooms } from "./AddHotelForm";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AmenityItem from "../AmenityItem";
import { Dumbbell, MapPin, Waves } from "lucide-react";
import useLocation from "@/hooks/useLocation";
import { Button } from "../ui/button";

const HotelCard = ({hotel}:{hotel:HotelWithRooms}) => {
    const pathname=usePathname()
    const ismyHotel=pathname.includes('my-hotels')
    const router=useRouter()
    const {getCountryByCode}=useLocation()
    const country=getCountryByCode(hotel.country)
    return ( <div onClick={()=>!ismyHotel && router.push(`/hotel-details/${hotel.id}`)} className={cn('col-span-1 cursor-pointer transition hover:scale-105',ismyHotel&&'cursor-default')}>
<div className="flex gap-2 bg-background/50 border border-primary/10 rounded-lg">
    <div className="flex-1 aspect-square overflow-hidden relative w-full relative w-full h-[210px] rounded-s-lg">
        <Image fill src={hotel.image} alt={hotel.title} className="w-full h-full object-cover"/>

    </div>
    <div className="flex-1 flex flex-col justify-between h-[210px] gap-1 p-1 py-2 text-sm">
 <h3 className="font-semibold text-xl">{hotel.title}</h3>
 <div className="text-primary/90">{hotel.description.substring(0,45)}...</div>
    <div className="text-primary/90">
      <AmenityItem>
        <MapPin className="w-4 h-4"/>{country?.name}{hotel.city}
      </AmenityItem>
      {hotel.swimmingPool && <AmenityItem>
        <Waves className="w-4 h-4"/> Pool
        </AmenityItem>}
        {hotel.gym && <AmenityItem>
            <Dumbbell className="w-4 h-4"/> Gym
            </AmenityItem>}
    </div>
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {hotel?.rooms[0]?.roomPrice && <>
          <div className="font-semibold text-base">
            ${hotel?.rooms[0]?.roomPrice}
          </div>
          <div className="text-xs">/ 24hrs</div>
          </>}
        </div>
        {ismyHotel && <Button onClick={()=>router.push(`/hotel/${hotel.id}`)} variant='outline'>
Edit            </Button>}

    </div>
    </div>
</div>
    </div> );
}
 
export default HotelCard;