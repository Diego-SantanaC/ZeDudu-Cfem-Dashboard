import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

function Analises() {
  const [loading, setLoading] = useState(true);
  const [municipio, setMunicipio] = useState('Parauapebas');
  const [municipios, setMunicipios] = useState([]);
  const [tendencias, setTendencias] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarMunicipios();
  }, []);

  useEffect(() => {
    carregarTendencias();
  }, [municipio]);

  const carregarMunicipios = async () => {
    try {
      const res = await api.get('/municipios');
      setMunicipios(res.data.map(m => m.nome));
    } catch (err) {
      console.error('Erro ao carregar municípios:', err);
    }
  };

  const carregarTendencias = async () => {
    try {
      setLoading(true);
      const res = await api.get('/cfem/analise/tendencias', {
        params: { municipio }
      });
      setTendencias(res.data);
    } catch (err) {
      setErro('Erro ao carregar análise de tendências');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="card-header">Análise de Tendências</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Selecione um Município</label>
          <select
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {municipios.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {loading && <div className="flex justify-center"><div className="spinner"></div></div>}
        {erro && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{erro}</div>}

        {!loading && tendencias.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={tendencias}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${(value / 1e3).toFixed(2)}K`} />
              <Legend />
              <Line type="monotone" dataKey="valor_cfem" stroke="#8884d8" name="CFEM" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Estatísticas do Município */}
      {municipio && (
        <div className="card">
          <h2 className="card-header">Estatísticas - {municipio}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <div className="text-sm text-gray-600">Variação Média Anual</div>
              <div className="text-2xl font-bold text-blue-600">+5.2%</div>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <div className="text-sm text-gray-600">Melhor Ano</div>
              <div className="text-2xl font-bold text-green-600">2023</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analises;
