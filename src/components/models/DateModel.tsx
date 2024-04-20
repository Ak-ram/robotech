import supabase from "@/supabase/config";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { BillType } from "../../../type";

interface DateModelProps {
    setShowDateModel: (value: boolean) => void;
    setShowBill: (value: boolean) => void;
    setCurrentBill: (bill: BillType) => void;
    setCurrentBillId: (value: number) => void;
    DecreaseStock: (bill: BillType) => void
    billData: any[],
    customerId: string,
    customerData: any[],


}

const DateModel: React.FC<DateModelProps> = ({ DecreaseStock, setCurrentBillId, setCurrentBill, setShowBill, setShowDateModel, billData, customerData, customerId }) => {
    const [selectedDate, setSelectedDate] = useState('')

    const printBill = async () => {
        const bill = {
            data: billData,
            customerId: +customerId!,
            customerData: customerData,
            billCreatedDate: selectedDate
        };
        console.log(bill)
        setShowBill(true);
        setShowDateModel(false)
        // DecreaseStock(bill);
        setCurrentBill(bill);
        const { data: billTable, error } = await supabase
            .from("bills")
            .insert([bill])
            .select();
        if (error) {
            console.log(error)
            return;
        }
        setCurrentBillId(billTable![0].id);
        toast.success("When you're ready, please click CTRL + P to print.");
    }


    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[500px] p-8 rounded-lg shadow-md">
                <h2 className="font-bold mb-2 text-center text-lg">Add Date</h2>
                <div className="mb-2 lg:pr-4">
                    <span className="font-bold mb-1">Selected Date</span>
                    <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </div>
                <button onClick={printBill}>Submit</button>
            </div>
        </div>
    );
};

export default DateModel;
