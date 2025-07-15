window.addEventListener('load', function () {
    
    const pages = document.querySelectorAll('#wrap > div');
    const gnbMenu = document.querySelector('.gnb-menu > div');
    const nav = document.querySelector('#page01 > nav');
    const menu = document.querySelector('.menu');
    const menuLink = document.querySelectorAll('.menu > li > a');
    const imagesBox = document.querySelectorAll('.design > ul');
    const imagesLink = document.querySelectorAll('.design > ul > li > a');
    const overlay = document.querySelector('.design-overlay');
    const overlayImage = document.querySelector('.design-overlay > img');
    const overlayClose = document.querySelector('.overlay-close');
    const designButLeft = document.querySelectorAll('.design-btn > button:first-child');
    const designButRight = document.querySelectorAll('.design-btn > button:last-child');

    const contTit = document.querySelector('.cont-tit > ul');
    const autoPlay = document.querySelector('.fill');
    const currentPage = document.querySelector('.current');
    const webBtn = document.querySelector('.web-btn');
    const webPre = webBtn.children[0];
    const webStop = webBtn.children[1];
    const webNext = webBtn.children[2];
    const imgWrap = document.querySelector('.img-container');

    let windowHeight  = window.innerHeight;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let pageIndex = Math.round(scrollTop / windowHeight);

    const lastPageIndex = pages.length - 1;

    // 페이지 스크롤링
    let pageStop = 0;

    // 현재 페이지에 active 클래스 추가 
    pages[pageIndex].classList.add('active');

    // 메인 휠 이벤트
    window.addEventListener('wheel', function(event) {
        event.preventDefault();

        if(pageStop == 1) return;

        if(event.deltaY > 0) {
            if(pageIndex >= lastPageIndex) return;
            pageIndex++;
        }else if(event.deltaY < 0) {
            if(pageIndex <= 0) return;
            pageIndex--;
        }

        scrollToPage(pageIndex);

    }, { passive: false });

    window.addEventListener('resize', function () {
        windowHeight = window.innerHeight;
    });

    //----------------------------------------------------------------------------------
    // 메인 페이지 스크롤 이동 함수
    function scrollToPage(index) {
        let posTop = windowHeight * index;

        window.scrollTo({
            top: posTop,
            behavior: 'smooth'
        });

        pageStop = 1;
        window.setTimeout(function () {    // 600ms 후 다시 활성화  
            pageStop = 0;

            if(0 <= index && index <= lastPageIndex) {
                for(let i = 0; i < pages.length; i++) {
                    if(index < 0) return;
                    pages[i].classList.remove('active');
                }
            }else return;

            pages[index].classList.add('active');

        }, 500);
    }
    //----------------------------------------------------------------------------------


    // 메뉴 이벤트
    gnbMenu.addEventListener('click', function() {
        if(gnbMenu.classList.contains('close') === false) {
            this.classList.add('close');

            menu.classList.add('close');
            menu.classList.add('collapsed');
            
        } else {
            this.classList.remove('close');

            menu.classList.remove('close');
            menu.classList.remove('collapsed');
        }
    });

    // 메뉴 이동 이벤트
    for(let i = 0; i < menuLink.length; i++) {
        menuLink[i].addEventListener('click', function(event) {
            event.preventDefault();

            console.log("클릭 이벤트 발생", i)

            // page02번의 오버레이가 안보일 경우에만 네이게이션 클릭 이벤트가 실행
            // getComputedStyle을 사용하여 요소의 실제 스타일 확인. 
            if(getComputedStyle(overlay).display === 'none') {
                window.scrollTo({
                    top: pages[i].offsetTop,
                    behavior : 'smooth',
                });
    
                pageIndex = i;  // 메뉴 클릭 후 pageIndex 업데이트
    
                for(let j = 0; j < pages.length; j++) {
                    pages[j].classList.remove('active');
                }
    
                setTimeout(function() {
                    pages[pageIndex].classList.add('active');
                }, 600);

            };
        });
    }

    for(let j = 0; j < imagesLink.length; j++) {
        // page02 마우스 HOVER 이벤트
        imagesLink[j].addEventListener('mouseenter', function() {
            if(pageStop == 0) {
                this.style.transform = 'scale(1.08)';
                this.style.opacity = '1';
            };
        });
        
        imagesLink[j].addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.opacity = '';

        })

        // page02 오버레이 OPEN 이벤트
        imagesLink[j].addEventListener('click', function (event) {
            event.preventDefault();
            pageStop = 1;   // 스크롤 잠금 상태 

            overlayImage.src = this.href;
            overlay.style.display = 'flex';
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0)';

            overlay.addEventListener('click', function(event) {
                event.preventDefault();
                nav.style.backgroundColor = '#ffaf2';
                this.style.display = 'none';
                pageStop = 0;  // 스크롤 잠금 해제
            });
        });
    }

    // page02 오버레이 CLOSE 이벤트
    overlayClose.addEventListener('click', function(event) {
        event.preventDefault();
        overlay.style.display = 'none';
    });

    // page02 버튼 클릭 이벤트    
    designButRight.forEach((button, k) => {
        let isAnimating = 0;

        button.addEventListener('click', function (event) {
            event.preventDefault();
            
            if (isAnimating == 1) return;
            isAnimating = 1;

            let firstImage = imagesBox[k].firstElementChild; // 첫 번째 이미지
            let imageWidth = firstImage.offsetWidth; // 이미지의 실제 너비 가져오기

            // 첫 번째 이미지를 왼쪽으로 이동 (자연스러운 애니메이션 효과)
            imagesBox[k].style.transition = "transform 0.5s ease-in-out";
            imagesBox[k].style.transform = `translateX(-${imageWidth}px)`;

            // 애니메이션이 끝난 후 첫 번째 이미지를 마지막으로 이동
            setTimeout(function () {
                imagesBox[k].appendChild(firstImage);
                imagesBox[k].style.transition = "none"; // 트랜지션 초기화
                imagesBox[k].style.transform = "translateX(0)"; // 원래 위치로 초기화
                
                isAnimating = 0;
            }, 500);
        });
    });

    designButLeft.forEach((button, k) => {
        let isAnimating = 0;

        button.addEventListener('click', function (event) {
            event.preventDefault();
            
            if (isAnimating == 1) return;
            isAnimating = 1;
            
            let lastImage = imagesBox[k].lastElementChild;
            let imageWidth = lastImage.offsetWidth;
            
            imagesBox[k].prepend(imagesBox[k].lastElementChild);
            imagesBox[k].style.transition = "none"; // 트랜지션 초기화
            imagesBox[k].style.transform = `translateX(-${imageWidth}px)`;
            
            setTimeout(function () {
                imagesBox[k].style.transition = "transform 0.5s ease-in-out";
                imagesBox[k].style.transform = "translateX(0)"; // 원래 위치로 초기화

                isAnimating = 0;
            }, 100);
        });
    });

    //----------------------------------------------------------------------------------
    // page03 함수
    let currentIndex = 1;

    function updateIndicator() {
        currentPage.textContent = currentIndex.toString().padStart(2, '0');
    }

    // Page03 nextIndicator 함수
    function nextIndicator() {
        currentIndex = currentIndex % imgWrap.children.length + 1   
        updateIndicator();
    }

    // Page03 preIndicator 함수
    function preIndicator() {
        currentIndex = (currentIndex + 1) % imgWrap.children.length + 1;
        updateIndicator();
    }

    function autoPlayRemove() {
        autoPlay.classList.remove('animation'); 
    }

    function autoPlayAdd() {
        autoPlay.classList.add('animation');
    }

    // page03 nextShowcase 함수
    function nextShowCase(slider, movesize) {
        slider.style.transition = 'margin-left 0.5s ease-in-out';
        slider.style.marginLeft = `${movesize}px`;
        
        autoPlayRemove();
 
        window.setTimeout(function () {
            slider.append(slider.firstElementChild);
            slider.removeAttribute('style');
        }, 500)
    }

    // page03 preShowcase 함수
    function preShowCase(slider, movesize) {
        slider.style.transition = 'none';

        slider.prepend(slider.lastElementChild);
        slider.style.marginLeft = `${movesize}px`;
        slider.style.transitionDuration = '500ms';

        autoPlayRemove();

        window.setTimeout(function () {
            slider.style.transition = 'margin-left 0.5s ease-in-out';
            slider.style.marginLeft = '0px';
        }, 100)
    }

    // startSlider() 함수 변수
    let TimerID;

    // 자동 슬라이드 전환 시작 함수
    function startSlider() {
        TimerID = window.setInterval(() => {
            nextShowCase(contTit, -1 * contTit.firstElementChild.offsetWidth);
            nextShowCase(imgWrap, -1 * imgWrap.firstElementChild.offsetWidth);

            nextIndicator();
            autoPlayAdd();
            console.log(currentIndex);
        }, 5000);
    }
    //----------------------------------------------------------------------------------

    autoPlayAdd();
    startSlider();

    // page03 다음버튼 클릭 이벤트
    webNext.addEventListener('click', function (event) {
        event.preventDefault();

        window.clearInterval(TimerID);
        
        nextShowCase(contTit, -1 * contTit.firstElementChild.offsetWidth);
        nextShowCase(imgWrap, -1 * imgWrap.firstElementChild.offsetWidth);
        autoPlayAdd();
        nextIndicator();

        // 자동 슬라이드 시작
        startSlider();
    });

    // page03 이전버튼 클릭 이벤트
    webPre.addEventListener('click', function (event) {
        event.preventDefault();

        window.clearInterval(TimerID);
        
        preShowCase(contTit, -1 * contTit.firstElementChild.offsetWidth);
        preShowCase(imgWrap, -1 * imgWrap.firstElementChild.offsetWidth);
        autoPlayAdd();
        preIndicator();
        
        console.log(currentIndex);
        // 자동 슬라이드 시작
        startSlider();
    });

    // page03 정지 버튼 클릭 이벤트
    webStop.addEventListener('click', function (event) {
        event.preventDefault();
        if(getComputedStyle(webStop).backgroundImage.includes("stop.svg")) {
            window.clearInterval(TimerID);
            webStop.style.backgroundImage = "url('img/start.svg')";
            autoPlayRemove();
        }else {
            this.style.backgroundImage = "url('img/stop.svg')";
            startSlider();
            autoPlayAdd();
        }
    });

});