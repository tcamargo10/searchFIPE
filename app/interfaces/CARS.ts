export interface IBrands {
  codigo: string;
  nome: string;
}

export interface IModels {
  codigo: string;
  nome: string;
}

export interface IModelsResponse {
  modelos: IModels[];
}

export interface IYears {
  codigo: string;
  nome: string;
}

export interface IFIPE {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}
