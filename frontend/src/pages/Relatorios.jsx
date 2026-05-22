import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import api from '../services/api';

function Relatorios() {
  const [loading, setLoading] = useState(false);
  const [municipio, setMunicipio] = useState('');
  const [ano, setAno] = useState('');
  const [municipios] = useState(['Parauapebas', 'Marabá', 'Canaã dos Carajás', 'Curionópolis']);
  const [mensagem, setMensagem] = useState('');

  const handleExportar = async (formato) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (municipio) params.append('municipio', municipio);
      if (ano) params.append('ano', ano);

      const endpoint = formato === 'csv' 
        ? `/relatorios/export/csv?${params}`
        : `/relatorios/export/pdf?${params}`;

      const response = await api.get(endpoint, {
        responseType: formato === 'csv' ? 'text' : 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `cfem_relatorio.${formato}`);
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);

      setMensagem(`Relatório ${formato.toUpperCase()} baixado com sucesso!`);
      setTimeout(() => setMensagem(''), 3000);
    } catch (error) {
      setMensagem('Erro ao baixar relatório');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="card-header">Gerar Relatórios</h2>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
            <select
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {Array.from({ length: 27 }, (_, i) => 2000 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mensagem de feedback */}
        {mensagem && (
          <div className={`mb-4 p-3 rounded text-sm ${
            mensagem.includes('sucesso') 
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {mensagem}
          </div>
        )}

        {/* Botões de Exportação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExportar('csv')}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
          >
            <FiDownload /> Exportar CSV
          </button>
          <button
            onClick={() => handleExportar('pdf')}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
          >
            <FiDownload /> Exportar PDF
          </button>
          <button
            onClick={() => window.print()}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            <FiDownload /> Imprimir
          </button>
        </div>
      </div>

      {/* Tipos de Relatório */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Relatório de Comparação</h3>
          <p className="text-gray-600 text-sm mb-4">Compare dados de CFEM entre municípios e períodos</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
            Gerar Relatório
          </button>
        </div>
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Relatório Anual</h3>
          <p className="text-gray-600 text-sm mb-4">Análise completa de arrecadação por ano</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  );
}

export default Relatorios;
