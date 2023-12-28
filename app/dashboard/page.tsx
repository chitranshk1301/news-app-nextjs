"use client";

import React from "react";
import { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import LogoutButton from "../components/LogoutButton";
import Card from "./components/Card";

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
    fetchData();
  });
  return (
    <div>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 w-5/6">
        <p className="text-lg font-semibold text-gray-800 dark:text-white">
          This is the news dashboard
        </p>
          <button
            onClick={handleToggle}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mb-14"
          >
            <p>Toggle view</p>
          </button>

          {toggle && (
            <>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((article, index) => (
                  <li key={index} className="py-6">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          height={100}
                          width={100}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h5 className="text-lg font-bold text-gray-900 dark:text-white">
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
            </>
          )}

          {!toggle && (
            <>
              <div className="grid grid-cols-2">
                {data.map((data, index) => (
                  <Card
                    key={index}
                    title={data.title}
                    description={data.description}
                    url={data.url}
                    urlToImage={data.urlToImage}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default withAuth(Dashboard);
