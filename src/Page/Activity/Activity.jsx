import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderForUser } from "@/State/Order/Action";
import { calculateProfit } from "@/utils/calculateProfit";
export const Activity = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllOrderForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

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
          {order.orders.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>2024/05/31 </p>
                <p className="  text-gray-400">12:23:54</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item?.orderItem?.coin?.image}
                    className=" rounded-full w-10"
                  />
                </Avatar>
                <span>{item?.orderItem?.coin?.name.toUpperCase()}</span>
              </TableCell>
              <TableCell>{item?.orderItem?.buyPrice}</TableCell>
              <TableCell>{item?.orderItem?.sellPrice}</TableCell>
              <TableCell>{item.orderType}</TableCell>
              <TableCell>{calculateProfit(item)}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
