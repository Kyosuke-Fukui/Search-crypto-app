import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';


function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=jpy&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data);
      // console.log(res.data);
    }).catch(error => console.log(error));
  }, []);

  const handleChange = e =>{
    setSearch(e.target.value)
  }

  const filterdCoins = coins.filter(coin => 
      coin.name.toLowerCase().includes(search.toLowerCase())
    )

  //表示内容
  return (
    <div>
      <div className="coin-search"> 
        <h1 className="coin-text">Search Crypto</h1>
        <form>
          <input 
          type="text" 
          placeholder="search" 
          className="coin-input" 
          onChange={handleChange} />
        </form>
      </div>


      <div className="coin-container">
          <div className="coin-row">
              <div className="coin"></div>    
              <div className="coin-data">
                  <p className="coin-price">現在価格</p>
                  <p className="coin-volume">出来高</p>
                  <p className="coin-percent">前日比</p>          
              </div>
          </div> 
      </div>

      {filterdCoins.map(coin =>{
        //res.dataの項目に合わせる
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.market_cap}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          />);
      })}
    </div>
  );
}

export default App;
