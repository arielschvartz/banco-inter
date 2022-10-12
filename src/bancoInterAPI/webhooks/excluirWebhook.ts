import { AxiosInstance } from 'axios';

type TExcluirWebhookProps = {
  axios: AxiosInstance;
  accessToken: string;
};

export const excluirWebhook = async (props: TExcluirWebhookProps) => {
  const { axios, accessToken } = props;

  await axios.delete('cobranca/v2/boletos/webhook', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return undefined;
};
