export interface Person {
  id: string; // string para consistência no front (API envia number)
  nome: string;
  idade?: number;
  sexo?: 'MASCULINO' | 'FEMININO' | string;
  dataDesaparecimento?: string; // ISO date derivada de ultimaOcorrencia.dtDesaparecimento
  cidade?: string;
  estado?: string;
  fotoUrl?: string; // mapeado de urlFoto
  status: 'DESAPARECIDO' | 'LOCALIZADO'; // derivado (dataLocalizacao presente => LOCALIZADO)
  ocoId?: number; // id da última ocorrência para submissões
}

export interface ReportInput {
  ocoId: number; // id da ocorrência (ultimaOcorrencia.ocoId)
  informacao: string; // texto principal
  descricao?: string; // descrição do anexo
  data?: string; // yyyy-MM-dd
  arquivos?: File[]; // files
}
