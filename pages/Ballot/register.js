import React,{Component} from "react"
import {Container,Input,Form,Message,Button} from "semantic-ui-react";
import Head from 'next/head';
import web3 from "../../ethereum/web3"
import Ballot from "../../ethereum/Ballot"
import {Router} from "../../routes"

class Register extends Component
{
    state={
        address:"",
        errorMessage:"",
        loading:false
    };
    onSubmit=async(event)=>{
        event.preventDefault();
        this.setState({loading:true,errorMessage:""});
        try{
            const accounts=await web3.eth.getAccounts();
            await Ballot.methods.register(this.state.address).send({
                from:accounts[0]
            });
            Router.pushRoute("/");
            
        }catch(err)
        {
            {this.setState({errorMessage:err})}
        }
        {this.setState({loading:false})}
    }
      
    render()
    {

        return(
            <Container>
                <Head> 
                    <link rel='stylesheet prefetch' href='http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/css/semantic.min.css'/>
  
  
                  <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css'/>
                    
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                       
                </Head>
                
                
                <div style={{marginTop:'50px' }}>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <h3 class="ui huge center aligned header">Register to Vote</h3>
                    <Input
                     label="address"
                     value={this.state.address}
                     labelPosition="center"
                     onChange={event=>this.setState({address:event.target.value})}
                     />
                </Form.Field>
                <Message error header="oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>Register</Button>
            </Form>
            </div>
                 

                   
            </Container>
            
                
                
   
        );
    }
}
export default Register