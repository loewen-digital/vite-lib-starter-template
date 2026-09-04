# my-lib

Placeholder name — rename throughout when creating a library from this template.

## Install

```bash
npm install my-lib
```

## Usage

```ts
import { greet } from 'my-lib';

greet('World'); // 'Hello, World!'
```

### Svelte adapter

```ts
import { createGreetStore } from 'my-lib/svelte';

const greeting = createGreetStore('World');
greeting.subscribe((value) => console.log(value)); // 'Hello, World!'
```

Framework adapters live in `src/adapters/<framework>.ts` and are published as
their own subpath export. Drop the `svelte` adapter if the library doesn't
need one, or add siblings (`src/adapters/react.ts` → `./react`) the same way.

## Exports

| Entry           | Description           |
| --------------- | --------------------- |
| `my-lib`        | Core library.         |
| `my-lib/svelte` | Svelte store adapter. |

## Development

```bash
npm run check   # tsc --noEmit
npm test        # vitest run
npm run build   # vite build -> dist/
npm run lint    # eslint + prettier --check
npm run format  # prettier --write
```

## Release procedure

1. `npm version <patch|minor|major>`
2. `git push --follow-tags`
3. Create a GitHub release from the new tag. This triggers
   `.github/workflows/publish.yml`, which builds and publishes to npm with
   provenance.

Publishing requires the `NPM_TOKEN` repository secret (an npm automation
token with publish rights), which must be added by Eddy.
