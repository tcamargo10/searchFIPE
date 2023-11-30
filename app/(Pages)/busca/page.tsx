"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

// COMPONENTS
import { CustomAutoComplete } from "../../components/AutoComplete";

// CONSTANTS
import { FrontendRoutes } from "../../constants/frontendRoutes";

// INTERFACES
import { IAutoCompleteProps } from "../../interfaces/app";
import { IBrands, IModelsResponse, IYears } from "../../interfaces/CARS";

// SERVICES
import ApiService from "../../service/api";

// STYLES
import * as S from "./styles";

export default function Busca() {
  const router = useRouter();

  const [loadingBrand, setLoadingBrand] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [loadingYear, setLoadingYear] = useState(false);
  const [brands, setBrands] = useState<IAutoCompleteProps[]>([]);
  const [models, setModels] = useState<IAutoCompleteProps[]>([]);
  const [years, setYears] = useState<IAutoCompleteProps[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<IAutoCompleteProps | null>(
    null
  );
  const [selectedModel, setSelectedModel] = useState<IAutoCompleteProps | null>(
    null
  );
  const [selectedYear, setSelectedYear] = useState<IAutoCompleteProps | null>(
    null
  );

  const getBrands = async () => {
    setLoadingBrand(true);
    const response = await ApiService.get<IBrands[]>("/carros/marcas");

    if (response) {
      const formattedList = response.data.map((item) => {
        return { id: item.codigo, label: item.nome };
      });

      setBrands(formattedList);
    }

    setLoadingBrand(false);
  };

  const getModels = async () => {
    setLoadingModel(true);
    const response = await ApiService.get<IModelsResponse>(
      `/carros/marcas/${selectedBrand?.id}/modelos`
    );

    if (response) {
      const formattedList = response.data.modelos.map((item) => {
        return { id: item.codigo, label: item.nome };
      });

      setModels(formattedList);
    }

    setLoadingModel(false);
  };

  const getYears = async () => {
    setLoadingYear(true);
    const response = await ApiService.get<IYears[]>(
      `/carros/marcas/${selectedBrand?.id}/modelos/${selectedModel?.id}/anos`
    );

    if (response) {
      const formattedList = response.data.map((item) => {
        return { id: item.codigo, label: item.nome };
      });

      setYears(formattedList);
    }

    setLoadingYear(false);
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    setSelectedModel(null);
    setSelectedYear(null);
    setModels([]);
    setYears([]);

    if (!selectedBrand) {
      return;
    }

    getModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBrand]);

  useEffect(() => {
    setSelectedYear(null);
    setYears([]);

    if (!selectedModel) {
      return;
    }

    getYears();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModel]);

  const submitForm = (event: any) => {
    event.preventDefault();
    router.push(FrontendRoutes.FIPE);
  };

  return (
    <S.Container>
      <S.Box>
        <S.Title>Tabela Fipe</S.Title>
        <h3>Consulte o valor de um veículo de forma gratuita</h3>

        <S.Form onSubmit={submitForm}>
          <CustomAutoComplete
            label="Marca"
            isLoading={loadingBrand}
            options={brands}
            value={selectedBrand}
            onChange={(value) => setSelectedBrand(value)}
          />

          <CustomAutoComplete
            label="Modelo"
            isLoading={loadingModel}
            options={models}
            value={selectedModel}
            onChange={(value) => setSelectedModel(value)}
          />

          <CustomAutoComplete
            label="Ano"
            isLoading={loadingYear}
            options={years}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
          />

          <Button
            disabled={!selectedBrand || !selectedModel || !selectedYear}
            type="submit"
            variant="contained"
          >
            Consultar preço
          </Button>
        </S.Form>
      </S.Box>
    </S.Container>
  );
}
