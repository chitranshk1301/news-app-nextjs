"use client"

import React from 'react';
import withAuth from '../utils/withAuth';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the news dashboard</p>
    </div>
  );
};

export default withAuth(Dashboard);
