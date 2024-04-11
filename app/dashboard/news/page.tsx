"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const NewsDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [newsDetails, setNewsDetails] = useState<any | null>(null);

  useEffect(() => {
    // Fetch news details based on the id
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?id=${id}&apiKey=ca7292f2afcb4992af825c06a0db90df`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsDetails(data);
      } catch (error: any) {
        console.error('Error fetching news details:', error.message);
      }
    };

    if (id) {
      fetchNewsDetails();
    }
  }, [id]);

  if (!id || !newsDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{newsDetails.title}</h1>
      <p>{newsDetails.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default NewsDetailsPage;
