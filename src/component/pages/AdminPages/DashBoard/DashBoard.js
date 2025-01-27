import React, { useEffect, useState } from 'react';
import { Pie, Bar, Line, Radar } from 'react-chartjs-2';
import './DashBoard.css';
import 'chart.js/auto';
import { getUsersCount, getUsersOrdersCount } from '../../../../functions/user';
import { brandsCount, getColorsCount, GETPRODUCTSBYCOUNT } from '../../../../functions/product';
import { getCategoriesCount } from '../../../../functions/category';

const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts = () => {
    getUsersCount().then((res) => setUsers(res.data));
    GETPRODUCTSBYCOUNT().then((res) => setProducts(res.data));
    getCategoriesCount().then((res) => setCategories(res.data));
    getUsersOrdersCount().then((res) => setOrders(res.data));
  };


  const pieData = {
    labels: ['Action', 'Cinma', 'Romance'],
    datasets: [
      {
        data: [300, 50, 100, 80],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const barData = {
    labels: ['Action', 'Cinma', 'Romance'],
    datasets: [
      {
        label: 'whatched',
        data: [65, 59, 80, 81],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: '#FF6384',
      },
    ],
  };

  const radarData = {
    labels: ['Quality', 'Top View', 'Linked', 'Transaltion'],
    datasets: [
      {
        label: 'Arabic',
        data: [5, 4, 4, 3, 5],
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: '#36A2EB',
      },
      {
        label: 'English',
        data: [3, 3, 4, 5, 4],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: '#FF6384',
      },
    ],
  };

  return (
    <div className="container-fluid dash">
      <h1 className='text-center mb-5 mt-5 text-dark'>Admin Dashboard</h1>
      <div className="row mb-5 mt-5">
        <div className="col-md-6">
          <h3>Movies by Category</h3>
          <div className="chart-container pie-chart">
            <Pie data={pieData} />
          </div>
        </div>
        <div className="col-md-6">
          <h3>Orders Per Category</h3>
          <div className="chart-container bar-chart">
            <Bar data={barData} />
          </div>
        </div>
        <div className="col-md-6">
          <h3>User Growth</h3>
          <div className="chart-container line-chart">
            <Line data={lineData} />
          </div>
        </div>
        <div className="col-md-6">
          <h3>Brand Performance</h3>
          <div className="chart-container radar-chart">
            <Radar data={radarData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
