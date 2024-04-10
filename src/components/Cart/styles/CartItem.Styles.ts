import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  margin-bottom: 20px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
  }

  .information p {
    margin-right: 20px;
  }

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`
