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
            hero:{},
            level: 1
        }
    }


    render(){
        return(
            <div className="main">
                <div className="header"></div>

                <div className="wrapper">
                    <canvas width="1000" height="700" id="myCanvas" ref={(canv) => { this.canvas = canv; }}></canvas> {/*mam this.canvas*/}
                    <div className="sidebar">
                        <h1>Name: Lothar</h1>
                    </div>
                </div>
            </div>
        )
    }


    drawMonsters =  ()=> {
        let ctx = this.canvas.getContext('2d');
        let monsterImg = new Image();
        monsterImg.src = imgs[1];

        let monstersAmount = Math.ceil(Math.random()*3)+Math.floor(this.state.level);

        let monstersArr =[];

        monsterImg.onload= () =>{
            for(let i = 0; i < monstersAmount; i++){
                let x = Math.round(Math.random()*(92-10)+10)*10;
                let y = Math.round(Math.random()*(62-10)+10)*10;

                if(i > 0){

                    if(x !== monstersArr[i-1].positionX && y !== monstersArr[i-1].positionY){

                        ctx.drawImage(monsterImg,x,y,70,70);
                        monstersArr.push({positionX: x, positionY:y});

                    }
                }else{
                    ctx.drawImage(monsterImg,x,y,70,70);
                    monstersArr.push({positionX: x, positionY:y});
                }



            }
        };
        this.setState({})

    };








    componentDidMount(){

        const ctx = this.canvas.getContext('2d');
        const canvaWidth = 1000;
        const canvaHeight = 700;
        let detectionRight = false;
        let detectionLeft = false;
        let detectionUp = false;
        let detectionDown = false;
        let heroImg = new Image();
        heroImg.src = imgs[3];

        let hero = {

            cX: 0,
            cY: 0,
            imX: 0,
            imY: 0,
            imSize: 80,
            draw: function() {

                this.checkDetection();
                ctx.drawImage(heroImg, this.imX, this.imY, this.imSize, this.imSize, this.cX, this.cY, this.imSize,this.imSize);


                },


            move: function (imX,cX,cY) {

                    ctx.clearRect(this.cX, this.cY, this.imSize, this.imSize,);
                    this.cX += cX * 10;
                    this.cY += cY * 10;
                    this.imX = imX;
                    this.draw();
            },

            checkDetection: function () {

                detectionRight = this.cX > canvaWidth - this.imSize-20? true: false;
                detectionLeft = this.cX < 20? true: false;
                detectionDown = this.cY > canvaHeight - this.imSize-20? true: false;
                detectionUp = this.cY < 20? true: false;
                }

        };
        heroImg.onload=()=>{
            hero.draw();}

        this.drawMonsters()





        window.addEventListener("keydown", (e)=> {
            if(e.keyCode === 40&&!detectionDown){
                //w dol
                hero.move(160,0,1)
            }else if(e.keyCode === 38&&!detectionUp){
                // w gore
                hero.move(0,0,-1)
            }else if(e.keyCode === 39 &&!detectionRight){
                //w prawo
                hero.move(80,1,0)
            }else if(e.keyCode === 37 &&!detectionLeft){
                //w lewo
                hero.move(240,-1,0)
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