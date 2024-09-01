import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
export const Activity = () => {
  return (
    <div className=" p-5 l:p-20">
      <h1 className=" font-bold text-3xl pb-5">Activity</h1>
      <Table className=" border">
        <TableHeader>
          <TableRow>
            <TableHead className=" py-5">Date & Time</TableHead>
            <TableHead>Treading Pair</TableHead>
            <TableHead>Buy Price</TableHead>
            <TableHead>Sell Price</TableHead>
            <TableHead>Order Type</TableHead>
            <TableHead className="">Profit/Loss</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>2024/05/31 </p>
                <p className="  text-gray-400">12:23:54</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png"
                    className=" rounded-full w-10"
                  />
                </Avatar>
                <span>Bitcoin</span>
              </TableCell>
              <TableCell>BTC</TableCell>
              <TableCell>456987123</TableCell>
              <TableCell>456987123</TableCell>
              <TableCell>456987123</TableCell>
              <TableCell className="text-right">456987145555783</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
