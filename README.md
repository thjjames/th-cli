# th-cli
```bash
npm i -g github:thjjames/th-cli
th-cli create <project-name>
```
or  
```bash
npx github:thjjames/th-cli@latest create <project-name>
```

## monorepo
exec subtree's scripts in the root directory
```bash
pnpm -C template/xxx run dev
```

## subtree
init new branch by folder, do not repeat
```bash
git subtree split --prefix=template/xxx -b xxx --rejoin
```

init folder by branch, do not repeat
```bash
git subtree add --prefix=template/xxx https://github.com/thjjames/th-cli xxx
```

sync subtree's code to parent
```bash
git subtree pull --prefix=template/xxx https://github.com/thjjames/th-cli xxx
```

sync parent's code to subtree
```bash
git subtree push --prefix=template/xxx https://github.com/thjjames/th-cli xxx
```

## contributor
tianhaojun <thjjames@163.com>

## feadback
please create issues on https://github.com/thjjames/th-cli/issues or send an email on <thjjames@163.com>
