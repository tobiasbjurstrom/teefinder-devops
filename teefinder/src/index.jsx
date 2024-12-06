import React from 'react';
import { createRoot } from 'react-dom/client';
import { observable, configure } from 'mobx';
import { ReactRoot } from './reactjs/ReactRoot';
import {model} from './GolfCourseModel';
configure({ enforceActions: 'never' }); // we don't use MobX actions

// Make the model reactive
const reactiveModel = observable(model);

// Create the root component JSX
const rootJSX = <ReactRoot model={reactiveModel} />;

// Mount the app in the page DIV with the id "root"
const root = createRoot(document.getElementById('root'));
root.render(rootJSX);

// For debug purposes, do not do this in production!
window.myModel = reactiveModel;

reactiveModel.loadCourses();
