import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement } from "react";
import { observable, configure, reaction } from 'mobx';
import { ReactRoot } from './reactjs/ReactRoot';

import "./firebaseModel.js";
import {model} from './GolfCourseModel';

import { connectToFirebase } from './firebaseModel.js';
configure({ enforceActions: 'never' }); // we don't use MobX actions

window.React= {createElement:createElement};

// Make the model reactive
const reactiveModel = observable(model);

// Create the root component JSX
const rootJSX = <div> <ReactRoot model={reactiveModel} /> </div>;

//reactiveModel.loadGolfCourses();
reactiveModel.loadCourses();

// Mount the app in the page DIV with the id "root"
createRoot(document.getElementById('root'))
    .render(<div> <ReactRoot model={reactiveModel} /> </div>);

// For debug purposes, do not do this in production!
window.myModel = reactiveModel;
connectToFirebase(reactiveModel, reaction);


