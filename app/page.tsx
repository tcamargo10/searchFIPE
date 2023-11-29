"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

// CONSTANTS
import { FrontendRoutes } from "./constants/frontendRoutes";

// IMAGES
import LOGO from "@assets/images/logo.png";

// STYLES
import * as S from "./styles";

export default function Home() {
  const router = useRouter();

  return (
    <S.Container>
      <S.Box>
        <Image src={LOGO} alt="logo" height={30} width={300} />
        <Button
          variant="contained"
          onClick={() => router.push(FrontendRoutes.SEARCH)}
        >
          Pesquisar FIPE
        </Button>
      </S.Box>
    </S.Container>
  );
}
