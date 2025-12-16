// youtube-play.js
let apiLoaded = false;
let callbacks = [];
let players = []; // Масив для збереження всіх плеєрів

const DEFAULT_PLAYER_VARS = {
    playsinline: 1,
    controls: 1,
    rel: 0,
    modestbranding: 1
};

// Завантаження YouTube API
function loadYouTubeAPI(callback) {
    if (window.YT && window.YT.Player) {
        callback();
        return;
    }

    callbacks.push(callback);

    if (!apiLoaded) {
        apiLoaded = true;
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
            callbacks.forEach(cb => cb());
            callbacks = [];
        };
    }
}

// Ініціалізація всіх відео
export function initYouTubePlayers({
                                       selector = '.video__wrapper', // контейнер для відео
                                       autoplay = true,               // чи запускати відео автоматично після кліку
                                       stopOthers = true              // чи зупиняти інші відео при запуску
                                   } = {}) {
    const wrappers = document.querySelectorAll(selector);
    if (!wrappers.length) return;

    wrappers.forEach(wrapper => {
        const overlay = wrapper.querySelector('.video__overlay');
        const playerElement = wrapper.querySelector('.video__file');

        if (!overlay || !playerElement || !playerElement.id) return;

        overlay.addEventListener('click', () => {
            overlay.style.display = 'none'; // ховаємо overlay

            // Підвантажуємо API, якщо ще не завантажено
            loadYouTubeAPI(() => {
                const videoId = playerElement.dataset.videoId;

                // Зупиняємо інші відео, якщо stopOthers = true
                if (stopOthers) {
                    players.forEach(p => p.pauseVideo());
                }

                // Створюємо новий плеєр
                const player = new YT.Player(playerElement.id, {
                    width: '100%',
                    height: '100%',
                    videoId,
                    playerVars: DEFAULT_PLAYER_VARS,
                    events: {
                        onReady: event => {
                            if (autoplay) event.target.playVideo();
                        }
                    }
                });

                // Додаємо плеєр у масив
                players.push(player);
            });
        });
    });
}
