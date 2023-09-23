const commonStyle = [
  'color: #fff',
  'padding: 2px 8px'
];
const style1 = [
  ...commonStyle,
  'background: #848484',
  'border-radius: 2px 0 0 2px'
].join(';');
const style2 = [
  ...commonStyle,
  'background: #1890FF',
  'border-radius: 0 2px 2px 0'
].join(';');
console.log('%cNODE_ENV%c%s', style1, style2, process.env.NODE_ENV);
console.log('%cAPP_MODE%c%s', style1, style2, process.env.APP_MODE);
console.log('%cBUILD_TIME%c%s', style1, style2, new Date(process.env.BUILD_TIME).toLocaleString());
