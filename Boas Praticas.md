# Boas práticas

## Regras gerais

Para ajudar na compreensão e facilitar a comunicação do time, devem-se adotar alguns padrões

1. Nomes de variável em português, sempre que possível, exceto convenções como useState, onChange etc...
2. Componentes simples, pequenos, fáceis de entender
3. Não usar funções complicadas
4. Não usar lógica complicada

## Nomenclatura de variáveis

```js
nomeVariavel //pascalCase
nomeEvento //pascalCase {onChange, onSubmit, etc.}
NomeComponente //CamelCase
```

Formulários devem começar com o prefixo `Tela`

TelaLogin
TelaPerfil
TelaConfiguracao

## Documentação e criação de Issues

Cada tarefa deve estar associada a uma issue, seja
- [ ]  🔴 Issue de correção / BUG
- [ ]  🔵 Issue de melhoria
- [ ]  🟢 Issue de requisito
- [ ]  🟣 Issue de UI, CSS, Estilo
- [ ]  ⚪ Issue de teste

A issue deve ter a documentação da tarefa, o que foi feito e onde buscar referências

## Testes

- [ ] Criar uma issue com a descrição do teste
- [ ] Criar uma issue para cada BUG, problema detectado
- [ ] Criar uma issue para cada sugestões / melhorias
- [ ] Criar uma issue para cada sugestões / ajuste no desing, CSS, folha de estilo etc
- [ ] Criar uma issue de mudança de requisito, quando solicitado pelo Product Owner

Dentro da issue é possível criar sub-issues com a descrição dos problemas. Esta é a forma ideal de organizar, e a tarefa de teste só deve ser encerrada quando todos os requisitos forem atendidos. O fechamento da issue de teste é responsabilidade do Líder.
