import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  Car,
  CopyIcon,
  DollarSign,
  ShuffleIcon,
  UploadIcon,
  Wallet2Icon,
  WalletIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { TopUpForm } from "./TopUpForm";
import { WithdrawalForm } from "./WithdrawalForm";
import { TransformForm } from "./TransformForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  depositeMoney,
  getUserWallet,
  getWalletTransaction,
} from "@/State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const Wallet = () => {
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();
  const query = useQuery();
  const orderId = query.get("orderId");
  const payment_id = query.get("payment_id");
  const razorpay_payment_id = query.get("razorpay_payment_id");
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTrasaction();
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(
        depositeMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpay_payment_id || payment_id,
          navigate,
        })
      );
    }
  }, [orderId, payment_id, razorpay_payment_id]);
  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };
  console.log("user wallet ", wallet);

  const handleFetchWalletTrasaction = () => {
    dispatch(getWalletTransaction({ jwt: localStorage.getItem("jwt") }));
  };
  return (
    <div className=" flex flex-col items-center">
      <div className=" pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader className=" pb-9">
            <div className=" flex justify-between items-center">
              <div className=" flex items-center gap-5">
                <WalletIcon size={30} />

                <div>
                  <CardTitle className=" text-2xl">My Wallet</CardTitle>
                  <div className=" flex items-center gap-2">
                    <p className=" text-gray-200 text-sm">
                      #{wallet.userWallet?.id}
                    </p>
                    <CopyIcon
                      size={12}
                      className=" cursor-pointer hover:text-slate-300"
                    />
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon
                  onClick={handleFetchUserWallet}
                  className="w-6 h-6  cursor-pointer hover:text-gray-400"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className=" flex items-center">
              <DollarSign />
              <span className=" text-2xl font-semibold">
                {wallet?.userWallet?.balance}
              </span>
            </div>

            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div className=" h-24 w-24 text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UploadIcon />
                    <span className=" text-sm mt-2">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up Your Wallet</DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div className=" h-24 w-24 text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <UploadIcon />
                    <span className=" text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div className=" h-24 w-24 text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                    <ShuffleIcon />
                    <span className=" text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className=" text-center text-xl">
                      Transfer to other wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransformForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className=" py-5 pt-10">
          <div className="flex gap-2 items-center pb-5">
            <h1 className=" text-2xl font-semibold">History</h1>
            <UpdateIcon
              onClick={handleFetchWalletTrasaction}
              className=" h-7 w-7 p-0 cursor-pointer hover:text-gray-400"
            />
          </div>
          <div className=" space-y-5">
            {wallet.transactions.map((item) => (
              <div key={item.id}>
                <Card className="px-5 flex justify-between items-center">
                  <div className=" flex items-center gap-5">
                    <Avatar>
                      <AvatarFallback>
                        <ShuffleIcon className="" />
                      </AvatarFallback>
                    </Avatar>
                    <div className=" space-y-1">
                      <h1>{item?.walletTransactionType || item.purpose} </h1>
                      <p className=" text-gray-500 text-sm">{item.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className={` text-green-500`}>{item.amount}USD </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
