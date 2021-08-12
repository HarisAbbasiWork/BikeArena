import React from 'react'
import ChatBot from 'react-simple-chatbot';
const steps = [
    {
     id:'intro', 
     message:'What do you need help for?', 
     trigger:'intro-user',
    },
    {
     id:'intro-user', 
     options:[
       {value:'y', label:'Bikes', trigger:'yes-response'},
       {value:'n', label:'User Settings', trigger:'no-response'},
       {value:'m', label:'Mechanics', trigger:'mec-response'},
     ] 
    },
    {
     id:'yes-response', 
     message:'What Do You Wanna Know About?', 
     trigger:'bike-options',
    },
    {
        id:'bike-options', 
        options:[
          {value:'p', label:'Posting Ad', trigger:'ad-response'},
          {value:'b', label:'Bike Brands', trigger:'brands-response'},
          {value:'u', label:'Bike Parts', trigger:'parts'},
        ] 
       },
    {
     id:'no-response', 
     message:'You can change your settings when you click your name on top-right, dropdown opens and then click on account setting  or follow this link: http://localhost:3000/settings', 
     end:true,
    },
    {
     id:'mec-response', 
     message:'Click Browse Mechanics On Top or follow this link: /browsemechanics', 
     trigger:'mec2',
    },
    {
        id:'brands-response', 
        message:'We have covered all brands in our web application, you can filter ads based on brands and you can open dropdown from Brands button in navbar to see specific brands ads', 
        end:true,
       },
       {
        id:'ad-response', 
        message:'You Can Post Ad By Clicking Post Bike Ad button on homepage or follow this link: /addbikead ', 
        trigger:'faq',
       },
       {
        id:'parts', 
        message:'You Need Parts Help', 
        trigger:'parts-response2',
       },
       
       {
        id:'parts-response2', 
        options:[
            {value:'rt', label:'What Type Of Parts Users Sell Here?', trigger:'rt'},
            {value:'r', label:'How Can I Add Any Part To Cart?', trigger:'carts'}
          ]
       },
       {
        id:'carts', 
        message:'You click on Add To Cart button below part ad then you can checkout and order by adding payment details ', 
        end:true,
       },
       {
        id:'rt', 
        message:'Accessories, Bicycle, Body, Brakes & Suspension, Engine, Exhaust, Gloves, Helmets, Other Parts, Seats, Tyres & Wheels', 
        end:true,
       },
       {
        id:'mec2', 
        message:'Frequently Asked Questions About Mechanics', 
        trigger:'meci-response2',
       },
       {
        id:'meci-response2', 
        options:[
            {value:'img', label:'Can I Contact Mechanic Any Time?', trigger:'contact-mec'},
            {value:'lcd', label:'Can I Ask Mechanic To Come Outside Of His Working Hour?', trigger:'working-hour'}
          ]
       },
       {
        id:'video-ad', 
        message:'Yes, You Can Add Atmost One Image And Max 4 Images. Uploading Video Is Also Optional.', 
        end:true,
       },
       {
        id:'info-ad', 
        message:'Yes, Because We Want To Provide Buyers All The Info, So That It Could Be Easy For Them To Browse Ads', 
        end:true,
       },
       {
        id:'contact-mec', 
        message:'Yes, You Can Contact Mechanic Any Time You Want. You Can Call Him Or Message Him From Our Platform', 
        end:true,
       },
       {
        id:'working-hour', 
        message:'No, Mechanics Fixed Their Working Hours According To Their Schedule', 
        end:true,
       },
       {
        id:'faq', 
        message:'Frequently Asked Questions About Ad Posting', 
        trigger:'faq-response2',
       },
       {
        id:'faq-response2', 
        options:[
            {value:'img', label:'Can I Add Just One Image Instead Of 4 Images And One Video?', trigger:'video-ad'},
            {value:'lcd', label:'Adding Location, Category And Description Of The Ad Is Compulsory?', trigger:'info-ad'}
          ]
       },
       
       
   ]
function ChatBotPage() {
    return (
        <div style={{marginLeft:'40%'}}>
            <ChatBot steps={steps} />
        </div>
    )
}

export default ChatBotPage
