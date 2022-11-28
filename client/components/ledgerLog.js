import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCredits,
  fetchAllDebits,
  deleteCredit,
  deleteDebit,
  fetchTotal,
} from "../store";
// Bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const LedgerLog = () => {
  //State
  const email = useSelector((state) => state.user.email);
  const allDebits = useSelector((state) => state.debits);
  const allCredits = useSelector((state) => state.credits);
  const total = useSelector((state) => state.total.amount);
  //Dispatches
  const dispatch = useDispatch();

  const handleDeleteCredit = async (id) => {
    await dispatch(deleteCredit(id));
    await dispatch(fetchTotal());
  };

  const handleDeleteDebit = async (id) => {
    await dispatch(deleteDebit(id));
    await dispatch(fetchTotal());
  };

  useEffect(() => {
    dispatch(fetchAllCredits());
    dispatch(fetchAllDebits());
  }, [total]);

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
              <th>Delete Debit</th>
            </tr>
          </thead>
          <tbody>
            {allDebits.map((debit, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{debit.name}</td>
                <td>{debit.amount}</td>
                <td>{email}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleDeleteDebit(debit.id)}
                  >
                    DELETE
                  </Button>
                </td>
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
              <th>Delete Credit</th>
            </tr>
          </thead>
          <tbody>
            {allCredits.map((credit, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{credit.name}</td>
                <td>{credit.amount}</td>
                <td>{email}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleDeleteCredit(credit.id)}
                  >
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default LedgerLog;
