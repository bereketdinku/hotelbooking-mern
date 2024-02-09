import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ChangeEventHandler, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from 'query-string'
import { useDebounceValue } from "@/hooks/useDebounceValue";
const SearchInput = () => {
    const pathname=usePathname()
    const router=useRouter()
    const searchParams=useSearchParams()
    const title=searchParams.get('title')
    const[value,setValue]=useState( title||'')
  
    const onChange:ChangeEventHandler<HTMLInputElement>=(e)=>{
        setValue(e.target.value)
    }
    const debounceValue=useDebounceValue<string>(value)
    useEffect(()=>{
        const query={
            title:debounceValue
        }
        const url=qs.stringifyUrl({
            url:window.location.href,
            query
        },{skipNull:true,skipEmptyString:true})
    router.push(url)
    },[debounceValue,router])
    if(pathname!=='/') return null

    return ( <div className="relative sm:block hidden">
        <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground"/>
        <Input value={value} placeholder="Search" className="pl-10 bg-primary/10" onChange={onChange}/>
    </div> );
}
 
export default SearchInput;
