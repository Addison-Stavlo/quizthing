import React from 'react';
import styled from 'styled-components';


export default function DeleteBox(props) {
    return (
        <AlertHolder>
            <div className='alert-bg'/>
            <div className='alert-box'>
                <h3>Are you sure you would like to delete this?</h3>
                <div>
                    <button onClick={props.dontDelete}>No</button>
                    <button onClick={props.delete}>Yes</button>
                </div>
            </div>
        </AlertHolder>
        
    )
}

const AlertHolder = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
    height: 100%;

    .alert-bg {
        position: fixed;
        height: 100%;
        width: 100%;
        background: gray;
        opacity: 0.7;
        top: 0;
    }


    .alert-box {
        opacity: 1;
        background: darkred;
        z-index: 2;
        padding: 20px;
        border: 3px solid red;
        color: white;
    }
`