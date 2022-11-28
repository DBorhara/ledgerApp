import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCredit,
  applyDebit,
  fetchTotal,
  zeroedTotal,
  clearAllCredits,
  clearAllDebits,
} from "../store";
//Boostrap
import { Form, Button, Alert } from "react-bootstrap";

const LedgerCalc = () => {
  //State
  const totalAmount = useSelector((state) => state.total.amount);

  //Dispatches
  const dispatch = useDispatch();
  const handleClickZeroTotal = async () => {
    await dispatch(clearAllCredits());
    await dispatch(clearAllDebits());
    await dispatch(zeroedTotal());
  };

  const handleCreditSubmit = async (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value;
    const amount = Number(evt.target.creditAmount.value);
    await dispatch(applyCredit(name, amount));
    await dispatch(fetchTotal());
  };

  const handleDebitSubmit = async (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value;
    const amount = Number(evt.target.debitAmount.value);
    await dispatch(applyDebit(name, amount));
    await dispatch(fetchTotal());
  };

  useEffect(() => {
    dispatch(fetchTotal());
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Form onSubmit={handleDebitSubmit} className="text-center">
          <Form.Group className="mb-3" controlId="itemName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter Item Name"
            />
          </Form.Group>
          $
          <Form.Group className="mb-3" controlId="itemAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="debitAmount"
              type="number"
              placeholder="Enter Amount"
            />
          </Form.Group>
          <Button name="debitButton" type="submit" variant="danger">
            Debit
          </Button>
        </Form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Alert key={"success"} variant={"success"}>
            Total: ${totalAmount}
          </Alert>
          <Button onClick={handleClickZeroTotal} variant="warning">
            Reset Total
          </Button>
        </div>
        <Form onSubmit={handleCreditSubmit} className="text-center">
          <Form.Group className="mb-3" controlId="itemName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter Item Name"
            />
          </Form.Group>
          $
          <Form.Group className="mb-3" controlId="itemAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="creditAmount"
              type="number"
              placeholder="Enter Amount"
            />
          </Form.Group>
          <Button name="creditButton" type="submit" variant="secondary">
            Credit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LedgerCalc;
