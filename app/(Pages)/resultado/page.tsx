"use client";

import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

// INTERFACES
import { IFIPE } from "../../interfaces/CARS";

// SERVICES
import ApiService from "../../service/api";

// STYLES
import * as S from "./styles";

const Resultado = () => {
  const [isLoading, setIsloading] = useState(false);
  const [FIPE, setFIPE] = useState<IFIPE>({} as IFIPE);

  const selectedBrand = "59";
  const selectedModel = "5940";
  const selectedYear = "2014-3";

  const getFipeValue = async () => {
    setIsloading(true);
    const { data } = await ApiService.get<IFIPE>(
      `/carros/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`
    );

    if (data) {
      setFIPE(data);
    }

    setIsloading(false);
  };

  useEffect(() => {
    getFipeValue();
  }, []);

  return (
    <S.Container>
      {isLoading && <CircularProgress color="inherit" size={20} />}

      {!isLoading && (
        <S.Box>
          <S.Title>{`Tabela Fipe: Preço ${FIPE?.Marca} ${FIPE?.Modelo} ${FIPE?.AnoModelo}`}</S.Title>
          <S.Value>{FIPE?.Valor}</S.Value>
          <S.Text>Este é o preço de compra do veículo</S.Text>
        </S.Box>
      )}
    </S.Container>
  );
};

export default Resultado;
