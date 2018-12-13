import styled from 'styled-components';
import colors from '../colors/colors';

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    margin: 0 auto;
    border: 3px ridge lightgray;
    border-radius: 20px;
    padding: 20px 0;
    box-shadow: 10px 10px 10px 0 lightgray;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: left;
    background: ${colors[3]};
    

    h1 {
        margin: 0;
    }
    h2 {
        margin-top: 0;
    }

    input {
        width: 80%;
        border: 3px inset lightgray;
        border-radius: 5px;
        font-size: 14px;
        margin: 10px 0;
    }
    textarea {
        width: 80%;
        height: 300px;
        border: 3px inset lightgray;
        border-radius: 5px;
        margin-top: 15px;
    }
`