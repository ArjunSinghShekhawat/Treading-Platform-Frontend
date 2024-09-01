import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { withdrawalRequest } from "@/State/Withdrawal/Action";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const WithdrawalForm = () => {
  const { wallet, withdrawal } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }));
    console.log(amount);
  };

  return (
    <div className=" pt-10 space-y-5">
      <div className=" flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
        <p>Available Balance</p>
        <p>$90000</p>
      </div>
      <div className="  flex flex-col items-center">
        <h1>Wnter Withdawal Amount</h1>
        <div className=" flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawal-input py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="$7788"
            type="number"
          />
        </div>
      </div>
      <div>
        <p className="pb-2">Transfer to</p>
        <div className=" flex items-center gap-5 border px-5 py-2 rounded-md">
          <img
            src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-489142_1280.png"
            alt=""
            className="h-8 w-8"
          />
          <div>
            <p className=" text-xl font-bold">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className=" text-xs">
              ********
              {(withdrawal.paymentDetails?.accountNumber || "").substr(-4)}
            </p>
          </div>
        </div>
      </div>
      <DialogClose className=" w-full">
        <Button onClick={handleSubmit} className=" w-full py-7 text-xl">
          Withdraw
        </Button>
      </DialogClose>
    </div>
  );
};
