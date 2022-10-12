import axios from 'axios';
import https from 'https';
import fs from 'fs';

type TGetAxiosInstancePathProps = {
  certificatePath: string;
  keyPath: string;
};

type TGetAxiosInstanceBase64Props = {
  certificateBase64: string;
  keyBase64: string;
};

export type TGetAxiosInstanceProps = TGetAxiosInstancePathProps | TGetAxiosInstanceBase64Props;

const isPathProps = (props: TGetAxiosInstanceProps): props is TGetAxiosInstancePathProps => {
  return (
    (props as TGetAxiosInstancePathProps).certificatePath != null ||
    (props as TGetAxiosInstancePathProps).keyPath != null
  );
};

export const getAxiosInstance = (props: TGetAxiosInstanceProps) => {
  let certificate: string | undefined;
  let key: string | undefined;

  if (isPathProps(props)) {
    certificate = fs.readFileSync(props.certificatePath, {
      encoding: 'ascii',
    });
    key = fs.readFileSync(props.keyPath, {
      encoding: 'ascii',
    });
  } else {
    certificate = Buffer.from(props.certificateBase64, 'base64').toString('ascii');
    key = Buffer.from(props.keyBase64, 'base64').toString('ascii');
  }

  if (!certificate || !key) throw new Error('Unable to set certificate and key.');

  return axios.create({
    baseURL: 'https://cdpj.partners.bancointer.com.br/',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false, // (NOTE: this will disable client verification)
      cert: certificate,
      key,
    }),
  });
};
