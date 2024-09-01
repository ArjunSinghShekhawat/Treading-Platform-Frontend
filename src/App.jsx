import { Route, Routes } from "react-router-dom";
import { Home } from "./Page/Home/Home";
import { Navbar } from "./Page/Navbar/Navbar";
import { Portfolio } from "./Page/PagePortfolio/Portfolio";
import { Activity } from "./Page/Activity/Activity";
import { Withdrawal } from "./Page/Withdrawal/Withdrawal";
import { PaymentDetails } from "./Page/PaymentDetails/PaymentDetails";
import { StockDetails } from "./Page/StockDetails/StockDetails";
import { WatchList } from "./Page/WatchList/WatchList";
import { Profile } from "./Page/Profile/Profile";
import { NotFound } from "./Page/NotFound/NotFound";
import { Wallet } from "./Page/Wallet/Wallet";
import { SearchCoin } from "./Page/Search/SearchCoin";
import { Auth } from "./Page/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./State/Auth/Action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  console.log("auth ----", auth);

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);
  return (
    <>
      {auth.user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/market/:id" element={<StockDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchCoin />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
