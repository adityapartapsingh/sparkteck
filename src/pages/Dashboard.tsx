import React from 'react';
import { BarChart2, DollarSign, Package, ShoppingCart } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const stats = [
  {
    title: 'Total Revenue',
    value: '$24,567',
    icon: DollarSign,
    change: '+12.5%',
    changeType: 'positive'
  },
  {
    title: 'Total Sales',
    value: '456',
    icon: ShoppingCart,
    change: '+8.2%',
    changeType: 'positive'
  },
  {
    title: 'Products',
    value: '89',
    icon: Package,
    change: '+2.4%',
    changeType: 'positive'
  },
  {
    title: 'Profit Margin',
    value: '23.5%',
    icon: BarChart2,
    change: '-4.1%',
    changeType: 'negative'
  }
];

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    },
    {
      label: 'Profit',
      data: [8000, 12000, 10000, 15000, 14000, 20000],
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Revenue & Profit Overview'
    }
  }
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
            </div>
            <div className={`mt-4 text-sm ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Bar options={options} data={chartData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-gray-500">2 items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$249.99</p>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;