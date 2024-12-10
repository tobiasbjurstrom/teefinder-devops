import React from 'react';
import { createRoot } from 'react-dom/client';
import { observable, configure, reaction } from 'mobx';
import { ReactRoot } from './reactjs/ReactRoot';

import "./firebaseModel.js";
import {model} from './GolfCourseModel';

import { connectToFirebase } from './firebaseModel.js';
configure({ enforceActions: 'never' }); // we don't use MobX actions



// Make the model reactive
const reactiveModel = observable(model);

// Create the root component JSX
const rootJSX = <ReactRoot model={reactiveModel} />;



// Mount the app in the page DIV with the id "root"
createRoot(document.getElementById('root'))
    .render(rootJSX);

// For debug purposes, do not do this in production!
window.myModel = reactiveModel;
connectToFirebase(reactiveModel, reaction);

//reactiveModel.loadGolfCourses();
reactiveModel.loadCourses();

// To test login page
/* 
import React from 'react';
import { createRoot } from 'react-dom/client';
import { observable, configure } from 'mobx';
import LoginPresenter from './reactjs/loginPresenter.jsx';
import { model } from './GolfCourseModel';

configure({ enforceActions: 'never' }); // we don't use MobX actions

// Make the model reactive
const reactiveModel = observable(model);

// Temporarily render the LoginPresenter
const rootJSX = <LoginPresenter model={reactiveModel} />;

// Mount the app in the page DIV with the id "root"
createRoot(document.getElementById('root'))
    .render(rootJSX);

// For debug purposes, do not do this in production!
window.myModel = reactiveModel;
*/