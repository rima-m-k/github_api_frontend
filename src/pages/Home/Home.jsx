import React, { useState } from "react";
import './Home.css';

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAPI, selectError, setUsername } from "../../store/store";
import useValidName from "../../hooks/useValidName";


function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const isValid = useValidName(searchTerm)
  const Navigate = useNavigate("");
  const dispatch = useDispatch();

  const userError = useSelector(selectError);
console.log(userError)

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const  handleSearch = async (e) => {
    e.preventDefault();
    if (!isValid) return setSearchTerm("");

    dispatch(setUsername(searchTerm));
    dispatch(getUserDataAPI(searchTerm));

    // go to repo list page
    Navigate("/repository-list");
  };
  return (
    <div className="home">

    <h1>WELCOME</h1>
    <p>Type any github user name</p>
    <form name="search" className="search" onSubmit={handleSearch}>
        <input
            type="text"
            className="searchBar"
            name="searchBar"
            pattern="^\s*[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\s*$"
            value={searchTerm}
            onChange={handleChangeSearch}
        />
        <button type="submit">Search</button>
    </form>

    {userError && (
        <p className="text-sm" style={{ color: "red" }}>
          {userError}
        </p>
      )}
</div>
  );
}

export default Home;
