"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

// CONSTANTS
import { FrontendRoutes } from "../../constants/frontendRoutes";

// CONTEXT
import { useSearchFIPE } from "../../context/SearchFIPE";

// INTERFACES
import { IFIPE } from "../../interfaces/CARS";

// SERVICES
import ApiService from "../../service/api";

// STYLES
import * as S from "./styles";

const Resultado = () => {
  const router = useRouter();
  const { selectedBrand, selectedModel, selectedYear } = useSearchFIPE();

  const { data, isLoading, isError } = useQuery<IFIPE>({
    queryKey: ["fipe", selectedBrand, selectedModel, selectedYear],
    queryFn: async () => {
      const response = await ApiService.get<IFIPE>(
        `/carros/marcas/${selectedBrand?.id}/modelos/${selectedModel?.id}/anos/${selectedYear?.id}`
      );
      return response.data;
    },
    enabled: !!selectedBrand && !!selectedModel && !!selectedYear,
  });

  useEffect(() => {
    if (isError || !selectedBrand || !selectedModel || !selectedYear) {
      Swal.fire({
        title: "Erro!",
        text: "Erro ao buscar dados, tente novamente",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(FrontendRoutes.SEARCH);
        }
      });
    }
  }, [isError, router, selectedBrand, selectedModel, selectedYear]);

  return (
    <S.Container>
      {isLoading && <CircularProgress color="inherit" size={20} />}

      {!isLoading && (
        <S.Box>
          <S.Title>{`Tabela Fipe: Preço ${data?.Marca} ${data?.Modelo} ${data?.AnoModelo}`}</S.Title>
          <S.Value>{data?.Valor}</S.Value>
          <S.Text>Este é o preço de compra do veículo</S.Text>
        </S.Box>
      )}
    </S.Container>
  );
};

export default Resultado;
