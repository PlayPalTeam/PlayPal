import { Line } from 'react-chartjs-2';

const SalesChart = ({ salesData }) => {
  // create an array of sale dates and an array of sale prices
  const saleDates = salesData.map((sale) => sale.sale_date);
  const salePrices = salesData.map((sale) => sale.sale_price);

  // define the chart data
  const data = {
    labels: saleDates,
    datasets: [
      {
        label: 'Sales over Time',
        data: salePrices,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // define the chart options
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div>
      {/* <Line data={data} options={options} /> */}
    </div>
  );
};

export default SalesChart;
