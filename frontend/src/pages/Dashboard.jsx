import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [resumo, setResumo] = useState(null);
  const [comparacaoAnual, setComparacaoAnual] = useState([]);
  const [top3Municipios, setTop3Municipios] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [resumoRes, comparacaoRes] = await Promise.all([
        api.get('/cfem/relatorio/resumo'),
        api.get('/cfem/comparacao/anual')
      ]);

      setResumo(resumoRes.data);
      setTop3Municipios(resumoRes.data.top_3_municipios);
      setComparacaoAnual(comparacaoRes.data);
    } catch (err) {
      setErro('Erro ao carregar dados do dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-96"><div className="spinner"></div></div>;
  if (erro) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{erro}</div>;
  if (!resumo) return <div>Nenhum dado disponível</div>;

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-blue-50">
          <div className="text-sm text-gray-600">Período</div>
          <div className="text-2xl font-bold text-blue-600">{resumo.periodo.inicio}-{resumo.periodo.fim}</div>
        </div>
        <div className="card bg-green-50">
          <div className="text-sm text-gray-600">Total Arrecadado</div>
          <div className="text-2xl font-bold text-green-600">R$ {(resumo.total_arrecadado / 1e6).toFixed(2)}M</div>
        </div>
        <div className="card bg-purple-50">
          <div className="text-sm text-gray-600">Municípios</div>
          <div className="text-2xl font-bold text-purple-600">{resumo.municipios_total}</div>
        </div>
        <div className="card bg-orange-50">
          <div className="text-sm text-gray-600">Média Mensal</div>
          <div className="text-2xl font-bold text-orange-600">R$ {(resumo.media_mensal / 1e3).toFixed(2)}K</div>
        </div>
      </div>

      {/* Top 3 Municípios */}
      <div className="card">
        <h2 className="card-header">Top 3 Municípios (Maior Arrecadação)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3Municipios.map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">#{item.posicao}</div>
              <div className="text-lg font-semibold text-gray-700">{item.municipio}</div>
              <div className="text-sm text-gray-600 mt-2">R$ {(item.total / 1e6).toFixed(2)}M</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de Comparação Anual */}
      <div className="card">
        <h2 className="card-header">Arrecadação por Ano (Total Geral)</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparacaoAnual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ano" />
            <YAxis />
            <Tooltip formatter={(value) => `R$ ${(value / 1e6).toFixed(2)}M`} />
            <Bar dataKey="total_anual" fill="#0088FE" name="Total Anual" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Pizza - Distribuição por Município */}
      {top3Municipios.length > 0 && (
        <div className="card">
          <h2 className="card-header">Distribuição de Arrecadação</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={top3Municipios}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.municipio} - R$ ${(entry.total / 1e6).toFixed(1)}M`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="total"
              >
                {top3Municipios.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${(value / 1e6).toFixed(2)}M`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
