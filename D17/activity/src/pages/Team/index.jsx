import React from "react";
import team from "../../team-data/data";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Team = () => {
  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {team.map((member) => (
          <Link
            to={`/team/${member.id}`}
            key={member.id}
            style={{ textDecoration: "none" }}
          >
            <li key={member.id}>
              <h3>{member.name}</h3>
            </li>
          </Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Team;
