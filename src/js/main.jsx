import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
require('../sass/main.scss');
import imgs from './images'
console.log(imgs);
class Game extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            monsters:[],
            detectedMonster:{positionX: 0, positionY: 0},
            heroLevel: 1,
            heroLife: 4,
            heroStrength:4,
            heroXp: 0,
            cX: 0,
            cY: 250,
            imX: 0,
            imY: 0,
            imSize: 80,
            detectionRight: false,
            detectionLeft: false,
            detectionUp: false,
            detectionDown: false,
            detectMonster: false,
            level: 1


        }
    }



    render(){
        return(
            <div className="main">
                <div className="header"></div>

                <div className="wrapper">
                    <canvas className="canva" width="1000" height="700" id="myCanvas" ref={(canv) => { this.canvas = canv; }}></canvas> {/*mam this.canvas*/}
                    <div className="sidebar">
                        <h1>Name: Lothar</h1>
                    </div>
                </div>
            </div>
        )
    }

    fight = ()=>{
        let ctx = this.canvas.getContext('2d');
        let heroThrow = Math.ceil(Math.random()*10+this.state.heroStrength);
        let monsterThrow =  Math.ceil(Math.random()*10);
        let positionX = this.state.detectedMonster.positionX;
        let positionY = this.state.detectedMonster.positionY;


        this.setState({
            detectMonster: false,
        })

        if(heroThrow > monsterThrow){
            ctx.clearRect(positionX, positionY, 80, 80)
            alert("Wygrałeś walkę, zdobywasz doświadczenie");
            this.setState({
                heroXp: this.state.heroXp+50,
                monsters: this.state.monsters.filter((e)=>{
                    return e.positionX !== positionX && e.positionY !== positionY
                })
            })
        }else{
            alert("Przegrałeś walke, tracisz punkt życia");
            this.setState({
                heroLife: this.state.heroLife -1
            })
        }


    };


    drawMonsters =  ()=> {
        let ctx = this.canvas.getContext('2d');
        let monsterImg = new Image();
        monsterImg.src = imgs[1];

        let monstersAmount = Math.ceil(Math.random()*3)+Math.floor(this.state.level/2);

        let monstersArr =[];

        monsterImg.onload= () =>{
            for(let i = 0; i < monstersAmount; i++){
                let x = Math.round(Math.random()*(91-10)+10)*10;
                let y = Math.round(Math.random()*(62-25)+25)*10;

                if(i > 0){

                    if(x !== monstersArr[i-1].positionX && y !== monstersArr[i-1].positionY){

                        ctx.drawImage(monsterImg,x,y,80,80);
                        monstersArr.push({positionX: x, positionY:y});

                    }
                }else{
                    ctx.drawImage(monsterImg,x,y,80,80);
                    monstersArr.push({positionX: x, positionY:y});
                }



            }
        };
        this.setState({monsters: monstersArr})

    };

    detectMonsterRight(){

        for(let i = 0; i < this.state.monsters.length; i++){
                if(this.state.cX === this.state.monsters[i].positionX - 80 && (this.state.cY < this.state.monsters[i].positionY+70&&
                        this.state.cY > this.state.monsters[i].positionY-80)){

                    this.setState({
                        detectMonster: true,
                        detectedMonster: {positionX: this.state.monsters[i].positionX, positionY: this.state.monsters[i].positionY}
                    })
                }


            }

    };

    detectMonsterLeft(){

        for(let i = 0; i < this.state.monsters.length; i++){
            if(this.state.cX === this.state.monsters[i].positionX + 80 && (this.state.cY < this.state.monsters[i].positionY+70&&
                    this.state.cY > this.state.monsters[i].positionY-80)){

                this.setState({
                    detectMonster: true,
                    detectedMonster: {positionX: this.state.monsters[i].positionX, positionY: this.state.monsters[i].positionY}
                })
            }


        }

    };

    detectMonsterUp(){

        for(let i = 0; i < this.state.monsters.length; i++){
            console.log("monsterX: ",this.state.monsters[i].positionX);
            console.log("myX: ",this.state.cX);
            if(this.state.cY === this.state.monsters[i].positionY + 80 && (this.state.cX < this.state.monsters[i].positionX+80&&
                    this.state.cX > this.state.monsters[i].positionX-80)){

                this.setState({
                    detectMonster: true,
                    detectedMonster: {positionX: this.state.monsters[i].positionX, positionY: this.state.monsters[i].positionY}
                })
            }


        }

    };

    detectMonsterDown(){

        for(let i = 0; i < this.state.monsters.length; i++){
            console.log("monsterX: ",this.state.monsters[i].positionX);
            console.log("myX: ",this.state.cX);
            if(this.state.cY === this.state.monsters[i].positionY - 80 && (this.state.cX < this.state.monsters[i].positionX+80&&
                    this.state.cX > this.state.monsters[i].positionX-80)){

                this.setState({
                    detectMonster: true,
                    detectedMonster: {positionX: this.state.monsters[i].positionX, positionY: this.state.monsters[i].positionY}
                })
            }


        }

    };




    draw(hero) {
        const ctx = this.canvas.getContext('2d');
        let heroImg = new Image();
        heroImg.src = imgs[3];

        this.checkDetection();
        ctx.drawImage(hero, this.state.imX, this.state.imY, this.state.imSize, this.state.imSize, this.state.cX, this.state.cY, this.state.imSize,this.state.imSize);


    }
    move(imX,cX,cY, hero) {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(this.state.cX, this.state.cY, this.state.imSize, this.state.imSize,);

        this.setState({
            cX: this.state.cX += cX * 10,
            cY: this.state.cY += cY * 10,
            imX:this.state.imX= imX
        });

        this.draw(hero);
    }

    checkDetection() {
        const canvaWidth = 1000;
        const canvaHeight = 700;
        this.setState({
            detectionRight: this.state.cX > canvaWidth - this.state.imSize-10? true: false,
            detectionLeft: this.state.cX < 10? true: false,
            detectionDown: this.state.cY > canvaHeight - this.state.imSize-10? true: false,
            detectionUp: this.state.cY < 250? true: false,
        })
    }

    componentDidMount(){
        let heroImg = new Image();
        heroImg.src = imgs[3];

        heroImg.onload=()=>{
            this.draw(heroImg);
        };
        this.drawMonsters();

        document.addEventListener("keydown", (e)=> {

            if(e.keyCode === 40&&!this.state.detectionDown && !this.state.detectMonster){
                //w dol
                this.detectMonsterDown()
                if(!this.state.detectMonster){
                    this.move(160,0,1,heroImg)
                }
                else{
                    this.fight()
                }

            }else if(e.keyCode === 38&&!this.state.detectionUp && !this.state.detectMonster){
                // w gore
                this.detectMonsterUp()
                if(!this.state.detectMonster){
                    this.move(0,0,-1,heroImg)
                }else{
                    this.fight()
                }

            }else if(e.keyCode === 39 &&!this.state.detectionRight){
                //w prawo

                this.detectMonsterRight()

                if(!this.state.detectMonster){
                    this.move(80,1,0,heroImg)
                }else{
                    this.fight()
                }

            }else if(e.keyCode === 37 &&!this.state.detectionLeft && !this.state.detectMonster){
                //w lewo
                this.detectMonsterLeft()
                if(!this.state.detectMonster){
                    this.move(240,-1,0,heroImg)
                }else{
                    this.fight()
                }
            }


        })

    }

};





















document.addEventListener("DOMContentLoaded", function () {

    ReactDOM.render(
        <Game/>,
        document.getElementById("app")
    )








});