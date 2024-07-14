import { useEffect, useState } from "react";
import { currencies } from "./Currencies.js";
import axios from "axios";

function Currency() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  function handleAmountChange(e) {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }

  function handleChangeFromTO() {
    const from = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(from);
  }

  useEffect(() => {
    async function handleConverter() {
      try {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const res = await axios.get(url);
        setExchangeRate(res.data.rates[toCurrency]);
      } catch (e) {
        console.log("Error occurs while fetching exchange rate:", e);
        alert("Error occurs while fetching exchange data");
      }
    }
    handleConverter();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  return (
    <div className="container">
      <header>
        <h1>Currency converter</h1>
        <img src="/exchange.png" alt="" />
      </header>
      <main>
        <div className="data">
          <div className="input-container">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="from-currency">From currency:</label>
            <select
              id="from-currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((cur, index) => (
                <option key={index} value={cur.code}>
                  {cur.code} - {cur.name} - {cur.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="exchange-img">
            <button onClick={handleChangeFromTO}>
              <svg
                width="24"
                height="24"
                fill="currentColor"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path d="m16.629 11.999-1.2-1.2 3.085-3.086H2.572V5.999h15.942L15.43 2.913l1.2-1.2 4.543 4.543a.829.829 0 0 1 0 1.2l-4.543 4.543Zm-9.257-.001 1.2 1.2-3.086 3.086h15.943v1.714H5.486l3.086 3.086-1.2 1.2-4.543-4.543a.829.829 0 0 1 0-1.2l4.543-4.543Z"></path>
              </svg>
            </button>
          </div>
          <div className="input-container">
            <label htmlFor="to-currency">To currency:</label>
            <select
              id="to-currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((cur, index) => (
                <option key={index} value={cur.code}>
                  {cur.code} - {cur.name} - {cur.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="result">
            <p>
              {amount} {fromCurrency} = <b>{convertedAmount}</b> {toCurrency}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Currency;
