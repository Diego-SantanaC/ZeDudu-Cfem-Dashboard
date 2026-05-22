-- Limpar dados existentes
TRUNCATE TABLE cfem_data CASCADE;
TRUNCATE TABLE municipios CASCADE;

-- Inserir municípios
INSERT INTO municipios (nome, uf, regiao, ativo) VALUES
('Parauapebas', 'PA', 'Carajás', true),
('Marabá', 'PA', 'Araguaia', true),
('Canaã dos Carajás', 'PA', 'Carajás', true),
('Curionópolis', 'PA', 'Carajás', true);

-- Dados de exemplo para demonstração
-- Parauapebas 2025
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Parauapebas', 2025, 1, 5234567.89, 'BRL', 'ANM' FROM municipios WHERE nome = 'Parauapebas';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Parauapebas', 2025, 2, 4856234.56, 'BRL', 'ANM' FROM municipios WHERE nome = 'Parauapebas';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Parauapebas', 2025, 3, 6123456.78, 'BRL', 'ANM' FROM municipios WHERE nome = 'Parauapebas';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Parauapebas', 2025, 4, 5678901.23, 'BRL', 'ANM' FROM municipios WHERE nome = 'Parauapebas';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Parauapebas', 2025, 5, 6234567.89, 'BRL', 'ANM' FROM municipios WHERE nome = 'Parauapebas';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Parauapebas', 2025, 6, 5901234.56, 'BRL', 'ANM' FROM municipios WHERE nome = 'Parauapebas';

-- Marabá 2025
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Marabá', 2025, 1, 3456789.12, 'BRL', 'ANM' FROM municipios WHERE nome = 'Marabá';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Marabá', 2025, 2, 3234567.89, 'BRL', 'ANM' FROM municipios WHERE nome = 'Marabá';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Marabá', 2025, 3, 3890123.45, 'BRL', 'ANM' FROM municipios WHERE nome = 'Marabá';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Marabá', 2025, 4, 3567890.12, 'BRL', 'ANM' FROM municipios WHERE nome = 'Marabá';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Marabá', 2025, 5, 3456789.12, 'BRL', 'ANM' FROM municipios WHERE nome = 'Marabá';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Marabá', 2025, 6, 3234567.89, 'BRL', 'ANM' FROM municipios WHERE nome = 'Marabá';

-- Canaã dos Carajás 2025
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Canaã dos Carajás', 2025, 1, 2345678.90, 'BRL', 'ANM' FROM municipios WHERE nome = 'Canaã dos Carajás';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Canaã dos Carajás', 2025, 2, 2456789.01, 'BRL', 'ANM' FROM municipios WHERE nome = 'Canaã dos Carajás';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Canaã dos Carajás', 2025, 3, 2567890.12, 'BRL', 'ANM' FROM municipios WHERE nome = 'Canaã dos Carajás';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Canaã dos Carajás', 2025, 4, 2456789.01, 'BRL', 'ANM' FROM municipios WHERE nome = 'Canaã dos Carajás';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Canaã dos Carajás', 2025, 5, 2345678.90, 'BRL', 'ANM' FROM municipios WHERE nome = 'Canaã dos Carajás';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Canaã dos Carajás', 2025, 6, 2567890.12, 'BRL', 'ANM' FROM municipios WHERE nome = 'Canaã dos Carajás';

-- Curionópolis 2025
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Curionópolis', 2025, 1, 1234567.89, 'BRL', 'ANM' FROM municipios WHERE nome = 'Curionópolis';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Curionópolis', 2025, 2, 1345678.90, 'BRL', 'ANM' FROM municipios WHERE nome = 'Curionópolis';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Curionópolis', 2025, 3, 1456789.01, 'BRL', 'ANM' FROM municipios WHERE nome = 'Curionópolis';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Curionópolis', 2025, 4, 1345678.90, 'BRL', 'ANM' FROM municipios WHERE nome = 'Curionópolis';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Curionópolis', 2025, 5, 1234567.89, 'BRL', 'ANM' FROM municipios WHERE nome = 'Curionópolis';
INSERT INTO cfem_data (municipio_id, municipio_nome, ano, mes, valor_cfem, moeda, fonte) 
SELECT id, 'Curionópolis', 2025, 6, 1456789.01, 'BRL', 'ANM' FROM municipios WHERE nome = 'Curionópolis';
