"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

// COMPONENTS
import { CustomAutoComplete } from "../../components/AutoComplete";

// CONSTANTS
import { FrontendRoutes } from "../../constants/frontendRoutes";

// CONTEXT
import { useSearchFIPE } from "../../context/SearchFIPE";

// INTERFACES
import { IAutoCompleteProps } from "../../interfaces/app";
import { IBranchs, IModelsResponse, IYears } from "../../interfaces/CARS";

// SERVICES
import ApiService from "../../service/api";

// STYLES
import * as S from "./styles";

export default function Busca() {
  const router = useRouter();

  const {
    selectedBrand,
    selectedModel,
    selectedYear,
    setSelectedBrand,
    setSelectedModel,
    setSelectedYear,
  } = useSearchFIPE();

  const formatToAutoComplete = async (data: IBranchs[]) => {
    return data.map((item) => {
      return { id: item.codigo, label: item.nome };
    });
  };

  const responseBrands = useQuery<IAutoCompleteProps[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await ApiService.get<IBranchs[]>("/carros/marcas");
      return formatToAutoComplete(response.data);
    },
  });

  const responseModels = useQuery<IAutoCompleteProps[]>({
    queryKey: ["models", selectedBrand],
    queryFn: async () => {
      const response = await ApiService.get<IModelsResponse>(
        `/carros/marcas/${selectedBrand?.id}/modelos`
      );
      return formatToAutoComplete(response.data.modelos);
    },
    enabled: !!selectedBrand?.id,
  });

  const responseYears = useQuery<IAutoCompleteProps[]>({
    queryKey: ["years", selectedModel],
    queryFn: async () => {
      const response = await ApiService.get<IYears[]>(
        `/carros/marcas/${selectedBrand?.id}/modelos/${selectedModel?.id}/anos`
      );
      return formatToAutoComplete(response.data);
    },
    enabled: !!selectedModel?.id,
  });

  useEffect(() => {
    setSelectedModel(null);
    setSelectedYear(null);

    if (!selectedBrand) {
      return;
    }
  }, [selectedBrand]);

  useEffect(() => {
    setSelectedYear(null);

    if (!selectedModel) {
      return;
    }
  }, [selectedModel]);

  const submitForm = (event: any) => {
    event.preventDefault();
    router.push(FrontendRoutes.FIPE);
  };

  useEffect(() => {
    if (
      responseBrands.isError ||
      responseModels.isError ||
      responseYears.isError
    ) {
      Swal.fire({
        title: "Erro!",
        text: "Erro ao buscar dados, tente novamente",
        icon: "error",
      });
    }
  }, [responseBrands.isError, responseModels.isError, responseYears.isError]);

  return (
    <S.Container>
      <S.Box>
        <S.Title>Tabela Fipe</S.Title>
        <h3>Consulte o valor de um veículo de forma gratuita</h3>

        <S.Form onSubmit={submitForm}>
          <CustomAutoComplete
            label="Marca"
            isLoading={responseBrands.isLoading}
            options={responseBrands.data || []}
            value={selectedBrand}
            onChange={(value) => setSelectedBrand(value)}
          />

          <CustomAutoComplete
            label="Modelo"
            isLoading={responseModels.isLoading}
            options={responseModels.data || []}
            value={selectedModel}
            onChange={(value) => setSelectedModel(value)}
          />

          {selectedModel?.id && (
            <CustomAutoComplete
              label="Ano"
              isLoading={responseYears.isLoading}
              options={responseYears.data || []}
              value={selectedYear}
              onChange={(value) => setSelectedYear(value)}
            />
          )}

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
