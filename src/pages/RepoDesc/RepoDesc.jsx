import React from 'react'
import {  useSelector } from "react-redux";
import { selectCurrentRepo } from '../../store/store';
import './RepoDesc.css'

function RepoDesc() {
  const currentRepo = useSelector(selectCurrentRepo);
  console.log(currentRepo)
  return (
    <div className="repository-detail">
      <h2>{currentRepo.name}</h2>
      <div className="repo-header">
        <img src={currentRepo.owner.avatar_url} alt={`${currentRepo.owner.login}'s avatar`} className="repo-avatar" />
        <div className="repo-info">
          <p><strong>Description:</strong> {currentRepo.description || 'No description available'}</p>
          <p><strong>Homepage:</strong> <a href={currentRepo.homepage} target="_blank" rel="noopener noreferrer">{currentRepo.homepage || 'No homepage available'}</a></p>
          <p><strong>Language:</strong> {currentRepo.language || 'No language specified'}</p>
          <p><strong>Stars:</strong> {currentRepo.stargazers_count}</p>
          <p><strong>Forks:</strong> {currentRepo.forks_count}</p>
          <p><strong>Issues:</strong> {currentRepo.open_issues_count}</p>
        </div>
      </div>
      <div className="repo-links">
        <a href={currentRepo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    </div>
  ) 
}

export default RepoDesc
