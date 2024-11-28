import React from "react";
import { useParams } from "react-router-dom";
import team from "../../team-data/data";

const TeamDetails = () => {
  const { id } = useParams();
  const teamMember = team.find((member) => member.id === parseInt(id));
  return (
    <>
      {teamMember ? (
        <div>
          <p>Role: {teamMember.role}</p>
          <p>Email: {teamMember.email}</p>
        </div>
      ) : (
        <div>
          <p>Team member not found.</p>
        </div>
      )}
    </>
  );
};

export default TeamDetails;
