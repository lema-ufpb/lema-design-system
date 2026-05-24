# Changelog

## [1.0.1](https://github.com/lema-ufpb/design-system/compare/v1.0.0...v1.0.1) (2026-05-24)


### 🐛 Bug Fixes

* **charts:** use index fallback for legend key to avoid React warnings ([3257587](https://github.com/lema-ufpb/design-system/commit/32575872ef84e662daac0326ac02589f91f8ce42))
* inject APP_VERSION via build arg for correct version in Docker builds ([effede7](https://github.com/lema-ufpb/design-system/commit/effede7fba963f82ad173b1aafe1e0f86a1a9d14))
* **stories:** use defaultValue instead of value for uncontrolled inputs ([09cd0bb](https://github.com/lema-ufpb/design-system/commit/09cd0bb08ace9c5f9888d5bc1a5b8dfad866883c))
* **storybook:** restore missing mockServiceWorker.js for MSW ([869d817](https://github.com/lema-ufpb/design-system/commit/869d81747a0d7e3e4b4286b0e95e17e705a62428))


### 📚 Documentation

* update RELEASE_RUNBOOK.md and README.md to reflect current CI/CD state ([c6a3e0a](https://github.com/lema-ufpb/design-system/commit/c6a3e0acb166d02bc17ba864018738748263a1cd))

## [1.0.0](https://github.com/lema-ufpb/design-system/compare/v1.0.0...v1.0.0) (2026-05-24)


### ✨ Features

* add component registry and public assets ([40f1284](https://github.com/lema-ufpb/design-system/commit/40f1284d524fa8427ce491951d13c28e2a73dad9))
* add custom composite components (charts, cards, inputs) ([436c05d](https://github.com/lema-ufpb/design-system/commit/436c05d066c08c8fb3fc80143bf602414e9bfce8))
* add release-please automation with dependabot and composite setup action ([e8a7b08](https://github.com/lema-ufpb/design-system/commit/e8a7b089868bd881215835424868129b2434b46f))
* add shadcn/ui primitives with Storybook stories ([1ba1edb](https://github.com/lema-ufpb/design-system/commit/1ba1edb8c0f7f318db88b1630d891f8ecfc0db3d))
* add Storybook stories for custom components ([e2c63c1](https://github.com/lema-ufpb/design-system/commit/e2c63c1275a9d309bc4de5601ddb137eaea9abb8))
* add Storybook with custom theme, MSW, color themes, and Button stories ([dca832f](https://github.com/lema-ufpb/design-system/commit/dca832f235b3032d13d48ca9a6eda1fdb683962b))
* add version injection, white variant, controlled switch, and dashbox improvements ([fbf58ea](https://github.com/lema-ufpb/design-system/commit/fbf58eaab17bb5e8a9163ea42ddd36a3393ce949))
* configure app layout, providers, and i18n ([27799fa](https://github.com/lema-ufpb/design-system/commit/27799fa965dc825010801861e6c2d06ec7bcafbf))
* initial commit ([a814569](https://github.com/lema-ufpb/design-system/commit/a81456905465c3e39c89d3ca8141e837c2d5f712))


### 🐛 Bug Fixes

* **cd:** make argocd commit always push and simplify kustomize update ([549e288](https://github.com/lema-ufpb/design-system/commit/549e288faad9f726d25c38827c86676c6c0b9b68))
* **cd:** make argocd commit always push and simplify kustomize update ([e15de52](https://github.com/lema-ufpb/design-system/commit/e15de522a8d9474a63de91a3495d60112c702045))
* **ci:** make kustomize update robust when image entry is missing ([3d4e0f7](https://github.com/lema-ufpb/design-system/commit/3d4e0f77935dfc5a334837658a0156839e010fac))
* **ci:** make kustomize update robust when image entry is missing ([786a825](https://github.com/lema-ufpb/design-system/commit/786a825e14573eb4ee8bbbe806b051b20983bbed))
* **ci:** replace gh cli with curl in CD gate (gh not installed on runner) ([3eb203c](https://github.com/lema-ufpb/design-system/commit/3eb203c4f4094f008e676ebe9f2c6a6867721eb5))
* **ci:** replace sed with awk for kustomize image insertion and fix heredoc indent ([29567fe](https://github.com/lema-ufpb/design-system/commit/29567fe91065feae50b05c93b487525c3e5f08dd))
* **ci:** use check-suites API and re-enable push on main for CD gate ([41701ca](https://github.com/lema-ufpb/design-system/commit/41701cacdc2bca348b36c4b9aeec70ff4da15e00))
* **registry:** add missing registryDependencies to align with actual component imports ([b102d1a](https://github.com/lema-ufpb/design-system/commit/b102d1aa184fb67607a2b8e59762627bc9e54943))
* replace node with jq for registry.json version update in CD workflow ([d4d132e](https://github.com/lema-ufpb/design-system/commit/d4d132e2eae9a75584b177a204351734c1e5384c))
* resolve SSR hydration and calendar API compatibility ([150451e](https://github.com/lema-ufpb/design-system/commit/150451e5eeb11f4dada89d1c41f8390608d38524))


### 📚 Documentation

* add comprehensive README with LEMA Design System documentation ([958b82c](https://github.com/lema-ufpb/design-system/commit/958b82ce083b85984c0e4ca5892609d3f784f959))
* add GitFlow, conventional commits, and release-please documentation ([789929a](https://github.com/lema-ufpb/design-system/commit/789929afab88b1bd02c24fced33f4df7f5980ce4))


### 🧹 Chores

* release as 1.0.0 ([64d7b39](https://github.com/lema-ufpb/design-system/commit/64d7b39225a6e549250aefff1b3b3a37365e9cca))

## 1.0.0 (2026-05-24)


### ✨ Features

* add component registry and public assets ([40f1284](https://github.com/lema-ufpb/design-system/commit/40f1284d524fa8427ce491951d13c28e2a73dad9))
* add custom composite components (charts, cards, inputs) ([436c05d](https://github.com/lema-ufpb/design-system/commit/436c05d066c08c8fb3fc80143bf602414e9bfce8))
* add release-please automation with dependabot and composite setup action ([e8a7b08](https://github.com/lema-ufpb/design-system/commit/e8a7b089868bd881215835424868129b2434b46f))
* add shadcn/ui primitives with Storybook stories ([1ba1edb](https://github.com/lema-ufpb/design-system/commit/1ba1edb8c0f7f318db88b1630d891f8ecfc0db3d))
* add Storybook stories for custom components ([e2c63c1](https://github.com/lema-ufpb/design-system/commit/e2c63c1275a9d309bc4de5601ddb137eaea9abb8))
* add Storybook with custom theme, MSW, color themes, and Button stories ([dca832f](https://github.com/lema-ufpb/design-system/commit/dca832f235b3032d13d48ca9a6eda1fdb683962b))
* add version injection, white variant, controlled switch, and dashbox improvements ([fbf58ea](https://github.com/lema-ufpb/design-system/commit/fbf58eaab17bb5e8a9163ea42ddd36a3393ce949))
* configure app layout, providers, and i18n ([27799fa](https://github.com/lema-ufpb/design-system/commit/27799fa965dc825010801861e6c2d06ec7bcafbf))
* initial commit ([a814569](https://github.com/lema-ufpb/design-system/commit/a81456905465c3e39c89d3ca8141e837c2d5f712))


### 🐛 Bug Fixes

* **ci:** replace gh cli with curl in CD gate (gh not installed on runner) ([3eb203c](https://github.com/lema-ufpb/design-system/commit/3eb203c4f4094f008e676ebe9f2c6a6867721eb5))
* **ci:** use check-suites API and re-enable push on main for CD gate ([41701ca](https://github.com/lema-ufpb/design-system/commit/41701cacdc2bca348b36c4b9aeec70ff4da15e00))
* **registry:** add missing registryDependencies to align with actual component imports ([b102d1a](https://github.com/lema-ufpb/design-system/commit/b102d1aa184fb67607a2b8e59762627bc9e54943))
* replace node with jq for registry.json version update in CD workflow ([d4d132e](https://github.com/lema-ufpb/design-system/commit/d4d132e2eae9a75584b177a204351734c1e5384c))
* resolve SSR hydration and calendar API compatibility ([150451e](https://github.com/lema-ufpb/design-system/commit/150451e5eeb11f4dada89d1c41f8390608d38524))


### 📚 Documentation

* add comprehensive README with LEMA Design System documentation ([958b82c](https://github.com/lema-ufpb/design-system/commit/958b82ce083b85984c0e4ca5892609d3f784f959))
* add GitFlow, conventional commits, and release-please documentation ([789929a](https://github.com/lema-ufpb/design-system/commit/789929afab88b1bd02c24fced33f4df7f5980ce4))


### 🧹 Chores

* release as 1.0.0 ([64d7b39](https://github.com/lema-ufpb/design-system/commit/64d7b39225a6e549250aefff1b3b3a37365e9cca))
