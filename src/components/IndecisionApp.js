import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    state={
        options: [],
        selectedOption: undefined
    };

    handleClearModal=()=>{
        this.setState(()=>({
            selectedOption:undefined
        }));
    }
    handleDeleteOptions=()=>{
        //function implicitely jreturns object
         this.setState(()=>({options: []}));
        
    }
    handleDeleteOption=(optionToRemove)=>{
        this.setState((prevState)=>({
            options: prevState.options.filter((option)=>optionToRemove!==option)
        }));
      
    }
 
    handlePick=()=>{
        const randomNum= Math.floor(Math.random()* this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(()=>({
            selectedOption: option
        }));
    }
 
    handleAddOption=(option)=>{
 
    if (!option){
        return 'Enter an appropriate value';
    }
    // Checks option against indexes of options that exists, if its not a match you get -1
    else if (this.state.options.indexOf(option) > -1){
        return 'this option already exists';
    }
 
    this.setState((prevState)=>({options: prevState.options.concat(option)}));
        
    }

    componentDidMount(){

       try{

       
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
       //check if exist
        if (options){
        this.setState(()=>({ options }))
        }
       }catch (e){
           //do nothing
       }
    }
    componentDidUpdate(preProps,prevState){
        if (prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
        
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

   

   render(){
       const title = 'Hungry';
       const subtitle = 'End the argument and let me choose a place for you';
       
       return(
           <div >
            <Header title= {title} subtitle={subtitle}/>
            <div className="container">
                <Action 
                    hasOptions = {this.state.options.length >0 }
                    handlePick= {this.handlePick}
                />
               <div className="widget">
                <Options 
                    options = {this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption= {this.handleAddOption}
                />
                </div>
            </div>
            <OptionModal 
                selectedOption={this.state.selectedOption}
                handleClearModal = {this.handleClearModal}
                />
            
           </div>

       );
   }
}