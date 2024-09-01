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
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWatchList, getUserWatchList } from "@/State/WatchList/Action";
import { existInWatchlist } from "@/utils/existInWatchlist";
export const WatchList = () => {
  const { watchlist } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWatchList({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const handleRemoveToWatchList = (value) => {
    dispatch(
      addItemToWatchList({
        coinId: value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhh", watchlist);

  return (
    <div className=" p-5 l:p-20">
      <h1 className=" font-bold text-3xl pb-5">WatchList</h1>
      <Table className=" border">
        <TableHeader>
          <TableRow>
            <TableHead className=" py-5">Coin</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>market Cap</TableHead>
            <TableHead>24h</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="text-right text-red-600">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage
                    src={item.image}
                    className=" rounded-full w-10"
                  />
                </Avatar>
                <span>{item.name}</span>
              </TableCell>
              <TableCell>{item.symbol.toUpperCase()}</TableCell>
              <TableCell>{item.total_volume}</TableCell>
              <TableCell>{item.market_cap}</TableCell>
              <TableCell>{item.price_change_percentage_24h}</TableCell>
              <TableCell className="">${item.current_price}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveToWatchList(item.id)}
                  size="icon"
                  className="h-10 w-10"
                >
                  <BookmarkFilledIcon className="w-6 h-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
