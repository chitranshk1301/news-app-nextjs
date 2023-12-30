"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NewsDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newsDetails, setNewsDetails] = useState<any | null>(null);

  useEffect(() => {
    // Fetch news details based on the id
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?id=${id}&apiKey=a973d6acb0334946a7c83934141c6fd5`);
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
