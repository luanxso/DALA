# TechParts — consulta de pedidos e lotes

Portal acadêmico de rastreabilidade, publicado em https://luanxso.github.io/DALA/.

## Como consultar

- Digite `TP-260902-041` (lote) ou `PED-1084` (pedido).
- Ambos identificam o mesmo acompanhamento disponível neste protótipo.
- Letras minúsculas e espaços nas extremidades são aceitos.
- Códigos incompletos ou desconhecidos não exibem o lote.
- Use **Consultar outro código** para voltar à busca. Os botões Voltar e Avançar do navegador também acompanham a navegação.

Link direto para o QR Code:

https://luanxso.github.io/DALA/?codigo=TP-260902-041

## Dados e limites

Os dados de exemplo ficam em `lib/lot-data.mjs`, e a consulta é resolvida em `lib/lot-lookup.mjs`. Existe um pedido com um lote nesta versão. Não há integração com uma empresa, autenticação nem banco de dados. Solicitações e documentos continuam sendo simulações locais.

O site e seus arquivos são públicos: a busca por código não é uma forma de autorização. Não coloque dados confidenciais de clientes neste catálogo. Uma versão real precisará consultar um serviço com controle de acesso.

## Desenvolvimento e publicação

Requisitos: Node.js 22.13 ou superior e pnpm 10.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm run build:pages
```

O resultado estático fica em `dist-pages/`. O caminho `/DALA/` é configurado em `vite.pages.config.ts`. A automação `.github/workflows/deploy-pages.yml` publica alterações da branch `main`; no GitHub, **Settings → Pages → Source** deve permanecer em **GitHub Actions**.

Os arquivos de entrada para o GitHub Pages são `index.html` e `src/github-pages.tsx`. Eles reutilizam o mesmo componente de aplicação e os mesmos estilos da versão Vinext.

TP-260902-041

