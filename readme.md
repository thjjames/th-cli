# th-cli
```bash
npm i -g github:thjjames/th-cli
th-cli create <project-name>
```

## subtree
init new branch by folder, do not repeat
```bash
git subtree split --prefix=template -b template --rejoin
```

init folder by branch, do not repeat
```bash
git subtree add --prefix=template https://github.com/thjjames/th-cli template
```

sync subtree's code to parent
```bash
git subtree pull --prefix=template https://github.com/thjjames/th-cli template
```

sync parent's code to subtree
```bash
git subtree push --prefix=template https://github.com/thjjames/th-cli template
```

## contributor
tianhaojun <thjjames@163.com>

## feadback
please create issues on https://github.com/thjjames/th-cli/issues or send an email on <thjjames@163.com>
