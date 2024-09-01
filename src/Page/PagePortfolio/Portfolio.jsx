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
import { getUserAsset } from "@/State/Asset/Action";

export const Portfolio = () => {
  const { asset } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAsset({ jwt: localStorage.getItem("jwt") }));
  }, []);
  return (
    <div className=" p-5 l:p-20">
      <h1 className=" font-bold text-3xl pb-5">Portfolio</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Asset</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change%</TableHead>
            <TableHead className="text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asset.userAssets.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item?.coin?.image}
                    className=" rounded-full w-10"
                  />
                </Avatar>
                <span>{item?.coin?.name}</span>
              </TableCell>
              <TableCell>{item?.coin?.symbol.toUpperCase()}</TableCell>
              <TableCell>{item?.quantity}</TableCell>
              <TableCell>{item?.coin?.price_change_24h}</TableCell>
              <TableCell>{item?.coin?.price_change_percentage_24h}</TableCell>
              <TableCell className="text-right">
                {item?.coin?.total_volume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
