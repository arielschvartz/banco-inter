export type TBaseListResponse<T> = {
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  numberOfElements: number;
  content: T[];
};

export type TBaseListProps = {
  itensPorPagina?: number;
  paginaAtual?: number;
};
