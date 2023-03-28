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

connect(); 

module.exports = { selectEmpresas, insertEmpresa }