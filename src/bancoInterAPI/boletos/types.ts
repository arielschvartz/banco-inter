export type TDateTypes = 'VENCIMENTO' | 'EMISSAO' | 'SITUACAO';

export type TStatuses = 'EXPIRADO' | 'VENCIDO' | 'EMABERTO' | 'PAGO' | 'CANCELADO';

export type TOrderByTypes =
  | 'PAGADOR'
  | 'NOSSONUMERO'
  | 'SEUNUMERO'
  | 'DATASITUACAO'
  | 'DATAVENCIMENTO'
  | 'VALOR'
  | 'STATUS';

export type TOrderTypes = 'ASC' | 'DESC';

export type TTipoPessoa = 'FISICA' | 'JURIDICA';

export type TNaoTemDesconto = {
  codigo: 'NAOTEMDESCONTO';
  taxa: 0;
  valor: 0;
};

export type TDescontoValorFixo = {
  codigo: 'VALORFIXODATAINFORMADA';
  data: string;
  taxa: 0;
  valor: number;
};

export type TDescontoValorPercentual = {
  codigo: 'PERCENTUALDATAINFORMADA';
  data: string;
  taxa: number;
  valor: number;
};

export type TDesconto = TNaoTemDesconto | TDescontoValorFixo | TDescontoValorPercentual;

export type TNaoTemMulta = {
  codigoMulta: 'NAOTEMMULTA';
  taxa: 0;
  valor: 0;
};

export type TMultaValorFixo = {
  codigoMulta: 'VALORFIXO';
  data: string;
  taxa: 0;
  valor: number;
};

export type TMultaValorPercentual = {
  codigoMulta: 'PERCENTUAL';
  data: string;
  taxa: number;
  valor: 0;
};

export type TMulta = TNaoTemMulta | TMultaValorFixo | TMultaValorPercentual;

export type TMoraIsento = {
  codigoMora: 'ISENTO';
  taxa: 0;
  valor: 0;
};

export type TMoraValorDia = {
  codigoMora: 'VALORDIA';
  data: string;
  taxa: number;
  valor: number;
};

export type TMoraTaxaMensal = {
  codigoMora: 'TAXAMENSAL';
  data: string;
  taxa: number;
  valor: number;
};

export type TMoraControleBanco = {
  codigoMora: 'CONTROLEDOBANCO';
  data: string;
  taxa: number;
  valor: number;
};

export type TMora = TMoraIsento | TMoraValorDia | TMoraTaxaMensal | TMoraControleBanco;

export type TBoleto = {
  nomeBeneficiario?: string;
  cnpjCpfBeneficiario?: string;
  tipoPessoaBeneficiario?: string;
  contaCorrente?: string;
  nossoNumero?: string;
  seuNumero?: string;
  pagador?: {
    cpfCnpj: string;
    tipoPessoa: TTipoPessoa;
    nome: string;
    endereco: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade: string;
    uf: string;
    cep: string;
    email?: string;
    ddd?: string;
    telefone?: string;
  };
  situacao?: TStatuses;
  dataHoraSituacao?: string;
  dataVencimento?: string;
  valorNominal?: number;
  dataEmissao?: string;
  dataLimite?: string;
  codigoEspecie?: string;
  codigoBarras?: string;
  linhaDigitavel?: string;
  origem?: string;
  mensagem?: {
    linha1?: string;
    linha2?: string;
    linha3?: string;
    linha4?: string;
    linha5?: string;
  };
  desconto1?: TDesconto;
  desconto2?: TDesconto;
  desconto3?: TDesconto;
  multa?: TMulta;
  mora?: TMora;
};

export type TRecuperarBoletosProps = {
  dataInicial: string;
  dataFinal: string;
  filtrarDataPor?: TDateTypes;
  situacao?: TStatuses | TStatuses[];
  nome?: string;
  email?: string;
  cpfCnpj?: string;
  nossoNumero?: string;
};

export type TOrderBoletosProps = {
  ordenarPor?: TOrderByTypes;
  tipoOrdenacao?: TOrderTypes;
};
