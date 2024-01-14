import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import Image from "next/image";
import NoContentImg from "@/assets/noContent.png"
const NoContent = () => {
    const userInfo = useSelector((state: StateProps) => state.pro.userInfo);

    return <>
        <div className="py-10 w-fit m-auto">
            <div className="relative h-40 w-80 rounded-lg border border-gray-100 bg-white shadow-lg">
                <div className="absolute left-14 bottom-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rotate-45 transform border-r border-b border-gray-100 bg-white"></div>
                <div className="px-8">
                    <h1 className="mt-6 text-2xl font-bold text-orange-600">Hi {userInfo?.email}</h1>
                    <p className="text-gray-600">No content is available at the moment. Click the Add button to begin adding content.</p>
                </div>
            </div>
            {/* <Image width={100} height={100} className="mt-4 w-36" src={} alt="" /> */}
            <Image className="mt-2" src={NoContentImg} alt="ShortLogo" width={100} height={100} />

        </div>
    </>
}

export default NoContent