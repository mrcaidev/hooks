# Contributing Guide

Thank you for your interest in contributing to this project!

Before submitting your contribution, please take a moment and read through the following guidelines:

- [Code of Conduct](https://github.com/mrcaidev/hooks/tree/master/.github/CODE_OF_CONDUCT.md)
- [Issues](#issues)
- [Pull Requests](#pull-requests)
- [Local Development](#local-development)

## Issues

[Open an issue](https://github.com/mrcaidev/hooks/issues/new) if you want to:

- report a bug
- suggest a feature
- improve the documentation

### Opening

Please do:

- Search [existing issues](https://github.com/mrcaidev/hooks/issues) to avoid duplicates.
- Make sure that you are using the latest version of the package.
- Complete all of the required fields in the template.

Please don't:

- Talk about irrelevant topics. [Send an email](mailto:mrcaidev@gmail.com) instead.
- Ask questions. [Start a discussion](https://github.com/mrcaidev/hooks/discussions) instead.

### Commenting

Please do:

- Provide additional useful information under open issues.
- Explain why it should not be closed under closed issues.

Please don't:

- Bring up another topic. [Open a new issue](https://github.com/mrcaidev/hooks/issues/new) instead.
- Leave meaningless comments like "+1" or "me too". Use reactions instead.

## Pull Requests

[Create a pull request](https://github.com/mrcaidev/hooks/pulls) if you:

- fixed a bug
- implemented a new feature
- modified the documentation

### Working

Please do:

- Ideally, you should [open an issue](https://github.com/mrcaidev/hooks/issues/new) first, and have it thoroughly discussed and approved before actually working on it.
- If your work is related to an existing issue, mention it under that issue to avoid duplicate work.
- Fork the `master` branch, and work in your own repository.
- Follow the guidelines for [local development](#local-development).
- Commit as many times as you want, and use any style of commit messages you like.

### Merging

Please do:

- Merge back against the `master` branch.
- Make sure that your title follows the [commit message convention](https://www.conventionalcommits.org/en/v1.0.0/), and include a link to the related issue if any.

## Local Development

You will need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed beforehand.

After cloning the repository, run:

```
pnpm i
```

### Project Structure

```
.
├── docs                          # Documentation website
├── packages                      # All packages
│   ├── commitlint-config-custom  # Commitlint config
│   ├── eslint-config-custom      # ESLint config
│   ├── hooks                     # @mrcaidev/hooks
│   ├── prettier-config-custom    # Prettier config
│   └── typescript-config-custom  # TypeScript config
└── scripts                       # Utility scripts
```

### Build

Build both package and documentation:

```
pnpm run build
```

Build package `@mrcaidev/hooks`:

```
pnpm run build:package
```

Build documentation website:

```
pnpm run build:docs
```

If you added a new hook, you will additionally need to run:

```
pnpm run build:docs:nav
```

### Test

Test package:

```
pnpm run test
```

Test package in watch mode:

```
pnpm run --filter @mrcaidev/hooks test:watch
```
