# Checklist rapido de deploy

## Antes de desenvolver

- [ ] Estou na branch correta.
- [ ] Atualizei minha branch local.
- [ ] Criei uma branch para a mudanca.

## Antes de enviar para homologacao

- [ ] Rodei `node static-server.js`.
- [ ] Testei em `http://127.0.0.1:8080`.
- [ ] Testei desktop.
- [ ] Testei mobile.
- [ ] Revisei `git status`.
- [ ] Revisei `git diff`.
- [ ] Fiz commit com mensagem clara.
- [ ] Abri Pull Request para `develop`.

## Homologacao

- [ ] Deploy da branch `develop` finalizou.
- [ ] URL de homologacao abriu.
- [ ] Fluxos principais funcionam.
- [ ] Nao ha erro critico no console.
- [ ] Textos e imagens foram revisados.
- [ ] Aprovado para producao.

## Producao

- [ ] Pull Request de `develop` para `main` revisado.
- [ ] Homologacao aprovada.
- [ ] Merge feito em `main`.
- [ ] Deploy de producao finalizou.
- [ ] URL de producao abriu.
- [ ] Foi criada tag de versao.
- [ ] Existe plano de rollback.

