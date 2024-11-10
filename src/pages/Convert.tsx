import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useFetchRates from "../hooks/useFetchRates";
import { GoArrowSwitch } from "react-icons/go";

const CONVERSION_FEE_PERCENT = 3;

export default function Convert() {
  const { rates, loading } = useFetchRates({ sortOrder: null });
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("RUB");
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState<{
    mainAmount: string;
    feeAmount: string;
  } | null>(null);

  useEffect(() => {
    if (fromCurrency && toCurrency && amount && rates.length > 0) {
      const fromRate = rates.find((rate) => rate.symbol === fromCurrency);
      const toRate = rates.find((rate) => rate.symbol === toCurrency);

      if (fromRate && toRate) {
        const conversionRate =
          parseFloat(fromRate.rateUsd) / parseFloat(toRate.rateUsd);
        const result = amount * conversionRate;
        const resultRounded = Math.floor(result * 100) / 100;
        const resultWithFeeRounded =
          Math.floor(resultRounded * (1 + CONVERSION_FEE_PERCENT / 100) * 100) /
          100;

        setConversionResult({
          mainAmount: `${resultWithFeeRounded} ${toCurrency}`,
          feeAmount: `(${resultRounded} ${toCurrency} + ${CONVERSION_FEE_PERCENT}%)`,
        });
      }
    }
  }, [fromCurrency, toCurrency, amount, rates]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleFromCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const availableCurrencies = rates.map((rate) => rate.symbol).sort();

  return (
    <>
      <Navbar onRefresh={() => {}} />
      {loading ? (
        <div className="flex justify-center items-center min-h-dvh -mt-44">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-full md:w-96 mx-auto md:mt-10">
          <div className="mb-4">
            <label className="font-medium">From</label>
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="border rounded p-2 w-full outline-none cursor-pointer mt-2"
            >
              {availableCurrencies.map((currency) => (
                <option
                  key={currency}
                  value={currency}
                  disabled={currency === toCurrency}
                >
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="pb-6 border-b border-neutral-200">
            <label className="font-medium">To</label>
            <select
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="border rounded p-2 w-full outline-none cursor-pointer mt-2"
            >
              {availableCurrencies.map((currency) => (
                <option
                  key={currency}
                  value={currency}
                  disabled={currency === fromCurrency}
                >
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 pt-4">
            <label className="font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="border rounded p-2 w-full mt-2"
            />
          </div>

          {conversionResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-center">
              <h3 className="text-lg font-semibold mb-2">
                {amount} {fromCurrency}
              </h3>
              <GoArrowSwitch size={16} className="mx-auto" />
              <h4 className="text-2xl font-bold text-blue-600 mt-2">
                {conversionResult.mainAmount}
              </h4>
              <p className="text-gray-500">{conversionResult.feeAmount}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
