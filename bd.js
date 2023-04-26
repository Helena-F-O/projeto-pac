const mysql = require('mysql2/promise');

async function connect() { 
    if (global.connection && global.connection.state !== 'disconnected') 
    return global.connection; 
    const connection = await mysql.createConnection({ 
        host: 'localhost', 
        port: 3306, 
        user: 'root', 
        password: '', 
        database: 'crud1' 
    }); 
    console.log('Conectou no MySQL!'); 
    global.connection = connection; 
    return global.connection; 
} 

async function selectEmpresas() { 
    const conn = await connect(); 
    const [rows] = await conn.query('SELECT * FROM empresas;'); 
    return rows;
} 

async function insertEmpresa(empresa) { 
    const conn = await connect(); 
    const sql = "INSERT INTO empresas(id_empresa, nome, email, cnpj, telefone, patrimonio_liquido, receita_liquida, lucro_bruto, despesas_vga, pdi, da, resultado_financeiro, resultado_antes_impostos, impostos, lucro_liquido, caixa, divida, fco, fci, capex, fcf, pagamento_div_jscp, id_usu) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"; 
    return await conn.query(sql, [empresa.id_empresa, empresa.nome, empresa.email, empresa.cnpj, empresa.telefone, empresa.patrimonio_liquido, empresa.receita_liquida, empresa.lucro_bruto, empresa.despesas_vga, empresa.pdi, empresa.da, empresa.resultado_financeiro, empresa.resultado_antes_impostos, empresa.impostos, empresa.lucro_liquido, empresa.caixa, empresa.divida, empresa.fco, empresa.fci, empresa.capex, empresa.fcf, empresa.pagamento_div_jscp, empresa.id_usu]); 
} 

//Função de Margem - Lucro Bruto / Receita Líq.
function MLucBruRecLiq(num1, num2) {
    return lucro_bruto/receita_liquida;
}  

//Função de Margem - P&D/Lucro Bruto
function MPDLucBru(num1, num2) {
    return pdi/lucro_bruto;
} 

//Função de Margem - Margem - D&A/Lucro Bruto
function MDALucBru(num1, num2) {
    return da/lucro_bruto;
} 

//Função de EBITDA	
function EBITDA(num1, num2) {
    return lucro_liquido-impostos-despesas_financeiras-da;
} 

//Função de EBITDA/Receita Líq.	
function EBITDARecLiq(num1, num2) {
    const ebitida = EBITIDA
    return ebitida/receita_liquida;
} 

//Função de EBIT	
function EBIT(num1, num2) {
    return lucro_liquido-impostos-despesas_financeiras;
} 

//Função de EBIT/Receita Líq.
function EBITRecLiq(num1, num2) {
    const ebit = EBIT
    return ebit/receita_liquida;
} 

//Função de Despesas com Juros/EBIT
function DespEBIT(num1, num2) {
    const ebit = EBIT
    return despesas_financeiras/ebit;
} 

//Função de Margem de Lucro antes dos impostos
function MLucAntImp(num1, num2) {
    return resultado_antes_impostos/receita_liquida;
} 

//Função de Margem - Lucro Líq/Receita
function MLucLiqRec(num1, num2) {
    return lucro_liquido/receita_liquida;
} 

//Função de ROE
function ROE(num1, num2) {
    return lucro_liquido/patrimonio_liquido;
} 

//Função de Dívida Líquida/EBITDA
function DivLiqEBITIDA(num1, num2) {
    const sub = divida-caixa
    return sub/EBITIDA;
} 

//Função de FCT
function FCT(num1, num2) {
    return fco+fci+fcf
} 

//Função de FCL
function FCLCAPEX(num1, num2) {
    return fco+capex;
} 

//Função de Capex/FCO	
function CapexFCO(num1, num2) {
    return capex/fco;
} 

//Função de Capex/D&A	
function CapexDA(num1, num2) {
    return capex/da;
} 

//Função de Capex/Lucro Líq.
function CapexLucLiq(num1, num2) {
    return capex/lucro_liquido;
} 

//Função de Payout	
function Payout(num1, num2) {
    return pagamento_div_jscp/lucro_liquido;
} 

//Função de Tributos/Receita
function TribRec(num1, num2) {
    return impostos/receita_liquida;
} 

//Função de Tributos/Renda
function MLucBruRecLiq(num1, num2) {
    return impostos/resultado_antes_impostos;
} 

connect(); 

module.exports = { selectEmpresas, insertEmpresa }