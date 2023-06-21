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


/* ->  ------------------------------------------------------------------------------------------------------*/

/*EXCLUIR ->  ------------------------------------------------------------------------------------------------------*/
router.get('/excluir', function(req, res, next) {
  res.render('excluir', { title: "Excluir", action: "/excluir" })
})
/* ->  ------------------------------------------------------------------------------------------------------*/

/*DASH ->  ------------------------------------------------------------------------------------------------------*/
router.get('/dash', async function (req, res) { 
  try { 
    const results = await global.db.selectEmpresas();
    console.log(results);
     res.render('dash', { results });
  } catch (error) { 
    res.redirect('/?erro=' + error);
  } 
})

/*router.get('/dash', async function (req, res) { 
  try { 
    const results = await global.db.selectEmpresas();
    console.log(results);

    const margem_rentabilidade = results[0].lucro_bruto/results[0].receita_liquida;
    const margem_custos_pesquisa_desenvolvimento = results[0].pdi/results[0].lucro_bruto;
    const margem_custos_depreciação_amortização = results[0].da/results[0].lucro_bruto;

    const EBITDA = results[0].lucro_liquido-results[0].impostos-results[0].despesas_financeiras-results[0].da;
    const EBIT = results[0].lucro_liquido-results[0].impostos-results[0].despesas_financeiras;

    const margem_medida_EBITDA = EBITDA/results[0].receita_liquida;
    const margem_receita_total_lucro_operacional = EBIT/results[0].receita_liquida;
    const cobetura_juros = results[0].despesas_financeiras/EBIT;
    
    const margem_lucro_antes_impostos = results[0].resultado_antes_impostos/ results[0].receita_liquida;
    const margem_rentabilidade_liquida = results[0].lucro_liquido/ results[0].receita_liquida;
    const carga_tributária = results[0].impostos/results[0].receita_liquida;
    const indice_carga_tributária = results[0].impostos/results[0].resultado_antes_impostos;
    
    const ROE = results[0].lucro_liquido/results[0].patrimonio_liquido;
    const payout = results[0].pagamento_div_jscp/results[0].lucro_liquido;
    
   
    const valor_divida_EBITDA = (results[0].divida-results[0].caixa)/EBITDA;
    const FCT = results[0].fco+results[0].fci+results[0].fcf;
    const FCL_CAPEX = results[0].fco+results[0].capex;
    const proporção_investimentos = results[0].capex/results[0].fco;
    const crescimento_empresa = results[0].capex/results[0].da;
    const gasto_capital = results[0].capex/results[0].lucro_liquido;

    res.render('dash', { results, crescimento_empresa, proporção_investimentos, FCL_CAPEX, FCT, valor_divida_EBITDA, payout, ROE, indice_carga_tributária, carga_tributária, margem_rentabilidade_liquida, margem_lucro_antes_impostos, cobetura_juros, margem_receita_total_lucro_operacional, margem_medida_EBITDA, margem_custos_depreciação_amortização, margem_custos_pesquisa_desenvolvimento, margem_rentabilidade, gasto_capital, EBIT, EBITDA });
  } catch (error) { 
    res.redirect('/?erro=' + error);
  } 
})*/

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