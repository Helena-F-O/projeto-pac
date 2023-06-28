var express = require('express');
var router = express.Router();

/*INDEX ->  ------------------------------------------------------------------------------------------------------*/
/* GET home page. */ 
router.get('/', async function (req, res) { 
  try { 
    const results = await global.db.selectEmpresas();
    console.log(results);
     res.render('index', { results });
  } catch (error) { 
    res.redirect('/?erro=' + error);
  } 
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*PERFIL ->  ------------------------------------------------------------------------------------------------------*/


/* GET dados page. */ 
router.get('/perfil', async function (req, res) { 
  try { 
    const results = await global.db.selectUsuarios();
    const contEmpresas = await global.db.selectCountEmpresas();
    console.log(results);
    console.log(contEmpresas);
    res.render('perfil', { results, contEmpresas });
  } catch (error) { 
    res.redirect('/?erro=' + error);
  } 
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*EDIT ->  ------------------------------------------------------------------------------------------------------*/
/*router.get('/editar', function(req, res, next) {
  res.render('editar', { title: "Editar Empresa", action: "/editar" })
})*/

// Rota para exibir os dados da loja
router.get('/editar', async function (req, res) { 
  try { 
    const results = await global.db.selectEmpresas();
    console.log(results);
     res.render('editar', { results });
  } catch (error) { 
    res.redirect('/?erro=' + error);
  } 
})

/* POST UPDATE */
router.post('/editar', async function(req, res, next) {
  const id_empresa = req.body.id_empresa
  const nome = req.body.nome
  const email = req.body.email
  const cnpj = req.body.cnpj
  const telefone = req.body.telefone
  const patrimonio_liquido = req.body.patrimonio_liquido
  const receita_liquida = req.body.receita_liquida
  const lucro_bruto = req.body.lucro_bruto
  const despesas_vga = req.body.despesas_vga
  const pdi = req.body.pdi
  const da = req.body.da
  const despesas_financeiras = req.body.despesas_financeiras
  const resultado_antes_impostos = req.body.resultado_antes_impostos
  const impostos = req.body.impostos
  const lucro_liquido = req.body.lucro_liquido
  const caixa = req.body.caixa
  const divida = req.body.divida
  const fco = req.body.fco
  const fci = req.body.fci
  const capex = req.body.capex
  const fcf = req.body.fcf
  const pagamento_div_jscp  = req.body.pagamento_div_jscp
  const id_usu = req.body.id_usu
  try { 
    await global.db.updateEmpresa({id_empresa, nome, email, cnpj, telefone, patrimonio_liquido, receita_liquida, lucro_bruto, despesas_vga, pdi, da, despesas_financeiras, resultado_financeiro, resultado_antes_impostos, impostos, lucro_liquido, caixa, divida, fco, fci, capex, fcf, pagamento_div_jscp, id_usu})
    res.redirect('/?editar=true'); 
  } catch (error) { 
    res.redirect('/?erro=' + error); 
  }
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*EXCLUIR ->  ------------------------------------------------------------------------------------------------------*/
router.get('/excluir', function(req, res, next) {
  res.render('excluir', { title: "Excluir", action: "/excluir" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*DASH ->  ------------------------------------------------------------------------------------------------------*/
/*router.get('/dash', async function (req, res) { 
  try { 
    const results = await global.db.selectEmpresas();
    console.log(results);
     res.render('dash', { results });
  } catch (error) { 
    res.redirect('/?erro=' + error);
  } 
})*/

router.get('/dash', async function (req, res) { 
  try { 
    const results = await global.db.selectEmpresas();
    console.log(results);

    const margem_rentabilidade = parseFloat((results[0].lucro_bruto/results[0].receita_liquida)*100).toFixed(0);
    const margem_custos_pesquisa_desenvolvimento = parseFloat((results[0].pdi/results[0].lucro_bruto)*100).toFixed(0);
    const margem_custos_depreciação_amortização = parseFloat((results[0].da/results[0].lucro_bruto)*100).toFixed(0);

    const EBITDACalc = parseFloat(results[0].lucro_liquido-results[0].impostos-results[0].despesas_financeiras-results[0].da).toFixed(2);
    const EBITCalc = parseFloat(results[0].lucro_liquido-results[0].impostos-results[0].despesas_financeiras).toFixed(2);

    const margem_medida_EBITDA = parseFloat(EBITDACalc/results[0].receita_liquida).toFixed(2);
    const margem_receita_total_lucro_operacional = parseFloat((EBITCalc/results[0].receita_liquida)*100).toFixed(0);
    const cobetura_juros = parseFloat((results[0].despesas_financeiras/EBITCalc)*100).toFixed(0);
    
    const margem_lucro_antes_impostos = parseFloat((results[0].resultado_antes_impostos/ results[0].receita_liquida)*100).toFixed(0);
    const margem_rentabilidade_liquida = parseFloat((results[0].lucro_liquido/ results[0].receita_liquida)*100).toFixed(0);
    const carga_tributaria = parseFloat((results[0].impostos/results[0].receita_liquida)*100).toFixed(0);
    const indice_carga_tributaria = parseFloat((results[0].impostos/results[0].resultado_antes_impostos)*100).toFixed(0);
    
    const ROE = parseFloat((results[0].lucro_liquido/results[0].patrimonio_liquido)*100).toFixed(0);
    const payout = parseFloat((results[0].pagamento_div_jscp/results[0].lucro_liquido)*100).toFixed(0);
    
   
    const valor_divida_EBITDA = parseFloat((results[0].divida-results[0].caixa)/EBITDACalc).toFixed(2).replace(".", ",");
    const FCT = parseFloat(results[0].fco+results[0].fci+results[0].fcf).toFixed(2).replace(".", ",");
    const fluxo_caixa_livre = parseFloat(results[0].fco+results[0].capex).toFixed(2).replace(".", ",");
    const proporção_investimentos = parseFloat(results[0].capex/results[0].fco).toFixed(2).replace(".", ",");
    const crescimento_empresa = parseFloat(results[0].capex/results[0].da).toFixed(2).replace(".", ",");
    const gasto_capital = parseFloat((results[0].capex/results[0].lucro_liquido)*100).toFixed(0);

    const EBITDA = EBITDACalc.replace(".", ",");
    const EBIT = EBITCalc.replace(".", ",");

    res.render('dash', { results, crescimento_empresa, proporção_investimentos, fluxo_caixa_livre, FCT, valor_divida_EBITDA, payout, ROE, indice_carga_tributaria, carga_tributaria, margem_rentabilidade_liquida, margem_lucro_antes_impostos, cobetura_juros, margem_receita_total_lucro_operacional, margem_medida_EBITDA, margem_custos_depreciação_amortização, margem_custos_pesquisa_desenvolvimento, margem_rentabilidade, gasto_capital, EBIT, EBITDA });
  } catch (error) { 
    res.redirect('/?erro=' + error);
  } 
})

/*SINGIN ->  ------------------------------------------------------------------------------------------------------*/
router.get('/singin', function(req, res, next) {
  res.render('singin', { title: "SingIn", action: "/singin" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*SINGUP ->  ------------------------------------------------------------------------------------------------------*/
router.get('/singup', function(req, res, next) {
  res.render('singup', { title: "SingUp", action: "/singup" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*NEW ->  ------------------------------------------------------------------------------------------------------*/
/* GET new page. */
router.get('/new', function(req, res, next) {
  res.render('new', { title: "Cadastro de Empresa", action: "/new" })
})


/* POST new page. */
router.post('/new', async function(req, res, next) {
  const id_empresa = req.body.id_empresa
  const nome = req.body.nome
  const email = req.body.email
  const cnpj = req.body.cnpj
  const telefone = req.body.telefone
  const patrimonio_liquido = req.body.patrimonio_liquido
  const receita_liquida = req.body.receita_liquida
  const lucro_bruto = req.body.lucro_bruto
  const despesas_vga = req.body.despesas_vga
  const pdi = req.body.pdi
  const da = req.body.da
  const despesas_financeiras = req.body.despesas_financeiras
  const resultado_antes_impostos = req.body.resultado_antes_impostos
  const impostos = req.body.impostos
  const lucro_liquido = req.body.lucro_liquido
  const caixa = req.body.caixa
  const divida = req.body.divida
  const fco = req.body.fco
  const fci = req.body.fci
  const capex = req.body.capex
  const fcf = req.body.fcf
  const pagamento_div_jscp  = req.body.pagamento_div_jscp
  const id_usu = req.body.id_usu
  try { 
    await global.db.insertEmpresa({id_empresa, nome, email, cnpj, telefone, patrimonio_liquido, receita_liquida, lucro_bruto, despesas_vga, pdi, da, despesas_financeiras, resultado_financeiro, resultado_antes_impostos, impostos, lucro_liquido, caixa, divida, fco, fci, capex, fcf, pagamento_div_jscp, id_usu})
    res.redirect('/?new=true'); 
  } catch (error) { 
    res.redirect('/?erro=' + error); 
  }
})

/*->  ------------------------------------------------------------------------------------------------------*/

module.exports = router;