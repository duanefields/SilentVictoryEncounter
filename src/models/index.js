const requireCtx = require.context(__dirname, false, /^((?!index).)*.js$/);
const modules = requireCtx.keys().reduce((acc,key) => {
  const exportName = key.replace('.'+__dirname,'').replace('.js', '');
  acc[exportName] = requireCtx(key).default;
  return acc;
},{});

Object.assign(exports, modules);