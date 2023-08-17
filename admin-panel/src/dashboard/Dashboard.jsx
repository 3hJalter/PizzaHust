import React, { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Chart from './chart/chart.jsx';
import './style.css'
import { Button } from '@mui/material';
const Dashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const dataProvider = useDataProvider();
  const [userCount, setUserCount] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [orderData, setOrderData] = useState([]);
  const [revenueByDay, setRevenueByDay] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const fetchUserCount = async () => {
    try {
      const response = await dataProvider.getList('user', {
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'DESC' },
        filter: {},
      });
      setUserCount(response.total);
    } catch (error) {
      // Handle error
    }
  };

  const fetchPendingOrders = async () => {
    try {
      const response = await dataProvider.getList('order', {
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'DESC' },
        filter: { orderStatus: "Pending" },
      });
      console.log(response);
      const pendingOrdersCount = response.data.filter(order => order.orderStatus === 'Pending').length;
      setPendingOrders(pendingOrdersCount);
    } catch (error) {
      // Handle error
    }
  };

  const fetchOrderDataAndCalculateRevenueByDay = async () => {
    try {
      const response = await dataProvider.getList('order', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'createdAt', order: 'ASC' },
        filter: {
          createdAt_gte: `${currentYear}-${currentMonth - 1}-01T00:00:00Z`,
          createdAt_lt: `${currentYear}-${currentMonth + 1}-01T00:00:00Z`,
        },
      });

      const doneOrder = response.data.filter(order => order.orderStatus === 'Done');
      setOrderData(doneOrder);

      const dailyRevenue = doneOrder.reduce((acc, order) => {
        const orderDate = new Date(order.createdAt).toLocaleDateString();
        acc[orderDate] = (acc[orderDate] || 0) + order.finalPrice;
        return acc;
      }, {});

      setRevenueByDay(Object.entries(dailyRevenue).map(([date, total]) => ({ date, total })));
    } catch (error) {
      // Handle error
    }
  };

  const fetchRevenueAndCalculateRevenueChange = async () => {
    try {
      const response = await dataProvider.getList('order', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'DESC' },
        filter: {
          createdAt_gte: `${currentYear}-${currentMonth}-01T00:00:00Z`,
          createdAt_lt: `${currentYear}-${currentMonth + 1}-01T00:00:00Z`,
          orderStatus: 'Done', // Filter only "Done" orders
        },
      });

      const doneOrder = response.data.filter(order => order.orderStatus === 'Done');
      setOrderData(doneOrder);

      const totalRevenue = doneOrder.reduce((acc, order) => acc + order.finalPrice, 0);
      setRevenue(totalRevenue);

      const prevMonthResponse = await dataProvider.getList('order', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'DESC' },
        filter: {
          createdAt_gte: `${currentYear}-${currentMonth - 1}-01T00:00:00Z`,
          createdAt_lt: `${currentYear}-${currentMonth}-01T00:00:00Z`,
          orderStatus: 'Done', // Filter only "Done" orders
        },
      });

      const prevMonthRevenue = prevMonthResponse.data.reduce((acc, order) => acc + order.finalPrice, 0);
      const revenueChangePercentage = ((totalRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;
      setRevenueChange(revenueChangePercentage);
    } catch (error) {
      // Handle error
    }
  };


  useEffect(() => {
    fetchUserCount();
    fetchPendingOrders();
    fetchOrderDataAndCalculateRevenueByDay();
    fetchRevenueAndCalculateRevenueChange();
  }, [dataProvider]);

  const handleChartDataUpdate = (selectedMonth, selectedYear) => {
    const filteredOrderData = orderData.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getMonth() + 1 === selectedMonth && orderDate.getFullYear() === selectedYear;
    });

    const dailyRevenue = filteredOrderData.reduce((acc, order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      acc[orderDate] = (acc[orderDate] || 0) + order.finalPrice;
      return acc;
    }, {});

    const updatedRevenueByDay = Object.entries(dailyRevenue).map(([date, total]) => ({ date, total }));
    setRevenueByDay(updatedRevenueByDay);
  };

  return (
    <>
      <div className='featured'>
        <div className='featuredItem'>
          <span className='featuredTitle'>Revenue</span>
          <div className='featuredMoneyContainer'>
            <span className='featuredMoney'>{revenue.toFixed(0)} VND</span>
          </div>
          <span className='featuredSub'>Current month</span>
        </div>
        <div className='featuredItem'>
          <span className='featuredTitle'>Pending order</span>
          <div className='featuredMoneyContainer'>
            <span className='featuredMoney'>{pendingOrders}</span>
          </div>
        </div>
        <div className='featuredItem'>
          <span className='featuredTitle'>Number of User</span>
          <div className='featuredMoneyContainer'>
            <span className='featuredMoney'>{userCount}</span>
          </div>
        </div>
      </div>
      <div style={{marginTop: '20px', marginLeft: '25px'}}>
        <label>Select Month: </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
        </select>
        <label style={{marginLeft: '20px'}}>Select Year: </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {Array.from({ length: currentYear - 2010 + 1 }, (_, index) => (
            <option key={2010 + index} value={2010 + index}>{2010 + index}</option>
          ))}
        </select>
        <span style={{marginLeft: '20px'}}/>
        <Button button={'Update'} onClick={() => handleChartDataUpdate(selectedMonth, selectedYear)}>Update</Button>
      </div>
      <Chart dataIn={revenueByDay} dataKeyX='date' dataKeyY='total' />
    </>
  );
};

export default Dashboard;
