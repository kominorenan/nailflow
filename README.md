# NailFlow

Protótipo estático do aplicativo NailFlow baseado no Documento Mestre v1.0.

## Como abrir

Abra o arquivo `index.html` no navegador.

## Como publicar temporariamente para testes

Em um terminal nesta pasta, rode:

```bash
node static-server.js
```

Em outro terminal, crie um túnel público:

```bash
npx cloudflared tunnel --url http://127.0.0.1:8080
```

O Cloudflare mostrará uma URL `trycloudflare.com`. Esse link fica ativo enquanto os dois processos estiverem rodando.

## O que está incluído

- Home operacional com métricas do dia e preview da IA no WhatsApp.
- Onboarding em 4 etapas: identidade, serviços, preview da IA e conexão do WhatsApp.
- Agenda inteligente com atendimentos, lista de espera e novo horário.
- Monitor da IA WhatsApp com conversas, tom de voz e regras de segurança.
- Financeiro invisível com "o que sobrou pra você" e calculadora de preço.
- Perfil público da profissional com serviços e chamada de agendamento.
- Clientes e reativação com mensagens sugeridas pela IA.
- Visão de operação interna com KPIs e alertas de CS/backoffice.
- Persistência local para contadores e conclusão do onboarding.

Esta versão não usa backend ainda. Os dados são simulados em `app.js` para validar experiência, linguagem e fluxo antes da implementação com React Native, Next.js, NestJS e Supabase.
