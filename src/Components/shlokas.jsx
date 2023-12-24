import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import  Container from 'react-bootstrap/Container';
import  Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import '../Components/shlokas.css'
export const Shlokas = () => {
    const [chapters, setChapters] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            const options = {
                method: 'GET',
                url: 'https://bhagavad-gita3.p.rapidapi.com/v2/chapters/',
                headers: {
                    'X-RapidAPI-Key': 'apikey',
                    'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                console.log(response.data);
                setChapters(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, [])

    const moveToNextPage = (id) => {
        navigate('/chapter', {
            state: {
                id
            }
        })
    }
    return (
        <>
        {   chapters.length===0 ? <div className="spinner"><Spinner animation="grow" variant="warning" /></div>:
        <>
        <b> <span style={{float:"right"}}>created with &#10084; by <a href="https://www.linkedin.com/in/harshalkhond/" className='linkedin-link'>Harshal Khond</a> </span> </b>
        <br />
            <Container className='main-container'>
                <h2> <b> श्रीमद भगवद गीता </b></h2>
                {chapters.map((key) => {
                    return (
                        <>
                            <Card className='my-3'>
                                <Card.Header>अध्याय {key.chapter_number}</Card.Header>
                                <Card.Body>
                                    <Card.Title> <b> {key.name} </b></Card.Title>
                                    <Card.Text>
                                        {key.chapter_summary_hindi}
                                    </Card.Text>
                                    <Button variant="warning" onClick={(e) => { moveToNextPage(key.id) }}>श्लोकः पढ़े</Button>
                                </Card.Body>
                            </Card>
                        </>
                    )
                })}

            </Container>
            </>
}
        </>
    )
}
