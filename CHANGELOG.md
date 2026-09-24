# Changelog

## [1.14.2](https://github.com/lema-ufpb/lema-design-system/compare/v1.14.1...v1.14.2) (2026-09-24)


### 🐛 Bug Fixes

* **docs:** ignorar itens do registry sem files no build de docs ([a6e46a3](https://github.com/lema-ufpb/lema-design-system/commit/a6e46a3aa4bac3a94a9f30a4a624a63b733882f5))
* **docs:** skip registry items without files in component docs build ([8ff99b2](https://github.com/lema-ufpb/lema-design-system/commit/8ff99b21984281f62281d2af8c8d6131441d78cb))

## [1.14.1](https://github.com/lema-ufpb/lema-design-system/compare/v1.14.0...v1.14.1) (2026-09-24)


### 🐛 Bug Fixes

* **ci:** abrir PR em vez de push direto em develop no sync pós-release ([b19a722](https://github.com/lema-ufpb/lema-design-system/commit/b19a722a6db0630cd98dc20ddf5b6a7605b48a01))
* **ci:** ignore release-please generated CHANGELOG.md in prettier ([18864a0](https://github.com/lema-ufpb/lema-design-system/commit/18864a0ab1d0d9a8329c0934a0462922e8e63a59))
* **ci:** open PR instead of pushing to protected develop in post-release sync ([2f994e0](https://github.com/lema-ufpb/lema-design-system/commit/2f994e0f9231b1f567231649100011d9ab949852))

## [1.14.0](https://github.com/lema-ufpb/lema-design-system/compare/v1.13.0...v1.14.0) (2026-09-24)


### ✨ Features

* **design-system:** refresh introduction, update dependencies and sync registry ([d7400e2](https://github.com/lema-ufpb/lema-design-system/commit/d7400e2495366d994d5e886b874dd2d14a5dcaec))

## [1.13.0](https://github.com/lema-ufpb/lema-design-system/compare/v1.12.0...v1.13.0) (2026-09-24)


### ✨ Features

* **registry:** add namespaced dependency sync and validation tooling ([9f2e655](https://github.com/lema-ufpb/lema-design-system/commit/9f2e655460304a0a83811063d4cb4960145d45fd))


### 📚 Documentation

* **readme:** remove ds-sync CLI section and update project structure ([1eddb56](https://github.com/lema-ufpb/lema-design-system/commit/1eddb562dfa4f6018409dc657838cea7db345fc8))

## [1.12.0](https://github.com/lema-ufpb/lema-design-system/compare/v1.11.0...v1.12.0) (2026-09-22)


### ✨ Features

* **geomap-chart:** add optional zoom controls and full-screen expand ([65a00f7](https://github.com/lema-ufpb/lema-design-system/commit/65a00f739a57a55125eea2fe270ee00713faa217))


### 🐛 Bug Fixes

* **geomap-chart:** style features for react-simple-maps v5 states ([24f2b6f](https://github.com/lema-ufpb/lema-design-system/commit/24f2b6faa69262ae6d78f67089cd6ce1f755de34))
* **i18n:** normalize statusPage labels to sentence case ([5cf5d04](https://github.com/lema-ufpb/lema-design-system/commit/5cf5d04307ddbda8e32b3338aad5a7c9846b032f))


### 📚 Documentation

* **i18n:** translate pt-BR to en-US and document [@lema-ds](https://github.com/lema-ds) registry ([09384b4](https://github.com/lema-ufpb/lema-design-system/commit/09384b4a08d6f7ca7860067d026eb012bb9dbc66))

## [1.11.0](https://github.com/lema-ufpb/design-system/compare/v1.10.2...v1.11.0) (2026-09-14)

### ✨ Features

- add 14 ds components across media, charts, feedback, form and data-display ([4cae399](https://github.com/lema-ufpb/design-system/commit/4cae399fceb09f386f71cc2326671266579cec2d))
- **ds:** add 11 new interactive and motion components ([b4ba210](https://github.com/lema-ufpb/design-system/commit/b4ba210881b56a14596384e16c52b07f969e7dcb))
- **ds:** add 22 new design system components ([ecd6e79](https://github.com/lema-ufpb/design-system/commit/ecd6e79a27e7322dc34babb22bdb04584fe17807))
- **effects:** add star-shower pulsating star field ([e5fe13d](https://github.com/lema-ufpb/design-system/commit/e5fe13d40a438385cb3b1fb237d865702f63b59a))

### 🐛 Bug Fixes

- **a11y:** resolve axe violations for slider and combobox ([cc33abd](https://github.com/lema-ufpb/design-system/commit/cc33abd24dcca1c9953a82cda9cf64b54f4ad33c))
- **a11y:** resolve make test failures in cron-builder, location-picker, markdown-editor ([6e06921](https://github.com/lema-ufpb/design-system/commit/6e0692182169c0ad73398be625d4d1c541f23228))
- **ds:** replace raw Tailwind colors with semantic tokens ([1acba44](https://github.com/lema-ufpb/design-system/commit/1acba445ea038849256753d74eae3f4e6e37881b))
- **effects:** make meteor-shower visible in stories ([fb88334](https://github.com/lema-ufpb/design-system/commit/fb8833402fef9a940d9ee82aa2a7dcc1cf5f0012))
- **registry:** rewrite sibling relative imports to installed ds- basenames ([75fed54](https://github.com/lema-ufpb/design-system/commit/75fed54a9a212026bf83d94242564b0451b0384d))
- **scripts:** extend registry import rewriting to handle alias imports ([3184262](https://github.com/lema-ufpb/design-system/commit/31842620653e5d9cef4ce845d87db4d2bebade2d))
- **scroll-to-top:** show button by scroll threshold instead of direction ([4e03636](https://github.com/lema-ufpb/design-system/commit/4e03636b0a891c666333d35bd7651a77391d0a07))
- **ui:** update shadcn primitives combobox and slider ([9554051](https://github.com/lema-ufpb/design-system/commit/9554051b5d97c174bc8c85dc5ad34c972ad2c848))

### 📚 Documentation

- **app:** update introduction counts and category grids ([373a846](https://github.com/lema-ufpb/design-system/commit/373a846b6fc12e660c9763e32f671c233a82e3a2))
- **specs:** rename component specs to ds- prefix convention ([edbad9c](https://github.com/lema-ufpb/design-system/commit/edbad9c1eaf9c9057e873d5f5e1930c24cb85abb))
- sync counts and specs for star-shower ([ff6b681](https://github.com/lema-ufpb/design-system/commit/ff6b68198a0e851506fbf235de8b533d432c8cf5))

### ♻️ Refactor

- **ds:** update existing ds components and design tokens ([a2a5278](https://github.com/lema-ufpb/design-system/commit/a2a52785d5e0b299bf7dfcb3bd3d88766d61f998))

## [1.10.2](https://github.com/lema-ufpb/design-system/compare/v1.10.1...v1.10.2) (2026-09-07)

### 🐛 Bug Fixes

- **ci:** guard release-please auto-merge against version downgrades ([0c5d4e7](https://github.com/lema-ufpb/design-system/commit/0c5d4e7bf50bcc39fa1b582d8003e0084f487f01))
- **ci:** remove gh CLI dependency from release-please version guard ([3f46faf](https://github.com/lema-ufpb/design-system/commit/3f46faf067449104f861c327ae1cfdacd0bf3b93))
- **ci:** remove gh CLI dependency from release-please version guard ([85971ac](https://github.com/lema-ufpb/design-system/commit/85971acc2ba7ddcaf4645f35677da8b396c949ff))
- **ci:** remove release-please auto-merge, keep advisory version check ([f4d8885](https://github.com/lema-ufpb/design-system/commit/f4d88853453faaa5bcf94775df019c4448eab334))
- **ci:** remove release-please auto-merge, keep advisory version check ([2a6198b](https://github.com/lema-ufpb/design-system/commit/2a6198b8ccba1891e1bfa199f903a584009107a0))
- revert stale release PR [#122](https://github.com/lema-ufpb/design-system/issues/122) + guard auto-merge against downgrades ([df43382](https://github.com/lema-ufpb/design-system/commit/df43382056895bb3084fb5dd69769115aad31edb))
- revert stale release-please PR [#120](https://github.com/lema-ufpb/design-system/issues/120) that regressed main to 1.7.1 ([fab0534](https://github.com/lema-ufpb/design-system/commit/fab0534f3f55043b961469914567da0c34a3073e))

## [1.10.1](https://github.com/lema-ufpb/design-system/compare/v1.10.0...v1.10.1) (2026-09-07)

### 📚 Documentation

- **specs:** add missing ds specs for animated-number, border-beam, form-builder and scroll-reveal — 100% coverage for 261 ds components ([78824e9](https://github.com/lema-ufpb/design-system/commit/78824e9))
- **stories:** standardize Storybook docs to en-US Data API pattern (261 ds stories, accordion-style `component: [...].join("\n")` + Props table) ([e738ea0](https://github.com/lema-ufpb/design-system/commit/e738ea0))
- **docs:** refresh Introduction for 326 registry items (261 ds-* + 61 primitives + 4 libs) ([526402d](https://github.com/lema-ufpb/design-system/commit/526402d))

### 🐛 Bug Fixes

- **i18n:** translate pt-BR story docs to en-US (copy-block, date-picker, file-upload, multi-select, rating, timeline)

## [1.10.0](https://github.com/lema-ufpb/design-system/compare/v1.9.4...v1.10.0) (2026-09-06)

### ✨ Features

- **blocks:** add launch-ui-inspired marketing blocks ([519f4dd](https://github.com/lema-ufpb/design-system/commit/519f4dd5fe1f10f349bacfe18b1087a258bbd329))
- **effects:** add aceternity-inspired motion primitives ([9db763e](https://github.com/lema-ufpb/design-system/commit/9db763ea96eea337adf62e13cc63df40ef9f7665))
- **i18n:** add locale support to billing component ([295918f](https://github.com/lema-ufpb/design-system/commit/295918f4f732685bf9d3a28370c490358dfe95ad))
- **primitives:** add launch-ui-inspired utilities and layouts ([cdfb052](https://github.com/lema-ufpb/design-system/commit/cdfb052adc0330c4b1422dd99036eba8c0dac2af))
- **sidebar:** add shadcn-inspired dashboard shell blocks ([cb122ce](https://github.com/lema-ufpb/design-system/commit/cb122cefb67e5adffcc134e569a6df6d2bae91a3))

### 🐛 Bug Fixes

- **a11y:** resolve axe violations for keyboard and ARIA ([4d78c53](https://github.com/lema-ufpb/design-system/commit/4d78c53c9a92be8ff97ae06f05f75f81e280f5af))
- **ds:** comprehensive audit — a11y, theming, responsive and performance (11→18/20) ([63ebdba](https://github.com/lema-ufpb/design-system/commit/63ebdba78dd09688f95c949c2c89f93fd7c1fad0))
- **responsive:** align arbitrary values to design tokens ([6c095a2](https://github.com/lema-ufpb/design-system/commit/6c095a23fd274b74811c5667d21b5443f1af938a))
- **theming:** remove hardcoded colors and manual dark: overrides ([e5f722c](https://github.com/lema-ufpb/design-system/commit/e5f722c54c04ff80d90f85c5ac63329f5ceec291))

### ⚡ Performance

- **ds:** optimize image loading and correct pt-BR locale ([2241a12](https://github.com/lema-ufpb/design-system/commit/2241a120834039533edfa939a3e68d3b6e745df5))

### 📚 Documentation

- **specs:** add spec-driven docs for 56 missing components ([014a814](https://github.com/lema-ufpb/design-system/commit/014a814c1b26c4e8e9437299ea16b937c2623a25))
- sync introduction, agents, readme and specs index for 326 registry items ([a9af1d7](https://github.com/lema-ufpb/design-system/commit/a9af1d7f3a74f08464745ebfb183a53580aab667))

## [1.9.4](https://github.com/lema-ufpb/design-system/compare/v1.9.3...v1.9.4) (2026-09-04)

### 🐛 Bug Fixes

- **nginx:** remover exigência de token para baixar registro de componentes ([61746eb](https://github.com/lema-ufpb/design-system/commit/61746eb65a79ff131b9c7e7c80ecd75442d3711f))
- **nginx:** remover exigência de token para baixar registro de componentes ([a6ecac2](https://github.com/lema-ufpb/design-system/commit/a6ecac2b3e4775157e42a5b227fdc586ca8a396c))

## [1.9.3](https://github.com/lema-ufpb/design-system/compare/v1.9.2...v1.9.3) (2026-09-04)

- **nginx:** remover exigência de token para baixar registro de componentes ([61746eb](https://github.com/lema-ufpb/design-system/commit/61746eb65a79ff131b9c7e7c80ecd75442d3711f))
- **nginx:** remover exigência de token para baixar registro de componentes ([a6ecac2](https://github.com/lema-ufpb/design-system/commit/a6ecac2b3e4775157e42a5b227fdc586ca8a396c))

## [1.9.3](https://github.com/lema-ufpb/design-system/compare/v1.9.2...v1.9.3) (2026-09-04)

### 🐛 Bug Fixes

- **cd:** remover overlay dev inexistente no update-argocd ([a62e974](https://github.com/lema-ufpb/design-system/commit/a62e974b22c5ad01f992263b7ba22de0ec933884))
- **cd:** remover overlay dev inexistente no update-argocd ([04d6afd](https://github.com/lema-ufpb/design-system/commit/04d6afdc33fdfb486e5be19692c036668685d2bd))

## [1.9.2](https://github.com/lema-ufpb/design-system/compare/v1.9.1...v1.9.2) (2026-09-04)

### 🐛 Bug Fixes

- **cd:** instalar kustomize sem sudo no job update-argocd ([d5b352a](https://github.com/lema-ufpb/design-system/commit/d5b352a6734cd3beed2d83a02d456e7f87181b71))
- **cd:** instalar kustomize sem sudo no job update-argocd ([8b7a4be](https://github.com/lema-ufpb/design-system/commit/8b7a4be711305c41747e6ce8cb4ab592b57ca2ee))

## [1.9.1](https://github.com/lema-ufpb/design-system/compare/v1.9.0...v1.9.1) (2026-09-04)

### 🐛 Bug Fixes

- **cd:** rodar build-and-push no ubuntu-latest ([c3159d4](https://github.com/lema-ufpb/design-system/commit/c3159d431a8f7712569367c918d6e56a2155513c))
- **cd:** run build-and-push job on ubuntu-latest instead of self-hosted ([3cb8c6c](https://github.com/lema-ufpb/design-system/commit/3cb8c6c16518d4cd25b88be5a9587025d77846db))

## [1.9.0](https://github.com/lema-ufpb/design-system/compare/v1.8.0...v1.9.0) (2026-09-04)

### ✨ Features

- **components:** add copy-block, date-picker, file-upload, multi-select, rating and timeline ([c0bd30a](https://github.com/lema-ufpb/design-system/commit/c0bd30a96908b9cf1c90f6f4673c16335f389270))

### ♻️ Refactor

- **core:** update hooks, i18n and documentation ([e7bc465](https://github.com/lema-ufpb/design-system/commit/e7bc465262e87c06426c0165e1d3af3650d7f8fa))
- rename ds components registry items to include ds- prefix ([6b5e57d](https://github.com/lema-ufpb/design-system/commit/6b5e57d42d67cd6c7e80a38451f7f16c765df4bf))

## [1.8.0](https://github.com/lema-ufpb/design-system/compare/v1.7.1...v1.8.0) (2026-08-25)

### ✨ Features

- **data-table:** add support for manual sorting via sorting state ([738d9e3](https://github.com/lema-ufpb/design-system/commit/738d9e3371d327598f6580ebf4749bbe09f97a3a))

## [1.7.1](https://github.com/lema-ufpb/design-system/compare/v1.7.0...v1.7.1) (2026-08-20)

### 🐛 Bug Fixes

- **card-stat:** preserve locale when formatting percent values ([ceec83d](https://github.com/lema-ufpb/design-system/commit/ceec83df6d152020d26f6b1793e3c2bf45109159))

### 🧹 Chores

- release 1.7.1 ([0cadcbf](https://github.com/lema-ufpb/design-system/commit/0cadcbfb541bc5c8290554deed2587e005f04734))

## [1.7.0](https://github.com/lema-ufpb/design-system/compare/v1.6.4...v1.7.0) (2026-08-20)

### ✨ Features

- **charts:** size numeric axes to fit tick labels ([e74bc4d](https://github.com/lema-ufpb/design-system/commit/e74bc4db56b65e1a37d282b677fbd46794d683b5))
- **dashbox:** support render-function children ([32adb31](https://github.com/lema-ufpb/design-system/commit/32adb31f0f8dde2df089d23f1aa3ec6171c6670d))
- **questionnaire:** register Questionnaire shadcn primitive ([2a971ee](https://github.com/lema-ufpb/design-system/commit/2a971ee32405e843c7f4f9dafd09246a0f17716f))
- **score-row:** add row-level tooltip support ([336839e](https://github.com/lema-ufpb/design-system/commit/336839e8c04ef6277fe3db6f02bb441699e5047b))

### 🐛 Bug Fixes

- **a11y:** add accessible names to Slider thumb and Combobox buttons ([6560d44](https://github.com/lema-ufpb/design-system/commit/6560d44375906f6846c8904b63e31519ae3cfd40))
- **charts:** stabilize legend toggling and percent formatting ([ea3e8e9](https://github.com/lema-ufpb/design-system/commit/ea3e8e93b49a05f3774500d12536c68500b66d7d))
- **charts:** use string font sizes for polar and geo labels ([d83be95](https://github.com/lema-ufpb/design-system/commit/d83be95074ef45e3d869f0b3ab2e0804e5a27204))
- checkbox column ([54a36c6](https://github.com/lema-ufpb/design-system/commit/54a36c6d4d3f4a0da292357a08131fde2481d80c))
- **dashrow:** let children fill remaining row height ([57fbd9a](https://github.com/lema-ufpb/design-system/commit/57fbd9a69d9c24140492437e8cfcb8bf83df69eb))
- **data-table:** add toolbar padding and truncate header and cell text ([3d2fcf3](https://github.com/lema-ufpb/design-system/commit/3d2fcf355b9d2ac06504e6e0a117dbd3926fad4f))
- **deps:** align dependabot.yml with actual pinning intent ([02da735](https://github.com/lema-ufpb/design-system/commit/02da7354dca17192b8a65a1492f67ce74232a47f))
- **deps:** resolve npm audit vulnerabilities and sync Storybook family ([01511b6](https://github.com/lema-ufpb/design-system/commit/01511b6b041fc12bc523cba171eabc552734d606))
- **ds-slider:** prevent drag propagation in vaul drawers ([90650fa](https://github.com/lema-ufpb/design-system/commit/90650fa2ff21c79497d8d1b1e727c8cca0866b37))
- **hooks:** avoid setState-in-effect in useIsMobile ([ffd86f2](https://github.com/lema-ufpb/design-system/commit/ffd86f28c4561cc4d7e7e6b4b78612be503de588))
- **ui:** show focus ring on field-label container for wrapped controls ([94cd620](https://github.com/lema-ufpb/design-system/commit/94cd62034de309ed98482f89992740ebb2ed0ff9))

### ♻️ Refactor

- **card:** default card-stat components to size sm ([58379c3](https://github.com/lema-ufpb/design-system/commit/58379c308be53fb68b70db99d7a90165182f0fb0))
- **data-table:** migrate to TanStack Table v9 API ([dc957c3](https://github.com/lema-ufpb/design-system/commit/dc957c3b3ef74d7edf966ea024f7c86074cff182))

## [1.6.4](https://github.com/lema-ufpb/design-system/compare/v1.6.3...v1.6.4) (2026-07-20)

- **a11y:** add accessible names to Slider thumb and Combobox buttons ([6560d44](https://github.com/lema-ufpb/design-system/commit/6560d44375906f6846c8904b63e31519ae3cfd40))
- **charts:** stabilize legend toggling and percent formatting ([ea3e8e9](https://github.com/lema-ufpb/design-system/commit/ea3e8e93b49a05f3774500d12536c68500b66d7d))
- **charts:** use string font sizes for polar and geo labels ([d83be95](https://github.com/lema-ufpb/design-system/commit/d83be95074ef45e3d869f0b3ab2e0804e5a27204))
- checkbox column ([54a36c6](https://github.com/lema-ufpb/design-system/commit/54a36c6d4d3f4a0da292357a08131fde2481d80c))
- **dashrow:** let children fill remaining row height ([57fbd9a](https://github.com/lema-ufpb/design-system/commit/57fbd9a69d9c24140492437e8cfcb8bf83df69eb))
- **data-table:** add toolbar padding and truncate header and cell text ([3d2fcf3](https://github.com/lema-ufpb/design-system/commit/3d2fcf355b9d2ac06504e6e0a117dbd3926fad4f))
- **deps:** align dependabot.yml with actual pinning intent ([02da735](https://github.com/lema-ufpb/design-system/commit/02da7354dca17192b8a65a1492f67ce74232a47f))
- **deps:** resolve npm audit vulnerabilities and sync Storybook family ([01511b6](https://github.com/lema-ufpb/design-system/commit/01511b6b041fc12bc523cba171eabc552734d606))
- **ds-slider:** prevent drag propagation in vaul drawers ([90650fa](https://github.com/lema-ufpb/design-system/commit/90650fa2ff21c79497d8d1b1e727c8cca0866b37))
- **hooks:** avoid setState-in-effect in useIsMobile ([ffd86f2](https://github.com/lema-ufpb/design-system/commit/ffd86f28c4561cc4d7e7e6b4b78612be503de588))
- **ui:** show focus ring on field-label container for wrapped controls ([94cd620](https://github.com/lema-ufpb/design-system/commit/94cd62034de309ed98482f89992740ebb2ed0ff9))

### ♻️ Refactor

- **card:** default card-stat components to size sm ([58379c3](https://github.com/lema-ufpb/design-system/commit/58379c308be53fb68b70db99d7a90165182f0fb0))
- **data-table:** migrate to TanStack Table v9 API ([dc957c3](https://github.com/lema-ufpb/design-system/commit/dc957c3b3ef74d7edf966ea024f7c86074cff182))

## [1.6.4](https://github.com/lema-ufpb/design-system/compare/v1.6.3...v1.6.4) (2026-07-20)

### 🐛 Bug Fixes

- update ([7e5dcc8](https://github.com/lema-ufpb/design-system/commit/7e5dcc8a4639d73bef72df3b089fccaf151039c8))

## [1.6.3](https://github.com/lema-ufpb/design-system/compare/v1.6.2...v1.6.3) (2026-07-20)

- update ([7e5dcc8](https://github.com/lema-ufpb/design-system/commit/7e5dcc8a4639d73bef72df3b089fccaf151039c8))

## [1.6.3](https://github.com/lema-ufpb/design-system/compare/v1.6.2...v1.6.3) (2026-07-20)

### 🐛 Bug Fixes

- update ([fd2a3ec](https://github.com/lema-ufpb/design-system/commit/fd2a3ec50467a9c6fefa78b29a9902b233d6f7c9))

## [1.6.2](https://github.com/lema-ufpb/design-system/compare/v1.6.1...v1.6.2) (2026-07-20)

### 🐛 Bug Fixes

- resolve lint errors, contrast issues, and design audit findings ([5fee73a](https://github.com/lema-ufpb/design-system/commit/5fee73a084bab20ce5ce9f5e71d0cbb9e858d986))
- resolve test and lint errors, update workflows security and cleanup ([4221344](https://github.com/lema-ufpb/design-system/commit/422134457e03be4027768798174a974c029d7453))

## [1.6.1](https://github.com/lema-ufpb/design-system/compare/v1.6.0...v1.6.1) (2026-07-07)

### 🐛 Bug Fixes

- **a11y:** add accessible names to form controls, sliders, comboboxes, charts, and progress bars ([c284601](https://github.com/lema-ufpb/design-system/commit/c284601402a19b67978ea1cb0582ed0cd7013efc))
- **ds:** resolve lint and test errors by installing missing dependencies ([480637c](https://github.com/lema-ufpb/design-system/commit/480637c8f884f19316921ea62e596a94f561c85b))

## [1.6.0](https://github.com/lema-ufpb/design-system/compare/v1.5.1...v1.6.0) (2026-07-03)

### ✨ Features

- **ui:** add chat primitives — Attachment, Bubble, Marker, Message, MessageScroller ([e759df5](https://github.com/lema-ufpb/design-system/commit/e759df51739ca47e594911c4b135e8524b31fb0f)), closes [#56](https://github.com/lema-ufpb/design-system/issues/56)

### 🐛 Bug Fixes

- **ds:** remove raw Tailwind colors, arbitrary radius/icon overrides and manual dark: variants ([675cd2d](https://github.com/lema-ufpb/design-system/commit/675cd2deca5072799adb72ab24fcbc20872c25a7))
- **ds:** resolve audit issues — group names, a11y, arbitrary values, z-index ([1c1a05a](https://github.com/lema-ufpb/design-system/commit/1c1a05a268170ba3c3cde2855f32a2140f430670)), closes [#56](https://github.com/lema-ufpb/design-system/issues/56)
- **theme:** add missing size-15/25/30/50 tokens to globals.css ([ea70f6d](https://github.com/lema-ufpb/design-system/commit/ea70f6d6b594c5bfc550d2849313a0e9cae5858f))

### ♻️ Refactor

- **ds:** modal, progress-circular, card-stats, and component polish ([30b76d2](https://github.com/lema-ufpb/design-system/commit/30b76d2e5d9fee9d7644cae698d212d22215d50b)), closes [#56](https://github.com/lema-ufpb/design-system/issues/56)
- **ds:** use semantic CSS variables for candlestick colors ([6b3c2f4](https://github.com/lema-ufpb/design-system/commit/6b3c2f4630e46dc599a44b9a33054935fed5f55c)), closes [#56](https://github.com/lema-ufpb/design-system/issues/56)

## [1.5.1](https://github.com/lema-ufpb/design-system/compare/v1.5.0...v1.5.1) (2026-06-24)

### 🧹 Chores

- release 1.5.1 ([993aa6f](https://github.com/lema-ufpb/design-system/commit/993aa6f6fe8914572e8dfd61cd2a335daa3ed0af))

## [1.5.0](https://github.com/lema-ufpb/design-system/compare/v1.4.0...v1.5.0) (2026-06-24)

### ✨ Features

- **scripts:** add machine-readable component documentation generator ([9914e5e](https://github.com/lema-ufpb/design-system/commit/9914e5e7c2994c3db0c5ea159228d56c102972bc)), closes [#47](https://github.com/lema-ufpb/design-system/issues/47)
- **ui:** add new props and type improvements to ds-* components ([a0119c5](https://github.com/lema-ufpb/design-system/commit/a0119c5f3b8fef539807b273f0c25ce79a3de6b9))

### 🐛 Bug Fixes

- address review issues — add build-docs to .PHONY, restrict /docs/ location to specific file ([c84367d](https://github.com/lema-ufpb/design-system/commit/c84367d96f286c6f228c4ffe3c5b072c318b4850))
- remove stale .agents references from README, consolidate docs generation in Dockerfile ([2e5d584](https://github.com/lema-ufpb/design-system/commit/2e5d584e55ea6cbc0f1617242b4d760e59b80c6c))

### 📚 Documentation

- **project:** add critical rule forbidding manual edits to shadcn primitives ([bf64b96](https://github.com/lema-ufpb/design-system/commit/bf64b96fc9a88a13da730d5092ed086e4a3548c9))
- remove references to removed .claude and .agents directories ([9fe6a2f](https://github.com/lema-ufpb/design-system/commit/9fe6a2fd7d5f8b84a1886bd64be8f1a15e14e8a5))
- update component descriptions in Introduction.mdx and README.md ([c482555](https://github.com/lema-ufpb/design-system/commit/c4825555d6b995254e922ab0f8c49a86427a9320))

## [1.4.0](https://github.com/lema-ufpb/design-system/compare/v1.3.0...v1.4.0) (2026-06-22)

### ✨ Features

- **ui:** add ds-accordion, ds-avatar, ds-badge, ds-carousel, ds-empty, ds-input, ds-slider, ds-switch, ds-select, ds-button, ds-tabs wrapper components ([f80a7eb](https://github.com/lema-ufpb/design-system/commit/f80a7eb4f600472dd90120c04cf3d04ace140771))

### 📚 Documentation

- update AGENTS.md and design-system skill with Storybook documentation standards ([ac8bc7e](https://github.com/lema-ufpb/design-system/commit/ac8bc7ed0e9b4a154033b6ceffac4a72d6486ae9))
- update README and Introduction.mdx with new component listings ([f80a7eb](https://github.com/lema-ufpb/design-system/commit/f80a7eb4f600472dd90120c04cf3d04ace140771))

## [1.3.0](https://github.com/lema-ufpb/design-system/compare/v1.2.0...v1.3.0) (2026-06-22)

### ✨ Features

- **button:** add DS Button component with loading, confirm, and tooltip ([bfe250c](https://github.com/lema-ufpb/design-system/commit/bfe250cf94be5a09ba9647616a3e729104661909))
- **pagination:** add rounded variant and plumb through data-table ([f314057](https://github.com/lema-ufpb/design-system/commit/f31405726fdb7ebe590e708f7f7b0f7be941ec2b))
- **scroll-to-top:** add ScrollToTop component with progress ring, variant, and i18n support ([513ea89](https://github.com/lema-ufpb/design-system/commit/513ea8950dcb8d0840df0e6f4ad6876b6d3c3c00))
- **tabs:** add DS Tabs component with responsive accordion fallback ([a9dfb08](https://github.com/lema-ufpb/design-system/commit/a9dfb084717a43f56fc22fca6bfbac4532c18c0a))

### 🐛 Bug Fixes

- **ci:** extract PR number from release-please output ([dcf5f82](https://github.com/lema-ufpb/design-system/commit/dcf5f82eb47eac406a331c5f2b621b4520701802))
- **ci:** replace gh pr merge with GitHub API merge endpoint ([301c607](https://github.com/lema-ufpb/design-system/commit/301c607b10d269736ebff7278c2d7913c866f927))
- **pagination:** use default variant for active page button ([3ef6a26](https://github.com/lema-ufpb/design-system/commit/3ef6a262fea0a5ef8bfb95484c42c7fb2abe7b98))

### 📚 Documentation

- add Data API documentation, reclassify Storybook titles, update README ([ee24054](https://github.com/lema-ufpb/design-system/commit/ee24054b77aa28b3b0968551d072a67037db3c73))
- update specs, README, and Introduction for refactored components and ScrollToTop ([5cfa257](https://github.com/lema-ufpb/design-system/commit/5cfa25706f161c1b6903f4d32933c28472a08b12))

### ♻️ Refactor

- **counter, progress-bar:** replace custom primitives with ui/Button and ui/Progress ([0da3b90](https://github.com/lema-ufpb/design-system/commit/0da3b90ebdf6ce46b4316dc2fdfb0f63b367ebfd))
- **footer-menu, search-bar, drawer:** delegate to ui/accordion, ui/Input, ui/DrawerContent ([d0eafb8](https://github.com/lema-ufpb/design-system/commit/d0eafb81cbc8b784f9d6647d9103e06e6f6b074e))
- **toggle-theme, carousel, scatter-chart, treemap-chart:** replace useEffect patterns with useSyncExternalStore or render-phase setState ([9cfc212](https://github.com/lema-ufpb/design-system/commit/9cfc21260e79d86424e668361415e11ad0df0f85))

## [1.2.0](https://github.com/lema-ufpb/design-system/compare/v1.1.0...v1.2.0) (2026-06-20)

### ✨ Features

- **theme:** add dedicated theme provider module with useTheme export ([921eb36](https://github.com/lema-ufpb/design-system/commit/921eb36c92bc4ac21690454d25eba330fb31db6d))

### 🐛 Bug Fixes

- **lint:** resolve set-state-in-effect rule violations ([90ec17a](https://github.com/lema-ufpb/design-system/commit/90ec17a6defe2dd9002711e88bf259ca85bf992f))

### 📚 Documentation

- update skill, specs, templates, readme, and introduction ([05c4a3c](https://github.com/lema-ufpb/design-system/commit/05c4a3c0fef26fdcf4d3439de7a585f87cb066db))

### ♻️ Refactor

- **card-stats:** extract shared module to lib/ with individual registry entries ([4c71d24](https://github.com/lema-ufpb/design-system/commit/4c71d24bb7e664ce308514ebffa818eb4d77d6be))

## [1.1.0](https://github.com/lema-ufpb/design-system/compare/v1.0.2...v1.1.0) (2026-06-20)

### ✨ Features

- **card-icon:** add CardIcon component with tone, media style, and size variants ([4036177](https://github.com/lema-ufpb/design-system/commit/403617729ca9517eb56add1c4ad716986e05429b))
- **components:** rename custom directory to ds ([59c35a2](https://github.com/lema-ufpb/design-system/commit/59c35a22e0c073bdf8748649648b55418c01d595))
- **data-table:** add manualPagination with external page/pageCount/pageIndex control ([18eeb50](https://github.com/lema-ufpb/design-system/commit/18eeb50c4d7228896de38105af994548e54aa984))
- **format-utils:** add centralized number formatting and integrate across chart/stat components ([b1f58b0](https://github.com/lema-ufpb/design-system/commit/b1f58b0495dea99a6894ee6837c0899724915fb3))
- **spinner:** add CVA variants with tone, size scale, thickness, and label support ([bd27d97](https://github.com/lema-ufpb/design-system/commit/bd27d97d578b8617d8c63c8f0523d303a787d36d))
- **toggle-theme:** migrate from labels prop to centralized UI_I18N ([3042dfb](https://github.com/lema-ufpb/design-system/commit/3042dfb70a0a72a261f29ce3a2a28ca6338e8273))

### 🐛 Bug Fixes

- **ui:** improve accessibility and text contrast in card-stat and pill-group ([b5364f4](https://github.com/lema-ufpb/design-system/commit/b5364f42553524253ebe8c2d06460d2a7dc3580e))

### 📚 Documentation

- **introduction:** update references for custom-to-ds and lema-ds-to-ds ([d988eb4](https://github.com/lema-ufpb/design-system/commit/d988eb4576ff66d7ddb06457339e798011688374))
- **readme:** update for custom-to-ds and lema-ds-to-ds ([0e6d1f4](https://github.com/lema-ufpb/design-system/commit/0e6d1f4098fa3638cd343f64ab44e2fc37ceadf4))

### ♻️ Refactor

- **specs:** rename and update for custom-to-ds migration ([5bc8e43](https://github.com/lema-ufpb/design-system/commit/5bc8e4365924b044ef8697ab31167e28815576d6))

## [2.0.0](https://github.com/lema-ufpb/design-system/compare/v1.0.1...v2.0.0) (2026-05-29)

### ⚠ BREAKING CHANGES

- **search-combo:** flatten multi-file directory into single-file

### ✨ Features

- **card-stat-highlight:** add white variant with bg-white text-foreground ([83ef88f](https://github.com/lema-ufpb/design-system/commit/83ef88f07fff59df73f60774bf6d2bcf6c9b8b2a))
- **card-stats-shared:** add shared CVA variants, migrate TrendBadge, remove deprecated SIZE object ([db93ff6](https://github.com/lema-ufpb/design-system/commit/db93ff616acb46fdc500fc421820bab9b777a04c))
- **data-table:** add sticky columns, selection, and square border stories ([b2cc9a2](https://github.com/lema-ufpb/design-system/commit/b2cc9a2931875214fa29daa07cc8239c06c80087))
- **registry:** redirect all custom component targets to components/ui/ ([2b440e7](https://github.com/lema-ufpb/design-system/commit/2b440e79cb7127e225688eb11ab18cfd33e3cab2))
- **registry:** redirect all custom component targets to components/ui/ ([c05a416](https://github.com/lema-ufpb/design-system/commit/c05a41681ecd3717d371e975ab37e6687f78ad1c))
- **score-row:** add component with percentDecimals, locale-aware percent, title tooltip, and registry entry ([0809b6e](https://github.com/lema-ufpb/design-system/commit/0809b6e3d01aa64e9781c20a9b3a8a146061bcb5))
- **search-bar:** add search bar component with voice, debounce, i18n ([d36b770](https://github.com/lema-ufpb/design-system/commit/d36b7700c39790c5584c0281b831d2f764b139a7))

### 🐛 Bug Fixes

- **card-stat-highlight:** export and rename variant, use semantic tokens, fix trackH scale ([bc9a0f7](https://github.com/lema-ufpb/design-system/commit/bc9a0f708a7c6f9440d4f48c072741311ed8d41a))
- **card-stat:** export local CVA variants, add icon size CVA for trend/badge icons, cleanup skeleton overlay ([7eb42fe](https://github.com/lema-ufpb/design-system/commit/7eb42fe65a3578dde8f80b9dffd825ef228408f9))
- **card-stat:** remove redundant font-semibold from TrendBadge ([b137088](https://github.com/lema-ufpb/design-system/commit/b13708889bf7e1b930b7b13ea07c7a73902db36f))
- **card-stat:** resolve review issues from PR [#29](https://github.com/lema-ufpb/design-system/issues/29) ([53ae743](https://github.com/lema-ufpb/design-system/commit/53ae743e0fab4b72ceba7eaf737920a229c0db5e))
- **card-stats:** apply design system review feedback ([7d183d9](https://github.com/lema-ufpb/design-system/commit/7d183d9c910f4e6b4b800d9daa862c41b72493c6))
- **combobox:** add aria-label and aria-labelledby props to trigger ([b1854af](https://github.com/lema-ufpb/design-system/commit/b1854afbe85b6e5c45de0da135e2dde997f59d9d))
- **data-table:** add data-slot attribute to root and use font-medium for column headers ([e13f3fd](https://github.com/lema-ufpb/design-system/commit/e13f3fdcc9bf55426ffe64b4d622b8dd6b6d6917))
- **data-table:** prevent sticky column overlap on horizontal scroll and add rounded prop ([000d056](https://github.com/lema-ufpb/design-system/commit/000d056566d9d6ff2b73c4d44373c0d7de257b26))
- replace -space-x-2 with [&&gt;:not(:first-child)]:-ml-2 in AvatarGroup and fix lg fallback scale ([7a383e7](https://github.com/lema-ufpb/design-system/commit/7a383e7cca293c01d960dfb6bbcd52b1f07b8890))
- revert wrap-break-word to break-words (valid Tailwind v4 class) ([580fd90](https://github.com/lema-ufpb/design-system/commit/580fd9013574d8658811283a7aa5ec873ef8ca9f))
- **score-row:** add data-slot attrs, motion-safe transitions, and fix progress height scale ([767e76c](https://github.com/lema-ufpb/design-system/commit/767e76c8e9e18408ae0727bf02703358edc65eb6))
- **score-row:** align description skeleton heights with font-size ([9beb493](https://github.com/lema-ufpb/design-system/commit/9beb493e8dc8976034bf4548d014ea635a034e36))
- **score-row:** use text-warning token, fix skeleton dimensions, update stories default and spec ([8e2412d](https://github.com/lema-ufpb/design-system/commit/8e2412d258e1758b932f673fcfc7b361bcb7e2a8))

### ⚡ Performance

- **use-speech-recognition:** use useSyncExternalStore for isSupported ([dd1cfb9](https://github.com/lema-ufpb/design-system/commit/dd1cfb9fac39f6a22459cc352f36d72b6a60725e))

### 📚 Documentation

- add CLI consumption guide for @lema-ufpb/ds-sync ([fef2d00](https://github.com/lema-ufpb/design-system/commit/fef2d00ef0f8bdaf69274a8274e0954fdd9d253c))
- **avatar:** align lg fallback scale in behaviors table with canonical scale ([873cac2](https://github.com/lema-ufpb/design-system/commit/873cac24d8fbfbf71786f5fabc3dfe558bd6254b))
- **card-stats:** update spec to reflect CVA variants replacing SIZE object ([10332ba](https://github.com/lema-ufpb/design-system/commit/10332ba548712ddc76ad280dfc7533ba97e61fb7))
- **specs:** add spec documentation for -ui custom component wrappers ([bddfeaf](https://github.com/lema-ufpb/design-system/commit/bddfeafbe67c0e047bc7508fbf5f9d620a75fb98))
- **specs:** add spec documentation for shadcn/ui primitives ([bee02a5](https://github.com/lema-ufpb/design-system/commit/bee02a566d23a4f184aa1d16f1b37f89dbfd12ac))
- **specs:** add trend icon and badge icon CVA variants to highlight and list specs ([102e4c6](https://github.com/lema-ufpb/design-system/commit/102e4c6c69c7f98fe2dff8be803fc58a80cb5447))
- **specs:** mark all checklists as [x] for implemented components and add descriptive story descriptions ([71c09af](https://github.com/lema-ufpb/design-system/commit/71c09af6fe6fb1e2ae0ef01914363f7598308f72))
- **specs:** split card-stats.md into individual specs per sub-component ([418d69e](https://github.com/lema-ufpb/design-system/commit/418d69e3132fc8e106545eb503cbd7016134b45a))
- **specs:** update existing custom component specs with accurate API and tokens ([1a49ca9](https://github.com/lema-ufpb/design-system/commit/1a49ca94eada21db95ebfe908216e961ae3f7e37))
- **stories:** add default value summaries and story descriptions to custom component stories ([21bee75](https://github.com/lema-ufpb/design-system/commit/21bee753bffb2997c970aedece49dbb15af1ae98))
- **stories:** add default value summaries and story descriptions to UI component stories ([fed63c6](https://github.com/lema-ufpb/design-system/commit/fed63c6033f396369955b0b152c898cd9e19db3d))
- update data-table and combobox specs to match current APIs ([45fefc4](https://github.com/lema-ufpb/design-system/commit/45fefc42dcfdc8b87ded803bbf2fe38a854e7286))
- update Introduction.mdx and README for search-combo and search-bar ([9a74fca](https://github.com/lema-ufpb/design-system/commit/9a74fca07a836f16acc3829c04588233152e3876))

### ♻️ Refactor

- **card-stat:** replace SIZE lookups with CVA variants across all sub-components ([c2414a4](https://github.com/lema-ufpb/design-system/commit/c2414a4671ad4d1c0eb1d594e7a85135fbda57f6))
- **card-stat:** replace SIZE object with CVA variants for size-based styles ([40152f4](https://github.com/lema-ufpb/design-system/commit/40152f44d08b58e82cd2a8ce2445b8e32532db63))
- **card-stats:** split monolithic card-stats.tsx + docs(specs): add spec coverage for all 90 registry items ([2456e92](https://github.com/lema-ufpb/design-system/commit/2456e924ea8bf84e820aada2da7db9fe7da76bd2))
- **card-stats:** split monolithic card-stats.tsx into per-variant files ([5f958af](https://github.com/lema-ufpb/design-system/commit/5f958af4a9afedc5c4e21a4a49ab02d481dfb85a))
- **search-bar:** replace raw buttons with Button component ([c81ba78](https://github.com/lema-ufpb/design-system/commit/c81ba78d808c679aeacda906818eae3cd94e3567))
- **search-combo:** flatten multi-file directory into single-file ([d36b770](https://github.com/lema-ufpb/design-system/commit/d36b7700c39790c5584c0281b831d2f764b139a7))

## [1.0.1](https://github.com/lema-ufpb/design-system/compare/v1.0.0...v1.0.1) (2026-05-24)

### 🐛 Bug Fixes

- **charts:** use index fallback for legend key to avoid React warnings ([3257587](https://github.com/lema-ufpb/design-system/commit/32575872ef84e662daac0326ac02589f91f8ce42))
- inject APP_VERSION via build arg for correct version in Docker builds ([effede7](https://github.com/lema-ufpb/design-system/commit/effede7fba963f82ad173b1aafe1e0f86a1a9d14))
- **stories:** use defaultValue instead of value for uncontrolled inputs ([09cd0bb](https://github.com/lema-ufpb/design-system/commit/09cd0bb08ace9c5f9888d5bc1a5b8dfad866883c))
- **storybook:** restore missing mockServiceWorker.js for MSW ([869d817](https://github.com/lema-ufpb/design-system/commit/869d81747a0d7e3e4b4286b0e95e17e705a62428))

### 📚 Documentation

- update RELEASE_RUNBOOK.md and README.md to reflect current CI/CD state ([c6a3e0a](https://github.com/lema-ufpb/design-system/commit/c6a3e0acb166d02bc17ba864018738748263a1cd))

## [1.0.0](https://github.com/lema-ufpb/design-system/compare/v1.0.0...v1.0.0) (2026-05-24)

### ✨ Features

- add component registry and public assets ([40f1284](https://github.com/lema-ufpb/design-system/commit/40f1284d524fa8427ce491951d13c28e2a73dad9))
- add custom composite components (charts, cards, inputs) ([436c05d](https://github.com/lema-ufpb/design-system/commit/436c05d066c08c8fb3fc80143bf602414e9bfce8))
- add release-please automation with dependabot and composite setup action ([e8a7b08](https://github.com/lema-ufpb/design-system/commit/e8a7b089868bd881215835424868129b2434b46f))
- add shadcn/ui primitives with Storybook stories ([1ba1edb](https://github.com/lema-ufpb/design-system/commit/1ba1edb8c0f7f318db88b1630d891f8ecfc0db3d))
- add Storybook stories for custom components ([e2c63c1](https://github.com/lema-ufpb/design-system/commit/e2c63c1275a9d309bc4de5601ddb137eaea9abb8))
- add Storybook with custom theme, MSW, color themes, and Button stories ([dca832f](https://github.com/lema-ufpb/design-system/commit/dca832f235b3032d13d48ca9a6eda1fdb683962b))
- add version injection, white variant, controlled switch, and dashbox improvements ([fbf58ea](https://github.com/lema-ufpb/design-system/commit/fbf58eaab17bb5e8a9163ea42ddd36a3393ce949))
- configure app layout, providers, and i18n ([27799fa](https://github.com/lema-ufpb/design-system/commit/27799fa965dc825010801861e6c2d06ec7bcafbf))
- initial commit ([a814569](https://github.com/lema-ufpb/design-system/commit/a81456905465c3e39c89d3ca8141e837c2d5f712))

### 🐛 Bug Fixes

- **cd:** make argocd commit always push and simplify kustomize update ([549e288](https://github.com/lema-ufpb/design-system/commit/549e288faad9f726d25c38827c86676c6c0b9b68))
- **cd:** make argocd commit always push and simplify kustomize update ([e15de52](https://github.com/lema-ufpb/design-system/commit/e15de522a8d9474a63de91a3495d60112c702045))
- **ci:** make kustomize update robust when image entry is missing ([3d4e0f7](https://github.com/lema-ufpb/design-system/commit/3d4e0f77935dfc5a334837658a0156839e010fac))
- **ci:** make kustomize update robust when image entry is missing ([786a825](https://github.com/lema-ufpb/design-system/commit/786a825e14573eb4ee8bbbe806b051b20983bbed))
- **ci:** replace gh cli with curl in CD gate (gh not installed on runner) ([3eb203c](https://github.com/lema-ufpb/design-system/commit/3eb203c4f4094f008e676ebe9f2c6a6867721eb5))
- **ci:** replace sed with awk for kustomize image insertion and fix heredoc indent ([29567fe](https://github.com/lema-ufpb/design-system/commit/29567fe91065feae50b05c93b487525c3e5f08dd))
- **ci:** use check-suites API and re-enable push on main for CD gate ([41701ca](https://github.com/lema-ufpb/design-system/commit/41701cacdc2bca348b36c4b9aeec70ff4da15e00))
- **registry:** add missing registryDependencies to align with actual component imports ([b102d1a](https://github.com/lema-ufpb/design-system/commit/b102d1aa184fb67607a2b8e59762627bc9e54943))
- replace node with jq for registry.json version update in CD workflow ([d4d132e](https://github.com/lema-ufpb/design-system/commit/d4d132e2eae9a75584b177a204351734c1e5384c))
- resolve SSR hydration and calendar API compatibility ([150451e](https://github.com/lema-ufpb/design-system/commit/150451e5eeb11f4dada89d1c41f8390608d38524))

### 📚 Documentation

- add comprehensive README with LEMA Design System documentation ([958b82c](https://github.com/lema-ufpb/design-system/commit/958b82ce083b85984c0e4ca5892609d3f784f959))
- add GitFlow, conventional commits, and release-please documentation ([789929a](https://github.com/lema-ufpb/design-system/commit/789929afab88b1bd02c24fced33f4df7f5980ce4))

### 🧹 Chores

- release as 1.0.0 ([64d7b39](https://github.com/lema-ufpb/design-system/commit/64d7b39225a6e549250aefff1b3b3a37365e9cca))

## 1.0.0 (2026-05-24)

### ✨ Features

- add component registry and public assets ([40f1284](https://github.com/lema-ufpb/design-system/commit/40f1284d524fa8427ce491951d13c28e2a73dad9))
- add custom composite components (charts, cards, inputs) ([436c05d](https://github.com/lema-ufpb/design-system/commit/436c05d066c08c8fb3fc80143bf602414e9bfce8))
- add release-please automation with dependabot and composite setup action ([e8a7b08](https://github.com/lema-ufpb/design-system/commit/e8a7b089868bd881215835424868129b2434b46f))
- add shadcn/ui primitives with Storybook stories ([1ba1edb](https://github.com/lema-ufpb/design-system/commit/1ba1edb8c0f7f318db88b1630d891f8ecfc0db3d))
- add Storybook stories for custom components ([e2c63c1](https://github.com/lema-ufpb/design-system/commit/e2c63c1275a9d309bc4de5601ddb137eaea9abb8))
- add Storybook with custom theme, MSW, color themes, and Button stories ([dca832f](https://github.com/lema-ufpb/design-system/commit/dca832f235b3032d13d48ca9a6eda1fdb683962b))
- add version injection, white variant, controlled switch, and dashbox improvements ([fbf58ea](https://github.com/lema-ufpb/design-system/commit/fbf58eaab17bb5e8a9163ea42ddd36a3393ce949))
- configure app layout, providers, and i18n ([27799fa](https://github.com/lema-ufpb/design-system/commit/27799fa965dc825010801861e6c2d06ec7bcafbf))
- initial commit ([a814569](https://github.com/lema-ufpb/design-system/commit/a81456905465c3e39c89d3ca8141e837c2d5f712))

### 🐛 Bug Fixes

- **ci:** replace gh cli with curl in CD gate (gh not installed on runner) ([3eb203c](https://github.com/lema-ufpb/design-system/commit/3eb203c4f4094f008e676ebe9f2c6a6867721eb5))
- **ci:** use check-suites API and re-enable push on main for CD gate ([41701ca](https://github.com/lema-ufpb/design-system/commit/41701cacdc2bca348b36c4b9aeec70ff4da15e00))
- **registry:** add missing registryDependencies to align with actual component imports ([b102d1a](https://github.com/lema-ufpb/design-system/commit/b102d1aa184fb67607a2b8e59762627bc9e54943))
- replace node with jq for registry.json version update in CD workflow ([d4d132e](https://github.com/lema-ufpb/design-system/commit/d4d132e2eae9a75584b177a204351734c1e5384c))
- resolve SSR hydration and calendar API compatibility ([150451e](https://github.com/lema-ufpb/design-system/commit/150451e5eeb11f4dada89d1c41f8390608d38524))

### 📚 Documentation

- add comprehensive README with LEMA Design System documentation ([958b82c](https://github.com/lema-ufpb/design-system/commit/958b82ce083b85984c0e4ca5892609d3f784f959))
- add GitFlow, conventional commits, and release-please documentation ([789929a](https://github.com/lema-ufpb/design-system/commit/789929afab88b1bd02c24fced33f4df7f5980ce4))

### 🧹 Chores

- release as 1.0.0 ([64d7b39](https://github.com/lema-ufpb/design-system/commit/64d7b39225a6e549250aefff1b3b3a37365e9cca))
