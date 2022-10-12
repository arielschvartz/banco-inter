import { AxiosInstance } from 'axios';
import { TRecuperarBoletosProps } from './types';

export type TRecuperarSumarioDeBoletosQueryParams = TRecuperarBoletosProps;

type TRecuperarSumarioDeBoletosProps = {
  axios: AxiosInstance;
  accessToken: string;
  queryParams: TRecuperarSumarioDeBoletosQueryParams;
};

type TSummary = {
  quantidade?: number;
  valor?: number;
};

type TRecuperarSumarioDeBoletosResponse = {
  pagos?: TSummary;
  abertos?: TSummary;
  vencidos?: TSummary;
  cancelados?: TSummary;
  expirados?: TSummary;
};

export const recuperarSumarioDeBoletos = async (props: TRecuperarSumarioDeBoletosProps) => {
  const { axios, accessToken, queryParams } = props;

  const { data } = await axios.get<TRecuperarSumarioDeBoletosResponse>('cobranca/v2/boletos/sumario', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: queryParams,
  });

  return data;
};
