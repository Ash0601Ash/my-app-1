import React, { useState, useEffect } from "react";

export const Quote = () => {
    const [quote, setQuote] = useState("");
    useEffect(() => {
      
    fetch("https://type.fit/api/quotes")
      .then((res) => {
        res.json();
        return res.json();
      })
      .then((data) => setQuote(data.content));
  }, []);
  return (
    <div>
      <h1>{quote}</h1>
    </div>
  );
};
