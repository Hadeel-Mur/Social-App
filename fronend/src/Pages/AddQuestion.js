import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import "../Style/AddQuestion.css"
import NavBar from "../Components/NavBar";

export default function AddQuestion(){
    const navigate = useNavigate();
    let {id} = useParams()
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [err, setErr] = useState('');
    const [user, setUser] = useState();
    const [image, setImage] = useState({})
    const userId = localStorage.getItem("userId")

    const titleChange = (e) =>{
        setErr('')
        setTitle(e.target.value)
    }
    const descriptionChange = (e) =>{
        setErr('')
        setDescription(e.target.value)
    }
    useEffect(()=>{
        axios.get(`/addQuestion/${id}`)
            .then(result =>{
                setUser(result.data.user)
            })
            .catch(err =>{
                console.log(err)
            })
    },[id])

    const handleSubmit = (e) =>{
        e.preventDefault()
        setErr('')
        if (!title || !description){
            setErr("U must provide some information!")
        } else{
            axios.post(`/add-new/${id}`,{
                title: title,
                description: description,
                user: user
            })
                .then(result =>{
                    let formData = new FormData();

                    formData.append("questionImage", image)

                    fetch(`/uploadQuestionImage/${result.data._id}`, {
                        method: "post",
                        body: formData,
                    })
                    navigate(`/homePage`)
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    }
    const imageChange = (e) =>{
        setImage(e.target.files[0])
    }
  
    return(
        <div className="container flex-row">
            <NavBar/>
            <div className="add-question">
        
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="user" value={userId}/>
                    <input type="text" name="title" id="title" placeholder="Let's hear it! write here..." onChange={titleChange}/>
                    <textarea name="description" id="description" placeholder="Description, more details, add here..." onChange={descriptionChange}></textarea>
                    <input type="file" onChange={imageChange}/>
                    <button className="button-add-question" onClick={handleSubmit}>Post</button>
                </form>
                {
                    err ? <h5 className="error">{err}</h5> : null
                }
            </div>
        </div>
    )
}