export function initFormValidation() {
  window.validateForm = function() {
    let isValid = true;

    const name = document.querySelector('#userName');
    const phone = document.querySelector('#userPhone');
    const city = document.querySelector('#userCity');

    const nameError = document.querySelector('#nameError');
    const phoneError = document.querySelector('#phoneError');
    const cityError = document.querySelector('#cityError');

    // Очистка попередніх помилок
    nameError.textContent = '';
    phoneError.textContent = '';
    cityError.textContent = '';

    if (!name.value.trim()) {
      nameError.textContent = 'Введіть ваше ім’я';
      isValid = false;
    }

    // Перевірка телефону на повне заповнення маски
    if (!phone.inputmask.isComplete()) {
      phoneError.textContent = 'Введіть правильний телефон';
      isValid = false;
    }

    if (!city.value.trim()) {
      cityError.textContent = 'Оберіть місто зі списку';
      isValid = false;
    }

    return isValid;
  }
}
