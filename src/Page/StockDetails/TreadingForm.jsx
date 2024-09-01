import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DotIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/State/Wallet/Action";
import { getAssetDetails } from "@/State/Asset/Action";
import { payOrder } from "@/State/Order/Action";

export const TreadingForm = () => {
  const dispatch = useDispatch();

  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { coin, wallet, asset } = useSelector((state) => state);
  const handleChange = (e) => {
    setAmount(e.target.value);
    const volume = calculateBuyCost(
      amount,
      coin.coinDetails?.market_data?.current_price?.usd
    );
    setQuantity(volume);
  };
  const calculateBuyCost = (amount, price) => {
    let volume = amount / price;
    let decimalPlace = Math.max(2, price.toString().split(".")[0].length);
    return volume.toFixed(decimalPlace);
  };
  useEffect(() => {
    dispatch(getUserWallet({ jwt: localStorage.getItem("jwt") }));
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, []);
  const handleByCrypto = () => {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        req: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
        amount,
      })
    );
  };
  return (
    <div className=" space-y-10 p-5">
      <div>
        <div className=" flex gap-4 items-center justify-between">
          <Input
            className=" py-7 focus:outline-none"
            placeholder="Enter Amount"
            onChange={handleChange}
            type="number"
            name="amount"
          />
          <div>
            <p className=" border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity}
            </p>
          </div>
        </div>
        {false && (
          <h1 className=" text-red-600 text-center pt-4">
            Insufficient wallet balance to buy
          </h1>
        )}
      </div>
      <div className=" flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src={"https...."} />
          </Avatar>
        </div>
        <div>
          <div className=" flex items-center gap-2">
            <p>BTC</p>
            <DotIcon className=" text-gray-400" />
            <p className=" text-gray-400">Bitcoin</p>
          </div>
          <div className=" flex items-end gap-2">
            <p className=" text-xl font-bold">
              ${coin.coinDetails?.market_data.current_price.usd}
            </p>

            <p className=" text-red-600">
              <span>-1112225555.55</span>
              <span>(-0.233333%)</span>
            </p>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-between">
        <p>Order Type</p>
        <p>Maket Order</p>
      </div>
      <div className=" flex items-center justify-between">
        <p>{orderType == "BUY" ? "Available Cash" : "Available Quantity"}</p>
        <p>
          {orderType == "BUY"
            ? "$" + wallet.userWallet?.balance
            : asset.assetDetails?.quantity || 0}
        </p>
      </div>
      <div>
        <Button
          onClick={handleByCrypto}
          className={`w-full py-6 ${
            orderType == "SELL" ? "bg-red-600 text-white" : ""
          }`}
        >
          {orderType}
        </Button>
        <Button
          variant="link"
          className=" w-full mt-5 text-xl"
          onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}
        >
          {orderType == "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};
