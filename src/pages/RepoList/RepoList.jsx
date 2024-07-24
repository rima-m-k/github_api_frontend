import React from "react";
import "./RepoList.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  selectError,
  selectRepos,
  selectUserData,
  // selectUsername,
  setCurrentRepo,
} from "../../store/store";

function RepoList() {
  const repos = useSelector(selectRepos);
  const userError = useSelector(selectError);
  const userData = useSelector(selectUserData);
  // const username = useSelector(selectUsername);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (userError) return <Navigate to="/" replace />;

  const handleRepository = (repoName) => {
    console.log(repoName);
    dispatch(setCurrentRepo(repoName));
    navigate(`/repository-details`);
  };
  console.log(repos);

  if (!userData) {
    return <div>Loading...</div>; // or a suitable loading indicator
  }

  return (
    <div>
      <div className="user-profile">
        <div className="user-header">
          <img
            src={userData.avatar_url}
            alt={`${userData.name}'s avatar`}
            className="user-avatar"
          />
          <Link to="/followers-list">View followers</Link>
        </div>
        <div className="user-details">
          <h1>{userData.name}</h1>
          {userData.bio && (
            <p>
              <strong>Bio:</strong> {userData.bio}
            </p>
          )}

          {userData.blog && (
            <p>
              <strong>Blog:</strong>{" "}
              <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                {userData.blog}
              </a>
            </p>
          )}

          {userData.company && (
            <p>
              <strong>Company:</strong> {userData.company}
            </p>
          )}

          {userData.email && (
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${userData.email}`}>{userData.email}</a>
            </p>
          )}
          {userData.location && (
            <p>
              <strong>Location:</strong> {userData.location}
            </p>
          )}

          <p>
            <strong>Followers:</strong>
            {userData.followers}
          </p>
          <p>
            <strong>Following:</strong>
            {userData.following}
          </p>
        </div>
      </div>

      <div className="repositories">
        <h2>Repositories</h2>
        {repos && repos.length > 0 ? (
          <div className="repository-cards">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="repository-card"
                onClick={() => handleRepository(repo.name)}
              >
                <div className="card-header">
                  <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login}'s avatar`}
                    className="repo-avatar"
                  />
                  <h3>{repo.name}</h3>
                </div>
                <p className="repo-description">{repo.description}</p>
                <div className="repo-topics">
                  {repo.topics &&
                    repo.topics.map((topic, index) => (
                      <span key={index} className="repo-topic">
                        {topic}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No repositories found.</div>
        )}
      </div>
    </div>
  );
}

export default RepoList;
