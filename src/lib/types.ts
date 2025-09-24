export type Cliente = {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  ativo: boolean;
  criado_em?: string;
  atualizado_em?: string;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: "gestor" | "tecnico";
  ativo: boolean;
  criado_em?: string;
  atualizado_em?: string;
};

export type Atividade = {
  id: number;
  titulo: string;
  descricao: string;
  status: "pendente" | "em_andamento" | "concluida";
  data: string;
  usuario: Usuario;
  cliente: Cliente;
  criado_em?: string;
  atualizado_em?: string;
};

export type ResumoAtividadesTecnico = {
  id: number;
  nome: string;
  concluidas: number;
  pendentes: number;
  em_andamento: number;
};
