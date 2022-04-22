import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <div className="home-view">
      <div className="container">
        <div className="not-found">
          <div className="content">
            <h1>Not Found</h1>
            <p>THAT PAGE DOESN'T EXIST OR IS UNAVAILABLE.</p>
            <Link to="/">Go Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
