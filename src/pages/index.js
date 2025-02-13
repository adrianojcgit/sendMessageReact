import Head from "next/head";
import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  });

  const [message, setMessage] = useState("");

  const valorInput = e => setData({...data, [e.target.name]: e.target.value});

  const sendMsg = async (e) => {
    
    e.preventDefault();   
    
    const headers = {
      'headers': {
        'Content-Type':'application/json'
      }
    };

    await axios.post('http://localhost:8080/message', data, headers)
			.then((response) => {
				setMessage(response.data.message);
			}).catch((err) => {
				setMessage(err.response.data.message);
			});
  }

  return (
    <>
    <Head>
      <title>Projeto React com NodeJS</title>
      <meta name="description" content="Generated by create nex app"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      
    </Head>
    <main>
      <form onSubmit={sendMsg}>
        <h2>Formulário de contato</h2>
        {message ? <p>message</p> : ""}
        <label>Nome:</label>
        <input type="text" name="name" placeholder="Digite o nome"  onChange={valorInput}/><br/><br/>
        <label>E-mail:</label>
        <input type="email" name="email" placeholder="Digite o e-mail"  onChange={valorInput}/><br/><br/>
        <label>Assunto:</label>
        <input type="text" name="subject" placeholder="Digite o assutno"  onChange={valorInput}/><br/><br/>
        <label>Conteúdo:</label>
        <textarea type="text" name="content" cols="30" rows="10" placeholder="Digite o conteúdo"  onChange={valorInput}>
          </textarea><br/><br/>
        <button type="submit">Enviar</button><br/><br/>
      </form>
    </main>
    </>
  );
}
