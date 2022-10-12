import { AxiosInstance } from 'axios';
import { TBaseListProps, TBaseListResponse } from '../types';
import { TBoleto, TOrderBoletosProps, TRecuperarBoletosProps } from './types';

export type TRecuperarColecaoDeBoletosQueryParams = TRecuperarBoletosProps & TOrderBoletosProps & TBaseListProps;

type TRecuperarColecaoDeBoletosProps = {
  axios: AxiosInstance;
  accessToken: string;
  queryParams: TRecuperarColecaoDeBoletosQueryParams;
};

type TRecuperarColecaoDeBoletosResponse = TBaseListResponse<TBoleto>;

export const recuperarColecaoDeBoletos = async (props: TRecuperarColecaoDeBoletosProps) => {
  const { axios, accessToken, queryParams } = props;

  const { data } = await axios.get<TRecuperarColecaoDeBoletosResponse>('cobranca/v2/boletos', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: queryParams,
  });

  return data;
};
