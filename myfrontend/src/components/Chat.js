import React, {useState,useEffect, useContext} from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  Avatar,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import {UserContext} from './UserContext'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import ReactRoundedImage from "react-rounded-image";
import {CursorFill } from 'react-bootstrap-icons';
import Messages from './Messages';
function Chat() {
    let params = useParams();
    const value12 = useContext(UserContext);
    const [messages, setMessages]=useState([])
    const [recieverInfo, setRecieverInfo]=useState([])
    const [senderInfo, setSenderInfo]=useState([])
    const [newmessage, setNewmessage]=useState("")
    const getMessages=(id)=>{
        axios.get('http://localhost:5000/getMessages/'+id)
            .then(response => {
                console.log(response.data)
                setMessages(response.data)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const getProfile=async(id)=>{
        await axios.get('http://localhost:5000/'+id)
            .then(response => {
                
                if(response.data){
                    console.log("Opened Profile Info: ",response.data)
                    if(response.data._id==value12.userid){
                        setSenderInfo(response.data)
                    }else{
                        setRecieverInfo(response.data)
                    }
                    return response.data
                }else{
                    axios.get('http://localhost:5000/mechanic/'+id)
                    .then(response => {
                        console.log("Opened Profile Info: ",response.data)
                        if(response.data._id==value12.userid){
                            setSenderInfo(response.data)
                        }else{
                            setRecieverInfo(response.data)
                        }
                        return response.data
                    })
                    .catch(function (error){
                        console.log(error);
                        console.log("Aey te error hai bro")
                    })
                }
                
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const getProfiles=(id)=>{
        axios.get('http://localhost:5000/getConversationByID/'+id)
            .then(response => {
                console.log("Member 1",response.data.members[0])
                console.log("Member 2",response.data.members[1])
                getProfile(response.data.members[0])
                getProfile(response.data.members[1])


            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const sendMessage=()=>{
        const message={
            conversationId: params.id,
            sender:senderInfo._id,
            text: newmessage,
            td: new Date().toLocaleString()
        }
        axios.post('/newMessage', message)
          .then(function (response) {
              console.log(response.data)
              setMessages([...messages,message])
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
          setNewmessage(null)
        
        
    }
    useEffect(() => {
        console.log("conversationid"+ params.id)
        getProfiles(params.id)
        getMessages(params.id)
    }, [])
    return (
        <div style={{backgroundColor:'#d9d9f3', marginLeft:'20%', marginRight:'20%', borderRadius:'5%'}}>
            
            <MainContainer>
    <ChatContainer>
    <ConversationHeader>
          <Avatar href={'profile'+recieverInfo._id} src={'/content/'+recieverInfo.propic} name={recieverInfo.firstname+' '+recieverInfo.lastname} />
          <ConversationHeader.Content href={'profile'+recieverInfo._id} userName={recieverInfo.firstname+' '+recieverInfo.lastname} info={recieverInfo.email} />        
        </ConversationHeader>
      <MessageList>
      {messages.map(message=>(
                <Message
                model={{
                  message: message.text,
                  sentTime: "just now",
                  direction: message.sender==recieverInfo._id?"incoming":"outgoing",
                  sender: message.sender==recieverInfo._id?recieverInfo.firstname:senderInfo.firstname,
                }}
                
              >
                  <Avatar src={message.sender==recieverInfo._id?'/content/'+recieverInfo.propic:'/content/'+senderInfo.propic} status={message.sender==recieverInfo._id?null:"dnd"} name={message.sender==recieverInfo._id?recieverInfo.firstname:senderInfo.firstname} />
                  </Message>

              
                
                
                ))}
        
      </MessageList>
      <MessageInput value={newmessage} onChange={setNewmessage} onSend={()=>sendMessage()} placeholder="Type message here" />
    </ChatContainer>
  </MainContainer>
            </div>
    )
}

export default Chat
