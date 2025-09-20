# Progressum

<p align="center">
<a href="https://github.com/progressumApp" target="_blank">
  <img width="300" height="300" alt="Progressum Logo" src="https://github.com/user-attachments/assets/a51a509d-4caa-4e16-a056-98674d069ef7" />
</a>
</p>

## Visão Geral

O **Progressum** é uma aplicação web desenvolvida em **Next.js 15 (App Router)** com **TypeScript** e **TailwindCSS**. O objetivo é permitir que o usuário acompanhe seu personagem, habilidades e progresso em diversas áreas da vida.

### Principais Funcionalidades

- Gerenciamento de personagem com **nome, nível, XP e moedas**.
- Criação, incremento e exclusão de **habilidades**.
- Persistência local de dados usando `localStorage`.
- Interface responsiva e interativa com animações (ex: confetti ao ganhar pontos).

---

## Estrutura do Projeto

```
├── app
│   ├── components         # Componentes reutilizáveis
│   │   ├── CharacterCard.tsx
│   │   ├── Header.tsx
│   │   └── Skills.tsx
│   ├── context            # Contextos globais
│   │   └── CharacterContext.tsx
│   ├── inventory
│   │   └── page.tsx       # Página do inventário
│   ├── layout.tsx         # Layout global da aplicação
│   ├── lib                # Funções utilitárias e tipos
│   │   ├── storage.ts
│   │   ├── types.ts
│   │   └── xp.ts
│   ├── page.tsx           # Página inicial (Home)
│   ├── providers.tsx      # Providers de contexto
│   └── store
│       └── page.tsx       # Página da loja
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public                 # Assets (imagens, ícones)
├── README.md
└── tsconfig.json
```

---

## Fluxo da Aplicação

### Página Inicial

- `app/page.tsx` é a home da aplicação.
- Renderiza:
  1. **Header** → mostrando moedas e navegação.
  2. **CharacterCard** → exibe nome, nível, XP e barra de progresso do personagem.
  3. **Skills** → lista de habilidades com gerenciamento de pontos.

### Layout Global

- `layout.tsx` define a **estrutura global da página**:
  - Fonts do Google (`Geist` e `Geist Mono`).
  - `Header` fixo.
  - `Providers` para contexto global.
  - Backgrounds decorativos com `clipPath` e blur.

---

## Contexto do Personagem (Ênfase Especial)

O **CharacterContext** é o **núcleo do estado da aplicação**, responsável por centralizar os dados do personagem e permitir que qualquer componente os acesse e modifique sem passar props manualmente.

### Arquivo

`app/context/CharacterContext.tsx`

### Objetivo

- Armazenar o estado do personagem (`Character`).
- Permitir leitura e atualização desse estado em qualquer componente.
- Garantir persistência local no `localStorage`.

### Tipagem

```ts
type CharacterContextType = {
  character: Character | null;
  setCharacter: (char: Character) => void;
};
```

### Inicialização

- Ao montar o `CharacterProvider`:
  1. Tenta carregar o personagem do `localStorage`.
  2. Se não existir, cria o personagem padrão:

```ts
{
  name: "Herói",
  level: 1,
  xp: 0,
  coins: 0,
  inventory: [],
}
```

- Sempre que `character` muda, salva no `localStorage`.

### Estrutura do Provider

```ts
export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const savedChar = loadData<Character>("character", { ... });
    setCharacter(savedChar);
  }, []);

  useEffect(() => {
    if (character) saveData("character", character);
  }, [character]);

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}
```

### Uso nos Componentes

```ts
const { character, setCharacter } = useCharacter();
```

- `character` → dados atuais do personagem.
- `setCharacter` → função para atualizar personagem.

### Exemplo de Fluxo de Dados

1. **Skills**:
   - Incrementa XP → chama `setCharacter(addXp(character, 10))`.
   - `CharacterContext` atualiza o estado global.
2. **Header** e **CharacterCard**:
   - Automaticamente recebem a atualização do contexto.
   - Atualizam moedas, XP e nível em tempo real.

### Diagrama Visual do Contexto

```text
+------------------+          +------------------+
|  CharacterCard   |          |      Header      |
+------------------+          +------------------+
          ^                          ^
          |                          |
          |                          |
          +----------+---------------+
                     |
             CharacterContext
                     |
          +------------------+
          |  Skills Component|
          +------------------+
                     |
                     v
               localStorage
```

- **Explicação**:
  - Qualquer alteração em `Skills` propaga automaticamente para o `CharacterContext`.
  - `CharacterCard` e `Header` reagem às mudanças em tempo real.
  - Persistência é garantida pelo `localStorage`.

---

## Componentes Principais

### CharacterCard

- Mostra nome, nível, XP, barra de progresso.
- Calcula progresso percentual:

```ts
const xpPercentage = Math.min((character.xp / getNextLevelXp(character.level)) * 100, 100);
```

### Header

- Menu de navegação.
- Mostra moedas do personagem.
- Responsivo:
  - Mobile → hamburguer (`Disclosure`).
  - Desktop → links horizontais.

### Skills

- Lista habilidades com progressos.
- Funções:
  - `handleAddSkill`
  - `handleAddPoint` → incrementa XP do personagem.
  - `handleRemovePoint`
  - `handleDeleteSkill`
- Persistência automática via `localStorage`.
- Animação de confetti ao adicionar ponto.

---

## Biblioteca / Funções Auxiliares

### storage.ts

- `saveData(key, value)` → salva no `localStorage`.
- `loadData(key, fallback)` → carrega do `localStorage` ou retorna fallback.

### xp.ts

- `xpTable` → XP necessário por nível.
- `addXp(character, amount)`:
  - Soma XP.
  - Atualiza nível e moedas quando necessário.

### types.ts

```ts
Character
Skill
StoreItem
```

---

## Fluxo Geral da Aplicação

```text
Page.tsx (Home)
 ├─ Header (mostra moedas)
 ├─ CharacterCard (mostra XP e nível)
 └─ Skills (modifica XP e habilidades)
      ↓
CharacterContext (centraliza o estado do personagem)
      ↓
localStorage (persistência automática)
```

---

## Próximos Passos / Roadmap

### Funcionalidades

- Categorias de habilidades.
- Animação de level-up.
- Armazenamento remoto (API/Firebase/Supabase).
- Loja funcional com moedas.

### Melhorias Técnicas

- Modularização de Skills.
- XP progress global.
- Testes unitários (`xp.ts`, Contexto).
- Extração de tipos globais.

### UI/UX

- Responsividade completa.
- Feedback visual aprimorado.
- Dark Mode toggle global.

### DevOps

- Configurar ESLint / Prettier.
- GitHub Actions para build/test.
- Deploy automático via Vercel.

---

## Considerações Finais

- O projeto é **modular, escalável e persistente**.
- O **CharacterContext** é a peça chave, permitindo integração perfeita entre páginas, componentes e persistência de dados.
- Próximos passos envolvem **melhorias de UX, expansão de funcionalidades e armazenamento remoto**.

```
```
