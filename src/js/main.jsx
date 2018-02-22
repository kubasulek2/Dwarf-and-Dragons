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
            heroLevel: 1,
            cX: 0,
            cY: 250,
            imX: 0,
            imY: 0,
            imSize: 80,
            detectionRight: false,
            detectionLeft: false,
            detectionUp: false,
            detectionDown: false,
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


    drawMonsters =  ()=> {
        let ctx = this.canvas.getContext('2d');
        let monsterImg = new Image();
        monsterImg.src = imgs[1];

        let monstersAmount = Math.ceil(Math.random()*3)+Math.floor(this.state.level);

        let monstersArr =[];

        monsterImg.onload= () =>{
            for(let i = 0; i < monstersAmount; i++){
                let x = Math.round(Math.random()*(92-10)+10)*10;
                let y = Math.round(Math.random()*(62-25)+25)*10;

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
        this.setState({monsters: monstersArr})

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
            detectionRight: this.state.cX > canvaWidth - this.state.imSize-20? true: false,
            detectionLeft: this.state.cX < 20? true: false,
            detectionDown: this.state.cY > canvaHeight - this.state.imSize-20? true: false,
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

            if(e.keyCode === 40&&!this.state.detectionDown){
                //w dol
                this.move(160,0,1,heroImg)
            }else if(e.keyCode === 38&&!this.state.detectionUp){
                // w gore
                this.move(0,0,-1,heroImg)
            }else if(e.keyCode === 39 &&!this.state.detectionRight){
                //w prawo
                this.move(80,1,0,heroImg)
            }else if(e.keyCode === 37 &&!this.state.detectionLeft){
                //w lewo
                this.move(240,-1,0,heroImg)
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