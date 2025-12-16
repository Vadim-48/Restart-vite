export function initFormValidation() {
    window.validateForm = function() {
        let isValid = true;

        const name = document.querySelector('#userName');
        const phone = document.querySelector('#userPhone');
        const cityInput = document.querySelector('#userCity');
        const cityHidden = document.querySelector('input.form__select-hidden[name="city"]'); // приховане поле

        const nameError = document.querySelector('#nameError');
        const phoneError = document.querySelector('#phoneError');
        const cityError = document.querySelector('#cityError');

        // Очистка попередніх помилок
        nameError.textContent = '';
        phoneError.textContent = '';
        cityError.textContent = '';

        // Перевірка імені
        if (!name.value.trim()) {
            nameError.textContent = 'Введіть ваше ім’я';
            isValid = false;
        }

        // Перевірка телефону на повне заповнення маски
        if (!phone.inputmask.isComplete()) {
            phoneError.textContent = 'Введіть правильний телефон';
            isValid = false;
        }

        // Перевірка вибору міста зі списку
        const selectedCity = cityHidden ? cityHidden.value.trim() : '';
        if (!selectedCity) {
            cityError.textContent = 'Оберіть місто зі списку';
            isValid = false;
        }

        return isValid;
    }
}


// export function initFormValidation() {
//   window.validateForm = function() {
//     let isValid = true;
//
//     const name = document.querySelector('#userName');
//     const phone = document.querySelector('#userPhone');
//     const city = document.querySelector('#userCity');
//
//     const nameError = document.querySelector('#nameError');
//     const phoneError = document.querySelector('#phoneError');
//     const cityError = document.querySelector('#cityError');
//
//     // Очистка попередніх помилок
//     nameError.textContent = '';
//     phoneError.textContent = '';
//     cityError.textContent = '';
//
//     if (!name.value.trim()) {
//       nameError.textContent = 'Введіть ваше ім’я';
//       isValid = false;
//     }
//
//     // Перевірка телефону на повне заповнення маски
//     if (!phone.inputmask.isComplete()) {
//       phoneError.textContent = 'Введіть правильний телефон';
//       isValid = false;
//     }
//
//     if (!city.value.trim()) {
//       cityError.textContent = 'Оберіть місто зі списку';
//       isValid = false;
//     }
//
//
//     return isValid;
//   }
// }
