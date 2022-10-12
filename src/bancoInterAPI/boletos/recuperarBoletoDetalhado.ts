import { AxiosInstance } from 'axios';
import { TBoleto } from './types';

export type TRecuperarBoletoDetalhadoParams = {
  nossoNumero: string;
};

type TRecuperarBoletoDetalhadoProps = {
  axios: AxiosInstance;
  accessToken: string;
  params: TRecuperarBoletoDetalhadoParams;
};

export type TRecuperarBoletoDetalhadoResponse = TBoleto;

export const recuperarBoletoDetalhado = async (props: TRecuperarBoletoDetalhadoProps) => {
  const { axios, accessToken, params } = props;

  if (params.nossoNumero == null || params.nossoNumero === '') {
    throw new Error('nossoNumero is required.');
  }

  const { data } = await axios.get<TRecuperarBoletoDetalhadoResponse>(`cobranca/v2/boletos/${params.nossoNumero}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
