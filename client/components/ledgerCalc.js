import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
  applyCredit,
  applyDebit,
  fetchTotal,
  zeroedTotal,
  fetchAllCredits,
  fetchAllDebits,
  clearAllCredits,
  clearAllDebits,
} from "../store";
//Boostrap
import { Form, Button, Alert } from "react-bootstrap";

const LedgerCalc = (props) => {
  const {
    totalAmount,
    handleCreditSubmit,
    handleDebitSubmit,
    fetchTotal,
    zeroedTotal,
  } = props;
  const dispatch = useDispatch();

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
          <Button onClick={zeroedTotal} variant="warning">
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

const mapState = (state) => {
  return {
    totalAmount: state.total.amount,
  };
};

const mapDispatch = (dispatch) => {
  return {
    zeroedTotal: async () => {
      await dispatch(clearAllCredits());
      await dispatch(clearAllDebits());
      return await dispatch(zeroedTotal());
    },
    fetchTotal,
    async handleCreditSubmit(evt) {
      evt.preventDefault();
      const name = evt.target.name.value;
      const amount = Number(evt.target.creditAmount.value);

      await dispatch(applyCredit(name, amount));
      await dispatch(fetchAllCredits);
      return await dispatch(fetchTotal());
    },
    async handleDebitSubmit(evt) {
      evt.preventDefault();
      const name = evt.target.name.value;
      const amount = Number(evt.target.debitAmount.value);

      await dispatch(applyDebit(name, amount));
      await dispatch(fetchAllDebits);
      return await dispatch(fetchTotal());
    },
  };
};

export default connect(mapState, mapDispatch)(LedgerCalc);
