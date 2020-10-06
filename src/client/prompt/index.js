import React from 'react'
import Popup from 'react-popup';

/** The prompt content component */
class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value.value || '',
            repeat: this.props.value.repeat || 'no'
        };

        this.onChange = (e) => this._onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value || prevState.repeat !== this.state.repeat) {
            this.props.onChange({value:this.state.value, repeat:this.state.repeat});
        }
    }

    _onChange(e) {
        let value = e.target.value;

        this.setState({value: value});
        //this.setState(Objects.assign({}, this.state, {value:value}))
    }

    _onSelectChange = (e) => {
        let value = e.target.value;
        this.setState( {repeat:value})
    }

    // componentDidMount(){
    //     this.nameInput.focus(); 
    //  }

    render() {
        return (
            <div>
                <input autoFocus type="text" placeholder={this.props.placeholder} className="mm-popup__input" value={this.state.value} onChange={this.onChange} />
                <br></br>
                <Option onChange={this._onSelectChange} selected={this.state.repeat}/>
            </div>
        )
    }
}

const choices = [
    {label:"No repeat", value:"no"},
    {label:"Monthly", value:"monthly"},
    {label:"Yearly", value:"yearly"},
]
const Option = ({ selected, onChange }) => {
    return (
      <div className="pollOption">
        {choices.map((choice, index) => (
            <span key={index}>
                <input type="radio"
                name="vote"
                value={choice.value}
                id={"id" + choice.value}
                checked={choice.value === selected}
                onChange={onChange} />
                <label htmlFor={"id" + choice.value}>            
                    {choice.label}
                </label>
            </span>
        ))}
      </div>
    );
  };

/** Prompt plugin */
Popup.registerPlugin('prompt', function (ldate, defaultValue, placeholder, callback, callbackNg) {
    let promptValue = {};
    let promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'Tao su kien cho ngay ' + `${ldate.day}.${ldate.month}.${ldate.year} am lich`,
        content: <Prompt onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
            // left: ['cancel'],
            right: [{
                text: 'Save',
                key: 'enter',
                className: 'success',
                action: function () {
                    
                    if (!promptValue.value){
                        callbackNg(promptValue)
                        Popup.close();
                        
                    }else{
                        callback(promptValue);
                        Popup.close();
                    }
                    
                }
            }]
        }
    });
});
