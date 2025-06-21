const passwordEl = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const lengthEl = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const chars = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*()_+[]{}<>?,./'
};

generateBtn.addEventListener('click', generatePassword);
lengthEl.addEventListener('input', () => {
  lengthValue.textContent = lengthEl.value;
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordEl.value);
  copyBtn.textContent = '✅ Copiado';
  setTimeout(() => copyBtn.textContent = '📋 Copiar', 1500);
});

function generatePassword() {
  let length = parseInt(lengthEl.value);
  let charPool = '';
  if (lowercaseEl.checked) charPool += chars.lower;
  if (uppercaseEl.checked) charPool += chars.upper;
  if (numbersEl.checked) charPool += chars.number;
  if (symbolsEl.checked) charPool += chars.symbol;

  if (charPool === '') {
    alert('Selecciona al menos una opción.');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    let randIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randIndex];
  }

  passwordEl.value = password;
  checkStrength(password);
}

function checkStrength(password) {
  let strength = 0;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  let colors = ['#dc3545', '#ffc107', '#198754'];
  let labels = ['Débil', 'Media', 'Fuerte'];
  let index = Math.min(strength - 1, 2);

  strengthBar.style.background = colors[index] || '#ccc';
  strengthText.textContent = labels[index] || '—';
}
