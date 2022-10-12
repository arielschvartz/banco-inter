import { API as BancoInterAPI } from '../src/api';
import path from 'path';

describe('API', () => {
  describe('When there is a valid API', () => {
    let API: BancoInterAPI;
    beforeAll(() => {
      API = new BancoInterAPI({
        certificatePath: path.resolve(__dirname, '../Inter_API-Chave_e_Certificado/Inter API_Certificado.crt'),
        keyPath: path.resolve(__dirname, '../Inter_API-Chave_e_Certificado/Inter API_Chave.key'),
        clientId: process.env.INTER_CLIENT_ID as string,
        clientSecret: process.env.INTER_CLIENT_SECRET as string,
        scope: ['boleto-cobranca.read', 'boleto-cobranca.write'],
      });
    });

    describe('Webhooks', () => {
      const port = Math.floor(Math.random() * 1000);
      const url = `https://localhost:${port}`;

      test('It correctly creates a webhook, fetches it and deletes it.', async () => {
        await expect(API.criarWebhook({ webhookUrl: url })).resolves.toBeUndefined();

        let data = await API.obterWebhookCadastrado();
        expect(data.webhookUrl).toEqual(url);

        await expect(API.excluirWebhook()).resolves.toBeUndefined();

        data = await API.obterWebhookCadastrado();
        expect(data.webhookUrl).toBeUndefined();
      });
    });

    describe('Boletos', () => {
      test('All GET methods', async () => {
        const params = {
          dataInicial: '2022-01-01',
          dataFinal: '2022-01-31',
        };
        const colecaoResponse = await API.recuperarColecaoDeBoletos(params);

        expect(colecaoResponse.content.length).toBeGreaterThan(0);

        const sumarioResponse = await API.recuperarSumarioDeBoletos(params);

        expect(sumarioResponse.abertos).not.toBeUndefined();
        expect(sumarioResponse.cancelados).not.toBeUndefined();
        expect(sumarioResponse.expirados).not.toBeUndefined();
        expect(sumarioResponse.pagos).not.toBeUndefined();
        expect(sumarioResponse.vencidos).not.toBeUndefined();

        const nossoNumero = colecaoResponse.content[0].nossoNumero as string;

        const boletoResponse = await API.recuperarBoletoDetalhado({
          nossoNumero,
        });

        expect(boletoResponse.codigoBarras).not.toBeUndefined();
        expect(boletoResponse.dataEmissao).not.toBeUndefined();
        expect(boletoResponse.situacao).not.toBeUndefined();
        expect(boletoResponse.linhaDigitavel).not.toBeUndefined();

        const pdfResponse = await API.recuperarBoletoEmPDF({
          nossoNumero,
        });

        expect(pdfResponse.pdf).not.toBeUndefined();
      });

      test.only('Inlucir and Cancelar methods', async () => {
        const seuNumero = Math.floor(Math.random() * 100000).toString();
        const d = new Date();
        const dataVencimento = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());

        const inclurResponse = await API.incluirBoletoDeCobranca({
          seuNumero,
          valorNominal: 12.34,
          dataVencimento: dataVencimento.toISOString().split('T')[0],
          numDiasAgenda: 60,
          pagador: {
            cpfCnpj: '82679554701', // this was randomly generated
            tipoPessoa: 'FISICA',
            nome: 'Test',
            endereco: 'Av. Barbacena',
            numero: '1219',
            bairro: 'Santo Agostinho',
            cidade: 'Belo Horizonte',
            uf: 'MG',
            cep: '30190924',
          },
          beneficiarioFinal: {
            nome: 'Test',
            cpfCnpj: '82679554701',
            tipoPessoa: 'FISICA',
            cep: '30190924',
            endereco: 'Av. Barbacena',
            bairro: 'Santo Agostinho',
            cidade: 'Belo Horizonte',
            uf: 'MG',
          },
        });

        expect(inclurResponse.codigoBarras).not.toBeUndefined();
        expect(inclurResponse.linhaDigitavel).not.toBeUndefined();
        expect(inclurResponse.nossoNumero).not.toBeUndefined();
        expect(inclurResponse.seuNumero).not.toBeUndefined();

        await expect(
          API.cancelarBoleto({
            nossoNumero: inclurResponse.nossoNumero as string,
            motivoCancelamento: 'APEDIDODOCLIENTE',
          }),
        ).resolves.toBeUndefined();
      });
    });
  });
});
