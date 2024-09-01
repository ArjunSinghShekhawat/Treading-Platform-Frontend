import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { AssetTable } from "./AssetTable";
import { StockChart } from "./StockChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DotIcon, MessageCircle } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50CoinList } from "@/State/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const Home = () => {
  const [category, setCategory] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isBotRealease, setBotRealease] = useState(false);
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);

  const handleBotRealse = () => {
    setBotRealease(!isBotRealease);
  };
  const handlerChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyPress = (e) => {
    if ((e.key = "Enter")) {
      console.log(inputValue);
    }
    setInputValue("");
  };

  const handleCategory = (value) => {
    setCategory(value);
  };
  useEffect(() => {
    dispatch(getCoinList(1));
  }, []);
  useEffect(() => {
    dispatch(getTop50CoinList());
  }, [category]);
  // console.log("Top 50 coins ", coin.top50);
  return (
    <div className=" relative">
      <div className=" lg:flex">
        <div className=" lg:w-[50%] lg:border-r">
          <div className=" p-3 flex items-center gap-4">
            <Button
              variant={category == "all" ? "default" : "outline"}
              className=" rounded-full"
              onClick={() => handleCategory("all")}
            >
              All
            </Button>
            <Button
              variant={category == "top50" ? "default" : "outline"}
              className=" rounded-full"
              onClick={() => handleCategory("top50")}
            >
              Top 50
            </Button>
            <Button
              variant={category == "topGainers" ? "default" : "outline"}
              className=" rounded-full"
              onClick={() => handleCategory("topGainers")}
            >
              Top Gainers
            </Button>
            <Button
              variant={category == "topLosers" ? "default" : "outline"}
              className=" rounded-full"
              onClick={() => handleCategory("topLosers")}
            >
              Top Losers
            </Button>
          </div>
          <AssetTable
            coin={category == "all" ? coin?.coinList : coin?.top50}
            category={category}
          />
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        <div className=" hidden lg:block lg:w-[50%] p-5">
          <StockChart coinId={"bitcoin"} />
          <div className=" flex gap-5 items-center">
            <div>
              <Avatar>
                <AvatarImage
                  src={
                    "https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png"
                  }
                  className=" rounded-full w-10"
                />
              </Avatar>
            </div>
            <div className=" flex items-center gap-2">
              <p>ETH</p>
              <DotIcon className=" text-gray-400" />
              <p className=" text-gray-400">Ethwrium</p>
            </div>
            <div className=" flex items-end gap-2">
              <p className="text-xl font-bold">5464</p>
              <p className=" text-red-600">
                <span>-1222.78895554666</span>
                <span>(-0.2385%)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className=" absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        {isBotRealease && (
          <div className="  rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] h-[70vh] bg-slate-900">
            <div className=" flex justify-between items-center border-b px-6 h-[12%]">
              <p>Chat Bot</p>
              <Button onClick={handleBotRealse} variant="ghost" size="icon">
                <Cross1Icon />
              </Button>
            </div>
            <div className=" h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
              <div className=" self-start pb-5  w-auto">
                <div className=" justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                  <p>hi, arjun singh</p>
                  <p>you can ask crypto related any question</p>
                  <p>like, price market cap extra....</p>
                </div>
              </div>
              {[1, 1, 1, 1, 1, 1, 1].map((item, i) => (
                <div
                  key={i}
                  className={`${
                    i % 2 == 0 ? "self-start" : "self-end"
                  }" pb-5  w-auto"`}
                >
                  {i % 2 == 0 ? (
                    <div className=" justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                      <p>Prompt</p>
                    </div>
                  ) : (
                    <div className=" justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                      <p>ans, arjun singh</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="h-12 border-t">
              <Input
                className=" w-full h-full order-none outline-none"
                placeholder="write prompt"
                onChange={handlerChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}

        <div className="relative w-[10rem] cursor-pointer group">
          <Button
            onClick={handleBotRealse}
            className=" w-full h-[3rem] gap-2 items-center"
          >
            <MessageCircle
              size={30}
              className=" fill-[#1e293b] -rotate-90 stroke-none group:hover:fill-[#1a1a1a]"
            />
            <span className=" text-2xl">Chat Bot</span>
          </Button>
        </div>
      </section>
    </div>
  );
};
