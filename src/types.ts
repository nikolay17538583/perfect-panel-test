export interface RouteProps {
  children: React.ReactNode;
}

export interface NavbarProps {
  onRefresh: () => void;
}

export interface Rate {
  id: string;
  symbol: string;
  rateUsd: string;
}

export interface UseFetchRatesProps {
  sortOrder: "asc" | "desc" | null;
}

export interface UseFetchRatesReturn {
  rates: Rate[];
  loading: boolean;
  highlightedRates: { [id: string]: "up" | "down" };
  fetchRates: () => void;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
