import { AxiosInstance } from 'axios';

type TObterWebhookCadastradoProps = {
  axios: AxiosInstance;
  accessToken: string;
};

export type TObterWebhookCadastradoResponse = {
  webhookUrl: string;
  criacao: string;
};

export const obterWebhookCadastrado = async (props: TObterWebhookCadastradoProps) => {
  const { axios, accessToken } = props;

  const { data } = await axios.get<TObterWebhookCadastradoResponse>('cobranca/v2/boletos/webhook', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
