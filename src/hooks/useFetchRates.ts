import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Rate, UseFetchRatesProps, UseFetchRatesReturn } from "../types";
import toast from "react-hot-toast";

export default function useFetchRates({
  sortOrder,
}: UseFetchRatesProps): UseFetchRatesReturn {
  const [rates, setRates] = useState<Rate[]>([]);
  const [highlightedRates, setHighlightedRates] = useState<{
    [id: string]: "up" | "down";
  }>({});
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ data: Rate[] }> = await axios.get(
        "https://api.coincap.io/v2/rates"
      );
      const fetchedRates = response.data.data;

      if (sortOrder) {
        fetchedRates.sort((a: Rate, b: Rate) =>
          sortOrder === "asc"
            ? parseFloat(a.rateUsd) - parseFloat(b.rateUsd)
            : parseFloat(b.rateUsd) - parseFloat(a.rateUsd)
        );
      }

      const newHighlightedRates: { [id: string]: "up" | "down" } = {};
      fetchedRates.forEach((rate: Rate) => {
        const prevRate = rates.find((r) => r.id === rate.id);
        if (prevRate) {
          const change =
            parseFloat(rate.rateUsd) - parseFloat(prevRate.rateUsd);
          if (change > 0) newHighlightedRates[rate.id] = "up";
          else if (change < 0) newHighlightedRates[rate.id] = "down";
        }
      });

      setHighlightedRates(newHighlightedRates);
      setRates(fetchedRates);

      setTimeout(() => setHighlightedRates({}), 2000);
    } catch (error) {
      toast.error("Error while getting the data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();

    const interval = setInterval(() => {
      fetchRates();
    }, 30000);

    return () => clearInterval(interval);
  }, [sortOrder]);

  return { rates, loading, highlightedRates, fetchRates };
}
