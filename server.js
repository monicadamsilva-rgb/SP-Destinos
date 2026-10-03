const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Configurações da sua IA (Substitua pelos seus dados reais)
const API_KEY = "";
const AGENT_ENDPOINT = "?api-version=v1";

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Conexão com o agente Foundry (SkillForge AI)
    const response = await fetch(AGENT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY
      },
      body: JSON.stringify({
        input: message
      })
    });

    const data = await response.json();
    console.log("Resposta da IA recebida:", data);

    // Procura no array de output qual é o objeto do tipo 'message' (ignora os do tipo 'reasoning')
    const messageOutput = data?.output?.find(item => item.type === 'message');

    // Extrai o texto da resposta
    const resposta =
      messageOutput?.content?.[0]?.text ||
      "Não foi possível gerar uma resposta.";

    res.json({
      response: resposta
    });

  } catch (error) {
    console.error("Erro na requisição:", error);
    res.status(500).json({
      response: "Erro ao consultar a SkillForge AI."
    });
  }
});

app.listen(3000, () => {
  console.log("");
  console.log("🚀 Servidor Backend Online - SP Descubra");
  console.log("👉 URL: http://localhost:3000");
  console.log("📡 Aguardando mensagens do chat...");
  console.log("");
});
