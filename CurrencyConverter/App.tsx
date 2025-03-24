import React, { useState, useEffect } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

  // Fetch exchange rate when currencies change
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setError('');
        const response = await fetch(`${API_URL}${fromCurrency}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        const rate = data.rates[toCurrency];
        if (!rate) {
          throw new Error('Invalid currency pair');
        }
        setExchangeRate(rate);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Convert between currencies
  const convertCurrency = () => {
    setError('');
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
      setError('Please enter a valid number');
      return;
    }

    if (numAmount <= 0) {
      setError('Please enter a positive number');
      return;
    }

    if (exchangeRate !== null) {
      const result = numAmount * exchangeRate;
      const formattedResult = toCurrency === 'JPY' ? result.toFixed(0) : result.toFixed(2);
      setConvertedAmount(formattedResult);
    } else {
      setError('Exchange rate not available');
    }
  };

  // Handle input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    convertCurrency();
  };

  // Swap currencies function
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter amount"
            step="any"
          />
        </div>

        <div className="flex mb-4 space-x-4">
          <div className="w-5/12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromCurrency">
              From
            </label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR', 'MXN', 'BRL'].map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {currency === 'USD' ? 'US Dollar' : currency === 'EUR' ? 'Euro' : currency === 'GBP' ? 'British Pound' : currency === 'JPY' ? 'Japanese Yen' : currency === 'CAD' ? 'Canadian Dollar' : currency === 'AUD' ? 'Australian Dollar' : currency === 'CNY' ? 'Chinese Yuan' : currency === 'INR' ? 'Indian Rupee' : currency === 'MXN' ? 'Mexican Peso' : 'Brazilian Real'}
                </option>
              ))}
            </select>
          </div>

          <div className="w-2/12 flex items-end justify-center pb-2">
            <button
              type="button"
              onClick={handleSwapCurrencies}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Swap currencies"
            >
              ⇄
            </button>
          </div>

          <div className="w-5/12">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toCurrency">
              To
            </label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CNY', 'INR', 'MXN', 'BRL'].map((currency) => (
                <option key={currency} value={currency}>
                  {currency} - {currency === 'USD' ? 'US Dollar' : currency === 'EUR' ? 'Euro' : currency === 'GBP' ? 'British Pound' : currency === 'JPY' ? 'Japanese Yen' : currency === 'CAD' ? 'Canadian Dollar' : currency === 'AUD' ? 'Australian Dollar' : currency === 'CNY' ? 'Chinese Yuan' : currency === 'INR' ? 'Indian Rupee' : currency === 'MXN' ? 'Mexican Peso' : 'Brazilian Real'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
        >
          Convert
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {convertedAmount && !error && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <div className="text-sm text-gray-500">Result</div>
          <div className="text-xl font-bold">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </div>
          <div className="text-sm text-gray-500 mt-2">Base Rate:
            1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500">
        <p>Note: Exchange rates are fetched from an external API and may not reflect current market rates.</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
