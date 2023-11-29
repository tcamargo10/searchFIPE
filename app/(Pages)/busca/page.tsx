"use client";

import { Autocomplete, TextField, Button } from "@mui/material";

// STYLES
import * as S from "./styles";

export default function Busca() {
  const data = [{ id: 1, label: "Teste" }];

  const getFipeValue = () => {
    // TODO
  };

  return (
    <S.Container>
      <S.Box>
        <S.Title>Tabela Fipe</S.Title>
        <h3>Consulte o valor de um veículo de forma gratuita</h3>

        <S.Form onSubmit={getFipeValue}>
          <Autocomplete
            options={data}
            renderInput={(params) => <TextField {...params} label="Marca" />}
          />

          <Autocomplete
            options={data}
            renderInput={(params) => <TextField {...params} label="Modelo" />}
          />

          <Autocomplete
            options={data}
            renderInput={(params) => <TextField {...params} label="Ano" />}
          />

          <Button type="submit" variant="contained">
            Consultar preço
          </Button>
        </S.Form>
      </S.Box>
    </S.Container>
  );
}
