import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../Style/Homepage.css"
import NavBar from "../Components/NavBar";
import AllUsers from "../Components/AllUsers";

export default function HomePage(){
    const [questions, setQuestions] = useState([])
    const userId = localStorage.getItem("userId")

    useEffect(() =>{
            axios.get(`/homepage`)
                .then(result =>{
                    setQuestions(result.data.question)
                })
                .catch(err =>{
                    console.log(err)
                })
    }, [])
    return(
        <div className="flex-row container">

            <NavBar/>
            <div className="homepage-area flex-column">
                <h2 className="title-buzz">Buzzlink</h2>
                <h1>Got a burning question or idea? Share it with us! <Link to={`/add-question/${userId}`} style={{ textDecoration: 'none' , color:'#3b55d9'}}>New Post</Link></h1>
                <div className="question-area-home flex-column">
                    {questions && questions.map(question =>{
                        return(
                            <div key={question._id} className="question-card">
                                <h3>{question.title}</h3>
                                <p>{question.description.slice(0, 100)}</p>
                                <span>
                                    {question.image ? <span className="question-img"><img src={"http://localhost:2100"+question.image} alt="avatar"/></span> :
                                        null
                                    }
                                </span>
                                <h5>
                                    <Link to={`/user/${question.user._id}`}>
                                        <strong>
                                            {question.user ? <div className="flex-row user-question-info">
                                                {question.user.image ? <span className="profile-img-homePage">
                                                    <img src={"http://localhost:2100"+question.user.image} alt="avatar" />
                                                </span> : null}
                                                <p style={{ textDecoration:'none' , color:'#3b55d9'}}>{question.user.userName}</p>
                                                
                                            </div> : null}
                                        </strong>
                                        <div className="date">{question.created_at.slice(0, 10)} </div>
                                    </Link>
                                    
                                    <Link to={`/question/${question._id}`} style={{ textDecoration: 'none' , color:'#3b55d9'}}>See more</Link>
                                </h5>
                            </div>
                        )
                    })}
                </div>
            </div>            
            <AllUsers />            
        </div>        
    )
}