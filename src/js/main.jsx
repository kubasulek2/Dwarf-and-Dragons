import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
require('../sass/main.scss');
    const image = require('../img/sprite2.png');

class Game extends React.Component {
    constructor(props){
        super(props)
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

    componentDidMount(){

        const ctx = this.canvas.getContext('2d');
        const canvaWidth = 1000;
        const canvaHeight = 700;
        let detectionRight = false;
        let detectionLeft = false;
        let detectionUp = false;
        let detectionDown = false;
        let img = new Image();
        img.src = image;


        let monster={
            x: 0,
            y: 0,
            randomize: function () {

            },
            draw: function () {
                this.x = Math.round(Math.random()*(92-10)+10)*10
                this.y = Math.round(Math.random()*(62-10)+10)*10
                console.log(this.x, this.y);

              ctx.fillRect(this.x,this.y,80,80)
            }
        }


        let hero = {

            cX: 0,
            cY: 0,
            imX: 0,
            imY: 0,
            imSize: 80,
            draw: function() {

                console.log(this.cX, detectionLeft);
                this.checkDetection();
                ctx.drawImage(img, this.imX, this.imY, this.imSize, this.imSize, this.cX, this.cY, this.imSize,this.imSize);

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
        img.onload = function(){

            hero.draw();
            monster.randomize()
            monster.draw()

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

        };
      }
};





















document.addEventListener("DOMContentLoaded", function () {

    ReactDOM.render(
        <Game/>,
        document.getElementById("app")
    )








});