import { AxiosInstance } from 'axios';

export type TRecuperarBoletoEmPDFParams = {
  nossoNumero: string;
};

type TRecuperarBoletoEmPDFProps = {
  axios: AxiosInstance;
  accessToken: string;
  params: TRecuperarBoletoEmPDFParams;
};

export type TRecuperarBoletoEmPDFResponse = { pdf: string };

export const recuperarBoletoEmPDF = async (props: TRecuperarBoletoEmPDFProps) => {
  const { axios, accessToken, params } = props;

  if (params.nossoNumero == null || params.nossoNumero === '') {
    throw new Error('nossoNumero is required.');
  }

  const { data } = await axios.get<TRecuperarBoletoEmPDFResponse>(`cobranca/v2/boletos/${params.nossoNumero}/pdf`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
