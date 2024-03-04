import { LineChart, XAxis, CartesianGrid, Tooltip, Legend, YAxis, Line } from "recharts"

const RevenueCharts = ({ dailyRevenueData, monthlyRevenueData, yearlyRevenueData }) => {
    return (
        <div className="mt-8 ">
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <div className='flex p-6 bg-white rounded overflow-auto'>
                <div className=''>
                    <h4 className="text-md font-semibold mb-2 text-indigo-500">Daily Revenue</h4>
                    <LineChart width={380} height={300} data={dailyRevenueData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    </LineChart>
                </div>
                <div>
                    <h4 className="text-md font-semibold mb-2 text-green-500">Monthly Revenue</h4>
                    <LineChart width={380} height={300} data={monthlyRevenueData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div>
                    <h4 className="text-md font-semibold mb-2 text-orange-500">Yearly Revenue</h4>
                    <LineChart width={380} height={300} data={yearlyRevenueData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
                    </LineChart>
                </div>
            </div>
        </div>
    )
}

export default RevenueCharts