(function(){
    'use strict';
    
    var pairs = 2;
    var cards = [];

    var flipCount = 0;
    var firstCard = null;
    var secoundCard = null;

    var startTime;
    var isRunning = false;
    var correctCount = 0;
    var timeoutId;

    function init() {
        var i;
        var card;
        // 同じカード２枚を配列(cards)に格納
        for(i =1; i<= pairs; i++) {
            cards.push(createCard(i));
            cards.push(createCard(i));
        }
        // ランダムにcardsを出力
        while(cards.length) {
            card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
            document.getElementById('stage').appendChild(card);
        }
    }

    // カードを作成
    function createCard(num) {
        var card;
        var inner;
        var container;
        inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';
        card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = inner;
        card.addEventListener('click', function() {
            // カードをめくる
            flipCard(this);
            // タイマーを開始
            if(isRunning === true) {
                return;
            }
            isRunning = true;
            startTime = Date.now();
            runTimer();
            document.getElementById('restart').className = '';
        });
        container = document.createElement('div');
        container.className = 'card-container';
        container.appendChild(card);
        return container;
    }

    // カードをめくる処理
    function flipCard(card) {
        if(firstCard !== null && secoundCard !== null) {
            return;
        }
        if(card.className.indexOf('open') !== -1) {
            return;
        }
        card.className = 'card open';
        flipCount++;
        if(flipCount % 2 == 1) {
            // 1回目
            firstCard = card;
        } else {
            // 2回目
            secoundCard = card;
            // 1枚目と2枚目のカードチェック
            secoundCard.addEventListener('transitionend', check);
        }
    }

    // 1枚目と2枚目のカードチェック
    function check() {
        if(firstCard.children[0].textContent !== secoundCard.children[0].textContent) {
            // 1枚目と2枚目のカードが異なる場合
            firstCard.className = 'card';
            secoundCard.className = 'card';
        } else {
            // 1枚目と2枚目のカードが同じ場合
            correctCount++;
            // 2回目の時->時間を止める
            if(correctCount === pairs) {
                clearTimeout(timeoutId);
            }
        }
        secoundCard.removeEventListener('transitionend', check);
        firstCard = null;
        secoundCard = null;
    }

    function runTimer() {
        document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
        timeoutId = setTimeout(function() {
            runTimer();
        }, 10);
    }

    init();
})();