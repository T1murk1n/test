$(function () {
    var $slider = $("#rotate-carousel");
    var $wrapper = $(".rotate-slider");
    var $animateHolder = $(".animate-holder");
    var $more = $(".slider-more");
    
    var gallery = {
        currentAngle: 0,
        isAnimating: false,
        totalItems: $slider.find("> li").length,
        itemAngles: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
        activeIndex: 0
    };

    // Инициализация: первый элемент активен
    $slider.find("> li").eq(0).addClass("active");
    updateActiveItem();
    
    // Обработчик клика по элементу
    $(document).on("click", "#rotate-carousel > li", function (e) {
        e.preventDefault();
        if (gallery.isAnimating) return;
        
        var clickedIndex = $(this).index();
        if (clickedIndex === gallery.activeIndex) return;
        
        // Рассчитываем насколько нужно повернуть колесо
        var targetAngle = gallery.itemAngles[clickedIndex];
        var currentActiveAngle = gallery.itemAngles[gallery.activeIndex];
        
        // Разница в углах между активным и кликнутым элементом
        var angleDiff = currentActiveAngle - targetAngle;
        
        // Нормализуем угол (самый короткий путь)
        if (angleDiff > 180) {
            angleDiff -= 360;
        } else if (angleDiff < -180) {
            angleDiff += 360;
        }
        
        // Обновляем активный элемент
        $slider.find("> li").removeClass("active");
        $(this).addClass("active");
        
        // Вращаем всё колесо
        rotateWheel(angleDiff, clickedIndex);
    });
    
    // Функция вращения всего колеса
    function rotateWheel(angleDiff, newActiveIndex) {
        gallery.isAnimating = true;
        
        // Обновляем текущий угол
        gallery.currentAngle += angleDiff;
        
        // Анимируем вращение всего контейнера
        $slider.css({
            'transition': 'transform 0.5s ease',
            'transform': 'rotate(' + gallery.currentAngle + 'deg)'
        });
        
        // Обновляем активный индекс
        gallery.activeIndex = newActiveIndex;
        
        // После завершения анимации
        setTimeout(function() {
            gallery.isAnimating = false;
            updateActiveItem();
        }, 500);
    }
    
    // Функция обновления активного элемента
    function updateActiveItem() {
        var href = $slider.find("> li.active").find("a").attr("href");
        $more.attr("href", href);
        
        // Скрываем все анимации
        $animateHolder.find(".animation-content").hide();
        
        // Показываем анимацию активного элемента
        var animationId = "#animation" + (gallery.activeIndex + 1);
        $(animationId).show();
        
        // Запускаем анимацию
        animateCurrentItem();
    }
    
    // Функция анимации текущего элемента
    function animateCurrentItem() {
        var $currentAnim = $("#animation" + (gallery.activeIndex + 1) + " .animate-element");
        $currentAnim.stop(true, true);
        
        // Сбрасываем стили перед новой анимацией
        $currentAnim.css({
            top: '',
            left: '',
            opacity: '',
            transform: ''
        });
        
        // Разные анимации для разных элементов
        switch(gallery.activeIndex + 1) {
            case 1: // Лампочка
                $currentAnim.css({top: '-100px'}).animate({top: '0'}, 750);
                break;
            case 2: // Монеты
                $currentAnim.css({top: '-100px'}).animate({top: '0'}, 750);
                break;
            case 3: // Развитие
                $currentAnim.css({top: '-100px'}).animate({top: '0'}, 750);
                break;
            case 4: // Весы
                $currentAnim.css({opacity: 0}).animate({opacity: 1}, 750);
                break;
            case 5: // Блокнот
                $currentAnim.css({top: '100px'}).animate({top: '0'}, 750);
                break;
            case 6: // Диаграмма
                $currentAnim.css({left: '-100px'}).animate({left: '0'}, 750);
                break;
            case 7: // Калькулятор
                $currentAnim.css({transform: 'scale(0.5)'}).animate({transform: 'scale(1)'}, 750);
                break;
            case 8: // Подарок
                $currentAnim.css({top: '-100px'}).animate({top: '0'}, 750);
                break;
            case 9: // Дом
                $currentAnim.css({top: '-100px'}).animate({top: '0'}, 750);
                break;
            case 10: // Кошелёк
                $currentAnim.css({opacity: 0}).animate({opacity: 1}, 750);
                break;
            case 11: // Молекула
                $currentAnim.css({opacity: 0}).animate({opacity: 1}, 750);
                break;
            case 12: // Документ
                $currentAnim.css({opacity: 0}).animate({opacity: 1}, 750);
                break;
        }
    }
    
    // Автоповорот (опционально)
    var autoRotate = setInterval(function() {
        // Автоматически переключаем на следующий элемент
        if (!gallery.isAnimating) {
            var newIndex = (gallery.activeIndex + 1) % gallery.totalItems;
            
            // Рассчитываем угол для вращения
            var targetAngle = gallery.itemAngles[newIndex];
            var currentActiveAngle = gallery.itemAngles[gallery.activeIndex];
            
            // Разница в углах между активным и следующим элементом
            var angleDiff = currentActiveAngle - targetAngle;
            
            // Нормализуем угол (самый короткий путь)
            if (angleDiff > 180) {
                angleDiff -= 360;
            } else if (angleDiff < -180) {
                angleDiff += 360;
            }
            
            // Обновляем активный элемент
            $slider.find("> li").removeClass("active");
            $slider.find("> li").eq(newIndex).addClass("active");
            
            // Вращаем колесо
            rotateWheel(angleDiff, newIndex);
        }
    }, 5000);
    
    // Останавливаем автоповорот при наведении на слайдер
    $wrapper.hover(
        function() { 
            clearInterval(autoRotate); 
        },
        function() { 
            autoRotate = setInterval(function() {
                if (!gallery.isAnimating) {
                    var newIndex = (gallery.activeIndex + 1) % gallery.totalItems;
                    
                    var targetAngle = gallery.itemAngles[newIndex];
                    var currentActiveAngle = gallery.itemAngles[gallery.activeIndex];
                    
                    var angleDiff = currentActiveAngle - targetAngle;
                    
                    if (angleDiff > 180) {
                        angleDiff -= 360;
                    } else if (angleDiff < -180) {
                        angleDiff += 360;
                    }
                    
                    $slider.find("> li").removeClass("active");
                    $slider.find("> li").eq(newIndex).addClass("active");
                    
                    rotateWheel(angleDiff, newIndex);
                }
            }, 5000);
        }
    );

});