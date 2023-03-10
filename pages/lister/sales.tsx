import Head from 'next/head';
import { LineChart, Line, XAxis, YAxis, Bar, BarChart, Tooltip, Legend } from 'recharts';

const data = [
  {
    sales_id: '497ce552-fce9-4ded-85a5-33bfd1072c7c',
    sale_date: '10-03-2023',
    sale_price: 500,
    created_at: '2023-03-09 06:47:11.088648+00',
    turf_id: '784ec755-8db3-42a5-993f-337664450d6f',
    buyer_id: 'efca4473-8d94-409b-bf32-105a25d506a3'
  },
  {
    sales_id: '1376579c-91d1-4fef-a6e8-95353c5c1f75',
    sale_date: '10-03-2023',
    sale_price: 1000,
    created_at: '2023-03-09 06:48:07.728805+00',
    turf_id: '784ec755-8db3-42a5-993f-337664450d6f',
    buyer_id: 'efca4473-8d94-409b-bf32-105a25d506a3'
  },
  {
    sales_id: 'f3749f8b-5c86-4b61-b34b-8a035c18416e',
    sale_date: '10-03-2023',
    sale_price: 500,
    created_at: '2023-03-09 08:44:28.75204+00',
    turf_id: '784ec755-8db3-42a5-993f-337664450d6f',
    buyer_id: 'efca4473-8d94-409b-bf32-105a25d506a3'
  },
  {
    sales_id: 'a6396875-3887-4ff2-b710-e3e134da2a78',
    sale_date: '11-03-2023',
    sale_price: 500,
    created_at: '2023-03-09 08:59:04.51172+00',
    turf_id: '784ec755-8db3-42a5-993f-337664450d6f',
    buyer_id: 'efca4473-8d94-409b-bf32-105a25d506a3'
  }
];

const salesByTurf = data.reduce((result, item) => {
  const turfId = item.turf_id;
  result[turfId] = result[turfId] || { turf_id: turfId, total_sales: 0 };
  result[turfId].total_sales += item.sale_price;
  return result;
}, {});

const chartData = Object.values(salesByTurf).map(({ turf_id, total_sales }) => ({
  turf_id,
  total_sales
}));

const Sales = () => {
  return (
    <>
      <Head>
        <title>Sales</title>
      </Head>
      <LineChart width={600} height={300} data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="sale_date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sale_price" stroke="#8884d8" />
      </LineChart>
      <BarChart width={600} height={400} data={chartData}>
        <XAxis dataKey="turf_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total_sales" fill="#8884d8" />
      </BarChart>
    </>
  );
};

export default Sales;
