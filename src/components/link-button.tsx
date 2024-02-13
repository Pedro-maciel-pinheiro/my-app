import { Feather } from "@expo/vector-icons";
import { Link , LinkProps } from "expo-router";


type LinkButtonProps = LinkProps<string> & {
    title:string
}

export function LinkButton({title, ...rest}:LinkButtonProps ){
    return(
        
        <Link className="text-black text-center text-base font-bold bg-slate-300
        rounded-full " 
        {...rest}
        >
            
            <Feather name="arrow-left" size={18} /> {title}
            
        </Link>
    )
}