import styled from 'styled-components';

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    margin: 0 auto;
    border: 1px solid gray;
    border-radius: 20px;
    padding: 50px;
    box-shadow: 10px 10px 10px 0 lightgray;

    h1 {
        margin: 0;
    }

    input {
        width: 80%;
    }
    textarea {
        width: 80%;
        height: 300px;
    }
`