import React from "react";
import { connect } from "react-redux";
//Boostrap
import { Card, Button } from "react-bootstrap";

export const UserHome = (props) => {
  const { email } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "3rem",
      }}
    >
      <Card style={{ width: "65%" }}>
        <Card.Img
          variant="top"
          src="https://www.merchantmaverick.com/wp-content/uploads/2016/08/bigstock-ACCOUNTING-inscription-coming-324977827.jpg"
        />
        <Card.Body>
          <Card.Title>Welcome, {email}</Card.Title>
          <Card.Text>
            This app is a basic accounting app that was created by Depak
            Borhara. Click below to go to the app
          </Card.Text>
          <Button href="/ledger" variant="primary">
            Ledger
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapState = (state) => {
  return {
    email: state.user.email,
  };
};

export default connect(mapState)(UserHome);
