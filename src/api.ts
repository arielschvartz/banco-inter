import { AxiosInstance } from 'axios';
import { cancelarBoleto, TCancelarBoletoParams } from './bancoInterAPI/boletos/cancelarBoleto';
import {
  incluirBoletoDeCobranca,
  TIncluirBoletoDeCobrancaParams,
} from './bancoInterAPI/boletos/incluirBoletoDeCobranca';
import {
  recuperarBoletoDetalhado,
  TRecuperarBoletoDetalhadoParams,
} from './bancoInterAPI/boletos/recuperarBoletoDetalhado';
import { recuperarBoletoEmPDF, TRecuperarBoletoEmPDFParams } from './bancoInterAPI/boletos/recuperarBoletoEmPDF';
import {
  recuperarColecaoDeBoletos,
  TRecuperarColecaoDeBoletosQueryParams,
} from './bancoInterAPI/boletos/recuperarColecaoDeBoletos';
import {
  recuperarSumarioDeBoletos,
  TRecuperarSumarioDeBoletosQueryParams,
} from './bancoInterAPI/boletos/recuperarSumarioDeBoletos';
import {
  obterTokenOAuth,
  TClientConfigProps,
  TObterTokenOAuthSpecificProps,
} from './bancoInterAPI/token/obterTokenOAuth';
import { criarWebhook, TCriarWebhookParams } from './bancoInterAPI/webhooks/criarWebhook';
import { excluirWebhook } from './bancoInterAPI/webhooks/excluirWebhook';
import { obterWebhookCadastrado } from './bancoInterAPI/webhooks/obterWebhookCadastrado';
import { getAxiosInstance, TGetAxiosInstanceProps } from './utils/axios';

type TAPIConstructorProps = TGetAxiosInstanceProps & TClientConfigProps & TObterTokenOAuthSpecificProps;

export class API {
  private axios: AxiosInstance;
  private obterTokenOAuthParams: TClientConfigProps & TObterTokenOAuthSpecificProps;
  private accessToken: string;
  private accessTokenExpiryDate: Date;

  constructor(props: TAPIConstructorProps) {
    this.axios = getAxiosInstance(props);
    this.obterTokenOAuthParams = props;
  }

  private async obterTokenOAuth() {
    const now = new Date();
    if (this.accessToken && now.getTime() < this.accessTokenExpiryDate.getTime()) {
      return;
    }

    const response = await obterTokenOAuth({ ...this.obterTokenOAuthParams, axios: this.axios });

    if (response.expires_in) {
      this.accessTokenExpiryDate = new Date(now.getTime() + 3600 * 1000);
    }

    this.accessToken = response.access_token;
  }

  async recuperarColecaoDeBoletos(props: TRecuperarColecaoDeBoletosQueryParams) {
    await this.obterTokenOAuth();

    return recuperarColecaoDeBoletos({
      axios: this.axios,
      accessToken: this.accessToken,
      queryParams: props,
    });
  }

  async recuperarSumarioDeBoletos(props: TRecuperarSumarioDeBoletosQueryParams) {
    await this.obterTokenOAuth();

    return recuperarSumarioDeBoletos({
      axios: this.axios,
      accessToken: this.accessToken,
      queryParams: props,
    });
  }

  async recuperarBoletoDetalhado(props: TRecuperarBoletoDetalhadoParams) {
    await this.obterTokenOAuth();

    return recuperarBoletoDetalhado({
      axios: this.axios,
      accessToken: this.accessToken,
      params: props,
    });
  }

  async recuperarBoletoEmPDF(props: TRecuperarBoletoEmPDFParams) {
    await this.obterTokenOAuth();

    return recuperarBoletoEmPDF({
      axios: this.axios,
      accessToken: this.accessToken,
      params: props,
    });
  }

  async cancelarBoleto(props: TCancelarBoletoParams) {
    await this.obterTokenOAuth();

    return cancelarBoleto({
      axios: this.axios,
      accessToken: this.accessToken,
      params: props,
    });
  }

  async incluirBoletoDeCobranca(props: TIncluirBoletoDeCobrancaParams) {
    await this.obterTokenOAuth();

    return incluirBoletoDeCobranca({
      axios: this.axios,
      accessToken: this.accessToken,
      params: props,
    });
  }

  async criarWebhook(props: TCriarWebhookParams) {
    await this.obterTokenOAuth();

    return criarWebhook({
      axios: this.axios,
      accessToken: this.accessToken,
      params: props,
    });
  }

  async obterWebhookCadastrado() {
    await this.obterTokenOAuth();

    return obterWebhookCadastrado({
      axios: this.axios,
      accessToken: this.accessToken,
    });
  }

  async excluirWebhook() {
    await this.obterTokenOAuth();

    return excluirWebhook({
      axios: this.axios,
      accessToken: this.accessToken,
    });
  }
}
