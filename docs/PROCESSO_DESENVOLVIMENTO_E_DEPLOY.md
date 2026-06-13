# NailFlow - Processo de desenvolvimento e deploy

Este documento define um fluxo simples para hoje, com uma pessoa desenvolvendo, mas preparado para crescer sem virar bagunca.

## Objetivo

Ter um caminho organizado para sair do desenvolvimento local, validar em homologacao na nuvem e publicar em producao com controle, historico e menor risco.

## Ambientes

### 1. Local

Uso: desenvolvimento diario na sua maquina.

Endereco comum:

```bash
http://127.0.0.1:8080
```

Como rodar:

```bash
node static-server.js
```

Regras:

- Tudo comeca localmente.
- Nenhuma mudanca deve ir direto para producao.
- Antes de subir para a nuvem, testar no navegador local.
- Alteracoes maiores devem ser feitas em branches separadas.

### 2. Homologacao

Uso: ambiente publico de teste antes da producao.

Sugestao de URL:

```text
https://homolog.nailflow.com.br
```

Regras:

- Homologacao recebe mudancas da branch `develop`.
- Serve para validar fluxo, textos, layout, bugs e experiencia.
- Pode ter dados falsos, dados de teste ou integracoes em modo sandbox.
- Nunca deve ser usada como ambiente oficial por clientes finais.

### 3. Producao

Uso: ambiente oficial para clientes reais.

Sugestao de URL:

```text
https://app.nailflow.com.br
```

Regras:

- Producao recebe somente mudancas aprovadas vindas da branch `main`.
- Deploy em producao deve ser intencional, documentado e reversivel.
- Dados reais exigem cuidado com LGPD, seguranca, backup e monitoramento.

## Estrategia de branches

Use um fluxo simples:

```text
main      -> producao
develop   -> homologacao
feature/* -> desenvolvimento de funcionalidades
fix/*     -> correcao de bugs
hotfix/*  -> correcao urgente em producao
```

Exemplos:

```bash
git checkout -b feature/onboarding-profissional
git checkout -b fix/agenda-mobile
git checkout -b hotfix/correcao-botao-agendar
```

## Fluxo local recomendado

1. Atualizar sua base local:

```bash
git checkout develop
git pull origin develop
```

2. Criar uma branch para a mudanca:

```bash
git checkout -b feature/nome-da-mudanca
```

3. Rodar o app local:

```bash
node static-server.js
```

4. Testar no navegador:

```text
http://127.0.0.1:8080
```

5. Revisar arquivos alterados:

```bash
git status
git diff
```

6. Salvar a mudanca:

```bash
git add .
git commit -m "Descreve a mudanca feita"
```

7. Enviar para o GitHub:

```bash
git push origin feature/nome-da-mudanca
```

8. Abrir Pull Request para `develop`.

## Fluxo de homologacao

1. Merge da branch `feature/*` em `develop`.
2. Deploy automatico da branch `develop` para homologacao.
3. Testar checklist de homologacao.
4. Corrigir problemas encontrados em novas branches.
5. Quando estiver aprovado, abrir Pull Request de `develop` para `main`.

Checklist minimo de homologacao:

- A pagina abre sem erro.
- Layout funciona em desktop.
- Layout funciona em celular.
- Navegacao principal funciona.
- Onboarding funciona ate o fim.
- Agenda abre e interacoes principais respondem.
- Financeiro abre e calculos visuais fazem sentido.
- Perfil publico abre corretamente.
- Console do navegador nao mostra erro critico.
- Textos principais estao revisados.

## Fluxo de producao

1. Abrir Pull Request de `develop` para `main`.
2. Revisar o que mudou.
3. Conferir checklist de producao.
4. Fazer merge em `main`.
5. Deploy automatico publica em producao.
6. Testar a URL final.
7. Registrar versao publicada.

Checklist minimo de producao:

- Homologacao foi aprovada.
- Nenhum dado de teste sensivel esta exposto.
- Links, imagens e assets carregam corretamente.
- Dominio e HTTPS estao ativos.
- Existe plano de rollback.
- Foi criada uma tag de versao.

Exemplo de tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

## Plataforma de deploy recomendada para agora

Como o app atual e estatico, a opcao mais simples e:

- GitHub para versionamento.
- Cloudflare Pages ou Netlify para deploy.
- Branch `develop` ligada ao ambiente de homologacao.
- Branch `main` ligada ao ambiente de producao.

Configuracao do build para o app atual:

```text
Build command: vazio
Output directory: .
Root directory: .
```

O arquivo principal e:

```text
index.html
```

## Processo na nuvem

### Passo 1 - Criar repositorio

Criar um repositorio no GitHub, por exemplo:

```text
nailflow-app
```

Depois conectar a pasta local:

```bash
git init
git branch -M main
git add .
git commit -m "Versao inicial do NailFlow"
git remote add origin git@github.com:SEU_USUARIO/nailflow-app.git
git push -u origin main
```

Criar a branch de homologacao:

```bash
git checkout -b develop
git push -u origin develop
```

### Passo 2 - Criar ambiente de homologacao

Na plataforma escolhida:

- Criar projeto conectado ao GitHub.
- Selecionar a branch `develop`.
- Configurar dominio `homolog.nailflow.com.br`.
- Deploy automatico a cada push em `develop`.

### Passo 3 - Criar ambiente de producao

Na plataforma escolhida:

- Criar outro projeto ou configurar ambiente de producao no mesmo projeto.
- Selecionar a branch `main`.
- Configurar dominio `app.nailflow.com.br` ou `nailflow.com.br`.
- Deploy automatico a cada merge em `main`.

## Regra de ouro

```text
local -> feature branch -> develop/homologacao -> main/producao
```

Nada deve pular essa ordem, exceto hotfix urgente.

## Como crescer sem desorganizar

Quando entrar mais gente:

- Todo trabalho deve acontecer em branch.
- Toda branch deve virar Pull Request.
- Ninguem faz push direto em `main`.
- `main` deve ser protegida no GitHub.
- Deploy de producao deve depender de merge aprovado.
- Bugs encontrados em producao devem virar issue.
- Mudancas maiores devem ter descricao curta do objetivo e impacto.

## Proximas evolucoes tecnicas

O app atual ainda e um prototipo estatico. Antes de operar com clientes reais, planejar:

- Migracao para frontend estruturado, como Next.js.
- Backend/API para agenda, clientes, financeiro e onboarding.
- Banco de dados, como Supabase.
- Autenticacao.
- Integracao oficial com WhatsApp Business.
- Logs e monitoramento.
- Politica de privacidade e adequacao LGPD.
- Backup e controle de acesso.

