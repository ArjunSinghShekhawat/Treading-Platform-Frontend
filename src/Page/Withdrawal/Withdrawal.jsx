import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";

export const Withdrawal = () => {
  const { wallet, withdrawal } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWithdrawalHistory({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <div className=" p-5 l:p-20">
      <h1 className=" font-bold text-3xl pb-5">Withdrawal</h1>
      <Table className=" border">
        <TableHeader>
          <TableRow>
            <TableHead className=" py-5">Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amont</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawal.history.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <p>{item.date.substring(0, 10)}</p>
                <p className="  text-gray-400">{item.date.substring(11, 19)}</p>
              </TableCell>
              <TableCell>Bank</TableCell>
              <TableCell>${item.amount}</TableCell>
              <TableCell className="text-right">
                {item.withdrawStatus}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
