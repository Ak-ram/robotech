import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import NotFound from "./NotFound";

const Loading = () => {
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setNotFound(true)
        }, 3000)
    })
    return (

<>
        {!notFound &&<div className="font-bold h-[400px] gap-2 flex items-center justify-center"> <div> <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div> Loading...</div> </div>}
        {notFound && <NotFound />}
   </>
    )
}

export default Loading