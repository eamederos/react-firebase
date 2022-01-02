import React, {useState, useEffect} from "react";
import db from '../firebase';
import { getDoc, doc} from "firebase/firestore";

const LinkForm = (props) => {

    const initialvalues = {
        'url': '',
        'name': '',
        'description': '',
    };
    const [values, setValues] = useState(initialvalues);

    const handelSubmit = e =>{
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({...initialvalues})
    }

    const handelInputChange = e =>{
        const {name, value} = e.target;
        setValues({...values,[name]:value})
    }

    const getLinkById = async (id) => {
        const linkSnapshot = await getDoc(doc(db, 'Links', id));
        if (linkSnapshot.exists()) {
            setValues({...linkSnapshot.data()})
            
        } else {
            console.log("Note doesn't exist");
        }
    }

    useEffect(() => {
        if (props.currentId === '' ){
            setValues({ ...values });
        } else {
           getLinkById(props.currentId)
        }
   }, [props.currentId])

    return(
        <form className="card card-body" onSubmit={handelSubmit}>
            <div className="form-group input-group">
                <div className="input-group-tex bg-light pt-1">
                <i className="material-icons">insert_link</i>
                </div>
                <input type="text" value={values.url} className="form-control" name="url" placeholder="https://somewebsite.com" onChange={handelInputChange}/>
            </div>

            <div className="form-group input-group pt-2">
                <div className="input-group-tex bg-light pt-1">
                <i className="material-icons">create</i>
                </div>
                <input type="text" value={values.name} className="form-control" name="name" placeholder="Website Name" onChange={handelInputChange}/>
            </div>

            <div className="form-group py-2">
                <textarea className="form-control" value={values.description} name="description" rows="3" placeholder="Website Description" onChange={handelInputChange}/>
            </div>

            <button className="btn btn-primary btn-block pt-2">
                {props.currentId === '' ? 'Save': 'Update'}
            </button>
        </form>
    ); 
}

export default LinkForm;