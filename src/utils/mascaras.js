const doMask = (pattern, value) => {
  const patternArray = pattern.replace(/[^#]/g, '').split('');
  const limitIndexPattern = patternArray.length;
  let currentIndexPattern = 0;
  const valueArray = value.split('');
  let resultMask = '';
  pattern.split('').forEach((pat) => {
    if (currentIndexPattern >= valueArray.length || currentIndexPattern === limitIndexPattern) {
      return;
    }
    if (pat === '#') {
      if (valueArray[currentIndexPattern]) {
        resultMask += valueArray[currentIndexPattern];
        currentIndexPattern += 1;
      }
    } else {
      resultMask += pat;
    }
  });
  return resultMask;
};

export function aplicaMascaraNumerica(valor, mask) {
  if (valor) {
    valor = valor.replace(/\D/g, '');
    valor = doMask(mask, valor);
    return valor;
  }
  return '';
}

export function removeMascaraNumerica(valor) {
  return valor.replace(/\D/g, '');
}
