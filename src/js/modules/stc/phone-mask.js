import Inputmask from 'inputmask';

export function initPhoneMask() {
  const phoneInput = document.querySelector('#userPhone');
  if (!phoneInput) return;

  const im = new Inputmask("+38 (999) 999-99-99", {
    placeholder: "",    // порожнє поле спочатку
    showMaskOnHover: false,
    showMaskOnFocus: false,
    jitMasking: true,    // ключовий параметр для поступового форматування
      allowPaste: true
  });

  im.mask(phoneInput);
}
