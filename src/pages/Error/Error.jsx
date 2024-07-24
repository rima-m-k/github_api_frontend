import React from 'react'
import './Error.css'
import { Link } from "react-router-dom";
import Header from "../../components/Layouts/Header/Header";

function Error() {
  return (
    <>
      <Header />
      <div className="error-page__container">
        <h2 className="">Oops! Something went wrong...</h2>
        <p>Please try again</p>
        <Link to="/">← Back to home</Link>
      </div>
    </>
  )
}

export default Error
