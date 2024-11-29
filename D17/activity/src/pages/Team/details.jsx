import React from "react";
import { useParams } from "react-router-dom";
import team from "../../team-data/data";
import Alert from "react-bootstrap/Alert";

const TeamDetails = () => {
  const { id } = useParams();
  const teamMember = team.find((member) => member.id === parseInt(id));
  return (
    <>
      <Alert key='secondary' variant='secondary'>
        {teamMember ? (
          <div>
            <h4>Details</h4>
            <p>Role: {teamMember.role}</p>
            <p>Email: {teamMember.email}</p>
          </div>
        ) : (
          <div>
            <p>Team member not found.</p>
          </div>
        )}
      </Alert>
    </>
  );
};

export default TeamDetails;
