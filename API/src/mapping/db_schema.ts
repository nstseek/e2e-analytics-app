const tables = {
  UF: {
    nome: 'NOME',
    sigla: 'SIGLA',
    id: 'ID',
    [Symbol.toPrimitive]: () => 'UF'
  },
  Empresa: {
    nome: 'NOME',
    cnpj: 'CNPJ',
    id: 'ID',
    uf_id: 'UF_ID',
    [Symbol.toPrimitive]: () => 'EMPRESA'
  },
  Fornecedor: {
    id: 'ID',
    nome: 'NOME',
    email: 'EMAIL',
    rg: 'RG',
    data_nasc: 'DATA_NASC',
    cpf: 'CPF',
    cnpj: 'CNPJ',
    [Symbol.toPrimitive]: () => 'FORNECEDOR'
  },
  RelFornecedorEmpresa: {
    fornecedor_id: 'FORNECEDOR_ID',
    empresa_id: 'EMPRESA_ID',
    [Symbol.toPrimitive]: () => 'REL_FORNECEDOR_EMPRESA'
  }
}

export default tables;
