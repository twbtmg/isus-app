import request from '../services/request';

export function autenticar(email, senha) {
  return request.post('auth', { email, senha });
}

export async function pegarListaDeServicos() {
  const resultado = await request.get('/unidades-servico');
  return resultado.data;
}

export async function pegarListaDeCategoriasProfissionais() {
  const resultado = await request.get('/categorias-profissionais');
  return resultado.data;
}

export async function pegarListaDeEspecialidades(id) {
  if (id !== 0) {
    const resultado = await request.get(`/categorias-profissionais/${id}/especialidades`);
    return resultado.data;
  }
  return [];
}


export function logout(token) {
  return request.post('logout', { refresh_token: token.refresh_token }, { headers: { Authorization: `Bearer ${token.access_token}` } });
}
