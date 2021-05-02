import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./components/Coin";

function App() {
  // UseState react hook
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  //UseEffect react hook
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //Event handling
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoin = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="header">
        <h1 className="brand">
          Crypto <i className="fas fa-dog"></i>Base
        </h1>
        <form>
          <input
            type="text"
            className="inputFeild"
            onChange={handleChange}
            placeholder="Search a coin"
          />
        </form>
      </div>
      <div className="coinsContainer">
        {filteredCoin.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
