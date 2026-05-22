-- Create municipalities table
CREATE TABLE IF NOT EXISTS municipios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL UNIQUE,
  uf VARCHAR(2) NOT NULL DEFAULT 'PA',
  codigo_ibge VARCHAR(10),
  regiao VARCHAR(50),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create CFEM data table
CREATE TABLE IF NOT EXISTS cfem_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  municipio_id UUID NOT NULL,
  municipio_nome VARCHAR(100) NOT NULL,
  ano INTEGER NOT NULL,
  mes INTEGER NOT NULL CHECK (mes >= 1 AND mes <= 12),
  valor_cfem DECIMAL(15, 2) NOT NULL,
  moeda VARCHAR(3) DEFAULT 'BRL',
  fonte VARCHAR(255) DEFAULT 'ANM',
  data_coleta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (municipio_id) REFERENCES municipios(id) ON DELETE CASCADE,
  UNIQUE(municipio_id, ano, mes)
);

-- Create indexes for better query performance
CREATE INDEX idx_cfem_data_municipio_id ON cfem_data(municipio_id);
CREATE INDEX idx_cfem_data_ano_mes ON cfem_data(ano, mes);
CREATE INDEX idx_cfem_data_municipio_ano_mes ON cfem_data(municipio_nome, ano, mes);
CREATE INDEX idx_municipios_nome ON municipios(nome);

-- Insert default municipalities
INSERT INTO municipios (nome, uf, regiao, ativo) VALUES
('Parauapebas', 'PA', 'Carajás', true),
('Marabá', 'PA', 'Araguaia', true),
('Canaã dos Carajás', 'PA', 'Carajás', true),
('Curionópolis', 'PA', 'Carajás', true)
ON CONFLICT (nome) DO NOTHING;
