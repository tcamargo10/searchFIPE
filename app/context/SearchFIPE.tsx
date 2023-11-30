"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { IAutoCompleteProps } from "../interfaces/app";

interface SearchFIPEContextType {
  selectedBrand: IAutoCompleteProps | null;
  selectedModel: IAutoCompleteProps | null;
  selectedYear: IAutoCompleteProps | null;
  setSelectedBrand: React.Dispatch<
    React.SetStateAction<IAutoCompleteProps | null>
  >;
  setSelectedModel: React.Dispatch<
    React.SetStateAction<IAutoCompleteProps | null>
  >;
  setSelectedYear: React.Dispatch<
    React.SetStateAction<IAutoCompleteProps | null>
  >;
}

const SearchFIPEContext = createContext<SearchFIPEContextType>(
  {} as SearchFIPEContextType
);

const SearchFIPEProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBrand, setSelectedBrand] = useState<IAutoCompleteProps | null>(
    null
  );
  const [selectedModel, setSelectedModel] = useState<IAutoCompleteProps | null>(
    null
  );
  const [selectedYear, setSelectedYear] = useState<IAutoCompleteProps | null>(
    null
  );

  return (
    <SearchFIPEContext.Provider
      value={{
        selectedBrand,
        selectedModel,
        selectedYear,
        setSelectedBrand,
        setSelectedModel,
        setSelectedYear,
      }}
    >
      <>{children}</>
    </SearchFIPEContext.Provider>
  );
};

const useSearchFIPE = () => {
  const context = useContext(SearchFIPEContext);

  return context;
};

export { SearchFIPEProvider, SearchFIPEContext, useSearchFIPE };
