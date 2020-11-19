import React from 'react';
import styled from 'styled-components';
import { Translate } from 'react-i18nify';
import axios from 'axios';


const DownloadVideo = styled.div`
    position: relative;
    padding: 0 20px 20px;
    font-size: 14px;

    a {
        color: #2196f3;
    }
`;


const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593"
    },
    pink: {
      default: "#e91e63",
      hover: "#ad1457"
    }
  };
  
  const Button = styled.button`
    background-color: ${props => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
      background-color: ${props => theme[props.theme].hover};
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;
  
  Button.defaultProps = {
    theme: "blue"
  };
  

export default function() {
    return (
        <DownloadVideo>
            <p>
                 <Button onClick={
                   () => 
                    {

                      const data = {
                        vttText: window.vttText,
                        bottom: window.bottom,
                        fontSize: window.fontSize,
                        color: window.color,
                      };
                      axios.post(`https://jsonplaceholder.typicode.com/users`, 
                        { data }
                      )
                      .then(res => {
                        console.log(res);
                        console.log(res.data);
                      })


                    }
                }>Burn Subtitles Into Your Video</Button>
            </p>
         
            <p>
                It usually takes 3~8 minutes. Please be patient.
            </p>
            
        </DownloadVideo>
    );
}
