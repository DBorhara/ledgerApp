import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { fetchAllCredits, fetchAllDebits } from "../store";
// Bootstrap
import Table from "react-bootstrap/Table";

const LedgerLog = (props) => {
  const { email, allCredits, allDebits, fetchAllCredits, fetchAllDebits } =
    props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCredits());
    dispatch(fetchAllDebits());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        marginTop: "3rem",
      }}
    >
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>Debits</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Debit</th>
              <th>Amount</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {allDebits.map((debit, i) => (
              <tr key={i}>
                <td>{debit.id}</td>
                <td>{debit.name}</td>
                <td>{debit.amount}</td>
                <td>{email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>Credits</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Credit</th>
              <th>Amount</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {allCredits.map((credit, i) => (
              <tr key={i}>
                <td>{credit.id}</td>
                <td>{credit.name}</td>
                <td>{credit.amount}</td>
                <td>{email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    allCredits: state.credits,
    allDebits: state.debits,
    email: state.user.email,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllCredits,
    fetchAllDebits,
  };
};

export default connect(mapState, mapDispatch)(LedgerLog);
