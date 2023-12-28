"use client";

import React from "react";
import { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import LogoutButton from "../components/LogoutButton";
import Image from "next/image";
import Card from "./components/Card";

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      let currentDate = new Date();
      let yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);

      const url =
        "https://newsapi.org/v2/top-headlines?" +
        "country=us&" +
        "apiKey=a973d6acb0334946a7c83934141c6fd5";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setData(responseData.articles);
        console.log(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  });
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the news dashboard</p>
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((article, index) => (
            <li key={index} className="py-4">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    height={500}
                    width={500}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                      {article.title}
                    </h5>
                    <p className="text-gray-700 dark:text-gray-400">
                      {article.description}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <LogoutButton />
    </div>
  );
};

export default withAuth(Dashboard);
