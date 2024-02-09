"use client";

import { Booking, Hotel, Room } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  Wifi,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddRoomForm from "./AddRoomForm";
import axios from "axios";
import { useToast } from "../ui/use-toast";

interface RoomCardProps {
  hotel?: Hotel & {
    rooms: Room[];
  };
  room: Room;
  bookings?: Booking[];
}
const RoomCard = ({ hotel, room, bookings }: RoomCardProps) => {
  const pathname = usePathname();
  const isHotelDetailsPage = pathname.includes("hotel-details");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setopen] = useState(false);
  const router=useRouter()
  const {toast}=useToast()
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.title}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
          <Image
            fill
            src={room.image}
            alt={room.title}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 content-start text-sm">
          <AmenityItem>
            <Bed className="h-4 w-4" /> {room.bedCount} Bed{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Users className="h-4 w-4" /> {room.guestCount} Geust{"(s)"}
          </AmenityItem>
          <AmenityItem>
            <Bath className="h-4 w-4" /> {room.bathroomCount} Bath{"(s)"}
          </AmenityItem>
          {room.kingBed > 0 && (
            <AmenityItem>
              <BedDouble className="h-4 w-4" /> {room.kingBed} king Bed{"(s)"}
            </AmenityItem>
          )}
          {!!room.queenBed && (
            <AmenityItem>
              <Bed className="h-4 w-4" />
              {room.queenBed} Queen Bed{"(s)"}
            </AmenityItem>
          )}
          {room.roomService && (
            <AmenityItem>
              <UtensilsCrossed className="h-4 w-4" />
              Room Services
            </AmenityItem>
          )}
          {room.Tv && (
            <AmenityItem>
              <Tv className="h-4 w-4" />
              TV
            </AmenityItem>
          )}
          {room.balcony && (
            <AmenityItem>
              <Home className="h-4 w-4" />
              Balcony
            </AmenityItem>
          )}
          {room.freeWifi && (
            <AmenityItem>
              <Wifi className="h-4 w-4" /> Free Wifi
            </AmenityItem>
          )}
          {room.cityView && (
            <AmenityItem>
              <Castle className="h-4 w-4" />
              City View
            </AmenityItem>
          )}
          {room.oceanView && (
            <AmenityItem>
              <Ship className="h-4 w-4" /> Ocean View
            </AmenityItem>
          )}
          {room.forestView && (
            <AmenityItem>
              <Trees className="w-4 h-4" /> Forest View
            </AmenityItem>
          )}
          {room.mountainView && (
            <AmenityItem>
              <MountainSnow className="w-4 h-4" />
              Mountain View
            </AmenityItem>
          )}

          {room.airCondition && (
            <AmenityItem>
              <AirVent className="h-4 w-4" /> Air Condition
            </AmenityItem>
          )}
          {room.soundProofed && (
            <AmenityItem>
              <VolumeX className="h-4 w-4" />
            </AmenityItem>
          )}
        </div>
        <Separator />
        <div className="flex gap-4 justify-between">
          <div>
            Room Price: <span className="font-bold">${room.roomPrice}</span>
            <span className="text-xs">/24hrs</span>
          </div>
          {!!room.breakFastPrice && (
            <div>
              {" "}
              Break Fast Price:{" "}
              <span className="font-bold">${room.breakFastPrice}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isHotelDetailsPage ? (
          <div>Hotel Details Page</div>
        ) : (
          <div className="flex w-full justify-between">
            <Button
              onClick={() => handleRoomDelete(room)}
              disabled={isLoading}
              type="button"
              variant="ghost"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4" /> Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </>
              )}
            </Button>
            <Dialog open={open} onOpenChange={setopen}>
              <DialogTrigger>
                <Button
                  type="button"
                  variant="outline"
                  className="max-w-[150px]"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Update Room
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90%]">
                <DialogHeader className="px-2">
                  <DialogTitle>Update Room</DialogTitle>
                  <DialogDescription>
                    Make changes to this room
                  </DialogDescription>
                </DialogHeader>
                <AddRoomForm
                  hotel={hotel}
                  room={room}
                  handleDalogueOpen={handleDalogueOpen}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
