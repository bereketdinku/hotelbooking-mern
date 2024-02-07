"use client"
import * as React from 'react'
import { BookOpenCheck, ChevronsUpDown, Hotel, Moon,Plus,Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
export function NavMenu(){
    const{setTheme}=useTheme()
    const router=useRouter()
    return(<DropdownMenu>
        <DropdownMenuTrigger asChild>
<Button value="ghost" size="icon" >
    <ChevronsUpDown/>
    {/* <Sun className=' rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'/>
    <Moon className='absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'/> */}
</Button>

        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={()=>router.push('/hotel/new')} className='cursor-pointer flex gap-2 items-center'>
                <Plus size={15} /> <span>Add Hotel</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>router.push('/my-hotels')} className='cursor-pointer flex gap-2 items-center'>
                <Hotel size={15}/> <span>My Hotels</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>router.push('/my-bookings')} className='cursor-pointer flex gap-2 items-center'>
                <BookOpenCheck size={15}/> <span>My Bookings</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}