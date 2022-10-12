import { AxiosInstance } from 'axios';
import { TDesconto, TMora, TMulta, TTipoPessoa } from './types';

export type TIncluirBoletoDeCobrancaParams = {
  seuNumero: string;
  valorNominal: number;
  dataVencimento: string;
  numDiasAgenda: number;
  pagador: {
    cpfCnpj: string;
    tipoPessoa: TTipoPessoa;
    nome: string;
    endereco: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade: string;
    uf: string;
    cep: string;
    email?: string;
    ddd?: string;
    telefone?: string;
  };
  mensagem?: {
    linha1: string;
    linha2?: string;
    linha3?: string;
    linha4?: string;
    linha5?: string;
  };
  desconto1?: TDesconto;
  desconto2?: TDesconto;
  desconto3?: TDesconto;
  multa?: TMulta;
  mora?: TMora;
  beneficiarioFinal?: {
    nome: string;
    cpfCnpj: string;
    tipoPessoa: TTipoPessoa;
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
};

type TIncluirBoletoDeCobrancaProps = {
  axios: AxiosInstance;
  accessToken: string;
  params: TIncluirBoletoDeCobrancaParams;
};

type TIncluirBoletoDeCobrancaResponse = {
  seuNumero?: string;
  nossoNumero?: string;
  codigoBarras?: string;
  linhaDigitavel?: string;
};

export const incluirBoletoDeCobranca = async (props: TIncluirBoletoDeCobrancaProps) => {
  const { axios, accessToken, params } = props;

  const { data } = await axios.post<TIncluirBoletoDeCobrancaResponse>('cobranca/v2/boletos', params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
