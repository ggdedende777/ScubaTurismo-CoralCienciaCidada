/**
 * CORAL CIDADÃ – recebe os registros do app e grava na planilha e no Drive.
 *
 * COMO INSTALAR (uma vez):
 * 1. Na conta Google do projeto, crie uma planilha (ex.: "Scuba Ciência Cidadã – registros").
 * 2. Crie uma pasta no Google Drive para as fotos (ex.: "Scuba Ciência Cidadã – fotos").
 * 3. Na planilha: Extensões > Apps Script. Apague o que estiver lá e cole este arquivo inteiro.
 * 4. Configurações do projeto (engrenagem) > Propriedades do script > adicione:
 *      PLANILHA_ID = o código da planilha (o trecho da URL entre /d/ e /edit)
 *      PASTA_FOTOS_ID = o código da pasta (o trecho da URL depois de /folders/)
 * 5. Implantar > Nova implantação > tipo "App da Web".
 *      Executar como: Eu
 *      Quem pode acessar: Qualquer pessoa
 * 6. Autorize os acessos e copie a URL que termina em /exec.
 * 7. Cole essa URL em config.js, no campo SCRIPT_URL.
 *
 * As fotos ficam PRIVADAS na pasta do Drive (só a conta do projeto vê).
 * A coluna "validacao" é para a equipe marcar: validado, duvidoso ou descartado.
 */

var COLUNAS = [
  "id", "recebido_em", "criado_em", "data_local", "hora_local",
  "codigo_saida", "local", "atividade", "nome", "origem",
  "maior_de_idade", "aceite_termo",
  "especies_vi", "especies_acho_que_vi", "coral_branco",
  "temperatura_agua_c", "ceu", "vento", "mar", "visibilidade", "observacoes",
  "foto_equipe_envia", "foto_nome", "foto_drive_id", "foto_link",
  "navegador", "validacao"
];
var ABA = "Registros";

function config_() {
  var p = PropertiesService.getScriptProperties();
  return { planilha: p.getProperty("PLANILHA_ID"), pasta: p.getProperty("PASTA_FOTOS_ID") };
}

function aba_() {
  var ss = SpreadsheetApp.openById(config_().planilha);
  var sh = ss.getSheetByName(ABA) || ss.insertSheet(ABA);
  if (sh.getLastRow() === 0) {
    sh.appendRow(COLUNAS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
  }
  return sh;
}

function jaExiste_(sh, id) {
  if (sh.getLastRow() < 2) return false;
  var ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (ids[i][0] === id) return true;
  return false;
}

function salvarFoto_(r) {
  if (!r.foto_base64 || !config_().pasta) return { id: "", link: "" };
  var nome = [r.data_local, r.codigo_saida || "sem-codigo", r.id].join("_") + ".jpg";
  var blob = Utilities.newBlob(Utilities.base64Decode(r.foto_base64), "image/jpeg", nome);
  var arq = DriveApp.getFolderById(config_().pasta).createFile(blob);
  return { id: arq.getId(), link: arq.getUrl() };
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var r = JSON.parse(e.postData.contents);
    if (!r.id) throw new Error("registro sem id");
    var sh = aba_();
    if (jaExiste_(sh, r.id)) return resposta_({ ok: true, duplicado: true });

    var foto = salvarFoto_(r);
    r.recebido_em = new Date().toISOString();
    r.foto_drive_id = foto.id;
    r.foto_link = foto.link;
    r.validacao = "";

    sh.appendRow(COLUNAS.map(function (c) { return r[c] === undefined ? "" : r[c]; }));
    return resposta_({ ok: true });
  } catch (err) {
    return resposta_({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return resposta_({ ok: true, app: "Scuba Ciência Cidadã" });
}

function resposta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
