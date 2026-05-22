import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

function Comparacao() {
  const [loading, setLoading] = useState(true);
  const [tipoComparacao, setTipoComparacao] = useState('anual');
  const [dados, setDados] = useState([]);
  const [ano, setAno] = useState(2025);
  const [municipio, setMunicipio] = useState('');
  const [municipios, setMunicipios] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarMunicipios();
  }, []);

  useEffect(() => {
    carregarDados();
  }, [tipoComparacao, ano, municipio]);

  const carregarMunicipios = async () => {
    try {
      const res = await api.get('/municipios');
      setMunicipios(res.data.map(m => m.nome));
    } catch (err) {
      console.error('Erro ao carregar municípios:', err);
    }
  };

  const carregarDados = async () => {
    try {
      setLoading(true);
      let res;

      if (tipoComparacao === 'anual') {
        const params = municipio ? { municipio } : {};
        res = await api.get('/cfem/comparacao/anual', { params });
      } else if (tipoComparacao === 'mensal') {
        const params = ano ? { ano } : {};
        res = await api.get('/cfem/comparacao/mensal', { params });
      } else if (tipoComparacao === 'cidade') {
        const params = ano ? { ano } : {};
        res = await api.get('/cfem/comparacao/cidade', { params });
      }

      setDados(res.data);
    } catch (err) {
      setErro('Erro ao carregar dados de comparação');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="card-header">Comparação de Dados CFEM</h2>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Comparação</label>
            <select
              value={tipoComparacao}
              onChange={(e) => setTipoComparacao(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="anual">Comparação Anual</option>
              <option value="mensal">Comparação Mensal</option>
              <option value="cidade">Comparação por Cidade</option>
            </select>
          </div>

          {tipoComparacao === 'anual' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Município</label>
              <select
                value={municipio}
                onChange={(e) => setMunicipio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                {municipios.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          )}

          {tipoComparacao !== 'anual' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
              <select
                value={ano}
                onChange={(e) => setAno(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 27 }, (_, i) => 2000 + i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {loading && <div className="flex justify-center"><div className="spinner"></div></div>}
        {erro && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{erro}</div>}

        {!loading && dados.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            {tipoComparacao === 'anual' ? (
              <LineChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_anual" stroke="#8884d8" name="Total Anual" />
              </LineChart>
            ) : (
              <BarChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={tipoComparacao === 'mensal' ? 'mes' : 'municipio_nome'} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={tipoComparacao === 'mensal' ? 'total_mensal' : 'total_cidade'} fill="#82ca9d" />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default Comparacao;
