import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from "react";
import { observable, configure, reaction } from 'mobx';
import { BrowserRouter as Router } from 'react-router';
import { ReactRoot } from './reactjs/ReactRoot';
import LoginPresenter from './reactjs/loginPresenter.jsx';
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import "./firebaseModel.js";
import {model} from './GolfCourseModel';
import { getDatabase, ref, set, get } from "firebase/database";

import { connectToFirebase } from './firebaseModel.js';
configure({ enforceActions: 'never' }); // we don't use MobX actions

window.React= {createElement:createElement};


// Make the model reactive
const reactiveModel = observable(model);

// Create the root component JSX
const rootJSX = <div> <ReactRoot model={reactiveModel} /> </div>;
//const rootJSX = <Router> <LoginPresenter model={reactiveModel} /> </Router>;

//reactiveModel.loadGolfCourses();
reactiveModel.loadCourses();

// Mount the app in the page DIV with the id "root"
createRoot(document.getElementById('root'))
    .render(rootJSX);

// For debug purposes, do not do this in production!
window.myModel = reactiveModel;
//connectToFirebase(reactiveModel, reaction);

