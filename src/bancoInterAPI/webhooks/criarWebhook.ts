import { AxiosInstance } from 'axios';

export type TCriarWebhookParams = {
  webhookUrl: string;
};

type TCriarWebhookProps = {
  axios: AxiosInstance;
  accessToken: string;
  params: TCriarWebhookParams;
};

export const criarWebhook = async (props: TCriarWebhookProps) => {
  const { axios, accessToken, params } = props;

  await axios.put('cobranca/v2/boletos/webhook', params, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return undefined;
};
