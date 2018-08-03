import React, {Component} from 'react';
import {SketchPicker} from "react-color";

class App extends Component {
    state = {
        mouseDown: false,
        pixelArray: [],
        rgb: {r: 0, g: 0, b: 0, a: 0},
        events: []
    };
    canvasMouseHandler = event => {
        if (this.state.mouseDown) {
            event.persist();
            this.setState(
                prevState => {
                    return {
                        pixelArray: [...prevState.pixelArray,
                            {x: event.clientX, y: event.clientY, color: this.state.rgb}]
                    }
                }
            )
        }
        this.drawImage(this.state.pixelArray);
    };
    mouseDownHandler = () => {
        this.setState({mouseDown: true});
    };
    drawImage = (eventArray) => {
        const context = this.canvas.getContext('2d');
        eventArray.forEach(one => {
            const color = `rgba(${one.color.r},${one.color.g},${one.color.b},${one.color.a})`
            context.fillStyle = color;
            context.beginPath();
            context.arc(one.x, one.y, 10, 0, 2 * Math.PI);
            context.stroke();
            context.fill();
        });
    };
    mouseUpHandler = () => {
        this.setState({
            mouseDown: false,
            pixelArray: [],
        })
    };
    handleChangeComplete = (color) => {
        this.setState({rgb: color.rgb})
    };

    render() {
        return (
            <div style={{display: "flex", justifyContent: "space-between", padding: "0 40px 0 0"}}>
                <canvas ref={elem => this.canvas = elem} style={{border: "3px solid black"}} width={1024} height={768}
                        onMouseDown={this.mouseDownHandler}
                        onMouseUp={this.mouseUpHandler}
                        onMouseMove={this.canvasMouseHandler}>
                </canvas>
                <div><SketchPicker color={this.state.rgb} onChangeComplete={this.handleChangeComplete}/></div>
            </div>
        );
    }
}

export default App;
