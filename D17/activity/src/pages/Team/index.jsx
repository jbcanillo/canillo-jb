import React from "react";
import team from "../../team-data/data";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Team = () => {
  return (
    <Container fluid>
      <h1>Our Team</h1>
      <Row> 
      {team.map((member) => (
        <Col xs key={member.id}>
        <Card >
          <Card.Img variant="top" src="https://placehold.co/600x400" />
          <Card.Body>
            <Link
              to={`/team/${member.id}`}
              key={member.id}
              style={{ textDecoration: "none" }}
            >
              <span key={member.id}>
                <h3>{member.name}</h3>
              </span>
            </Link>
          </Card.Body>
        </Card>
        </Col>
      ))}
      </Row>
      <Outlet />
    </Container>
  );
};

export default Team;
