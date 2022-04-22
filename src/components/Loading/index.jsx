import React from "react";
import { BsHourglassSplit } from "react-icons/bs";

export default function Loading() {
  return (
    <div className="loading-content">
      <BsHourglassSplit />
      <p>Fetching Show Data...</p>
    </div>
  );
}
