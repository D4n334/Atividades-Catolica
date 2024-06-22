                const FPS = 60; // Frames Por Segundo
                const FRICTION = 0.7; //Coeficiente de atrito do espaço (0 = sem fricçao, 1 = fricção absurda)
                const GAME_LIVES = 3; //Numero inicial de vidas
                const LASER_MAX = 10;// numero maximo de lasers na tela por vez
                const LASER_DIST = 0.6;// Distancia maxima que um laser percorre
                const LASER_SPEED = 500; // velocidade do laser em pixels por segundo
                const LASER_EXPLODE_DUR = 0.1; //Duração das explosoes dos lasers em segundos
                const PEDRA_NUM = 3; // Numero de pedras iniciais
                const PEDRA_PTS_LGE = 20;//VALOR PEDRA GRANDE
                const PEDRA_PTS_MED = 50; //VALOR PEDRA MEDIA                
                const PEDRA_PTS_SML= 100; //VALOR PEDRA PIKENA
                const PEDRA_ENT = 0.6; //Dano na estrutura das preda(0 = nenhum dano, 1 = MUITO DANO)
                const PEDRA_SPEED = 50; // velocidade inicial das pedras em pixels por segundo
                const PEDRA_TAM = 100; // Tamanho inicial das pedra em pixels
                const PEDRA_VERT = 10; // número médio de vertices das pedra
                const SHIP_SIZE = 30;// Altura da nave em pixels
                const SHIP_THRUST = 5; //Aceleração da nave em pixels por segundo
                const SHIP_EXPLODE_DUR = 0.3; //Duração da explosao da nave
                const SHIP_BLINK_DUR = 0.1; // Duração das piscadas da nave em segundos
                const SAVE_KEY_SCORE = "HighScore";// Salvando a pontuação mais alta numa Key(html5)
                const SHIP_INV_DUR = 3; //Duração da invisibilidade da nave em segundos
                const TURN_SPEED = 360;// Velocidade da rotação em graus por segundo 
                const SHOW_BOUNDING = false; // mostra ou esconde as colisões
                const SHOW_DOT = true // mostra um ponto central na nave
                const TEXT_FADE_TIME = 2.5; //Fade do texto em segundos                   
                const TEXT_TAM = 40; //tamanho do texto em pixels                
               
                
                /**@type {HTMLCanvasElement} */
                var canv = document.getElementById("canvaJogo");
                var ctx = canv.getContext("2d");
                
                //propriedades do jogo
                var level, lives, pedras, ship, score, scoreHigh, text, textAlpha;
                newGame();

                // implementando eventos de controle
                document.addEventListener("keydown", keyDown);
                document.addEventListener("keyup", keyUp);

                //implementando o loop o loop
                setInterval(update, 1000 / FPS);

                function createCinturaodePedra() {
                    pedras = [];
                    var x, y;
                    for (var i = 0; i < PEDRA_NUM + level; i++) {
                        do {
                            x = Math.floor(Math.random() * canv.width);
                            y = Math.floor(Math.random() * canv.height);
                        } while (distEntrePontos(ship.x, ship.y, x, y) < PEDRA_TAM * 2 + ship.r);
                        pedras.push(newPedra(x, y, Math.ceil(PEDRA_TAM / 2)));
                    }
                }

                function destroyPedra(index) {
                    var x = pedras[index].x;
                    var y = pedras[index].y;
                    var r = pedras[index].r;

                    //dividir a pedra em 2 se nescessário
                    if (r == Math.ceil(PEDRA_TAM / 2)){
                        pedras.push(newPedra(x, y, Math.ceil(PEDRA_TAM / 4)));
                        pedras.push(newPedra(x, y, Math.ceil(PEDRA_TAM / 4)));
                        score += PEDRA_PTS_LGE;
                    } else if (r == Math.ceil(PEDRA_TAM / 4)){
                        pedras.push(newPedra(x, y, Math.ceil(PEDRA_TAM / 8)));
                        pedras.push(newPedra(x, y, Math.ceil(PEDRA_TAM / 8)));
                        score += PEDRA_PTS_MED;
                    } else{
                        score += PEDRA_PTS_SML;
                    }

                    //checar maior score
                    if (score > scoreHigh){
                        scoreHigh = score;
                        localStorage.setItem(SAVE_KEY_SCORE, scoreHigh);
                    }
                    //destruir a pedra
                    pedras.splice(index, 1);

                    //novo level assim que acabar as pedras
                    if (pedras.length == 0) {
                        level++;
                        newLevel();
                    }
                }

                function distEntrePontos(x1, y1, x2, y2) {
                    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                }

                function drawNave(x, y, a, color = "white"){
                    ctx.strokeStyle = color;
                    ctx.lineWidth = SHIP_SIZE / 20;
                    ctx.beginPath();
                    ctx.moveTo(// Ponta da Nave
                         x + 4 / 3 * ship.r * Math.cos(a),
                         y - 4 / 3 * ship.r * Math.sin(a)
                    );
                    ctx.lineTo( // Esquerda traseira da nave
                        x - ship.r * (2 / 3 * Math.cos(a) + Math.sin(a)),
                        y + ship.r * (2 / 3 * Math.sin(a) - Math.cos(a))
                    );
                    ctx.lineTo( // Direita traseira da nave
                        x - ship.r * (2 / 3 * Math.cos(a) - Math.sin(a)),
                        y + ship.r * (2 / 3 * Math.sin(a) + Math.cos(a))
                    );
                    ctx.closePath();
                    ctx.stroke();

                }

                function explodeNave(){
                   ship.explodeTime = Math.ceil(SHIP_EXPLODE_DUR) * FPS;
                }

               // Função para salvar a pontuação no servidor
                async function saveScore(username, score) {
                    try {
                        const response = await fetch('/save-score', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ username, score })
                        });

                        if (!response.ok) {
                            throw new Error('Erro ao salvar pontuação');
                        }

                        const result = await response.json();
                        console.log('Pontuação salva com sucesso:', result);
                    } catch (error) {
                        console.error('Erro ao salvar pontuação:', error);
                    }
                }

                // Função que lida com o fim do jogo e salva a pontuação
                function gameOver() {
                    ship.dead = true;
                    text = "Game Over";
                    textAlpha = 1.0;

                    // Salvar a pontuação no ranking
                    let session = JSON.parse(localStorage.getItem('session'));
                    if (session && session.username) {
                        saveScore(session.username, score);
                    }

                    // Redirecionar para a página de ranking após um pequeno atraso
                    setTimeout(() => {
                        window.location.href = 'ranking.html';
                    }, 3000); // 3 segundos de atraso para mostrar "Game Over"
                }



                function keyDown(/** @type {KeyboardEvent}*/ ev) {

                    if(ship.dead){
                        return;
                    }

                    switch (ev.keyCode) {
                        case 32:// Barra de espaço (PARA ATIRAR O LEYSI)
                            shootLaser();
                            break;
                        case 37:// Seta para esquerda(rotacionar nave para esquerda)
                            ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
                            break;
                        case 38:// Seta para cima (Impulso da nave)
                            ship.thrusting = true;
                            break;
                        case 39:// Seta para direita(Rotacionar para direita)
                            ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;

                            break;

                    }
                }

                function keyUp(/** @type {KeyboardEvent}*/ ev) {

                    if(ship.dead){
                        return;
                    }

                    switch (ev.keyCode) {
                        case 32:// Barra de espaço (RESETAR O ATIRAR O LEYSI)
                            ship.canShoot = true;
                            break;
                        case 37:// Seta para esquerda(Parar de rotacionar)
                            ship.rot = 0;
                            break;
                        case 38:// Seta para cima (parar Impulso da nave)
                            ship.thrusting = false;
                            break;
                        case 39:// Seta para direita( Parar de Rotacionar para direita)
                            ship.rot = 0
                            break;
                    }

                }

                function newPedra(x, y, r) {
                    var lvlMult = 1 + 0.1 * level;
                    var pedra = {
                        x: x,
                        y: y,
                        xv: Math.random() * PEDRA_SPEED * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
                        yv: Math.random() * PEDRA_SPEED * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
                        r: r,
                        a: Math.random() * Math.PI * 2,// Raio da pedra
                        vert: Math.floor(Math.random() * (PEDRA_VERT + 1) + PEDRA_VERT / 2), // Vértice das pedra
                        offs: []
                    };

                    //criar as compensações do vértice num array
                    for (var i = 0; i < pedra.vert; i++) {
                        pedra.offs.push(Math.random() * PEDRA_ENT * 2 + 1 - PEDRA_ENT);
                    }

                    return pedra;
                }

                function newGame(){
                    level = 0;
                    lives = GAME_LIVES;
                    score = 0;
                    ship = novaShip();

                    //PEGAR O SCORE DO ARMAZENAMENTO LOCAL  
                    var scoreStr = localStorage.getItem(SAVE_KEY_SCORE);
                    if (scoreStr == null) {
                        scoreHigh = 0;
                    } else {
                        scoreHigh = parseInt(scoreStr);
                    }
                    newLevel();
                }

                function newLevel(){
                    text = "Level " + (level +1);
                    textAlpha = 1.0;
                    createCinturaodePedra();
                }

                function novaShip(){
                    return{
                        x: canv.width / 2, //Posição horizontal
                        y: canv.height / 2,//Posição vertical
                        r: SHIP_SIZE / 2,   // Raio da nave
                        a: 90 / 180 * Math.PI, // Angulo convertendo para raio
                        blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
                        blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
                        canShoot: true, // poder atirar o tempo todin
                        dead: false,
                        explodeTime: 0, // tempo da explosao
                        lasers: [],
                        rot: 0,// rotação
                        thrusting: false,//Impulsão da nave
                        thrust: {
                        x: 0,
                        y: 0
                        }
                    }
                }

                function shootLaser(){
                    //criar o objeto laser
                    if (ship.canShoot && ship.lasers.length < LASER_MAX){
                        ship.lasers.push({ //tiro sai da pontinha da naves
                            x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
                            y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
                            xv: LASER_SPEED * Math.cos(ship.a) / FPS,
                            yv: -LASER_SPEED * Math.sin(ship.a) / FPS,
                            dist: 0,
                            explodeTime: 0
                        })
                    }
                    // cooldown dos tiros
                    ship.canShoot = false;
                }


                function saveScore(user, score) {
                    let rankings = JSON.parse(localStorage.getItem('rankings')) || [];
                    let userScore = rankings.find(rank => rank.user === user);
                
                    if (userScore) {
                        userScore.score += score;
                    } else {
                        rankings.push({ user, score });
                    }
                
                    rankings.sort((a, b) => b.score - a.score); // Ordenar por pontuação decrescente
                    localStorage.setItem('rankings', JSON.stringify(rankings));
                }
                
                

                function update() {
                    var blinkOn = ship.blinkNum % 2 == 0;
                    var exploding = ship.explodeTime > 0; 

                    // desenhar o espaço
                    ctx.fillStyle = "black";
                    ctx.fillRect(0, 0, canv.width, canv.height);

                    //impulso da nave(Foguin)
                    if (ship.thrusting && !ship.dead) {
                        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
                        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
                        
                        //Desenhar o foguin
                        if (!exploding && blinkOn){
                            ctx.fillStyle = "white";
                            ctx.strokeStyle = "blue";
                            ctx.lineWidth = SHIP_SIZE / 10;
                            ctx.beginPath();
                            ctx.moveTo(// Esquerda Traseira da nave
                                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
                            );
                            ctx.lineTo( // Traseira central atrás da nave
                                ship.x - ship.r * 6 / 3 * Math.cos(ship.a),
                                ship.y + ship.r * 6 / 3 * Math.sin(ship.a)
                            );
                            ctx.lineTo( // Direita traseira da nave
                                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
                            );
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();
                        } 

                    } else {
                        ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
                        ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
                    }

                    //desenhar a nave triangular
                    if (!exploding){
                        if(blinkOn && !ship.dead){
                           drawNave(ship.x, ship.y, ship.a);
                        }
                        // controlar blink
                        if (ship.blinkNum > 0){
                            //reduzir o blink
                            ship.blinkTime--;

                            //reduzir o blinkNum
                            if (ship.blinkTime == 0){
                                ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
                                ship.blinkNum--;
                            }
                        }

                    } else{
                        // desenhar explosão
                        ctx.fillStyle = "darkred";
                        ctx.beginPath();
                        ctx.arc(ship.x, ship.y, ship.r * 1.6, 0, Math.PI * 2, false );
                        ctx.fill();
                        ctx.fillStyle = "red";
                        ctx.beginPath();
                        ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false );
                        ctx.fill();
                        ctx.fillStyle = "orange";
                        ctx.beginPath();
                        ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false );
                        ctx.fill();
                        ctx.fillStyle = "yellow";
                        ctx.beginPath();
                        ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false );
                        ctx.fill();
                        ctx.fillStyle = "white";
                        ctx.beginPath();
                        ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false );
                        ctx.fill();
                    }


                    if (SHOW_BOUNDING) {
                        ctx.strokeStyle = "lime";
                        ctx.beginPath();
                        ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
                        ctx.stroke();
                    }

                    //desenhar as pedra
                    var x, y, r, a, vert, offs;
                    for (var i = 0; i < pedras.length; i++) {
                        ctx.strokeStyle = "slatergray";
                        ctx.lineWidth = SHIP_SIZE / 20;

                        // pegando as propriedades das pedra
                        x = pedras[i].x;
                        y = pedras[i].y;
                        r = pedras[i].r;
                        a = pedras[i].a;
                        vert = pedras[i].vert;
                        offs = pedras[i].offs;

                        //desenhar o caminho do desenho
                        ctx.beginPath();
                        ctx.moveTo(
                            x + r * offs[0] * Math.cos(a),
                            y + r * offs[0] * Math.sin(a)
                        );
                        //desenhar o polígono
                        for (var j = 1; j < vert; j++) {
                            ctx.lineTo(
                                x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                                y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
                            );
                        }
                        ctx.closePath();
                        ctx.stroke();

                        if (SHOW_BOUNDING) {
                            ctx.strokeStyle = "red";
                            ctx.beginPath();
                            ctx.arc(x, y, r, 0, Math.PI * 2, false);
                            ctx.stroke();
                        }
                    }

                    // centralizar dot
                    if (SHOW_DOT) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
                    }

                    //desenhar lasers
                    for (var i = 0; i < ship.lasers.length; i++) {
                        if(ship.lasers[i].explodeTime == 0){
                            ctx.fillStyle = "salmon";
                            ctx.beginPath();
                            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
                            ctx.fill();
                        } else{
                            //desenhar explosaoooo
                            ctx.fillStyle = "salmon";
                            ctx.beginPath();
                            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 1, 0, Math.PI * 2, false);
                            ctx.fill();
                            ctx.fillStyle = "orangered";
                            ctx.beginPath();
                            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
                            ctx.fill();
                            ctx.fillStyle = "white";
                            ctx.beginPath();
                            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, 0, Math.PI * 2, false);
                            ctx.fill();
                            ctx.fillStyle = "pink";
                            ctx.beginPath();
                            ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
                            ctx.fill();
                            
                        }
                    }

                    //desenhar as letras do jogo
                    if(textAlpha >= 0){
                        ctx.fillStyle = "rgba(255,255,255," + textAlpha + ")";
                        ctx.font = "small-caps " + TEXT_TAM + "px Midnew regular";
                        ctx.fillText(text, canv.width / 2, canv.height * 0.75);
                        textAlpha -= (1.0 / TEXT_FADE_TIME / FPS);
                    } else if (ship.dead){
                        newGame();
                    }

                    //desenhar as vidas
                    var lifeColor;
                    for(var i = 0; i < lives; i++){
                        lifeColor = exploding && i == lives - 1 ?  "red" : "Lightblue";
                        drawNave(SHIP_SIZE + i * SHIP_SIZE * 1.2, SHIP_SIZE, 0.5 * Math.PI, lifeColor);
                    }

                    //desenhar o score
                    ctx.textAlign = "right"
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "white"
                    ctx.font = TEXT_TAM + "px Midnew regular";
                    ctx.fillText(score, canv.width - SHIP_SIZE / 2 , SHIP_SIZE);

                    //desenhar o score
                    ctx.textAlign = "center"
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "lightblue"
                    ctx.font = (TEXT_TAM * 0.70) + "px Midnew regular";
                    ctx.fillText("BEST: " + scoreHigh, canv.width / 2 , SHIP_SIZE);


                    //colisao do laser nas pedras
                    var px, py, pr, lx, ly;
                    for (var i = pedras.length - 1; i >= 0; i--) {
                        
                        //Pegando as propriedades das peedras
                        px = pedras[i].x;
                        py = pedras[i].y;
                        pr = pedras[i].r;

                        //looop sobre os lazeres
                        for (var j = ship.lasers.length - 1; j >= 0; j--) {
                            
                            //pegar as propriedades do laseeer
                            lx = ship.lasers[j].x;
                            ly = ship.lasers[j].y;
                            
                            //detectar acertos
                            if (ship.lasers[j].explodeTime == 0 && distEntrePontos(px, py, lx, ly) < pr) {
                                
                                //remover pedra e ativar explosão de lalalaser
                                destroyPedra(i);
                                ship.lasers[j].explodeTime = Math.ceil(LASER_EXPLODE_DUR * FPS)

                                break;
                            }
                        }
                    }

                    // checar as colisões das pedras
                    if (!exploding){
                        if (ship.blinkNum == 0 && !ship.dead){
                            for (var i = 0; i < pedras.length; i++) {
                                if (distEntrePontos(ship.x, ship.y, pedras[i].x, pedras[i].y) < ship.r + pedras[i].r) {
                                   explodeNave();
                                   destroyPedra(i);
                                   break;
                                }
                            } 
                        }
                        
                        //rotacionar a nave
                        ship.a += ship.rot;

                        //mover a nave
                        ship.x += ship.thrust.x;
                        ship.y += ship.thrust.y;
                    } else {
                        //reduzir o tempo da explosão
                        ship.explodeTime--;

                        // resetar a nave após explosão acabar
                        if (ship.explodeTime == 0){
                            lives--;
                            if(lives == 0){
                                gameOver();
                            } else {
                            ship = novaShip();
                            }
                        }
                    }
                    //Canto da tela
                    if (ship.x < 0 - ship.r) {
                        ship.x = canv.width + ship.r;
                    } else if (ship.x > canv.width + ship.r) {
                        ship.x = 0 - ship.r;
                    }
                    if (ship.y < 0 - ship.r) {
                        ship.y = canv.height + ship.r;
                    } else if (ship.y > canv.height + ship.r) {
                        ship.y = 0 - ship.r;
                    }

                    //mover os laserssssss
                    for (var i = ship.lasers.length - 1; i >= 0; i--) {

                        //checar distancia do leize
                        if (ship.lasers[i].dist > LASER_DIST * canv.width ) {
                            ship.lasers.splice(i, 1);
                            continue;
                        }

                        // manusear a explosao
                        if (ship.lasers[i].explodeTime > 0){
                            ship.lasers[i].explodeTime--;

                            //destroir o laeise
                            if (ship.lasers[i].explodeTime == 0){
                                ship.lasers.splice(i, 1);
                                continue;
                            }

                        } else{
                            //mover o lase
                            ship.lasers[i].x += ship.lasers[i].xv;
                            ship.lasers[i].y += ship.lasers[i].yv;

                            //calcular a distância percorrida do lazeer
                            ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
                        }

                        //canto da tela para os laserssss
                        if (ship.lasers[i].x < 0) {
                            ship.lasers[i].x = canv.width;
                        } else if (ship.lasers[i].x > canv.width) {
                            ship.lasers[i].x = 0;
                        }
                        if (ship.lasers[i].y < 0){
                            ship.lasers[i].y = canv.height;
                        } else if (ship.lasers[i].y > canv.height){
                            ship.lasers[i].y = 0;
                        }
                    }

                    //mover a pedra
                    for (var i = 0; i < pedras.length; i++) {
                        pedras[i].x += pedras[i].xv;
                        pedras[i].y += pedras[i].yv;

                        //canto da tela para os asteroids
                        if (pedras[i].x < 0 - pedras[i].r) {
                            pedras[i].x = canv.width + pedras[i].r;
                        } else if (pedras[i].x > canv.width + pedras[i].r) {
                            pedras[i].x = 0 - pedras[i].r;
                        }

                        if (pedras[i].y < 0 - pedras[i].r) {
                            pedras[i].y = canv.height + pedras[i].r;
                        } else if (pedras[i].y > canv.height + pedras[i].r) {
                            pedras[i].y = 0 - pedras[i].r;
                        }
                    }
                }