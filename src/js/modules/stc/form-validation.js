export function initFormValidation() {
    const name = document.querySelector('#userName');
    const phone = document.querySelector('#userPhone');
    const cityInput = document.querySelector('#userCity');
    const cityHidden = document.querySelector('input.form__select-hidden[name="city"]');
    const citySpans = document.querySelectorAll('.form__select-options span');

    const nameError = document.querySelector('#nameError');
    const phoneError = document.querySelector('#phoneError');
    const cityError = document.querySelector('#cityError');

    // Основна функція валідації для submit
    function validateForm() {
        let isValid = true;

        // Ім'я
        if (!name.value.trim()) {
            nameError.textContent = 'Введіть ваше ім’я';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Телефон
        if (!phone.inputmask.isComplete()) {
            phoneError.textContent = 'Введіть правильний телефон';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // Місто
        const selectedCity = cityHidden.value.trim();
        if (!selectedCity) {
            cityError.textContent = 'Оберіть місто зі списку';
            isValid = false;
        } else {
            cityError.textContent = '';
        }

        return isValid;
    }

    // Експортуємо функцію для submit
    window.validateForm = validateForm;

    // Динамічна перевірка при введенні
    // Ім'я
    name.addEventListener('input', () => {
        if (name.value.trim()) nameError.textContent = '';
    });

    // Телефон
    phone.addEventListener('input', () => {
        if (phone.inputmask.isComplete()) phoneError.textContent = '';
    });

    // Вибір міста зі списку
    citySpans.forEach(span => {
        span.addEventListener('click', () => {
            cityHidden.value = span.textContent.trim(); // записуємо у hidden input
            cityInput.value = span.textContent.trim();  // показуємо у текстовому полі
            cityError.textContent = '';
        });
    });

    // Динамічна перевірка текстового поля міста (якщо користувач вводить вручну)
    cityInput.addEventListener('input', () => {
        const value = cityInput.value.trim();
        const validCities = Array.from(citySpans).map(span => span.textContent.trim());

        if (validCities.includes(value)) {
            cityHidden.value = value;   // синхронізуємо hidden input
            cityError.textContent = ''; // ховаємо помилку
        } else {
            cityHidden.value = ''; // якщо не валідне — очищаємо hidden
        }
    });
}
