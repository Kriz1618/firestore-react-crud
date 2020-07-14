import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { db } from "../firebase";

import LinkForm from "./LinkForm";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addLink = async (linkObject) => {
    try {
      if (!currentId) {
        await db.collection("links").doc().set(linkObject);
        toast('New task added', {
          type: 'success'
        });
        console.log('Added new link');
      }
      else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast('Link update successfully', {
          type: 'info'
        });
        setCurrentId('');
      }
      
    } catch (error) {
      toast('Error processing task', {
        type: 'error',
        autoClose: 3000,
      });
      console.log(`Error: ${error}`);
    }
  };

  const getLinks = () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
	};
	
	const onDelete = async (link) => {
		if(window.confirm('Are you sure you want to delete this task?')) {
      await db.collection('links').doc(link.id).delete();
      toast(`Link ${link.name} was removed successfully`, {
        type: 'error',
        autoClose: 2000,
      });
			console.log(`Link ${link.name} was removed successfully`);
		}
	};

  useEffect(() => {
    console.log("Getting data...");
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm { ...{addLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i className="material-icons text-danger" onClick={() => onDelete(link)}>close</i>
                  <i className="material-icons" onClick={() => setCurrentId(link.id)}>edit</i>
                </div>                
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
