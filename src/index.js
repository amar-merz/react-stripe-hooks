import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

toast.configure();

function App() {
  const [product] = React.useState({
    name: "Mercdes AMG",
    price: 64988.67,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post("https://kxrjv.sse.codesandbox.io/checkout", {
      token,
      product
    });
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_I8Dmr7WhjdCddnEerQt8S7aN00QhVA4BrJ"
        token={handleToken}
        amount={product.price * 100}
        name="Mercedes AMG"
        billingAddress
        shippingAddress
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
