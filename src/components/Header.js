import React from 'react';
import styled from 'styled-components';
import { names, getName } from '../i18n';
import Help from './Help';
import DownloadVideo from './DownloadVideo';
import Dialog from './Dialog';
import { downloadFile } from '../utils';
import { vttToUrl, subToVtt } from '../subtitle';
import { t, Translate } from 'react-i18nify';
import Storage from '../utils/storage';

const storage = new Storage();

const Header = styled.div`
    position: relative;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    background-color: #1f2133;
    border-bottom: 1px solid rgb(0, 0, 0);
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    height: 100%;

    .aimu {
        display: flex;
        align-items: center;
        color: #FFEB3B;
        padding-right: 30px;
        font-size: 14px;
        text-decoration: none;
        animation: animation 3s infinite;

        img {
            margin-right: 10px;
        }

        @keyframes animation {
            50% {
                color: #00bcd4;
            }
        }
    }
`;

const Logo = styled.a`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 22px;
    height: 100%;
    cursor: pointer;
    padding: 0 15px;
    color: rgba(255, 255, 255, 1);
    transition: all 0.2s ease 0s;
    border-right: 1px solid rgb(0, 0, 0);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
    text-decoration: none;

    &:hover {
        background-color: #2196f3;
    }
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    height: 100%;
    cursor: pointer;
    padding: 0 25px;
    color: rgba(255, 255, 255, 1);
    transition: all 0.2s ease 0s;
    border-right: 1px solid rgb(0, 0, 0);
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);

    &:hover {
        background-color: #2196f3;
    }

    i {
        margin-right: 5px;
    }
`;

const I18n = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    height: 100%;
    padding: 0 10px;
    color: rgba(255, 255, 255, 1);
    border-left: 1px solid rgb(0, 0, 0);
    background-color: rgb(26, 83, 109);

    i {
        margin-right: 5px;
    }

    select {
        outline: none;
    }
`;

export default function (props) {
    return (
        <Header>
            <Left>
                <Logo href="/">
                    <i className="icon-cc"></i>
                </Logo>

                <Menu 
                
                onClick={() => {
                    if (window.confirm('Are you sure to DISCARD this project?' )) {
                        window.location.assign('/');  //放弃当前项目，返回首页
                    }
                }}

                >
                    <i className="icon-trash-empty"></i>
                    Discard
                </Menu>

       
                <Menu onClick={() => props.undoSubtitles()}>
                    <i className="icon-ccw"></i>
                    <Translate value="undo" />
                </Menu>

              
                
                <Menu onClick={() => downloadFile(vttToUrl(subToVtt(props.subtitles)), `${Date.now()}.vtt`)}>
                    <i className="icon-download"></i>
                    Download Subtitle File (.vtt)
                </Menu>


         
 
                <Menu style={{color:"pink"}} onClick={() => 
                    
                        {
                        window.subtitles =  props.subtitles;

                        //以下4个属性，准备post到后台
                        window.vttText = subToVtt(props.subtitles);
                        window.bottom = storage.get('bottom');
                        window.fontSize = storage.get('fontSize');
                        window.color = storage.get('color');

                        props.setOption({ downloadvideo: true }) ;

                        }
                    }
                >
                    <i className="icon-download"></i>
                    Download Video
                </Menu>
      
            </Left>
        

            {props.options.downloadvideo ? (
                <Dialog title='Download Video' onClose={() => props.setOption({ downloadvideo: false })}>
                    <DownloadVideo {...props} />
                </Dialog>
            ) : null}

 
        </Header>
    );
}
