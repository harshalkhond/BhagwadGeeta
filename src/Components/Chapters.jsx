import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  Container  from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import '../Components/shlokas.css'
export const Chapters = () => {
    const state = useLocation();
    console.log(state.state.id);
    const [verses, setVerses] = useState([]);
    const [show , setShow] = useState(false);
    const [translations , setTranslations] = useState();
    const url1 = "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/";
    const url2 = "/verses/";
    const url = url1 + state.state.id + url2;
    useEffect(() => {
        const getData = async () => {
            const options = {
                method: 'GET',
                url: url,
                headers: {
                    'X-RapidAPI-Key': 'ede96b6ee0msh01977ae033ea98cp120734jsna9da51ef0d12',
                    'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setVerses(response.data);
                var translated_data = []
                for (var i=0;i<response.data.length;i++){
                    console.log(response.data[i])
                        for (var j=0;j<response.data[i].translations.length;j++){
                            console.log(response.data[i].translations[j]);
                            if (response.data[i].translations[j].language === "hindi"){
                                translated_data.push(response.data[i].translations[j].description);
                                break;
                            }
                        }
                }
                setTranslations(translated_data);
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(translations);
    return (
        <>
        { verses.length===0 ? <div className="spinner"><Spinner animation="grow" variant="warning" /></div>:
        <Container className='mt-5 main-container'>
            <Button style={{float:"right", backgroundColor:"rgba(250, 207, 126, 0.932)", color:"black"}} onClick={(e)=>{setShow(!show)}}> <b>{show? "Hide meanings":"Show meanings"} </b> </Button>
            <br />
            {verses.map((key,i) => {
                return (
                <Card className='my-4'>
                    <Card.Header> <b>श्लोक {key.verse_number}</b> </Card.Header>
                    <Card.Body>
                        <Card.Title> <b> {key.text}</b></Card.Title>
                        <Card.Text>
                           {translations[i]}
                        </Card.Text>
                        { show ? 
                            <Card.Text>
                            {key.word_meanings}
                         </Card.Text>:
                                 <></>
                        }
                    </Card.Body>
                </Card>
                )
            })
            }
        </Container>
        }</>
    )
}
