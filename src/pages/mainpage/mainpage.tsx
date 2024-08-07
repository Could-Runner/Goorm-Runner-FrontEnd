import React from 'react'
import MatchingContent from '../../components/MatchingContent/MatchingContent'
import teams  from "../../assets/teams.json";

const mainpage = () => {
  return (
    <>
      <MatchingContent teams={teams} limit={4}/>
    </>
  )
}

export default mainpage
