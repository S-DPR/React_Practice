import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            left: 0,
            operator: "+",
            right: 0,
            isLeftCursor: true,
            result: 0
        }
    }

    toOpponent() {
        this.setState({isLeftCursor: !this.state.isLeftCursor})
    }

    operator(n) {
        this.setState({operator:n})
    }

    write(n) {
        if (this.state.isLeftCursor)
            this.setState({left: this.state.left*10+n})
        else
            this.setState({right: this.state.right*10+n})
    }

    remove() {
        if (this.state.isLeftCursor)
            this.setState({left: Math.floor(this.state.left/10)})
        else
            this.setState({right: Math.floor(this.state.right/10)})
    }

    calc() {
        this.setState({
            result: eval(`${this.state.left}${this.state.operator}${this.state.right}`)
        })
    }

    render() {
        return (
            <div>
                <CalcLine left={this.state.left} right={this.state.right} operator={this.state.operator}/>
                <CalcNumberButton S={1} E={3} onClick={this.write.bind(this)} />
                <button style={buttonStyle} onClick={() => this.remove()}>←</button> <br/>
                <CalcNumberButton S={4} E={6} onClick={this.write.bind(this)}/>
                <button style={buttonStyle} onClick={() => this.operator('+')}>+</button> <br/>
                <CalcNumberButton S={7} E={9} onClick={this.write.bind(this)}/>
                <button style={buttonStyle} onClick={() => this.operator('-')}>-</button> <br/>
                <button style={buttonStyle} onClick={() => this.toOpponent()}>{this.state.isLeftCursor ? "L" : "R"}</button>
                <CalcNumberButton S={0} E={0} onClick={this.write.bind(this)}/>
                <button style={buttonStyle} onClick={() => this.operator('/')}>/</button>
                <button style={buttonStyle} onClick={() => this.operator('*')}>*</button> <br/>
                <button style={{...buttonStyle, width:"100px"}} onClick={() => this.calc()}>Calc</button><br/>
                <input value={this.state.result}/>
            </div>
        )
    }
}

class CalcLine extends React.Component {
    render() {
        return (
            <div>
                <input value={this.props.left} style={{textAlign:"center"}}/>
                <input value={this.props.operator} style={{textAlign:"center", width:"15px"}}/>
                <input value={this.props.right} style={{textAlign:"center"}}/>
            </div>
        )
    }
}

function CalcNumberButton(props) {
    let item = []
    for (let i = props.S; i <= props.E; i++)
        item.push(<button style={buttonStyle} onClick={() => props.onClick(i)}>{i}</button>)
    return item
}

let buttonStyle = {
    textAlign:"center",
    width:"50px",
    height:"50px",
    fontSize:"30px",
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Calculator/>
)
