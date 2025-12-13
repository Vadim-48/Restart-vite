export function initCustomSelect() {
    const selects = document.querySelectorAll(".form__select");

    selects.forEach(select => {
        const input = select.querySelector(".form__select-input");
        const hidden = select.querySelector(".form__select-hidden");
        const arrow = select.querySelector(".form__select-arrow");
        const optionsBox = select.querySelector(".form__select-options");
        const options = Array.from(optionsBox.querySelectorAll("span"));

        let savedValue = "";
        let hasSelected = false;

        const isOpen = () => select.classList.contains("open");

        const open = () => {
            select.classList.add("open");
            filter();
        };

        const close = () => {
            select.classList.remove("open");

            // 🔁 якщо не було вибору — повертаємо
            if (!hasSelected) {
                input.value = savedValue;
            }

            hasSelected = false;
        };

        const filter = () => {
            const value = input.value.toLowerCase().trim();
            options.forEach(opt => {
                opt.style.display = opt.textContent.toLowerCase().includes(value)
                    ? "block"
                    : "none";
            });
        };

        const toggle = () => {
            if (!isOpen()) {
                // 🔓 відкриваємо
                savedValue = input.value; // зберігаємо ПЕРЕД очисткою
                input.value = "";
                open();
            } else {
                // 🔒 закриваємо
                close();
            }
        };

        // Клік по input
        input.addEventListener("click", e => {
            e.stopPropagation();
            toggle();
        });

        // Клік по стрілці
        arrow.addEventListener("click", e => {
            e.stopPropagation();
            toggle();
        });

        // Пошук
        input.addEventListener("input", () => {
            filter();
        });

        // Вибір
        options.forEach(option => {
            option.addEventListener("click", e => {
                e.stopPropagation();

                const value = option.textContent.trim();

                input.value = value;
                savedValue = value;
                hasSelected = true;

                if (hidden) hidden.value = value;

                close();
            });
        });

        // Клік поза селектом
        document.addEventListener("click", e => {
            if (!select.contains(e.target) && isOpen()) {
                close();
            }
        });
    });
}
