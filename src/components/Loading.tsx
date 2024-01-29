import { Loader } from "lucide-react"

const Loading = () => {
    return (<div className="font-bold h-[300px] gap-2 flex items-center justify-center">
        <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
            >
        </div>
        Loading...
    </div>
    )
}

export default Loading