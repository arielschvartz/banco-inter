import { AxiosInstance } from 'axios';

export type TCancelarBoletoParams = {
  nossoNumero: string;
  motivoCancelamento: 'ACERTOS' | 'APEDIDODOCLIENTE' | 'PAGODIRETOAOCLIENTE' | 'SUBSTITUICAO';
};

type TCancelarBoletoProps = {
  axios: AxiosInstance;
  accessToken: string;
  params: TCancelarBoletoParams;
};

export const cancelarBoleto = async (props: TCancelarBoletoProps) => {
  const {
    axios,
    accessToken,
    params: { nossoNumero, motivoCancelamento },
  } = props;

  if (nossoNumero == null || nossoNumero === '') {
    throw new Error('nossoNumero is required.');
  }

  await axios.post(
    `cobranca/v2/boletos/${nossoNumero}/cancelar`,
    {
      motivoCancelamento,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return undefined;
};
