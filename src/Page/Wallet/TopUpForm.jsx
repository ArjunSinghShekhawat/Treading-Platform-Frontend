import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentHandler } from "@/State/Wallet/Action";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const TopUpForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const handlePaymentChange = (value) => {
    setPaymentMethod(value);
  };
  const handleSubmit = (e) => {
    console.log("hhfs fjfh shfsjfh shffh hsfhs", amount, paymentMethod);
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        amount,
        paymentMethod,
      })
    );
  };
  return (
    <div className=" pt-10 space-y-5">
      <div>
        <h1 className=" pb-1">Enter Amount</h1>
        <Input
          className="py-7 text-lg"
          placeholder="$9999"
          onChange={handleChange}
          value={amount}
        />
      </div>
      <div>
        <h1 className=" pb-1">Select Payment Method</h1>
        <RadioGroup
          className="flex"
          defaultValue={"STRIPE"}
          onValueChange={(value) => handlePaymentChange(value)}
        >
          <div className=" flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="STRIPE"
              id="r2"
            />
            <Label htmlFor="r2">
              <div className=" bg-white rounded-md px-5 w-32">
                <img
                  className=" h-10"
                  src="https://www.citypng.com/public/uploads/preview/hd-stripe-white-logo-png-21635330218viyfn8vrhf.png"
                  alt=""
                />
              </div>
            </Label>
          </div>
          <div className=" flex items-center space-x-2 border p-3 px-5 rounded-md">
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="RAZORPAY"
              id="r1"
            />
            <Label htmlFor="r1">
              <div className=" bg-white rounded-md px-5 py-2 w-32">
                <img
                  src="https://pages.awscloud.com/rs/112-TZM-766/images/1_RAZORPAY_LOGO.png"
                  alt=""
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Button onClick={handleSubmit} className="w-full py-7">
          Submit
        </Button>
      </div>
    </div>
  );
};
