 var canvas = document.getElementById('myCanvas');
                        var context = canvas.getContext('2d');	
						canvas.addEventListener('mousedown',mouseDownInfo);
						
						canvas.addEventListener('mousemove',mouseDragInfo);
						
						canvas.addEventListener('mouseup',foodShot);
						
						var swing = new Audio();
						swing.src = 'swing.mp3';
						var burgerPosX = 100;
						var burgerPosY = 300;
						var xVelocity = 0;
						var yVelocity = 0;
						var time = 1;
						var gravity = 2;
						var targetX = 0;
						var targetY = 0;
						var p1CenterX = 146;
						var p1CenterY = 550;
						var p2CenterX = 1046;
						var p2CenterY = 550;
						
						var shot = false;
						var hit = false;
						var mouseDown = false;
						var isPlayerOne = true;
						
						var startX = 0;
						var startY = 0;
						var endX = 0;
						var endY = 0;
						
						var playerOne = new Array();
						var playerTwo = new Array();
						var burger = new Image();
						var room = new Image();
						var explode = new Image();
						var brad = new Image();
						var target = new Image();
						var candle = new Image();
						
						var p1Weight = 0;
						var p2Weight = 0;
						
						var p1EricX = 100;
						var p1EricY = 500;
						var p2EricX = 1000;
						var p2EricY = 500;
						
						var p2HitRangeLowX = 990;
						var p2HitRangeHighX = 1075;
						var p2HitRangeLowY = 490;
						var p2HitRangeHighY = 575;	
						
						var p1HitRangeLowX = 95;
						var p1HitRangeHighX = 180;
						var p1HitRangeLowY = 490;
						var p1HitRangeHighY = 575;
						
						explode.src = 'xplode.gif';
						room.src = 'room2.jpg';
						burger.src = 'food-burger.gif';
						brad.src = 'brad-hill.jpg';
						target.src = 'target.gif';
						candle.src = 'candle.gif';
						
						playerOne[0] = new Image();		//player one image array
						playerOne[0].src = 'eric1.gif';
						playerOne[1] = new Image();
						playerOne[1].src = 'eric2.gif';
						playerOne[2] = new Image();
						playerOne[2].src = 'eric3.gif';					
						playerOne[3] = new Image();
						playerOne[3].src = 'eric4.gif';

						playerTwo[0] = new Image();		//player two image array
						playerTwo[0].src = 'bad-eric1.gif';
						playerTwo[1] = new Image();
						playerTwo[1].src = 'bad-eric2.gif';
						playerTwo[2] = new Image();
						playerTwo[2].src = 'bad-eric3.gif';
						playerTwo[3] = new Image();
						playerTwo[3].src = 'bad-eric4.gif';
						
						function mouseDownInfo(e){
							console.log(e.offsetX + " " + e.offsetY);
							mouseDown = true;
							startX = e.offsetX;
							startY = e.offsetY;
						}
						function mouseDragInfo(e) {
							console.log(e.offsetX + " " + e.offsetY);
							targetX = startX - e.offsetX;
							targetY = startY - e.offsetY;
						}
						function foodShot(e) {
							//console.log(e.offsetX + " " + e.offsetY);
							if(!shot) {
								shot = true;
								mouseDown = false;
								endX = e.offsetX;
								endY = e.offsetY;
								xVelocity = (startX - endX)/15;
								yVelocity = (startY - endY)/10;
								if(isPlayerOne) {
									burgerPosX = 175;
									burgerPosY = 530;
									swing.load();
									swing.play();
								}
								else{
									burgerPosX = 975;
									burgerPosY = 530;
									swing.load();
									swing.play();
								}	
							}
							
						}
						function isHit() {
							hit = true;
							shot = false;
						}
						function burgerReset() {
							time = 1;
							yVelocity = 0;
							burgerPosX = 300; //reset burger pos after 'hit'
							burgerPosY = 100;
							shot = false;
						}
						function gameReset() {
							p1EricX = 100;
							p1EricY = 500;
							p2EricX = 1000;
							p2EricY = 500;
							p1Weight = 0;
							p2Weight = 0;
							hit = false;
							p2HitRangeLowX = 990;
							p2HitRangeHighX = 1075;
							p2HitRangeLowY = 490;	
							p1HitRangeLowX = 95;
							p1HitRangeHighX = 180;
							p1HitRangeLowY = 490;
							isPlayerOne = true;
						}
						function switchPlayer() {
							if(isPlayerOne) {
								isPlayerOne = false;
							}
							else {
								isPlayerOne = true;
							}
						}
						// 										update game main loop
						var updateGame = function(){
							if(shot) {
								burgerPosX += xVelocity;
								burgerPosY += yVelocity + .5*gravity*Math.pow(time,2);
								time += .1;
								if((burgerPosX > 1200) || (burgerPosY > 706) || (burgerPosX < 0)){
									shot = false;
									burgerReset();
									switchPlayer();
								}
							}
							if(!isPlayerOne) {
								if((burgerPosX > p1HitRangeLowX && burgerPosX < p1HitRangeHighX) && (burgerPosY > p1HitRangeLowY && burgerPosY < p1HitRangeHighY)) {
									isHit();
									p1Weight++;
									p1EricX -= 15;
									p1EricY -= 28;
									p1HitRangeLowX -= 14;
									p1HitRangeHighX += 14;
									p1HitRangeLowY -= 28;
									burgerReset();
									switchPlayer();
									if(p1Weight>=4) {
										context.drawImage(explode, p1EricX, p1EricY);
										alert("player two wins!")
										gameReset()
									}
								}
							}
							if(isPlayerOne) {
								if((burgerPosX > p2HitRangeLowX && burgerPosX < p2HitRangeHighX) && (burgerPosY > p2HitRangeLowY && burgerPosY < p2HitRangeHighY)) {
									isHit();
									p2Weight++;
									p2EricX -= 15;
									p2EricY -= 28;
									p2HitRangeLowX -= 14;
									p2HitRangeHighX += 14;
									p2HitRangeLowY -= 28;
									burgerReset();
									switchPlayer();
									if(p2Weight>=4) {
										context.drawImage(explode, p2EricX, p2EricY);
										alert("player one wins!")
										gameReset()
									}
								}
							}
							
						}
						// 										draw game main function
						var drawGame = function(){
							context.drawImage(room, 0,0);
							context.drawImage(brad, 530,25);
							context.drawImage(candle, 497, 43);
							context.drawImage(candle, 650, 43);
							context.drawImage(playerOne[p1Weight], p1EricX, p1EricY);
							//if(!hit) {
							context.drawImage(playerTwo[p2Weight], p2EricX, p2EricY);
							//}
							//if(hit) {
								//context.drawImage(explode, 555, 240);
							//}
							var newX = 0;
							var newY = 0;
							if(mouseDown) {							
								if(isPlayerOne) {
									context.drawImage(target, (p1CenterX + targetX), (p1CenterY + targetY));
								}
								else {
									context.drawImage(target, (p2CenterX + targetX), (p2CenterY + targetY));
								}
							}
							if(shot) {
								context.drawImage(burger, burgerPosX, burgerPosY);
							}
							//context.font="50px Garamount";
							//context.fillStyle='red';
							//context.fillText("FAT ATTACK", 260, 150);
							if(isPlayerOne) {
								context.font="30px Arial";
								context.fillStyle='#00FF00';
								context.fillText("Player One",10,50);
							}
							else {
								context.font="30px Arial";
								context.fillStyle='#00FF00';
								context.fillText("Player Two",1040,50);
							}
							if(hit) {
								//context.font="50px Garamount";
								//context.fillStyle='#FF0000';
						
								//context.fillText("HIT!", 500, 150);
								//alert("You hit the enemy!");
								hit = false;
							}
						}
						// 										main game loop
						var ONE_FRAME_TIME = 1000 / 60;
						var mainloop = function() {
							updateGame();
							drawGame();
						}
						setInterval( mainloop, ONE_FRAME_TIME );